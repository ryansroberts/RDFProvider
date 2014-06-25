module Store

open System.IO
open System
open VDS.RDF
open VDS.RDF.Storage
open VDS.RDF.Storage.Management
open VDS.RDF.Storage.Management.Provisioning.Stardog
open VDS.RDF.Query

type namespaceMappings = (String * Schema.Uri) list

let connectStarDog server store = 
    (fun () -> new StardogConnector(server, store, StardogReasoningMode.SL, "admin", "admin"))

let emptyStore url = 
    use server = new StardogV2Server(url, "admin", "admin")
    (fun store -> 
    if ((server.ListStores() |> Seq.exists ((=) store))) then do server.DeleteStore store
    server.CreateStore(StardogDiskTemplate(store, IcvEnabled = true, IcvReasoningMode = StardogReasoningMode.SL)) 
    |> ignore
    (server, connectStarDog url store))

let bootStrapFromUri (loadFrom : Uri) (baseUri : Uri) (c : StardogConnector) = 
    use g = new Graph()
    g.LoadFromUri loadFrom
    g.BaseUri <- null
    c.UpdateGraph(g.BaseUri, g.Triples, [])

let bootStrapFromFile (loadFrom : string) (baseUri : Uri) (c : StardogConnector) = 
    use g = new Graph()
    g.LoadFromFile(loadFrom)
    g.BaseUri <- null
    c.UpdateGraph(g.BaseUri, g.Triples, []) 

let inference a (c : StardogConnector) =
    c.Reasoning <- StardogReasoningMode.SL
    c.Query a :?> SparqlResultSet

let oneTuple (rx : SparqlResultSet) = 
    [ for r in rx do
          yield (r.[0]) ]

let twoTuple (rx : SparqlResultSet) = 
    [ for r in rx do
          yield (r.[0], r.[1]) ]

let threeTuple (rx : SparqlResultSet) = 
    [ for r in rx do
          yield (r.[0], r.[1], r.[0]) ]

open Schema

let subTypes (root : Uri) (conn : StardogConnector) =
    inference (sprintf """
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        select distinct ?t ?label
        where {
            {?t rdfs:subClassOf <%s> .} UNION {?t rdfs:subPropertyOf <%s> . }
            OPTIONAL { ?t rdfs:label ?label } 
           	FILTER ( ?t != <%s> && ?t != owl:Thing && ?t != owl:Nothing && ?t != owl:bottomObjectProperty && ?t != owl:topObjectProperty ) 
        }
    """ (string root) (string root) (string root)) conn |> oneTuple

let objectProperties (root : Uri) (conn : StardogConnector) = 
    inference (sprintf """
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix owl:  <http://www.w3.org/2002/07/owl#>
        select distinct ?p 
        where {
          ?p a owl:ObjectProperty .
          ?p rdfs:domain <%s>
          FILTER ( ?p != owl:Thing && ?p != owl:Nothing && ?p != owl:bottomObjectProperty && ?p != owl:topObjectProperty ) 
        }
    """ (string root)) conn |> oneTuple

let propertyRange (root:Uri) (conn :StardogConnector) =
    inference (sprintf """
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix owl:  <http://www.w3.org/2002/07/owl#>
        select distinct ?r
        where {
          <%s> rdfs:range ?r
          FILTER ( ?p != owl:Thing && ?p != owl:Nothing) 
        }
    """ (string root)) conn |> oneTuple

let dataProperties (root : Uri) (conn : StardogConnector) = 
    inference (sprintf """
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?p
        WHERE {
             ?p rdfs:domain <%s> ; a owl:DatatypeProperty .
        }
    """ (string root)) conn |> oneTuple

let sampleIndividuals (root : Uri) (conn : StardogConnector) = 
    inference (sprintf """
        SELECT ?entity
        WHERE {
          ?entity a ?type.
          ?type rdfs:subClassOf <%s>.
        }
        LIMIT 100 
    """ (string root)) conn |> oneTuple

let typeName (ns : namespaceMappings) (uri : Schema.Uri) = 
    match ns |> List.tryFind (fun (_, u) -> (uri.isComponent u)) with
    | Some(p, u) -> (string uri).Replace(u.S, p + ":")
    | None -> string uri

let nodeUri (n : INode) = Uri(string (n :?> UriNode).Uri)

let toStorageTriple (g : Graph) (t : Rdf.Triple) = 
    let (s, p, o) = t
    
    let s = 
        match s with
        | Rdf.Subject(Rdf.Uri uri) -> g.CreateUriNode(uri)
    
    let p = 
        match p with
        | Rdf.Predicate(Rdf.Uri uri) -> g.CreateUriNode(uri)
    
    let o = 
        match o with
        | Rdf.Object.Uri(Rdf.Uri uri) -> g.CreateUriNode(uri)
    
    Triple(s, p, o)


let assertTriples (conn : unit -> StardogConnector) (ns : namespaceMappings) (tx : Rdf.Triple list) = 
    use conn = conn()
    use g = new Graph()
    conn.UpdateGraph(null :> string, tx |> List.map (toStorageTriple g), [])

open ProviderImplementation.ProvidedTypes

let Node (conn : unit -> StardogConnector) (ns : namespaceMappings) (uri : Schema.Uri) = 
    { Uri = uri
      ObjectProperties = [for p in objectProperties uri (conn()) do yield nodeUri p]
      DataProperties = [for p in dataProperties uri (conn()) do yield nodeUri p]
      Instances = [for p in sampleIndividuals uri (conn()) do yield nodeUri p ]
      SubClasses = [for p in subTypes uri (conn()) do yield nodeUri p ]
      Ranges     = [for p in propertyRange uri (conn()) do yield nodeUri p]
      ProvidedType = ProvidedTypeDefinition(typeName ns uri, Some typeof<obj>)
    }

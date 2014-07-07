module Store

open System.IO
open System
open VDS.RDF
open VDS.RDF.Storage
open VDS.RDF.Storage.Management
open VDS.RDF.Storage.Management.Provisioning.Stardog
open VDS.RDF.Query
open VDS.RDF.Parsing.Handlers


type namespaceMappings = (String * Schema.Uri) list

let connectStarDog server store = 
    (fun () -> new StardogConnector(server, store, StardogReasoningMode.SL, "admin", "admin") :> IQueryableStorage)

let emptyStardog url = 
    use server = new StardogV2Server(url, "admin", "admin")
    (fun store -> 
    if ((server.ListStores() |> Seq.exists ((=) store))) then do server.DeleteStore store
    server.CreateStore(StardogDiskTemplate(store, IcvEnabled = false)) 
    |> ignore
    (server, connectStarDog url store))

let connectMemory g = 
        let m = new InMemoryManager() 
        
        m.SaveGraph(g)
        
        m :> IQueryableStorage

let connectRemote uri = (new SparqlRemoteEndpoint(System.Uri uri))




let bootStrapFromUri (loadFrom : Uri) (baseUri : Uri) (c : IStorageProvider) = 
    use g = new Graph()
    g.LoadFromUri loadFrom
    g.BaseUri <- null
    c.UpdateGraph(g.BaseUri, g.Triples, [])

let bootStrapFromFile (loadFrom : string) (baseUri : Uri) (c : IStorageProvider) = 
    use g = new Graph()
    g.LoadFromFile(loadFrom)
    g.BaseUri <- null
    c.UpdateGraph(g.BaseUri, g.Triples, []) 

let inline memo f =
    let dict = new System.Collections.Generic.Dictionary<String,_>()
    fun a b ->
        match dict.TryGetValue(string a) with
        | (true, v) -> v
        | _ ->
            let temp = f a b
            dict.Add((string a), temp)
            temp

let inference a c =
    use g = new Graph()
    let rdfhandler = GraphHandler(g)
    let resultset = new SparqlResultSet() 
    let reshandler = ResultSetHandler(resultset)
    c(rdfhandler,reshandler,a)
    resultset

let cachedinference = memo inference
 
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

let subTypes root conn =
    cachedinference (sprintf """
        prefix owl:  <http://www.w3.org/2002/07/owl#>
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        select distinct ?t 
        where {
            {?t rdfs:subClassOf <%s> .} UNION {?t rdfs:subPropertyOf <%s> . }
           	FILTER ( ?t != <%s> && ?t != owl:Thing && ?t != owl:Nothing && ?t != owl:bottomObjectProperty && ?t != owl:topObjectProperty ) 
        }
    """ (string root) (string root) (string root)) conn |> oneTuple 

let objectProperties root conn = 
    cachedinference (sprintf """
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix owl:  <http://www.w3.org/2002/07/owl#>
        select distinct ?p
        where {
          ?p a owl:ObjectProperty .
          ?p rdfs:domain <%s>
          OPTIONAL { ?t rdfs:comment ?comment } 
          FILTER ( ?p != owl:Thing && ?p != owl:Nothing && ?p != owl:bottomObjectProperty && ?p != owl:topObjectProperty ) 
        }
    """ (string root)) conn |> oneTuple

let inRangeOf root conn = 
    cachedinference (sprintf """
        prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix owl:  <http://www.w3.org/2002/07/owl#>
        select distinct ?p 
        where {
          ?p a owl:ObjectProperty .
          ?p rdfs:range <%s>
          FILTER ( ?p != owl:Thing && ?p != owl:Nothing && ?p != owl:bottomObjectProperty && ?p != owl:topObjectProperty ) 
        }
    """ (string root)) conn |> oneTuple 

let propertyRange root conn =
    cachedinference (sprintf """
    prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        prefix owl:  <http://www.w3.org/2002/07/owl#>
        select distinct ?r
        where {
          <%s> rdfs:range ?r
          FILTER ( ?p != owl:Thing && ?p != owl:Nothing) 
        }
    """ (string root)) conn |> oneTuple

let dataProperties root conn = 
    cachedinference (sprintf """
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

        SELECT ?p ?t
        WHERE {
             ?p rdfs:domain <%s> ; a owl:DatatypeProperty .
             ?p rdfs:range ?t

        }
    """ (string root)) conn |> twoTuple 

let sampleIndividuals root conn = 
    cachedinference (sprintf """
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?entity
        WHERE {
          ?entity a ?type.
          ?type rdfs:subClassOf* <%s>.
        }
        LIMIT 10 
    """ (string root)) conn |> oneTuple

let statements root conn = 
    cachedinference (sprintf """
        SELECT ?o ?s
        WHERE {
          <%s> ?o ?s
        }
    """ (string root)) conn |> twoTuple

let typeName (ns : namespaceMappings) (uri : Schema.Uri) = 
    match ns |> List.tryFind (fun (_, u) -> (uri.isComponent u)) with
    | Some(p, u) -> (string uri).Replace(u.S, p + ":")
    | None -> string uri

let nodeUri (n : INode) = Uri(string (n :?> UriNode).Uri)

let toStorageTriple (g : Graph) (t : Owl.Triple) = 
    let (s, p, o) = t
    
    let s = 
        match s with
        | Owl.Subject(Owl.Uri uri) -> g.CreateUriNode(System.Uri uri)
        | Owl.Subject(Owl.QName(p,u)) -> g.CreateUriNode(p + ":" + u)
    
    let p = 
        match p with
        | Owl.Predicate(Owl.Uri uri) -> g.CreateUriNode(System.Uri uri)
        | Owl.Predicate(Owl.QName(p,u)) -> g.CreateUriNode(p + ":" + u)
    
    let o = 
        match o with
        | Owl.Object.Uri(Owl.Uri uri) -> g.CreateUriNode(System.Uri uri) :> INode
        | Owl.Object.Uri(Owl.QName(p,u)) -> g.CreateUriNode(p + ":" + u) :> INode
        | Owl.Object.Literal(Owl.String(s)) -> g.CreateLiteralNode(s) :> INode
        | Owl.Object.Literal(Owl.Int(i)) -> i.ToLiteral(g) :> INode

    
    Triple(s, p, o)


let assertTriples (conn : unit -> StardogConnector) (ns : namespaceMappings) (tx : Owl.Triple list) = 
    use conn = conn()
    use g = new Graph()
    conn.UpdateGraph(null :> string, tx |> List.map (toStorageTriple g), [])

open ProviderImplementation.ProvidedTypes

let Node (query) (ns : namespaceMappings) (uri : Schema.Uri) = 
    { Uri = uri
      ObjectProperties = [for p in objectProperties uri (query) do yield (nodeUri p,"Doc")]
      DataProperties = [for (p,t) in dataProperties uri (query) do 
                        yield {
                            Uri= nodeUri p;
                            XsdType = typeName ns (nodeUri t)
                            TypeName = typeName ns (nodeUri p)}]
      Instances    = [for p in sampleIndividuals uri (query) do yield nodeUri p ]
      SubClasses   = [for p in subTypes uri (query) do yield (nodeUri p,"Doc") ]
      Ranges       = [for p in propertyRange uri (query) do yield nodeUri p]
      InRangeOf    = [for p in inRangeOf uri (query) do yield nodeUri p]
      Statements   = [for (s,o) in statements uri (query) do yield (typeName ns (nodeUri s),string o)]
      ProvidedType = ProvidedTypeDefinition(typeName ns uri, Some typeof<obj>)
    }

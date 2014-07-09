module Site

open NiceOntology
open VDS.RDF.Query
open VDS.RDF.Writing

let sparql q px = 
    let sf = SparqlParameterizedString(q)
    for p in px do
        match p with
        | (k, Owl.Entity.Property(p)) -> 
            match p with
            | Owl.ObjectProperty(Owl.Uri(u)) -> sf.SetUri(k, System.Uri u)
        | (k, Owl.Entity.Class(Owl.Class(Owl.Uri(u)))) -> sf.SetUri(k, System.Uri u)
        | (k, Owl.Entity.Individual(Owl.Individual(Owl.Uri(u)))) -> sf.SetUri(k, System.Uri u)
    sf.ToString()

let exec conn q = Store.inference q conn

let format (tw : System.IO.TextWriter) (rx : SparqlResultSet) = 
    let w = CompressingTurtleWriter(3, VDS.RDF.Parsing.TurtleSyntax.W3C)
    w.PrettyPrintMode <- true
    use g = new VDS.RDF.Graph()
    use g = new VDS.RDF.Graph(rx.ToTripleCollection(g))
    w.Save(g, tw)
    ()

open Suave
open Suave.Web
open Suave.Http
open Suave.Http.Applicatives
open Suave.Http.Files
open Suave.Http.Successful
open Suave.Types
open Suave.Session
open Suave.Log
open Response
open Types.Codes


let turtle conn q px : WebPart = 
    fun ctx -> 
        use mem = new System.IO.MemoryStream()
        use writer = new System.IO.StreamWriter(mem)
        sparql q px
        |> exec conn
        |> format writer
        let content = HttpContent.Bytes(mem.GetBuffer())
        { ctx with response = 
                       { ctx.response with status = HTTP_200
                                           content = content } }
        |> succeed

let parts conn = 
    let turtle = turtle (conn)

    let individualsOfClass cls = 
        turtle """
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        SELECT ?entity
        WHERE {
          ?entity a ?type.
          ?type rdfs:subClassOf* @cls.
        }
        """ [("cls",Owl.Entity.Class(Owl.Class(cls)))]


    let guidelines : WebPart = GET >>= choose [ url "/guidelines" >>= individualsOfClass guideline.Uri ]
    let statements : WebPart = GET >>= choose [ url "/statements" >>= individualsOfClass evidenceStatement.Uri ]
    choose [ guidelines 
             statements ]

let server url db =  
    let connection = (Store.connectStarDog url db) 

    parts (connection().Query ) 
        |> web_server default_config


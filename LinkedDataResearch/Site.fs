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
                                           headers = [("Content-Type","text/turtle")]
                                           content = content } }
        |> succeed

let parts conn = 
    let turtle = turtle (conn)

    let individualsOfClass cls = 
        turtle """
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        describe ?entity
        WHERE {
          ?entity a @cls.
        }
        """ [("cls",Owl.Entity.Class(Owl.Class(cls)))]
    
    let about cls uri =
        turtle """
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX ng:<http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_guideline#>
        describe ?entity
        WHERE {
          ?entity ng:isAbout @uri .
          ?entity a @cls.
        }
        """ [("cls",Owl.Entity.Class(Owl.Class(cls)))
             ("uri",Owl.Entity.Individual(Owl.Individual(uri)))] 
    


    let guidelines : WebPart = GET >>= choose [ url "/guidelines" >>= individualsOfClass guideline.Uri ]
    let statements : WebPart = GET >>= choose [ url_scan "/statements/%s" (fun uri -> about evidenceStatement.Uri (Owl.Uri(uri)))]
    choose [ guidelines 
             statements 
             GET >>= dir
             GET >>= browse
             ]

let default_config = { default_config with home_folder = Some "/Public" }

let server url db =  
    let connection = (Store.connectStupidStardog url db) 

    parts (connection().Query ) 
        |> web_server { default_config with 
                                       home_folder = Some (__SOURCE_DIRECTORY__ + "\Public")
                      }
 

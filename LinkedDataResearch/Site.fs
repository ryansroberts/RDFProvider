module Site

open NiceOntology
open VDS.RDF.Query
open VDS.RDF.Writing
open VDS.RDF
open VDS.RDF.Query
open VDS.RDF.Parsing
open VDS.RDF.Query
open VDS.RDF.Update
open Project

let format (tw : System.IO.TextWriter) (rx : obj) = 
    match rx with
    | :? SparqlResultSet as rx ->
        let w = new SparqlRdfWriter ()
        w.Save(rx,tw)
    | :? IGraph as g ->
        let w = CompressingTurtleWriter(3, VDS.RDF.Parsing.TurtleSyntax.W3C) 
        w.Save(g,tw)
    | _ -> failwith "Unknown result type"
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
open Suave.Utils
open Response
open Types.Codes
open VDS.RDF.Storage



let execSparql q (conn:IQueryableStorage) ctx = 
    use mem = new System.IO.MemoryStream()
    use writer = new System.IO.StreamWriter(mem,System.Text.Encoding.UTF8)
    printf "%s\r\n" q 
    try
        q 
        |> conn.Query
        |> format writer 
        let content = HttpContent.Bytes(mem.GetBuffer())
        
        { ctx with response = 
                       { ctx.response with status = HTTP_200
                                           headers = [("Content-Type","text/turtle")]
                                           content = content } }
            |> succeed
    with 
    | e ->  printfn "Error %s" (System.Text.Encoding.UTF8.GetString(mem.GetBuffer()))
            {ctx with response = 
                       { ctx.response with status = HTTP_400
                                           headers = [("Content-Type","text/plain")]
                                           content = HttpContent.Bytes(System.Text.Encoding.UTF8.GetBytes(string e)) } }
            |> succeed


let annotate (store:IStorageProvider) uri content =
    
    let q = new SparqlParameterizedString ()
    q.CommandText <- """
        delete 
        where {
            ?s @p @o
        }
    """

    match specificResource.ObjectProperties.``oa:hasSource``.Uri with
    |Owl.Uri(p) -> q.SetUri("p",System.Uri p)
    q.SetUri("o",System.Uri(uri))
    q.UpdateProcessor <-  GenericUpdateProcessor(store)

    q.ExecuteUpdate()

    let g = new Graph()


    printfn "annotating %A %A" uri content
    Project.annotate (Model.Scope(uri,[])) content
        |> List.iter (fun t -> 
            printfn "annotate %A" t
            g.Assert(Store.toStorageTriple g t) |> ignore)
    
    store.UpdateGraph(null :> System.String,g.Triples,[])

    ()

let updateStatement (store:IStorageProvider) (Owl.Uri(s),Owl.Uri(p)) o =
  let q = new SparqlParameterizedString  ()
  printfn "%A" (s,p) 
  q.CommandText <- """
  delete {
    ?s ?p ?o
  }
  insert {
   @s @p @o .
  }
  where {
    ?s ?p ?o .
    FILTER (?s = @s && ?p = @p)
  }
  """
  q.SetUri("s",System.Uri(s))
  q.SetUri ("p",System.Uri(p))

  q.SetLiteral ("o",string o)
  q.UpdateProcessor <- GenericUpdateProcessor(store)
  printfn "%s" (q.ToString())
  q.ExecuteUpdate()

  annotate store s o

  ()
  
  
  
let parts conn store = 
    System.Net.ServicePointManager.DefaultConnectionLimit <- System.Int32.MaxValue


    let queryString part (ctx:HttpContext) =
        let d = Parsing.parse_data ctx.request.raw_query 
        let d' = new System.Collections.Generic.Dictionary<string,string list> ()

        for (k,v) in d do
            match v,d'.ContainsKey k with 
            | Some(value) , true -> d'.[k] <- value::d'.[k] 
            | Some(value) , false -> d'.[k] <- [value]
            | _ -> ()

        part d' ctx


    let sparqlQuery : WebPart = url "/sparql/query" 
                                >>= GET 
                                >>= queryString (fun qs ctx -> execSparql qs.["query"].Head conn ctx)
                                
    let updateStatement : WebPart = url "/updatecontent"
                                >>= POST
                                >>= (fun x -> 
                                            let f = (form x.request)
                                            match f ^^ "s",f ^^ "o" with
                                            | Some(s),Some(o) -> 
                                                updateStatement store (Owl.Uri s ,chars.Uri) (o)
                                                OK "" x
                                            | _ -> RequestErrors.BAD_REQUEST "" x)
                                       

    choose [ 
                 sparqlQuery
                 updateStatement
                 GET >>= browse
                 RequestErrors.NOT_FOUND "Found no handlers"]

let server url db =  
    let connection = (Store.connectStarDog url db) 
    let store = (Store.stardogStorage url).GetStore("Nice")
    
    parts (connection()) store
        |> web_server { default_config with 
                                       home_folder = Some (__SOURCE_DIRECTORY__ + "\Public")
                                       error_handler    = default_error_handler
                                       logger           = Loggers.sane_defaults_for Debug
                                       listen_timeout   = System.TimeSpan.FromMilliseconds 2000.
                      }

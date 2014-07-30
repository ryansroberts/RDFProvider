module Site

open NiceOntology
open VDS.RDF.Query
open VDS.RDF.Writing
open VDS.RDF

let format (tw : System.IO.TextWriter) (rx : obj) = 
    match rx with
    | :? SparqlResultSet as rx ->
        let w = new SparqlRdfWriter()
        w.Save(rx,tw)
    | :? IGraph as g ->
        let w = CompressingTurtleWriter(3, VDS.RDF.Parsing.TurtleSyntax.W3C) 
        w.Save(g,tw)
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
    use writer = new System.IO.StreamWriter(mem)
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
    | e ->  { ctx with response = 
                       { ctx.response with status = HTTP_400
                                           headers = [("Content-Type","text/plain")]
                                           content = HttpContent.Bytes(System.Text.Encoding.UTF8.GetBytes(string e)) } }
            |> succeed


let parts conn = 
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

    choose [ log (Loggers.sane_defaults_for Debug) log_format >>= never
             sparqlQuery
             GET >>= browse
             RequestErrors.NOT_FOUND "Found no handlers"
             ]

let server url db =  
    let connection = (Store.connectStarDog url db) 

    parts (connection()) 
        |> web_server { default_config with 
                                       home_folder = Some (__SOURCE_DIRECTORY__ + "\Public")
                                       error_handler    = default_error_handler
                                       logger           = Loggers.sane_defaults_for Debug
                                       listen_timeout   = System.TimeSpan.FromMilliseconds 2000.
                      }
module NLP

open FSharp.Data
open VDS.RDF
open VDS.RDF.Parsing
open System.Xml
open System.IO
open System.Text
open System
open System.Security.Cryptography
open Model

type trResponse = JsonProvider< "./tr.json" >

let folder = ( "c:\\temp\\iecache")

let ensureCacheDir() = 
    if (not (Directory.Exists folder)) then Directory.CreateDirectory folder |> ignore

let hash (input : string) = 
    printf "Hash %s" input
    let md5 = System.Security.Cryptography.MD5.Create()
    let inputBytes = System.Text.Encoding.ASCII.GetBytes(input)
    let hash = md5.ComputeHash(inputBytes)
    let sb = new StringBuilder()
    hash |> Array.fold (fun a x -> a + x.ToString("X2")) ""

let cacheFile (content) = 
    let fn = sprintf "%s\\%s.json" folder (hash content)
    fn

let cacheGet (scope : Scope) text = 
    ensureCacheDir()
    let fn = cacheFile text
    try 
        printf "check %s\r\n" fn
        Some(trResponse.Load(File.ReadAllText fn))
    with e -> 
        printf "%s\r\n" e.Message
        None

let cacheSet text = 
    ensureCacheDir()
    File.WriteAllText(cacheFile (text),text)
    text

let fetch text = 
    printf "Downloading: %s\r\n" text
    let s = 
        Http.RequestStream("http://api.textrazor.com/", 
                           body = FormValues [ ("apiKey", "1d89771d5553d95d41202a2b81a13e423d514e8bcce8c30450941103")
                                               ("text", text)
                                               ("extractors", "cleanedText,entities,topics,coarseTopics,relations")
                                               ("showSourceText", "enabled") ])
    if (s.StatusCode <> 200) then (trResponse.GetSample())
    else 
        try 
            trResponse.Load s.ResponseStream
        with _ -> trResponse.GetSample()

let graphOf (scope : Scope) s = 
    match cacheGet scope s with
    | Some r -> r
    | None -> 
        let res = fetch s
        cacheSet s
        res


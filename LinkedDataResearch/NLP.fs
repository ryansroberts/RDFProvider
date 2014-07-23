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

let folder = ( __SOURCE_DIRECTORY__  + "\\iecache")

let ensureCacheDir() = 
    if (not (Directory.Exists folder)) then Directory.CreateDirectory folder |> ignore

let hash (input : string) = 
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
        printf "Check for cache entry %s\r\n" fn
        use fin = File.OpenText(fn)
        Some(trResponse.Load(fin))
    with e -> 
        None

let cacheSet text res = 
    ensureCacheDir()
    File.WriteAllText(cacheFile (text),string res)

let fetch text = 
    printf "Classifyinice: %s\r\n" text
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
        cacheSet s res
        res


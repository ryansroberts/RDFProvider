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

[<Literal>]
let FreebaseApiKey = "AIzaSyCJkOixp2bajLxnFp_mGWEdHbV7FyZ4sbA"

type pv = FreebaseDataProvider<Key=FreebaseApiKey>
let freebase = pv.GetDataContext()

let drugBank id = 
  let r = query {
        for med in freebase.``Science and Technology``.Medicine.Drugs do
        where (med.MachineId = id)
        select med.Drugbank
        exactlyOneOrDefault
        }
  match r with 
  | null -> None
  | _ -> Some(r)

let meshCode id = 
    let r = query { 
        for med in freebase.``Science and Technology``.Medicine.``Disease or medical conditions`` do
        where (med.MachineId = id)
        select med.``MeSH ID`` 
        exactlyOneOrDefault
    }
    match r with 
    | null -> None
    | _ -> Some(r)


let tryNone f = 
    (fun x -> 
        try 
            f x
        with
        | _ -> None  
)
 
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


open Nessos.FsPickler
open Nessos.FsPickler.Json

let cacheGet<'a> k = 
    ensureCacheDir()
    let fn = cacheFile (hash k)
    try
        let json = FsPickler.CreateJson();
        Some (json.UnPickleOfString<'a>(File.ReadAllText(fn)))
    with e -> None
   
let cacheGetTextRazor  text = 
    ensureCacheDir()
    let fn = cacheFile text
    try 
        use fin = File.OpenText(fn)
        Some(trResponse.Load(fin))
    with e -> 
        None


let cacheSetTextRazor text res = 
    ensureCacheDir()
    File.WriteAllText(cacheFile (text),res)

let cacheSet<'a> c k  = 
    let json = FsPickler.CreateJson();
    File.WriteAllText(cacheFile ((hash k)),json.PickleToString<'a>(c))

let fetch text = 
    printf "Classify nice: %s\r\n" text
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

let memo f = 
    let d = new System.Collections.Generic.Dictionary<string,'a>()
    (fun x ->
        if not(d.ContainsKey (string x)) then d.[x] <- f x
        d.[x]
    )

let drugbankIdsFor c = 
    let k = c + "drugbank"
    match cacheGet k with 
    | Some r -> r
    | None ->
        let res = match (tryNone drugBank) c with
                     | Some(ids) -> Seq.toList ids
                     | None ->[] 
        try cacheSet res k with _ -> ()
        res


let _meshCodeFor c =
    printf "Mesh lookup for: %s\r\n" c 
    let k = c + "mesh"
    match cacheGet k with 
    | Some r -> r
    | None ->
        let res = match meshCode c with
                     | Some(ids) -> Seq.toList ids
                     | None ->[] 
        cacheSet res k
        res

let graphOf (scope : Scope) s = 
    match cacheGetTextRazor  s with
    | Some r -> r
    | None -> 
        let res = fetch s
        cacheSetTextRazor s (string res)
        res


#r "../packages/ExcelDataReader.2.1/lib/net20/Excel.dll"
#r "../packages/SharpZipLib.0.86.0/lib/20/ICSharpCode.SharpZipLib.dll"
#r "../packages/FSharp.Data.2.0.8/lib/net40/FSharp.Data.dll"
#r "../packages/dotNetRDF.1.0.6-prerelease01/lib/net40/dotNetRDF.dll"
#r "../packages/FsPickler.0.9.9/lib/net45/FsPickler.dll"
#r "../packages/FsPickler.Json.0.9.9/lib/net45/FsPickler.Json.dll"
#r "../packages/openfilesystem.1.0.0.61263243/lib/OpenFileSystem.dll"
#r "../packages/VDS.Common.1.3.0/lib/net40-client/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"
#load "Excel.fs"
#load "Model.fs"
#load "Csv.fs"
#load "NLP.fs"
#load "PSeq.fs"

open Import
open System
open System.IO
open System.Data
open Microsoft.FSharp.Reflection
open Model
open FSharp.Data
open FSharp.Data.JsonExtensions
open VDS.RDF.Query
open VDS.RDF
open Microsoft.FSharp.Collections
open OpenFileSystem.IO
open System.Text

let (++) a b = System.IO.Path.Combine(a, b)
let mkdir (fs : IDirectory) (s:string) = fs.GetDirectory(s.Replace("?","_")).MustExist()

let fixBullets (s:string) =
    System.Text.RegularExpressions.Regex.Replace(s.Replace("?","\r\n*  "),@"[^\u0000-\u007F]", "")

let write (fs : IDirectory) n (s : string) = 
    printfn "Writing %s" n
    use fout = fs.GetFile(n.Replace("?","_")).OpenWrite()
    fout.Write(System.Text.Encoding.UTF8.GetBytes(s))
    ()

let lines l = l |> List.fold (fun a i -> a + i + "\r\n") ""
let directive n v = "" // sprintf "\r\n---\r\n %s: %s\r\n...\r\n" n v
let citations = System.Collections.Generic.HashSet<string>()
let h2 s = sprintf "## " + s
let h3 s = sprintf "### " + s


let citeFor s = 
    printfn "Citation %s" s
    let k = s + "__bibtex"
    match NLP.cacheGet k with
    | Some(x) -> 
        citations.Add x
        x
    | None -> 
        let r = JsonValue.Parse(Http.RequestString("http://search.labs.crossref.org/dois?q=" + s))
        let doi = (r.AsArray().[0]?doi).AsString()
        printfn "Doi : %s" doi
        if(not(doi.StartsWith "http://dx.doi.org")) then
             "@article{Unkown_date,}" 
        else
            try
                let cite = Http.RequestString(doi, headers = [ ("Accept", "application/x-bibtex") ])
                NLP.cacheSet cite k
                printfn "Got citation %s " cite
                citations.Add cite
                cite
            with 
            | ex ->  "@article{Unkown_date,}"  
            

let citeId (s : string) = ((s.Split '{').[1].Split ',').[0]

let processCsv() = 
    let dir = OpenFileSystem.IO.FileSystems.Local.Win32.Win32Directory("c:/temp/")
    let dir = mkdir dir "guidelines"
    for g in [Import.loadGuidelines |>List.head] do
        printfn "%A" g
        let dir = mkdir dir (string g.Id)
        let chapters = mkdir dir "chapters"
        let intro = mkdir chapters "introduction"
        write intro "Introduction.md" (sprintf "# %s\r\n" (string g.Title))
        let recs = mkdir chapters "recommendations"
        for r in g.Reccomendation |> List.filter(fun x -> (string x.Id).StartsWith(string g.Id)) |> Seq.distinctBy (fun r -> (string r.Set)) do
            printfn "Rec %s" (string r.Id)
            let recdir = mkdir recs (string ( r.Id))
            let l = lines [
                string r.Title
                (string r.Body) |> fixBullets
                "'\r\n"
                directive "nice.evidencegrade" r.Grade 
            ]
             
            write recdir "Recommendation.md"  l

            let set = Import.loadSet (string r.Set) 
            write recdir "Set.md" (lines [
                h2 ("Topic " + (string set.Id))
                (string set.SetTitle)
            ])
            write recdir "Discussion.md" (lines [
                set.Discussion |> fixBullets
            ])
            for st in set.Statements do
                let l = lines [
                             yield h3 ("Evidence Statement " + (string st.Id))
                             yield string st.Statement |> fixBullets
                             yield directive "nice.evidencecategory" st.EvidenceCategory
                             yield ""
                             yield! [ for study in st.Studies do
                                          yield ""
                                          yield "[@" + citeId (citeFor (study.References)) + "]" ] ]

                write recdir ((string st.Id) + ".md") l

        printfn "%A" citations
        write dir "Citations.bibtex" (lines (citations |> Seq.distinct |> Seq.toList))

do processCsv()


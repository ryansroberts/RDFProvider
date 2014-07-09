#r "../packages/ExcelDataReader.2.1/lib/net20/Excel.dll"
#r "../packages/SharpZipLib.0.86.0/lib/20/ICSharpCode.SharpZipLib.dll"
#r "../packages/FSharp.Data.2.0.8/lib/net40/FSharp.Data.dll"
#r "../packages/dotNetRDF.1.0.5.3315/lib/net40/dotNetRDF.dll"
#r "../packages/VDS.Common.1.3.0/lib/net40-client/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"

#load "Excel.fs"

#load "Model.fs"
#load "Program.fs"
#load "NLP.fs"
#load "NiceOntology.fs"
#load "ToTriples.fs"
#load "PSeq.fs"

open Import
open System
open System.IO
open System.Data
open Microsoft.FSharp.Reflection
open Model
open FSharp.Data
open VDS.RDF.Query
open VDS.RDF
open Microsoft.FSharp.Collections

let processCsv () = 
    let gx = Import.loadGuidelines 
    let triples = [for g in gx do
                   yield! Project.guideline g]


    let g = new  VDS.RDF.Graph()
    g.NamespaceMap.AddNamespace("guidelines",Uri "http://nice.org.uk/guidelines/")
    let triples = seq{for t in triples do 
                      let t = Store.toStorageTriple g t
                      yield t}
    let res = g.Assert(triples)

    let ttl = new VDS.RDF.Writing.CompressingTurtleWriter()
    ttl.CompressionLevel <- 3
    ttl.PrettyPrintMode <- true
    let mem = new System.IO.MemoryStream()
    let writer = new System.IO.StreamWriter(mem)
    ttl.Save(g, sprintf "%s/output/%s.ttl" __SOURCE_DIRECTORY__ "Individuals")


    //Now annotate the graph, we are looking for cnt:textContent nodes to classify
    let conn = Store.connectMemory g

    let toAnnotate = (Store.inference """
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            SELECT ?uri ?content
            WHERE {
              ?uri a <http://www.w3.org/2011/content#ContentAsText>.
              ?uri <http://www.w3.org/2011/content#chars> ?content
            }
        """ conn.Query) |> Store.twoTuple
      
    let ax = toAnnotate 
            |> PSeq.map (fun (uri,content) ->
                let scope = Scope (string ((uri :?> IUriNode).ToString()),[])
                let content =  (content :?> ILiteralNode).Value
                Project.annotate scope content)
            |> PSeq.toArray

    
    for a in ax do
        for t in a do
            g.Assert(Store.toStorageTriple g t) |> ignore

    let ttl = new VDS.RDF.Writing.CompressingTurtleWriter()
    ttl.CompressionLevel <- 3
    ttl.PrettyPrintMode <- true
    let mem = new System.IO.MemoryStream()
    let writer = new System.IO.StreamWriter(mem)
    ttl.Save(g, sprintf "%s/output/%s.ttl" __SOURCE_DIRECTORY__ "Individuals")

do processCsv ()





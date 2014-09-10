
#r "../packages/dotNetRDF.1.0.6.3421/lib/net40/dotNetRDF.dll"
#r "../packages/LibGit2Sharp.0.19.0.0/lib/net40/LibGit2Sharp.dll"
#r "../packages/VDS.Common.1.3.0/lib/net40-client/VDS.Common.dll"
#r "../packages/FSharp.Data.2.0.14/lib/net40/FSharp.Data.dll"
#r "../../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"

#load "Translator.fs"

open ProvExtractor


let tx =  Git.walk <| Git.repo (__SOURCE_DIRECTORY__ + "\\..\\..\\..\\provvy") 

let g = new VDS.RDF.Graph()

for t in tx do g.Assert(Store.toStorageTriple g t) |> ignore
let ttl = new VDS.RDF.Writing.CompressingTurtleWriter()
let fn = sprintf "%s/%s.ttl" __SOURCE_DIRECTORY__ "Prov"
ttl.Save(g, fn)

open FSharp.Data

let viz = Http.RequestStream("http://provoviz.org/service",
    httpMethod="POST",
    body= FormValues[("graph_uri","");("data",System.IO.File.ReadAllText(fn))])
    
let fout = System.IO.File.OpenWrite(fn + ".html")

viz.ResponseStream.CopyTo(fout)
fout.Close ()


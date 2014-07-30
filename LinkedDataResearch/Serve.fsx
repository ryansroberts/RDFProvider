﻿#r "../packages/ExcelDataReader.2.1/lib/net20/Excel.dll"
#r "../packages/SharpZipLib.0.86.0/lib/20/ICSharpCode.SharpZipLib.dll"
#r "../packages/FSharp.Data.2.0.8/lib/net40/FSharp.Data.dll"
#r "../packages/dotNetRDF.1.0.6-prerelease01/lib/net40/dotNetRDF.dll"
#r "../packages/VDS.Common.1.3.0/lib/net40-client/VDS.Common.dll"
#r "../packages/HtmlAgilityPack.1.4.6/lib/Net40/HtmlAgilityPack.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"
#r "../packages/Suave.0.11.0/lib/suave.dll"
#load "Model.fs"
#load "NLP.fs"
#load "NiceOntology.fs"
#load "ToTriples.fs"
#load "Site.fs"
#load "OntologyUris.fs"

open Site

do OntologyUris.write (__SOURCE_DIRECTORY__ + "..\Client\uris.js")
   async { 
       let server = async { Site.server "http://localhost:5820" "Nice" }
       System.Diagnostics.Process.Start "http://localhost:8083/index.html" |> ignore
       return! server
   }
   |> Async.RunSynchronously
   |> ignore

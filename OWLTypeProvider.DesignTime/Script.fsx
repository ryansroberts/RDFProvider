
#r "bin/Release/DotnetRdf.dll"

#r "bin/Release/pellet.dll"
#r "bin/Release/IKVM.Runtime.dll"
#r "bin/Release/IKVM.OpenJDK.Core.dll"
#r "bin/Release/IKVM.OpenJDK.Xml.Api.dll"
#r "bin/Release/IKVM.OpenJDK.Xml.Parse.dll"
#r "bin/Release/IKVM.OpenJDK.Xml.Bind.dll"
#load "ProvidedTypes\Code\ProvidedTypes.fs"
#load "ProvidedTypes\Code\Debug.fs"

#load "Pellet.fs"
#load "Generator.fs"
open System.IO
open System


let (++) l r = System.IO.Path.Combine(l,r)

let o = Pellet.model (File.OpenRead (__SOURCE_DIRECTORY__ ++ "Wine.rdf")) (Uri "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#")

for (t) in (Generator.types o (System.Reflection.Assembly.GetExecutingAssembly()) "Owl.Fun") do
printf "%s\r\n" (ProviderImplementation.Debug.prettyPrint false false 10 10 t)



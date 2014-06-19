
#r "bin/Debug/DotnetRdf.dll"
#r "bin/Debug/NewtonSoft.Json.dll"
#load "..\OwlTypeProvider\Rdf.fs"
#load "ProvidedTypes\Code\ProvidedTypes.fs"
#load "ProvidedTypes\Code\Debug.fs"


#load "Schema.fs"

#load "Store.fs"

open System.IO
open System

let ns = "Owl"
let asm = System.Reflection.Assembly.GetExecutingAssembly()
let op = ProviderImplementation.ProvidedTypes.ProvidedTypeDefinition(asm, ns, "Ontology", Some(typeof<obj>))

let (++) l r = System.IO.Path.Combine(l,r)

let (store,connection) = Store.emptyStore "http://localhost:5820" "Foaf"

(connection ()) |> Store.bootStrap (Uri "http://xmlns.com/foaf/spec/index.rdf")
                                   (Uri "http://xmlns.com/foaf/0.1/")

#load "Generator.fs"

let root = Store.Claz connection (Schema.Uri "http://xmlns.com/foaf/0.1/Agent")
Generator.generate root (Store.Claz connection) 
op.AddMember root.ProvidedType
printf "%s\r\n" (ProviderImplementation.Debug.prettyPrint false false 10 10 root.ProvidedType)








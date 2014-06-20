
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

let (store,connection) = Store.emptyStore "http://localhost:5820" "Biopax"

(connection ()) |> Store.bootStrap (Uri "http://www.biopax.org/release/biopax-level3.owl")
                                   (Uri "http://www.w3.org/2002/07/owl#Thing")

#load "Generator.fs"
let map = [("bio",Schema.Uri "http://www.biopax.org/release/biopax-level3.owl#")
           ("owl",Schema.Uri "http://www.w3.org/2002/07/owl#")]
let root = Store.Claz connection map (Schema.Uri "http://www.w3.org/2002/07/owl#Thing")
Generator.generate root (Store.Claz connection map) 
op.AddMember root.ProvidedType
printf "%s\r\n" (ProviderImplementation.Debug.prettyPrint false false 10 10 root.ProvidedType)








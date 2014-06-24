
#r "bin/Debug/DotnetRdf.dll"
#r "bin/Debug/NewtonSoft.Json.dll"
#load "ProvidedTypes\Code\ProvidedTypes.fs"
#load "ProvidedTypes\Code\Debug.fs"
#load "Xsd.fs"
#load "Rdf.fs"
#load "Owl.fs"
#load "Schema.fs"

#load "Store.fs"

open Rdf
open Owl



open System.IO
open System

let ns = "Owl"
let asm = System.Reflection.Assembly.GetExecutingAssembly()
let op = ProviderImplementation.ProvidedTypes.ProvidedTypeDefinition(asm, ns, "Ontology", Some(typeof<obj>))

let (++) l r = System.IO.Path.Combine(l,r)

let (store,connection) = Store.emptyStore "http://localhost:5820" "Food"

(connection ()) |> Store.bootStrap (Uri "https://raw.githubusercontent.com/ryansroberts/RDFProvider/master/nice.owl")
                                   (Uri "http://www.mooney.net/restaurant")

#load "Generator.fs"
let map = [("food",Schema.Uri "http://www.mooney.net/restaurant#")
           ("owl",Schema.Uri "http://www.w3.org/2002/07/owl#")]
let root = Store.Claz connection map (Schema.Uri "http://www.w3.org/2002/07/owl#Thing")
Generator.generate root (Store.Claz connection map)
op.AddMember root.ProvidedType
printf "%s\r\n" (ProviderImplementation.Debug.prettyPrint false false 10 10 root.ProvidedType)





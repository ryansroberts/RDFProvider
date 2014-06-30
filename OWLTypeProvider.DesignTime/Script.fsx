#r "bin/Debug/DotnetRdf.dll"
#r "bin/Debug/NewtonSoft.Json.dll"
#load "ProvidedTypes/Code/ProvidedTypes.fs"
#load "ProvidedTypes/Code/Debug.fs"
#load "Xsd.fs"
#load "Rdf.fs"
#load "Schema.fs"
#load "Store.fs"

open Owl
open System.IO
open System

let ns = "Owl"
let asm = System.Reflection.Assembly.GetExecutingAssembly()
let op = ProviderImplementation.ProvidedTypes.ProvidedTypeDefinition(asm, ns, "Ontology", Some(typeof<obj>))
let (++) l r = System.IO.Path.Combine(l, r)
let (store,connection) = Store.emptyStardog "http://localhost:5820" "Nice"


let importFromFolder folder =  
    for f in Directory.GetFiles(folder) do
       if ["rdf";"ttl";"nq";"owl"] |> List.exists (fun s -> (f.EndsWith s)) then
           printf "Loading graph %s\r\n" f
           (connection ()) 
           |> Store.bootStrapFromFile (f) (null :> Uri)

importFromFolder (__SOURCE_DIRECTORY__ ++ "../ontologies/nice" )

#load "Generator.fs"



let map = 
    [ ("nice", Schema.Uri "http://nice.org/ontology/")
      ("owl", Schema.Uri "http://www.w3.org/2002/07/owl#") 
      ("prov", Schema.Uri "http://www.w3.org/ns/prov#")]

let root = Store.Node (connection ()).Query map (Schema.Uri "http://www.w3.org/2002/07/owl#Thing")

Generator.generate (Schema.Entity.Class(root)) (Store.Node (connection ()).Query map)
op.AddMember root.ProvidedType
printf "%s\r\n" (ProviderImplementation.Debug.prettyPrint false false 10 10 root.ProvidedType)



module LinkedData

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open VDS.RDF.Ontology
open VDS.RDF
open System
open System.Text.RegularExpressions
open Microsoft.FSharp.Quotations
open System.IO

module Namespaces = 
    let defaultNs = [ ("owl", Schema.Uri "http://www.w3.org/2002/07/owl#")
                      ("rdfs", Schema.Uri "http://www.w3.org/2000/01/rdf-schema#")
                      ("rdf", Schema.Uri "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
                      ("xsd", Schema.Uri "http://www.w3.org/2001/XMLSchema#") ]
    
    let (|Regex|_|) pattern input = 
        let m = Regex.Match(input, pattern)
        if m.Success then 
            Some(List.tail [ for g in m.Groups -> g.Value ])
        else None

    let parse (s : string) =  [ for l in s.Split ',' do
            match l with
            | Regex "(\w+):(.+)" gx -> yield (gx.Head, Schema.Uri gx.Tail.Head)
            | _ -> () ]

open Namespaces

[<TypeProvider>]
type FileProvider(config: TypeProviderConfig) as x = 
    inherit TypeProviderForNamespaces()
    do x.RegisterRuntimeAssemblyLocationAsProbingFolder(config)
    let ns = "LinkedData"
    let asm = Assembly.GetExecutingAssembly()
    let op = ProvidedTypeDefinition(asm, ns, "Files", Some(typeof<obj>))

    let parameters = [ ProvidedStaticParameter("OntologyRoot", typeof<string>)
                       ProvidedStaticParameter("NamespaceMappings", typeof<string>) ]
            
    let (++) l r = System.IO.Path.Combine(l, r)

    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [|:? string as baseUri; :? string as nsmap |] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))
                let connection = Store.connectMemory 
                let nsmap = (parse nsmap) @ defaultNs
                let generateClass = Store.Node (connection) nsmap
                let root = generateClass (Schema.Uri baseUri)
                erasedType.AddMember(Generator.generate (Schema.Entity.Class(root)) generateClass)
                erasedType
               
        op.DefineStaticParameters(parameters, init)
        op
    
    do x.AddNamespace(ns, [ createOwl() ])


[<TypeProvider>]
type StardogProvider(config : TypeProviderConfig) as x = 
    inherit TypeProviderForNamespaces()
    do x.RegisterRuntimeAssemblyLocationAsProbingFolder(config)
    let ns = "LinkedData"
    let asm = Assembly.GetExecutingAssembly()
    let op = ProvidedTypeDefinition(asm, ns, "Stardog", Some(typeof<obj>))
    
    let parameters = 
        [ ProvidedStaticParameter("Server", typeof<string>)
          ProvidedStaticParameter("Store", typeof<string>)
          ProvidedStaticParameter("OntologyRoot", typeof<string>)
          ProvidedStaticParameter("NamespaceMappings", typeof<string>) ]
    
 
    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [| :? string as server; :? string as store; :? string as baseUri; :? string as nsmap |] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))
                let connection = Store.connectStarDog server store
                let nsmap = (parse nsmap) @ defaultNs
                let generateClass = Store.Node connection nsmap
                let root = generateClass (Schema.Uri baseUri)
                erasedType.AddMember(Generator.generate (Schema.Entity.Class(root)) generateClass)
                erasedType
        op.DefineStaticParameters(parameters, init)
        op
    
    do x.AddNamespace(ns, [ createOwl() ])

let assertTriples server store user pass nsmap triples = 
    let nsmap = (parse nsmap) @ defaultNs
    Store.assertTriples 
        (fun () -> 
        new VDS.RDF.Storage.StardogConnector(server, store, VDS.RDF.Storage.StardogReasoningMode.SL, user, pass))
        nsmap 
        triples


[<TypeProviderAssembly>]
do ()

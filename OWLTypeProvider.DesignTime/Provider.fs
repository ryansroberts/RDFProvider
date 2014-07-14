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
    let defaultNs = 
        [ ("owl", Schema.Uri "http://www.w3.org/2002/07/owl#")
          ("rdfs", Schema.Uri "http://www.w3.org/2000/01/rdf-schema#")
          ("rdf", Schema.Uri "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
          ("xsd", Schema.Uri "http://www.w3.org/2001/XMLSchema#") ]
    
    let (|Regex|_|) pattern input = 
        let m = Regex.Match(input, pattern)
        if m.Success then 
            Some(List.tail [ for g in m.Groups -> g.Value ])
        else None
    
    let parse (s : string) = 
        [ for l in s.Split ',' do
              match l with
              | Regex "(\w+):(.+)" gx -> yield (gx.Head, Schema.Uri gx.Tail.Head)
              | _ -> () ]

open Namespaces

[<TypeProvider>]
type SparqlEndpointProvider(config : TypeProviderConfig) as x = 
    inherit TypeProviderForNamespaces()
    do x.RegisterRuntimeAssemblyLocationAsProbingFolder(config)
    let ns = "LinkedData"
    let asm = Assembly.GetExecutingAssembly()
    let op = ProvidedTypeDefinition(asm, ns, "RemoteSparql", Some(typeof<obj>))

    let parameters = [ ProvidedStaticParameter("Url", typeof<string>)
                       ProvidedStaticParameter("OntologyRoot", typeof<string>)
                       ProvidedStaticParameter("NamespaceMappings", typeof<string>)]
    
    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [| :? string as uri;:? string as baseUri; :? string as nsmap|] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))
                let connection = Store.connectRemote uri
                let nsmap = (parse nsmap) @ defaultNs

                let remoteQuery (_,rh,q) = connection.QueryWithResultSet(rh,q)

                let generateClass = Store.Node (remoteQuery) nsmap
                let root = generateClass (Schema.Uri baseUri)
                let rt = root.ProvidedType()
                erasedType.AddMember(Generator.generate rt (Schema.Entity.Class(root)) generateClass)
                erasedType
        op.DefineStaticParameters(parameters, init)
        op
    
    do x.AddNamespace(ns, [ createOwl() ]) 

[<TypeProvider>]
type FileProvider(config : TypeProviderConfig) as x = 
    inherit TypeProviderForNamespaces()
    do x.RegisterRuntimeAssemblyLocationAsProbingFolder(config)
    let ns = "LinkedData"
    let asm = Assembly.GetExecutingAssembly()
    let op = ProvidedTypeDefinition(asm, ns, "File", Some(typeof<obj>))
    
    let parameters = 

        [ 
          ProvidedStaticParameter("Path", typeof<string>)
          ProvidedStaticParameter("OntologyRoot", typeof<string>)
          ProvidedStaticParameter("NamespaceMappings", typeof<string>) ]
    
    let (++) l r = System.IO.Path.Combine(l, r)
    
    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [| :? string as path; :? string as ontologyRoot; :? string as nsmap |] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))

                let nsmap = (parse nsmap) @ defaultNs
                let g = new Graph()

                if (path.StartsWith("http")) then
                    g.LoadFromUri (Uri path)
                else
                    g.LoadFromFile (path)

                for (p,u) in nsmap do
                   printf "ns : %A\r\n" (p,u)
                   g.NamespaceMap.AddNamespace(p,Uri (string u)) 
                    
                let connection = Store.connectMemory g
                
                let generateClass = Store.Node (connection.Query) nsmap
                let root = generateClass (Schema.Uri ontologyRoot)
                let rt = root.ProvidedType()
                erasedType.AddMember(Generator.generate rt (Schema.Entity.Class(root)) generateClass)
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
                let generateClass = Store.Node (connection().Query) nsmap
                let root = generateClass (Schema.Uri baseUri)
                let rt = root.ProvidedType()
                erasedType.AddMember(Generator.generate rt (Schema.Entity.Class(root)) generateClass)
                erasedType
        op.DefineStaticParameters(parameters, init)
        op
    
    do x.AddNamespace(ns, [ createOwl() ])

let assertTriples server store user pass nsmap triples = 
    let nsmap = (parse nsmap) @ defaultNs
    Store.assertTriples 
        (fun () -> 
        new VDS.RDF.Storage.StardogConnector(server, store, VDS.RDF.Storage.StardogReasoningMode.SL, user, pass)) nsmap 
        triples

[<TypeProviderAssembly>]
do ()

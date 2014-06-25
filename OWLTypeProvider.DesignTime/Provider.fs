module Provider

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open VDS.RDF.Ontology
open VDS.RDF
open System
open System.Text.RegularExpressions
open Microsoft.FSharp.Quotations
open System.IO

[<TypeProvider>]
type OwlProvider(config : TypeProviderConfig) as x = 
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
    
    let (++) l r = System.IO.Path.Combine(l, r)
    
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
    
    let defaultNs = 
        [ ("owl", Schema.Uri "http://www.w3.org/2002/07/owl#")
          ("rdfs", Schema.Uri "http://www.w3.org/2000/01/rdf-schema#")
          ("rdf", Schema.Uri "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
          ("xsd", Schema.Uri "http://www.w3.org/2001/XMLSchema#") ]

//    let assembly =          
//            Reflection.Assembly.LoadFrom(
//                if String.IsNullOrEmpty config.ResolutionFolder then "DotNetRdf.dll"
//                else Path.GetFullPath(System.IO.Path.Combine(config.ResolutionFolder,"DotNetRdf.dll")))
//    
//    let stardogConnector =  (assembly.GetTypes() |> Array.find(fun t -> t.Name = "StardogConnector"))
//    let reasoningMode    =  (assembly.GetTypes() |> Array.find(fun t -> t.Name = "StardogReasoningMode"))

    let connectionProperty connection ns = 
        let assrt = Store.assertTriples connection ns
        ProvidedMethod
            ("Assert", [ ProvidedParameter("statements", typeof<Rdf.Triple list>) ], typeof<unit>, 
             InvokeCode = (fun args -> <@@ assrt (%%(args.[0])) @@>), IsStaticMethod = true)
    
    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [| :? string as server; :? string as store; :? string as baseUri; :? string as nsmap |] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))
                let connection = Store.connectStarDog server store
                printf "NSMAP %A" nsmap
                let nsmap = (parse nsmap) @ defaultNs
                printf "NAMESPACES %A\r\n" nsmap
                let generateClass = Store.Node connection nsmap
                let root = generateClass (Schema.Uri baseUri)
                
                erasedType.AddMember(connectionProperty connection nsmap)
                erasedType.AddMember (Generator.generate (Schema.Entity.Class(root)) generateClass)
                erasedType
        op.DefineStaticParameters(parameters, init)
        op
    
    do 
        
        x.AddNamespace(ns, [ createOwl() ])

[<TypeProviderAssembly>]
do ()

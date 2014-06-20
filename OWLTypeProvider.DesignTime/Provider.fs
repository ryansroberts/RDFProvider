module Owl

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open VDS.RDF.Ontology
open VDS.RDF
open System
open System.Text.RegularExpressions

[<TypeProvider>]
type OwlProvider(config : TypeProviderConfig) as x = 
    inherit TypeProviderForNamespaces()
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
        if m.Success then Some(List.tail [ for g in m.Groups -> g.Value ])
        else None

    let parse (s : string) = [
        for l in s.Split '\n' do
        match l with 
        |Regex "(\w+):(.+)" gx -> yield (gx.Head,Schema.Uri gx.Tail.Head)
        | _ -> ()
    ]

    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [| :? string as server; :? string as store; :? string as baseUri; :? string as nsmap |] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))
                let connection = Store.connectStarDog server store
                let generateClass = Store.Claz connection (parse nsmap)
                let root = generateClass (Schema.Uri baseUri)
                Generator.generate root generateClass
                erasedType.AddMember root.ProvidedType
                erasedType
        op.DefineStaticParameters(parameters, init)
        op
    
    do x.AddNamespace(ns, [ createOwl() ])

[<TypeProviderAssembly>]
do ()

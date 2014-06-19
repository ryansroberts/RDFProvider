module Owl

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open VDS.RDF.Ontology
open VDS.RDF
open System

[<TypeProvider>]
type OwlProvider(config : TypeProviderConfig) as x = 
    inherit TypeProviderForNamespaces()
    let ns = "LinkedData"
    let asm = Assembly.GetExecutingAssembly()
    let op = ProvidedTypeDefinition(asm, ns, "Stardog", Some(typeof<obj>))
    
    let parameters = 
        [ ProvidedStaticParameter("Server", typeof<string>)
          ProvidedStaticParameter("Store", typeof<string>)
          ProvidedStaticParameter("OntologyRoot", typeof<string>) ]
    
    let (++) l r = System.IO.Path.Combine(l, r)
    
    let load baseUri path root = 
        let g = new Graph()
        let ns prefix uri = g.NamespaceMap.AddNamespace(prefix, Uri uri)
        g.BaseUri <- Uri baseUri
    
    let createOwl() = 
        let init (typeName : string) (parameterValues : obj []) = 
            match parameterValues with
            | [| :? string as server; :? string as store; :? string as baseUri |] -> 
                let erasedType = ProvidedTypeDefinition(asm, ns, typeName, Some(typeof<obj>))
                let connection = Store.connectStarDog server store
                let generateClass = Store.Claz connection
                let root = generateClass(Schema.Uri baseUri)
                Generator.generate root generateClass

                erasedType.AddMember root.ProvidedType
                erasedType
        op.DefineStaticParameters(parameters, init)
        op
    
    do x.AddNamespace(ns, [ createOwl() ])

[<TypeProviderAssembly>]
do ()

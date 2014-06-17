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
    let ns = "Owl.Provided"
    let asm = Assembly.GetExecutingAssembly()

    let parameters = [ProvidedStaticParameter("PathToJson", typeof<string>)]

    let (++) l r  = System.IO.Path.Combine (l,r)

    let load baseUri path root =

        let g = new Graph()
        let ns prefix uri = 
            g.NamespaceMap.AddNamespace (prefix,Uri uri)
        
        g.BaseUri <- Uri baseUri      

    let createTypes () = 
        let parameters = [ProvidedStaticParameter("OntologyLocation", typeof<System.Uri>)]
        let o = Pellet.model (System.IO.File.OpenRead (__SOURCE_DIRECTORY__ ++ "Wine.rdf")) 
                             (System.Uri "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#")
        Generator.types o asm ns |> List.ofSeq
    do 
        x.AddNamespace(ns,createTypes ())

[<TypeProviderAssembly>]
do ()

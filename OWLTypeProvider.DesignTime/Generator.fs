module Generator

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open Schema
open System
open System.Text.RegularExpressions
open Microsoft.FSharp.Quotations

let typeName (uri : string) = 
    let uri = Uri uri
    match uri.Fragment with
    | fragment when not (String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

let rec generate c (builder : Schema.Uri -> Schema.Node) =
    let instances node =
        let instances = ProvidedTypeDefinition("Individuals",Some typeof<Object>)
        instances.AddXmlDoc "A sample set of up to 100 individuals" 
        node.ProvidedType.AddMember instances
        for uri in node.Instances do 
              instances.AddMemberDelayed(fun () ->
                let subNode = builder uri
                generate (Entity.Instance(subNode)) builder
            )  

    let subtypes node nodeType = 
        for uri in node.SubClasses do
        node.ProvidedType.AddMemberDelayed(fun () ->
            let subNode = builder uri
            generate (nodeType(subNode)) builder
        )


    match c with 
    | Entity.Class(node) -> 
        let uriStr = Expr.Value(string node.Uri)
        node.ProvidedType.AddMember <| ProvidedProperty("Uri", typeof<Rdf.Class>, GetterCode = (fun args -> <@@ Rdf.Class(Rdf.Uri(System.Uri(%%(uriStr)))) @@>),IsStatic = true)
        subtypes node Entity.Class
        let properties = ProvidedTypeDefinition("Properties", Some typeof<Object>)
        node.ProvidedType.AddMember properties
        for uri in node.ObjectProperties do
            properties.AddMemberDelayed(fun () ->
                generate (Entity.ObjectProperty(builder uri)) builder
            )
        instances node
        node.ProvidedType
    | Entity.ObjectProperty(node) ->
        let uriStr = Expr.Value(string node.Uri)
        node.ProvidedType.AddMember <| ProvidedProperty("Uri", typeof<Rdf.Property>,GetterCode = (fun args -> <@@ Rdf.ObjectProperty(Rdf.Uri(System.Uri(%%(uriStr)))) @@>), IsStatic = true) 
        let ranges = ProvidedTypeDefinition("Ranges",Some typeof<Object>)
        for uri in node.Ranges do
            ranges.AddMemberDelayed(fun () ->
                generate (Entity.Class(builder uri)) builder
            )
        node.ProvidedType.AddMember <| ranges
        
        subtypes node Entity.ObjectProperty
        instances node
        node.ProvidedType
    | Entity.Instance(node) ->
        let uriStr = Expr.Value(string node.Uri)
        node.ProvidedType.AddMember <| ProvidedProperty("Uri", typeof<Rdf.Instance>,GetterCode = (fun args -> <@@ Rdf.Instance(Rdf.Uri(System.Uri(%%(uriStr)))) @@>), IsStatic = true)  
        node.ProvidedType   

            

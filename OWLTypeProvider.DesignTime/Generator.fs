module Generator

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open Rdf
open Schema
open System.Text.RegularExpressions
open Microsoft.FSharp.Quotations

let typeName (uri : string) = 
    let uri = System.Uri uri
    match uri.Fragment with
    | fragment when not (System.String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

let rec generate c (builder : Schema.Uri -> Schema.Node) = 
    let instances node = 
        let instances = ProvidedTypeDefinition("Individuals", Some typeof<Object>)
        instances.AddXmlDoc "A sample set of up to 100 individuals"
        node.ProvidedType.AddMember instances
        for uri in node.Instances do
            instances.AddMemberDelayed(fun () -> 
                let subNode = builder uri
                generate (Entity.Instance(subNode)) builder)
    
    let subtypes node nodeType = 
        for uri in node.SubClasses do
            node.ProvidedType.AddMemberDelayed(fun () -> 
                let subNode = builder uri
                generate (nodeType (subNode)) builder)
    
    let uriProp node t = 
        let uri = Rdf.Uri(string node.Uri)
        node.ProvidedType.AddMember 
        <| ProvidedProperty
               ("Uri", typeof<Rdf.Uri>, 
                GetterCode = (fun args -> <@@ uri @@>), 
                IsStatic = true)

    let dataProperties node = 
        let dataProperties = ProvidedTypeDefinition("DataProperties" , Some typeof<obj>)
        node.ProvidedType.AddMember dataProperties
        for p in node.DataProperties do
            dataProperties.AddMemberDelayed (fun () ->
                let dataType = mapXsdToType (typeName(string p.Uri))
                ProvidedProperty(typeName (string p.Uri),typedefof<list<_>>.MakeGenericType [|dataType|],
                    GetterCode = (fun args -> <@@ [] @@>),IsStatic = true )
            )

    match c with
    | Entity.Class(node) -> 
        uriProp node Rdf.Class
        subtypes node Entity.Class
        let properties = ProvidedTypeDefinition("ObjectProperties", Some typeof<obj>)
        node.ProvidedType.AddMember properties
        for uri in node.ObjectProperties do
            properties.AddMemberDelayed(fun () -> generate (Entity.ObjectProperty(builder uri)) builder)
        instances node
        dataProperties node 
        node.ProvidedType
    | Entity.ObjectProperty(node) -> 
        uriProp node Rdf.ObjectProperty
        let ranges = ProvidedTypeDefinition("Ranges", Some typeof<obj>)
        for uri in node.Ranges do
            ranges.AddMemberDelayed(fun () -> generate (Entity.Class(builder uri)) builder)
        node.ProvidedType.AddMember <| ranges
        subtypes node Entity.ObjectProperty
        dataProperties node
        instances node
        node.ProvidedType
    | Entity.Instance(node) -> 
        let uriStr = Expr.Value(string node.Uri)
        uriProp node Rdf.Instance
        let statements = node.Statements |> List.map (fun (p, o) -> ((Predicate.from (string p)), Rdf.Object.from o))
        node.ProvidedType.AddMember <| ProvidedProperty("Statements", typeof<Rdf.Statement list>, GetterCode = (fun args -> <@@ statements @@>), IsStatic = true)

        let statements = statements |> Map.ofList
        



        node.ProvidedType

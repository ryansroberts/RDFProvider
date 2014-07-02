module Generator

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open Owl
open Schema
open System.Text.RegularExpressions
open Microsoft.FSharp.Quotations

let typeName (uri : string) = 
    let uri = System.Uri uri
    match uri.Fragment with
    | fragment when not (System.String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

let xmlDoc text = "<summary>" + System.Security.SecurityElement.Escape text + "</summary>"

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
        for (uri,comment) in node.SubClasses do
            node.ProvidedType.AddXmlDocDelayed(fun ()-> xmlDoc comment)
            node.ProvidedType.AddMemberDelayed(fun () -> 
                let subNode = builder uri
                subNode.ProvidedType.AddXmlDoc (xmlDoc comment)
                generate (nodeType (subNode)) builder)

    
    let uriProp node t = 
        node.ProvidedType.AddMember 
        <| ProvidedProperty
               ("Uri", typeof<Owl.Uri>, 
                GetterCode = (fun args -> <@@ Owl.Uri(%%(Expr.Value(string node.Uri))) @@>), 
                IsStatic = true)

    match c with
    | Entity.Class(node) -> 
        uriProp node Class
        subtypes node Entity.Class

        let properties = ProvidedTypeDefinition("ObjectProperties", Some typeof<obj>)
        node.ProvidedType.AddMember properties
        for (uri,coment) in node.ObjectProperties do
            properties.AddMemberDelayed(fun () -> 
                generate (Entity.ObjectProperty(builder uri)) builder)

        let properties = ProvidedTypeDefinition("DataProperties", Some typeof<obj>)
        node.ProvidedType.AddMember properties
        for p in node.DataProperties do
            properties.AddMemberDelayed(fun () -> generate (Entity.DataProperty(builder p.Uri)) builder)

        let inrangeof = ProvidedTypeDefinition("InRangeOf", Some typeof<obj>) 
        node.ProvidedType.AddMember inrangeof
        for p in node.InRangeOf do
            inrangeof.AddMemberDelayed(fun () -> generate (Entity.ObjectProperty(builder p)) builder)

        instances node
        node.ProvidedType
    | Entity.ObjectProperty(node) -> 
        uriProp node ObjectProperty
        let ranges = ProvidedTypeDefinition("Ranges", Some typeof<obj>)
        for uri in node.Ranges do
            ranges.AddMemberDelayed(fun () -> generate (Entity.Class(builder uri)) builder)
        node.ProvidedType.AddMember <| ranges
        subtypes node Entity.ObjectProperty
        instances node
        node.ProvidedType
    | Entity.DataProperty(node) ->
        uriProp node DataProperty 
        node.ProvidedType
    | Entity.Instance(node) -> 
        let uriStr = Expr.Value(string node.Uri)
        uriProp node Instance
        let statements = node.Statements |> List.map (fun (p, o) -> ((Predicate.from (string p)), Object.from (Owl.Uri o)))
        node.ProvidedType.AddMember <| ProvidedProperty("Statements", typeof<Statement list>, GetterCode = (fun args -> <@@ statements @@>), IsStatic = true)

        let statements = statements |> Map.ofList

//        node.ProvidedType.AddMember dataProperties
//        for p in node.DataProperties do
//        dataProperties.AddMemberDelayed (fun () ->
//            let dataType = mapXsdToType (typeName(string p.Uri))
//            ProvidedProperty(typeName (string p.Uri),typedefof<list<_>>.MakeGenericType [|dataType|],
//                GetterCode = (fun args -> <@@ [] @@>),IsStatic = true )
//        ) 
//


        node.ProvidedType

module Generator

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open Owl
open Schema
open System.Text.RegularExpressions
open Microsoft.FSharp.Core
open Microsoft.FSharp.Quotations
open Query

let typeName (uri : string) = 
    let uri = System.Uri uri
    match uri.Fragment with
    | fragment when not (System.String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

let xmlDoc text = "<summary>" + System.Security.SecurityElement.Escape text + "</summary>"



let rec generate pt c (builder : Schema.Uri -> Schema.Node) = 
    
    
    let subtypes (pt:ProvidedTypeDefinition) node nodeType = 
        for (uri, comment) in node.SubClasses do
            pt.AddXmlDocDelayed(fun () -> xmlDoc comment)
            pt.AddMemberDelayed(fun () -> 
                let subNode = builder uri
                let st = subNode.ProvidedType()
                st.AddXmlDoc(xmlDoc comment)
                generate st (nodeType (subNode)) builder)
    
    let uriProp (pt:ProvidedTypeDefinition) node t = 
        pt.AddMember
        <| ProvidedProperty
               ("Uri", typeof<Owl.Uri>, GetterCode = (fun args -> <@@ Owl.Uri(%%(Expr.Value(string node.Uri))) @@>), 
                IsStatic = true)

    match c with
    | Entity.Class(node) -> 
        let pt = node.ProvidedType()
        uriProp pt node Class
        subtypes pt node Entity.Class
        let properties = ProvidedTypeDefinition("ObjectProperties", Some typeof<obj>)
        pt.AddMember properties
        for (uri, coment) in node.ObjectProperties do
            properties.AddMemberDelayed(fun () -> generate pt (Entity.ObjectProperty(builder uri)) builder)
        let properties = ProvidedTypeDefinition("DataProperties", Some typeof<obj>)
        pt.AddMember properties
        for p in node.DataProperties do
            properties.AddMemberDelayed(fun () -> generate pt (Entity.DataProperty(builder p.Uri)) builder)
        let inrangeof = ProvidedTypeDefinition("InRangeOf", Some typeof<obj>)
        pt.AddMember inrangeof
        for p in node.InRangeOf do
            inrangeof.AddMemberDelayed(fun () -> generate pt (Entity.ObjectProperty(builder p)) builder)
        pt
    | Entity.ObjectProperty(node) -> 
        
        let ranges = ProvidedTypeDefinition("Ranges", Some typeof<obj>)
        for uri in node.Ranges do
            ranges.AddMemberDelayed(fun () -> generate pt (Entity.Class(builder uri)) builder) 
        let pt = node.ProvidedType()
        uriProp pt node ObjectProperty
        pt.AddMember <| ranges
        subtypes pt node Entity.ObjectProperty
        pt
    | Entity.DataProperty(node) ->
        let pt = node.ProvidedType() 
        uriProp pt node DataProperty
        pt
        
    | Entity.Individual(node) -> 
        let uriStr = Expr.Value(string node.Uri)
        
        let statements = 
            node.Statements |> List.map (fun (p, o) -> ((Predicate.from (string p)), Object.from (Owl.Uri o)))
        let pt = node.ProvidedType()
        uriProp pt node Entity.Individual
        pt.AddMember
        <| ProvidedProperty
               ("Statements", typeof<Statement list>, GetterCode = (fun args -> <@@ statements @@>), IsStatic = true)
        let statements = statements |> Map.ofList
        pt

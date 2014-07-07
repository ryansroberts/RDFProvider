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

let rec generate c (builder : Schema.Uri -> Schema.Node) = 
    let individualType cls = 
        let inline statementsForPredicate p' = cls.Statements |> List.filter (fun (p, _) -> p' = p)
        let t = ProvidedTypeDefinition(cls.ProvidedType.Name + "(Individual)", Some typeof<Query.Individual>)
        for p in cls.DataProperties do
            t.AddMember 
            <| ProvidedProperty
                   (p.TypeName, mapXsdToType p.XsdType, 
                    GetterCode = fun args -> <@@ Expr.Value(statementsForPredicate (string p.Uri) |> List.head) @@>)
        for (u, _) in cls.ObjectProperties do
            t.AddMemberDelayed
                (fun () -> 
                let objectType = builder u
                cls.ProvidedType.AddMember objectType.ProvidedType
                //let objectType = typedefof<IQueryable<_>>.MakeGenericType([| objectType.ProvidedType :> System.Type |])
                let objectType = typeof<obj>
                ProvidedProperty
                    (string u, objectType, 
                     GetterCode = fun args -> (<@@ Expr.NewObject(objectType.GetConstructor([||]), []) @@>)))
        t
    
    let individuals node = 
        let individualType = individualType node
        let collectionType = typedefof<list<_>>.MakeGenericType([| individualType :> System.Type |])
        node.ProvidedType.AddMember individualType
        let instances = 
            ProvidedProperty
                ("Individuals", collectionType, IsStatic = true, 
                 GetterCode = (fun args -> <@@ Expr.NewObject(collectionType.GetConstructor([||]), []) @@>))
        instances.AddXmlDoc "A sample set of up to 100 individuals"
        node.ProvidedType.AddMember instances
    
    //        for uri in node.Instances do
    //            instances.AddMemberDelayed(fun () -> 
    //                let subNode = builder uri
    //                generate (Entity.Individual(subNode)) builder)
    let subtypes node nodeType = 
        for (uri, comment) in node.SubClasses do
            node.ProvidedType.AddXmlDocDelayed(fun () -> xmlDoc comment)
            node.ProvidedType.AddMemberDelayed(fun () -> 
                let subNode = builder uri
                subNode.ProvidedType.AddXmlDoc(xmlDoc comment)
                generate (nodeType (subNode)) builder)
    
    let uriProp node t = 
        node.ProvidedType.AddMember 
        <| ProvidedProperty
               ("Uri", typeof<Owl.Uri>, GetterCode = (fun args -> <@@ Owl.Uri(%%(Expr.Value(string node.Uri))) @@>), 
                IsStatic = true)
    match c with
    | Entity.Class(node) -> 
        uriProp node Class
        subtypes node Entity.Class
        let properties = ProvidedTypeDefinition("ObjectProperties", Some typeof<obj>)
        node.ProvidedType.AddMember properties
        for (uri, coment) in node.ObjectProperties do
            properties.AddMemberDelayed(fun () -> generate (Entity.ObjectProperty(builder uri)) builder)
        let properties = ProvidedTypeDefinition("DataProperties", Some typeof<obj>)
        node.ProvidedType.AddMember properties
        for p in node.DataProperties do
            printf "Data prop %A\r\n" (p.Uri, p.XsdType)
            properties.AddMemberDelayed(fun () -> generate (Entity.DataProperty(builder p.Uri)) builder)
        let inrangeof = ProvidedTypeDefinition("InRangeOf", Some typeof<obj>)
        node.ProvidedType.AddMember inrangeof
        for p in node.InRangeOf do
            inrangeof.AddMemberDelayed(fun () -> generate (Entity.ObjectProperty(builder p)) builder)
        individuals node
        node.ProvidedType
    | Entity.ObjectProperty(node) -> 
        uriProp node ObjectProperty
        let ranges = ProvidedTypeDefinition("Ranges", Some typeof<obj>)
        for uri in node.Ranges do
            ranges.AddMemberDelayed(fun () -> generate (Entity.Class(builder uri)) builder)
        node.ProvidedType.AddMember <| ranges
        subtypes node Entity.ObjectProperty
        individuals node
        node.ProvidedType
    | Entity.DataProperty(node) -> 
        uriProp node DataProperty
        node.ProvidedType
    | Entity.Individual(node) -> 
        let uriStr = Expr.Value(string node.Uri)
        uriProp node Entity.Individual
        let statements = 
            node.Statements |> List.map (fun (p, o) -> ((Predicate.from (string p)), Object.from (Owl.Uri o)))
        let individualType = individualType
        node.ProvidedType.AddMember 
        <| ProvidedProperty
               ("Statements", typeof<Statement list>, GetterCode = (fun args -> <@@ statements @@>), IsStatic = true)
        let statements = statements |> Map.ofList
        node.ProvidedType

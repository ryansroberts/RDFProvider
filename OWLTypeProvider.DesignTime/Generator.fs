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


//let objectProperties (map : Map<Schema.Uri, Schema.ClassDefinition>) (c : Schema.ClassDefinition) = 
//    ProvidedProperty("Statements",typeof<Rdf.Statement list>,
//     GetterCode = (fun args -> <@@ c.Statements @@>),
//     IsStatic = true)
//    |> c.ProvidedType.AddMember
//
//    for p in c.ObjectProperties dogd
//        printf "Prop: %A\r\n" p
//        let t = 
//            match p.Range with
//            | Literal t -> t
//            | Object uri -> map.[uri].ProvidedType :> Type
//
//        printf "Adding prop %s %s to %s\r\n" (p.Uri.Id) (t.Name) (c.ProvidedType.Name)
//        ProvidedProperty(p.Uri.Id, t, GetterCode = (fun args -> <@@ t @@>), IsStatic = true) |> c.ProvidedType.AddMember

let properties (c:Schema.ClassDefinition) (builder:Schema.Uri -> Schema.ClassDefinition) = 
    ()

let rec generate (c : Schema.ClassDefinition) (builder:Schema.Uri -> Schema.ClassDefinition) = 
    for c' in c.SubClasses do
        let subType = builder c'
        generate subType builder
        c.ProvidedType.AddMember subType.ProvidedType
    
    c.ProvidedType |> ignore

        

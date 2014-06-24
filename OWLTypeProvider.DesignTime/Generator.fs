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

let classUriProperty c = 
    let uriStr = Expr.Value(string c.Uri)
    ProvidedProperty
        ("Uri", typeof<Rdf.Class>, GetterCode = (fun args -> <@@ Rdf.Class(Rdf.Uri(System.Uri(%%(uriStr)))) @@>), 
         IsStatic = true)

let propertyUriProperty (p : ObjectProperty) = 
    let uriStr = Expr.Value(string p.Uri)
    ProvidedProperty
        ("Uri", typeof<Rdf.Property>, 
         GetterCode = (fun args -> <@@ Rdf.ObjectProperty(Rdf.Uri(System.Uri(%%(uriStr)))) @@>), IsStatic = true)

let instanceUriProperty (i:Instance) =  
    let uriStr = Expr.Value(string i.Uri)
    ProvidedProperty
        ("Uri", typeof<Rdf.Instance>, 
         GetterCode = (fun args -> <@@ Rdf.Instance(Rdf.Uri(System.Uri(%%(uriStr)))) @@>), IsStatic = true) 


let instances (c : Schema.ClassDefinition) (builder : Schema.Uri -> Schema.ClassDefinition) = 
    let instances = ProvidedTypeDefinition("Instances",Some typeof<Object>)
    c.ProvidedType.AddMember instances
    instances.AddMembersDelayed(fun () -> 
        [ for i in c.Instances do
              i.ProvidedType.AddMember (instanceUriProperty i)
              yield i.ProvidedType ])

let properties (c : Schema.ClassDefinition) (builder : Schema.Uri -> Schema.ClassDefinition) = 
    [ classUriProperty c |> c.ProvidedType.AddMember
      let propertyType = ProvidedTypeDefinition("Properties", Some typeof<Object>)
      c.ProvidedType.AddMember propertyType
      for p in c.ObjectProperties do
          let range = (ProvidedTypeDefinition("Range",Some typeof<Object>))
          range.AddMember (builder p.Range).ProvidedType
          p.ProvidedType.AddMember range
          p.ProvidedType.AddMember (propertyUriProperty p)
          propertyType.AddMember p.ProvidedType
          yield p.ProvidedType ]

let dataProperties (c : Schema.ClassDefinition) = 
    [ let propertyType = ProvidedTypeDefinition("Data", Some typeof<Object>)
      c.ProvidedType.AddMember propertyType
      for p in c.DataProperties do
          propertyType.AddMember p.ProvidedType ]

let generate (c : Schema.ClassDefinition) (builder : Schema.Uri -> Schema.ClassDefinition) = 
    let rec generate c builder = 
        properties c builder |> ignore
        instances c builder
        dataProperties c |> ignore
        c.ProvidedType.HideObjectMethods <- true
        for c' in c.SubClasses do
            c.ProvidedType.AddMemberDelayed(fun () -> 
                let subType = builder c'
                generate subType builder
                subType.ProvidedType)
    generate c builder

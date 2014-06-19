module Schema
open System.IO
open System
open ProviderImplementation.ProvidedTypes

let typeName (uri : string) = 
    let uri = Uri uri
    match uri.Fragment with
    | fragment when not (String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

type Uri(s : string) = 
    struct
        member x.S = s
        override x.ToString() = s.ToString()
        member x.Id = typeName s
    end

type EntityType = 
    | Class
    | Individual
    | Property

type Range = 
    | Object of Uri
    | Literal of Type

type ObjectProperty = 
    { Uri : Uri
      Range : Range }

type ClassDefinition = 
    { Uri : Uri
      SuperClasses : Uri list
      ObjectProperties : ObjectProperty seq
      SubClasses : Uri list
      ProvidedType : ProvidedTypeDefinition
      EntityType : EntityType 
      Statements : Rdf.Statement list
      }

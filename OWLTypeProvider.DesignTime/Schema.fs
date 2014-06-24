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
        member x.isComponent (u : Uri) = x.S.Contains(u.S)
    end

type EntityType = 
    | Class
    | Individual
    | Property

type Range = 
    | Class of Uri

type DataProperty = 
    { Uri : Uri
      ProvidedType : ProvidedTypeDefinition }

type Instance = 
    { Uri : Uri
      ProvidedType : ProvidedTypeDefinition }

type ObjectProperty = 
    { Uri : Uri
      Range : Uri
      Instances : Instance seq
      ProvidedType : ProvidedTypeDefinition }

type ClassDefinition = 
    { Uri : Uri
      SuperClasses : Uri list
      ObjectProperties : ObjectProperty seq
      DataProperties : DataProperty seq
      Instances : Instance seq
      SubClasses : Uri list
      ProvidedType : ProvidedTypeDefinition
      Statements : Rdf.Statement list }

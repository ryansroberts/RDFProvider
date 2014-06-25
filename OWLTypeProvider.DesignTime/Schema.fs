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


type Node = 
    { Uri : Uri
      ObjectProperties : Uri list
      DataProperties : Uri list
      Instances : Uri list
      SubClasses : Uri list
      Ranges : Uri list
      ProvidedType : ProvidedTypeDefinition }

type Entity = 
    | Class of Node
    | ObjectProperty of Node
    | Instance of Node

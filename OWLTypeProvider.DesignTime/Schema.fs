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

type Statement = String * String


type DataProperty = {
    Uri : Uri
    XsdType : String
}

type Node = 
    { Uri : Uri
      ObjectProperties : Uri list
      DataProperties : DataProperty list
      Instances : Uri list
      SubClasses : Uri list
      Ranges : Uri list
      InRangeOf : Uri list
      ProvidedType : ProvidedTypeDefinition
      Statements : Statement list
    }

type Entity = 
    | Class of Node
    | ObjectProperty of Node
    | Instance of Node
    | DataProperty of Node

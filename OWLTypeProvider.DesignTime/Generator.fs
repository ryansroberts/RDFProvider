module Generator

open ProviderImplementation.ProvidedTypes
open Microsoft.FSharp.Core.CompilerServices
open System.Reflection
open Pellet
open System
open System.Text.RegularExpressions
open com.hp.hpl.jena.ontology
open Microsoft.FSharp.Quotations

type propertyMap = Map<string, ProvidedTypeDefinition * OntProperty>

type classMap = Map<string, ProvidedTypeDefinition * OntClass>

let typeName (uri : string) = 
    let uri = Uri uri
    match uri.Fragment with
    | fragment when not (String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

let dataProperties (partialType : String * (ProvidedTypeDefinition * OntClass)) = 
    let (uri, (t, cls)) = partialType
    for p in Pellet.dataProperties cls do
        ()

let objectProperties (map : Map<Pellet.Uri, Pellet.ClassDefinition>) (c : Pellet.ClassDefinition) = 
    let (uri, (t, cls)) = partialType
    for p in Pellet.objectProperties cls do
        let propUri = p.getURI()
        let tn = typeName (propUri)
        
        let v = 
            match p.isLiteral() with
            | true -> p.asLiteral().getValue().ToString()
            | false -> p.ToString()
        printf "Adding prop %s %s to %s\r\n" (typeName (propUri)) (string (propUri)) (t.Name)
        ProvidedProperty(tn, fst tm.[propUri], GetterCode = (fun args -> <@@ v @@>)) |> t.AddMember
    (uri, (t, cls))

let superClasses (map : Map<Pellet.Uri, Pellet.ClassDefinition>) (c : Pellet.ClassDefinition) = 
    if c.EntityType = Individual then 
        for c' in c.SuperClasses do
            let c' = map.[c']
            let ct = map.[c.Uri].ProvidedType
            printf "Adding superclass %s %s to %s\r\n" c'.Uri.Id ct.Name c.ProvidedType.Name
            c.ProvidedType.SetBaseType ct

let subClasses asm ns (map : Map<Pellet.Uri, Pellet.ClassDefinition>) (c : Pellet.ClassDefinition) = 
    for c' in c.SubClasses do
        let c' = map.[c']
        let c't = map.[c'.Uri].ProvidedType
        printf "Adding subclass %s %s to %s\r\n" c'.Uri.Id c't.Name c.ProvidedType.Name
        ProvidedProperty(c'.Uri.Id, c'.ProvidedType, GetterCode = (fun args -> <@@ c't @@>), IsStatic = true) 
        |> c.ProvidedType.AddMember

let types (o : OntModel) asm ns = 
    [ let classes = Pellet.classes o asm ns
      printf "%A\r\n" classes
      for kv in classes do
          let c = kv.Value
          subClasses asm ns classes c
          superClasses classes c
          objectProperties classes c
          yield c.ProvidedType ]

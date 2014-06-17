module Pellet

open System.IO
open System
open ikvm.io
open org.mindswap.pellet.jena
open com.hp.hpl.jena.ontology
open com.hp.hpl.jena.rdf.model
open com.hp.hpl.jena.vocabulary
open com.hp.hpl.jena.util.iterator
open ProviderImplementation.ProvidedTypes

let typeName (uri : string) = 
    let uri = Uri uri
    match uri.Fragment with
    | fragment when not (String.IsNullOrEmpty fragment) -> fragment.Substring(1)
    | _ -> uri.Segments |> Seq.last

[<StructuralEquality>]
[<StructuralComparison>]
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

type ObjectProperty = 
    { Uri : Uri }

type ClassDefinition = 
    { Uri : Uri
      SuperClasses : Uri list
      ObjectProperties : ObjectProperty list
      SubClasses : Uri list
      ProvidedType : ProvidedTypeDefinition
      EntityType : EntityType }

let model (fin : Stream) (baseUri : System.Uri) = 
    let m = ModelFactory.createOntologyModel (PelletReasonerFactory.THE_SPEC)
    use fin = new InputStreamWrapper(fin)
    m.read (fin, string baseUri) |> ignore
    m.prepare()
    (m.getGraph() :?> PelletInfGraph).getKB().classify()
    m

let inline iter<'a> (i : ExtendedIterator) = 
    [ while i.hasNext() do
          let res = i.next() :?> 'a
          yield res ]

let noNothin<'a when 'a :> OntResource> = 
    List.filter<'a> (fun i -> not (i.getURI() = "http://www.w3.org/2002/07/owl#Nothing"))

let objectProperties (c : OntClass) = 
    query { 
        for p in iter<OntProperty> (c.listDeclaredProperties (true)) do
            where (p.isObjectProperty())
            select (p.asObjectProperty())
    }

let dataProperties (c : OntClass) = 
    query { 
        for p in iter<OntProperty> (c.listDeclaredProperties (true)) do
            where (p.isDatatypeProperty())
            select (p.asDatatypeProperty())
    }

let classes (m : OntModel) asm ns = 
    query { 
        for c in noNothin (iter<OntClass> (m.listClasses())) do
            where (not (c.isAnon()))
            let uri = Uri(c.getURI())
            select { Uri = uri
                     SubClasses = 
                         [ for c' in noNothin (iter<OntClass> (c.listSubClasses (true))) do
                               yield Uri(c'.getURI()) ]
                     SuperClasses = 
                         [ for c' in noNothin (iter<OntClass> (c.listSuperClasses (true))) do
                               yield Uri(c'.getURI()) ]
                     ObjectProperties = 
                         [ for c' in noNothin (iter<OntProperty> (c.listDeclaredProperties())) do
                               yield { Uri = Uri(c'.getURI()) } ]
                     ProvidedType = ProvidedTypeDefinition(asm, ns, uri.Id, Some typeof<Object>)
                     EntityType = 
                         match c.isIndividual(), c.isProperty() with
                         | true, _ -> Individual
                         | _, true -> Property
                         | _ -> Class }
    }
    |> Seq.map (fun c -> (c.Uri, c))
    |> Map.ofSeq

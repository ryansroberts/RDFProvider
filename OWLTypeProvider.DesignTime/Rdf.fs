namespace Owl


type Uri = 
    | Uri of string
    | QName of string * string

type Class = 
    | Class of Uri

type Literal = 
    | Int of int
    | String of string
    | DateTime of System.DateTimeOffset

type DataProperty =
| Literal of Literal
| Uri of Uri

type Property = 
    | ObjectProperty of Uri
    | DataProperty of DataProperty

type Individual = 
    | Individual of Uri

type Entity = 
    | Property of Property
    | Class of Class
    | Individual of Individual


        
type Subject = 
    | Subject of Uri
    static member from uri = Subject(uri)
    static member from uri = Subject(Uri.Uri(uri))
    
    static member from c = 
        match c with
        | Class.Class(uri) -> Subject.Subject(uri)
    
    static member from i = 
        match i with
        | Individual.Individual(uri) -> Subject.Subject(uri)
    
    static member from p = 
        match p with
        | Property.ObjectProperty(uri) -> Subject.Subject(uri)

type Predicate = 
    | Predicate of Uri
    static member from uri = Predicate(uri)
    static member from uri = Predicate(Uri.Uri(uri))
    static member from c = 
        match c with
        | Class.Class(uri) -> Predicate.Predicate(uri)
    
    static member from i = 
        match i with
        | Individual.Individual(uri) -> Predicate.Predicate(uri)
    
    static member from p = 
        match p with
        | Property.ObjectProperty(uri) -> Predicate.Predicate(uri)
        | Property.DataProperty(DataProperty.Uri(uri)) -> Predicate.Predicate(uri)

type Object = 
    | Uri of Uri
    | Literal of Literal
    static member from uri = Object.Uri(uri)
    static member from i = Object.Literal(Literal.Int(i))
    static member from s = Object.Literal(Literal.String(s))
    static member from dt = Object.Literal(Literal.DateTime(dt))
    static member from c = 
        match c with
        | Class.Class(uri) -> Object.Uri(uri)
    
    static member from i = 
        match i with
        | Individual.Individual(uri) -> Object.Uri(uri)
    
    static member from p = 
        match p with
        | Property.ObjectProperty(uri) -> Object.Uri(uri)


type Statement = Predicate * Object

type Triple = Subject * Predicate * Object

[<AutoOpen>]
module XsdMap =
    let mapXsdToType = function
        | "xsd:string" -> typeof<System.String>
        | "xsd:integer" -> typeof<int>
        | _ -> typeof<System.String>

[<AutoOpen>]
module Predicates = 
    let a = Predicate.from "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"

[<AutoOpen>]
module Manipulation = 
    let statementsFor (s : Subject) (stx : Statement list) = 
        [ for (p, o) in stx do
              yield (s, p, o) ]

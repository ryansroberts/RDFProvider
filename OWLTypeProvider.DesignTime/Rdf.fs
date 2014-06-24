namespace Rdf

type Uri = 
    | Uri of System.Uri
    | Curie of string * string
    static member parse (s : string) = Uri.Uri(System.Uri(s))

type Class = 
    | Class of Uri

type Property = 
    | ObjectProperty of Uri
    | DataProperty of Uri

type Instance = 
    | Instance of Uri

type Entity = 
    | Property of Property
    | Class of Class
    | Instance of Instance

type Literal = 
    | Literal of obj

type Subject = 
    | Subject of Uri
    static member from uri = Subject(Uri.parse (uri))
    static member from uri = Subject(Uri.Uri(uri))
    
    static member from c = 
        match c with
        | Class.Class(uri) -> Subject.Subject(uri)
    
    static member from i = 
        match i with
        | Instance.Instance(uri) -> Subject.Subject(uri)
    
    static member from p = 
        match p with
        | Property.ObjectProperty(uri) -> Subject.Subject(uri)

type Predicate = 
    | Predicate of Uri
    static member from uri = Predicate(Uri.parse (uri))
    static member from uri = Predicate(Uri.Uri(uri))
    static member from c = 
        match c with
        | Class.Class(uri) -> Predicate.Predicate(uri)
    
    static member from i = 
        match i with
        | Instance.Instance(uri) -> Predicate.Predicate(uri)
    
    static member from p = 
        match p with
        | Property.ObjectProperty(uri) -> Predicate.Predicate(uri)

type Object = 
    | Uri of Uri
    | Literal of Literal
    static member from uri = Object.Uri(Uri.parse (uri))
    static member from uri = Object.Uri(Uri.Uri(uri))
    static member from c = 
        match c with
        | Class.Class(uri) -> Object.Uri(uri)
    
    static member from i = 
        match i with
        | Instance.Instance(uri) -> Object.Uri(uri)
    
    static member from p = 
        match p with
        | Property.ObjectProperty(uri) -> Object.Uri(uri)

type Statement = Predicate * Object

type Triple = Subject * Predicate * Object

[<AutoOpen>]
module Predicates = 
    let a = Predicate.from "http://www.w3.org/1999/02/22-rdf-syntax-ns#Type"

[<AutoOpen>]
module Manipulation = 
    let statementsFor (s : Subject) (stx : Statement list) = 
        [ for (p, o) in stx do
              yield (s, p, o) ]

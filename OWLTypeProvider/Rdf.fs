module Rdf


type Node =
| Uri of string
| Literal of string

type Statement = (Node * Node)

type Triple = (Node * Node * Node)


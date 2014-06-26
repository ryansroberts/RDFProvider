#r "../OWLTypeProvider.DesignTime/bin/Debug/DotNetRdf.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/Newtonsoft.Json.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"

open Rdf

[<Literal>]
let server = "http://localhost:5820"

[<Literal>]
let store = "Nice"

[<Literal>]
let ontologyRoot = "http://www.w3.org/2002/07/owl#Thing"

[<Literal>]
let nsmap = """nice:http://nice.org/ontology/,
               owl:http://www.w3.org/2002/07/owl#,
               prov:http://www.w3.org/ns/prov#"""
              
let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>

type thing = nice.``owl:Thing``
type guideline = thing.``nice:guideline``
type evidenceStatement = thing.``nice:evidenceStatement``
type discussion =  thing.``nice:discussion``

thing.Individuals.``http://nice.org.uk/guideline/CG15``.Statements

statementsFor (Subject.from "http://nice.org.uk/guideline/CG15")
    [(a , Object.from guideline.Uri)] @
    [for i in [1..10] do
     yield! statementsFor (Subject.from ("http://nice.org.uk/guideline/CG15/ST" + (string i))) 
                          [(a, Object.from evidenceStatement.Uri)]
    ]
|> assertTriples




#r "../OWLTypeProvider.DesignTime/bin/Debug/DotNetRdf.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/Newtonsoft.Json.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"

[<ReflectedDefinition>]
module lol = 
    open Rdf
    [<Literal>]
    let server = "http://localhost:5820"

    [<Literal>]
    let store = "Nice"

    [<Literal>]
    let ontologyRoot = "http://www.w3.org/2002/07/owl#Thing"

    [<Literal>]
    let nsmap = """nice:http://nice.org/ontology/,
                   owl:http://www.w3.org/2002/07/owl#"""
              
    let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

    type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>

    type thing = nice.``owl:Thing``
    type guideline = thing.``nice:guideline``
    type evidenceStatement = thing.``nice:evidenceStatement``
    type discussion =  thing.``nice:discussion``

#r "../OWLTypeProvider.DesignTime/bin/Debug/DotNetRdf.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/Newtonsoft.Json.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"

open Rdf

[<Literal>]
let server = "http://localhost:5820"

[<Literal>]
let store = "Geo"

[<Literal>]
let ontologyRoot = "http://www.w3.org/2002/07/owl#Thing"

[<Literal>]
let nsmap = """food:http://www.mooney.net/restaurant#,
               owl:http://www.w3.org/2002/07/owl#,
               tel:http://telegraphis.net/data/,
               geo:http://www.geonames.org/ontology#"""
              
let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

type geo = LinkedData.Stardog<server, store, ontologyRoot, nsmap>

type code = geo.``owl:Thing``.``http://telegraphis.net/ontology/measurement/code#Code``



type capital = geo.``owl:Thing``.``geo:Capital``

statementsFor (Subject.from "http://www.geonames.org/ontology#New_Capital") [ (a, Object.from capital.Uri) ]



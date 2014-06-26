#r "../OWLTypeProvider.DesignTime/bin/Debug/DotNetRdf.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/Newtonsoft.Json.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"

module lol = 
    open Rdf
    [<Literal>]
    let server = "http://localhost:5820"

    [<Literal>]
    let store = "Nice"

    [<Literal>]
    let ontologyRoot = "http://www.w3.org/2002/07/owl#Thing"

    [<Literal>]
    let nsmap = """ng:http://www.nice.org/nice_guideline#,
                   nqs:http://nice.org.uk/nice_quality_standard#,
                   owl:http://www.w3.org/2002/07/owl#,
                   prov:http://www.w3.org/ns/prov#"""
              
    let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

    type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>
    type ting = nice.``owl:Thing``


    type qs = ting.``nqs:qualityStandard``
    type guideline = ting.``ng:guideline``
    type evidenceStatement = ting.``ng:evidenceStatement``
    type isAbout = evidenceStatement.Properties.``ng:isAbout``
    type topic = isAbout.Ranges.``ng:topic``
    type hasRationale = topic.Properties.``ng:hasRationale``
    

    
    

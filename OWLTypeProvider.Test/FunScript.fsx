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
let nsmap = """ng:http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_guideline#,
                ner:http://www.semanticweb.org/amitchell/ontologies/2014/5/evidence_review#,
                nsl:http://www.semanticweb.org/adesimone/ontologies/2014/5/sharedlearning#,
                nqs:http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_quality_standard#,
                nef:http://www.semanticweb.org/amitchell/ontologies/2014/5/outcomes_framework#,
                owl:http://www.w3.org/2002/07/owl#,
                prov:http://www.w3.org/ns/prov#"""
              
let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>


type ting = nice.``owl:Thing``
type qs = ting.``nqs:QualityStandard``
type guideline = ting.``ng:Guideline``
type evidenceStatement = ting.``ng:EvidenceStatement``
type isAbout = evidenceStatement.ObjectProperties.``ng:isAbout``
type topic = isAbout.Ranges.``ng:Topic``
type hasRationale = topic.ObjectProperties.``ng:hasRationale``
    

    
    

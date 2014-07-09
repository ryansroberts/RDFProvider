module NiceOntology
    [<Literal>]
    let server = "http://localhost:5820"

    [<Literal>]
    let store = "Nice"

    [<Literal>]
    let ontologyRoot = "http://www.w3.org/2002/07/owl#Thing"

    [<Literal>]
    let nsmap = """ng:http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_guideline#,
                    nqs:http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_quality_standard#,
                    nsl:http://www.semanticweb.org/adesimone/ontologies/2014/5/sharedlearning#,
                    ner:http://www.semanticweb.org/amitchell/ontologies/2014/5/evidence_review#,
                    nof:http://www.semanticweb.org/amitchell/ontologies/2014/5/outcomes_framework#,
                    owl:http://www.w3.org/2002/07/owl#,
                    cnt:http://www.w3.org/2011/content#,
                    oa:http://www.w3.org/ns/oa#,
                    prov:http://www.w3.org/ns/prov#"""

              
    let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

    type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>
    
    type thing = nice.``owl:Thing``

    type guideline = thing.``ng:Guideline``
    type isAbout = thing.ObjectProperties.``ng:isAbout``
    type topic = thing.``ng:Topic``
    type hasRationale = topic.ObjectProperties.``ng:hasRationale``
    type rationale = hasRationale.Ranges.``ng:Rationale``
    type question = thing.``ner:Question``
    type evidenceStatement = thing.``ng:EvidenceStatement``
    type study = thing.``ner:Study``
    type reccomendation = thing.``ng:Recommendation``
    type reference = thing.``ner:Reference``
    type hasReference = reference.InRangeOf.``ner:hasReference``
    type review = thing.``ner:Review``
    type qualityStandard = thing.``nqs:QualityStandard``
    type qualityStatement = thing.``nqs:QualityStatement``

    //Annotations 
    type semanticTag = thing.``oa:Tag``.``oa:SemanticTag``
    type tag = thing.``oa:Tag``
    type textContent = thing.``cnt:ContentAsText``
    type chars = thing.``cnt:Content``.ObjectProperties.``cnt:chars``
    type annotation = thing.``oa:Annotation``
    
     

    

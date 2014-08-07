module NiceOntology
    [<Literal>]
    let server = "http://localhost:5820"

    [<Literal>]
    let store = "Nice"

    [<Literal>]
    let ontologyRoot = "http://www.w3.org/2002/07/owl#Thing"
    [<Literal>]
    let nsmap = """nice:http://www.semanticweb.org/amitchell/ontologies/nice_all#,
                    owl:http://www.w3.org/2002/07/owl#,
                    cnt:http://www.w3.org/2011/content#,
                    oa:http://www.w3.org/ns/oa#,
                    prov:http://www.w3.org/ns/prov#"""
    [<Literal>]
    let owlLocation = __SOURCE_DIRECTORY__ + "/owl.ttl"
              
    let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

    type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>
    //type owl = LinkedData.File<owlLocation,"http://www.w3.org/2000/01/rdf-schema#class","owl:http://www.w3.org/2002/07/owl#">

    type thing = nice.``owl:Thing``
    type guideline = thing.``nice:Guideline``
    type topic = thing.``nice:Topic``
    type isAbout = thing.ObjectProperties.``nice:isAbout`` 
    type hasRationale = topic.ObjectProperties.``nice:hasRationale``
    type rationale = thing.``nice:Rationale`` 
    type question = thing.``nice:Question``
    type isImplementedBy = thing.``prov:Entity``.ObjectProperties.``nice:isImplementedBy``
    type hasPart = thing.``prov:Entity``.ObjectProperties.``nice:hasPart``
    type isPartOf = thing.``prov:Entity``.ObjectProperties.``nice:isPartOf``
    type underpins = thing.``prov:Entity``.ObjectProperties.``nice:underpins``
    
    type evidenceStatement = thing.``nice:EvidenceStatement``
    type study = thing.``nice:Study``
    type recommendation = thing.``nice:Recommendation``
    type reference = thing.``nice:Reference``
    type hasReference = reference.InRangeOf.``nice:hasReference``
    type review = thing.``nice:Review``
    type qualityStandard = thing.``nice:QualityStandard``
    type qualityStatement = thing.``nice:QualityStatement``
    type qualityMeasure = thing.``nice:QualityMeasure``
    type denominator = thing.``nice:Denominator``
    type numerator = thing.``nice:Numerator``
    type sharedLearning = thing.``nice:SharedLearning``
    type organisation = thing.``nice:Organisation``
    type discussion = thing.``nice:Discussion``

    //Annotations 
    type semanticTag = thing.``oa:Tag``.``oa:SemanticTag``
    type tag = thing.``oa:Tag``

    type textContent = thing.``cnt:ContentAsText``
    type chars = thing.``cnt:Content``.``cnt:ContentAsText``.ObjectProperties.``cnt:chars``
    type annotation = thing.``oa:Annotation``
    type specificResource = thing.``oa:SpecificResource``
    type textPosition = thing.``oa:TextPositionSelector``
    type startPos = thing.``oa:Selector``.DataProperties.``oa:start``
    type endPos = thing.``oa:Selector``.DataProperties.``oa:end``

    


    
     

    

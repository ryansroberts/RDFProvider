module Ontology
    
    type Ontology = {
        Uri : string
    }

    type SampleClass(uri:System.Uri) = 
        member x.Uri = uri
    
    type SampleIsASampleClass(uri:System.Uri) = 
        inherit SampleClass(uri)
    
    module Individual = 
        let SampleIsASampleClass = 
            new SampleIsASampleClass (System.Uri "")
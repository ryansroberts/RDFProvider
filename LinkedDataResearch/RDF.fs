module Project

    open Model
    open Owl
    open NiceOntology
    open NLP


    
    let annotate (scope:Scope) s = [
        let annotations = NLP.graphOf scope s  
        

        let innerscope = scope.Enter (Identifier (System.Guid.NewGuid().ToString()))
        yield! statementsFor (Subject (Owl.Uri (string innerscope)))
            [
                yield (a,Object.from (Owl.Uri "http://www.w3.org/ns/oa#Annotation"))
                yield (Predicate.from (Owl.Uri "http://www.w3.org/ns/oa#hasTarget"),Object.from (Owl.Uri (string scope)))
                printf "Annotation %A\r\n" annotations            

            ]

        ]



    let study (scope : Scope) (q : Model.Study) (t:Owl.Object) = [
        let scope = scope.Enter q.Id
        let referenceUri = Owl.Uri("guideline:reference#" + (string (q.Reference.GetHashCode())))
        yield! statementsFor (Subject (referenceUri)) 
            [
                yield (a,Object.from reference.Uri)
            ]

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [
                yield (a,Object.from study.Uri) 
                yield (Predicate.from isAbout.Uri,t)
                yield (Predicate.from study.ObjectProperties.``ner:hasReference``.Uri,Object.from referenceUri)
            ]
        ]

    let statement (scope:Scope) (st: Model.Statement) t = [
        let scope = scope.Enter st.Id
        yield! statementsFor(Subject (Owl.Uri (string scope)))
            [
            
                yield (a,Object.from evidenceStatement.Uri) 
                yield (Predicate.from isAbout.Uri,t)
            ]
        yield! annotate scope (string st.Statement)
        for s in st.Studies do
            let studyScope = Scope("nice:studies", [ s.Id ]) 
            yield! study scope s (Object.from (string scope))
        ]

    let question (scope : Scope) (q:Model.Question) t = [
        let scope = scope.Enter q.Id
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from question.Uri)
                yield (Predicate.from isAbout.Uri,t)

            ]
        yield! annotate scope (string q.Text)
        ]

    let set (scope : Scope) (t:Model.Set) = [
        let scope = scope.Enter t.Id
        let aboutTopic = Object.from (string t.Id);

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from topic.Uri)
                yield (Predicate.from  topic.DataProperties.``ng:subject``.Uri,aboutTopic)
            ]

        for q in t.Questions do
            yield! question scope q aboutTopic
        for st in t.Statements do
            yield! statement scope st aboutTopic
        ]

    
    let reccomendation (scope:Scope) (r:Model.Reccomendation) = [
        let guidanceScope = scope
        let scope = scope.Enter r.Id 
        
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from reccomendation.Uri)
                yield (Predicate.from reccomendation.DataProperties.``ng:identifier``.Uri,Object.from (string r.Id))
                yield (Predicate.from reccomendation.DataProperties.``ng:recommendationStrength``.Uri,Object.from (string r.Guideline))
                yield (Predicate.from reccomendation.DataProperties.``ng:title``.Uri,Object.from (string r.Title))
                yield (Predicate.from reccomendation.ObjectProperties.``ng:isAbout``.Uri,Object.from (string (scope.Enter(r.Set))))
            ]

        yield! annotate scope (string r.Body)

    ]

    let guideline (g:Model.Guideline) = [
            let scope = Scope("guidelines:", [ g.Id ])
            yield! statementsFor (Subject (Owl.Uri (string scope)))
                [ 
                  yield (a,Object.from guideline.Uri)
                  yield (Predicate.from guideline.DataProperties.``ng:title``.Uri,Object.from (string g.Title))
                  yield (Predicate.from guideline.DataProperties.``ng:identifier``.Uri,Object.from (string g.Id))
                ]
      
            for s in g.Sets do
                yield! set scope s

            for r in g.Reccomendation do
                yield! reccomendation scope r 
        ]

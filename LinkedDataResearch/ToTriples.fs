﻿module Project

    open Model
    open Owl
    open NiceOntology
    open NLP

    type scopes = Scope list
    
    let annotate (scope:Scope) s = [
        let ex = (NLP.graphOf scope s).Response.Entities |> Array.toList
        
        let rec body (ex:trResponse.Entity list)  i = [
            match ex,i with
            | [],_ -> ()
            | e::tail,i ->
                    let innerscope = scope.Enter (Identifier (System.Guid.NewGuid().ToString()))

                    let targetUri = Owl.Uri (string (innerscope.Enter (Identifier (sprintf "_range_%d" i))))
                    yield! statementsFor (Subject targetUri)
                        [
                             yield (a,Object.from specificResource.Uri)
                             yield (a,individual)
                             yield (Predicate.from specificResource.ObjectProperties.``oa:hasSource``.Uri,Object.from (string scope)) 
                        ]

                    let selectorUri = Owl.Uri (string (innerscope.Enter (Identifier (sprintf "_selector_%d" i)))) 
                    yield! statementsFor (Subject selectorUri)
                        [

                             yield (a,Object.from textPosition.Uri)
                             yield (a,individual)
                        ]

                    let annSubject = Subject (Owl.Uri (string innerscope))
                    yield! statementsFor annSubject
                        [
                            yield (a,Object.from annotation.Uri)
                            yield (a,individual)
                            yield (Predicate.from annotation.ObjectProperties.``oa:hasTarget``.Uri,Object.from (Owl.Uri (string scope)))
                            yield (Predicate.from annotation.DataProperties.``oa:annotatedAt``.Uri,Object.from (System.DateTimeOffset.Now))
                        ]

                    let tagUri = Owl.Uri (string (innerscope.Enter (Identifier (sprintf "_tag_%d" i))))
                    yield! statementsFor annSubject
                        [
                           yield (Predicate.from annotation.ObjectProperties.``oa:hasBody``.Uri,Object.from tagUri)
                           
                        ]
                    yield! statementsFor (Subject.from tagUri)
                        [

                           yield (a,Object.from tag.Uri)
                           yield (a,individual)
                           yield (a,Object.from textContent.Uri)
                           yield (Predicate.from chars.Uri,Object.from (string e.EntityId)) 

                        ]
                    let freebaseUri = (Owl.Uri ("http://freebase.org" + e.FreebaseId))
                    yield! statementsFor annSubject
                        [
                           yield (Predicate.from annotation.ObjectProperties.``oa:hasBody``.Uri,Object.from freebaseUri)
                        ] 
                    yield! statementsFor (Subject.from freebaseUri)
                        [
                           yield (a,Object.from semanticTag.Uri)
                        ]
                    yield! body tail (i + 1)
            ]
        
        yield! body ex 0
         
        ]



    let study (scope : Scope) (st : Model.Study) (t:Owl.Object) = [
        let scope = scope.Enter st.Id
        let referenceUri = Owl.Uri("guideline:reference#" + (string (NLP.hash st.Reference)))
        yield! statementsFor (Subject (referenceUri)) 
            [
                yield (a,Object.from reference.Uri)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string st.Reference))
            ]

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [
                yield (a,Object.from study.Uri) 
                yield (a,individual)
                yield (Predicate.from isAbout.Uri,t)
                yield (Predicate.from study.ObjectProperties.``ner:hasReference``.Uri,Object.from referenceUri)
            ]
        ]

    let statement (scope:Scope) (st: Model.Statement) t = [
        let scope = scope.Enter st.Id
        yield! statementsFor(Subject (Owl.Uri (string scope)))
            [
            
                yield (a,Object.from evidenceStatement.Uri) 
                yield (a,individual)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string st.Statement))
                yield (Predicate.from isAbout.Uri,t)
                //yield (Predicate.from ,Object.from (string st.EvidenceCategory))
            ]
        for s in st.Studies do
            let studyScope = Scope("nice:studies", [ s.Id ]) 
            yield! study scope s (Object.from (string scope))
        ]

    let question (scope : Scope) (q:Model.Question) t = [
        let scope = scope.Enter q.Id
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from question.Uri)
                yield (a,individual)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string q.Text))
                yield (Predicate.from isAbout.Uri,t)

            ]
        ]

    let set (scope : Scope) (t:Model.Set) = [
        let scope = scope.Enter t.Id
        let aboutTopic = Object.from (string t.Id);

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from topic.Uri)
                yield (a,Object.from textContent.Uri)
                yield (a,individual)
                yield (Predicate.from chars.Uri,Object.from (string t.Rationale))
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
                yield (a,Object.from recommendation.Uri)
                yield (a,individual)
                yield (Predicate.from recommendation.DataProperties.``ng:identifier``.Uri,Object.from (string r.Id))
                yield (Predicate.from recommendation.DataProperties.``ng:recommendationStrength``.Uri,Object.from (string r.Guideline))
                yield (Predicate.from recommendation.DataProperties.``ng:recommendationStrength``.Uri,Object.from (string r.Title))
                yield (Predicate.from isAbout.Uri,Object.from (string (scope.Enter(r.Set))))
                yield (Predicate.from recommendation.DataProperties.``ng:recommendationStrength``.Uri,Object.from r.Grade)
            ]
    ]

    let guideline (g:Model.Guideline) = [
            let scope = Scope("http://nice.org.uk/guideline", [ g.Id ])
            yield! statementsFor (Subject (Owl.Uri (string scope)))
                [ 
                  yield (a,Object.from guideline.Uri)
                  yield (a,individual)
                  yield (Predicate.from guideline.DataProperties.``ng:title``.Uri,Object.from (string g.Title))
                  yield (Predicate.from guideline.DataProperties.``ng:issued``.Uri,Object.from (new System.DateTimeOffset(g.Issued)))
                ]
      
            for s in g.Sets do
                yield! set scope s

            for r in g.Reccomendation do
                yield! reccomendation (Scope("http://nice.org.uk/reccomendation", [])) r 
        ]

    let qualityStatements (scope:Scope) (statement:Model.QualityStatement) = [
        let scope = scope.Enter(statement.Id) 

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [
                yield (a,Object.from qualityStatement.Uri)
                yield (a,individual) 
                yield (Predicate.from qualityStatement.DataProperties.``nqs:title``.Uri,Object.from (string statement.Title))
                yield (Predicate.from chars.Uri,Object.from (string statement.Statement))
                for r in statement.Reccomendation do
                    let rScope = (Scope("http://nice.org.uk/reccomendation", [r]))
                    yield (Predicate.from qualityStatement.ObjectProperties.``nqs:isPartOf``.Uri,Object.from (string rScope))
            ] 

    ]

    let qualityStandard (s:Model.QualityStandard) = [
        let scope = Scope("http://nice.org.uk/qualitystandard", [s.Id])
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from qualityStandard.Uri)
                yield (a,individual)
                yield (Predicate.from qualityStandard.DataProperties.``nqs:title``.Uri,Object.from (string s.Title))
                yield (Predicate.from qualityStandard.DataProperties.``nqs:subject``.Uri,Object.from (string s.Subject))
            ]

        for s in s.Statements do
            yield! qualityStatements scope s
    ]




    

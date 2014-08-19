module Project

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
                    let annotationScope = (Scope ("http://nice.org.uk/annotation",[Identifier (System.Guid.NewGuid().ToString())]))

                    let targetUri = Owl.Uri (string (annotationScope.Enter (Identifier (sprintf "_range_%d" i))))
                    let selectorUri = Owl.Uri (string (annotationScope.Enter (Identifier (sprintf "_selector_%d" i)))) 
                    yield! statementsFor (Subject targetUri)
                        [
                             yield (a,Object.from specificResource.Uri)
                             yield (a,individual)
                             yield (Predicate.from specificResource.ObjectProperties.``oa:hasSource``.Uri,Object.from (Owl.Uri(string scope))) 
                             yield (Predicate.from specificResource.ObjectProperties.``oa:hasSelector``.Uri,Object.from selectorUri)
                        ]

                    yield! statementsFor (Subject selectorUri)
                        [
                             yield (a,Object.from textPosition.Uri)
                          
                             yield (Predicate.from startPos.Uri,Object.from e.StartingPos)
                             yield (Predicate.from endPos.Uri,Object.from e.EndingPos)
                             yield (a,individual)
                        ]

                    let tagUri = Owl.Uri (string (annotationScope.Enter (Identifier (sprintf "_tag_%d" i))))
                    yield! statementsFor (Subject (Owl.Uri(string annotationScope)))
                        [
                            yield (a,Object.from annotation.Uri)
                            yield (a,individual)
                            yield (Predicate.from annotation.ObjectProperties.``oa:hasTarget``.Uri,Object.from targetUri)
                            yield (Predicate.from annotation.DataProperties.``oa:annotatedAt``.Uri,Object.from (System.DateTimeOffset.Now))
                            yield (Predicate.from annotation.ObjectProperties.``oa:hasBody``.Uri,Object.from tagUri)
                        ]


                    yield! statementsFor (Subject.from tagUri)
                        [
                           yield (a,Object.from tag.Uri)
                           yield (a,individual)
                           yield (a,Object.from textContent.Uri)

                           yield (Predicate.from (Owl.Uri("http://www.w3.org/2002/07/owl#sameAs")),Object.from((Owl.Uri ("http://rdf.freebase.com/ns" + e.FreebaseId.Replace("m/","m.")))))
                           yield (Predicate.from chars.Uri,Object.from (string e.EntityId)) 
                        ]
                 
                    yield! body tail (i + 1)
            ]
        
        yield! body ex 0
         
        ]



    let study (scope : Scope) (st : Model.Study) (t:Owl.Object) = [
        let scope = scope.Enter st.Id
        let referenceUri = Owl.Uri("guideline:reference#" + (string (NLP.hash st.References)))
        yield! statementsFor (Subject (referenceUri)) 
            [
                yield (a,Object.from reference.Uri)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string st.References))
            ]

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [
                yield (a,Object.from study.Uri) 
                yield (a,individual)
                yield (Predicate.from study.ObjectProperties.``nice:isSummarisedBy``.Uri,t)
                yield (Predicate.from study.ObjectProperties.``nice:hasReference``.Uri,Object.from referenceUri)
            ]
        ]

    let statement (scope:Scope) (st: Model.Statement) t = [
        let scope = Scope("http://nice.org.uk/evidencestatement",[st.Id])
        yield! statementsFor(Subject (Owl.Uri (string scope)))
            [
            
                yield (a,Object.from evidenceStatement.Uri) 
                yield (a,individual)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string st.Statement))
                yield (Predicate.from isAbout.Uri,t)
            ]
        for s in st.Studies do
            let studyScope = Scope("http://nice.org.uk/studies", [ s.Id ]) 
            yield! study scope s (Object.from (Owl.Uri(string scope)))
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

    let topic (scope : Scope) (t:Model.Set) = [
        let guidanceScope =  Owl.Uri((string scope))
        let scope = Scope("http://nice.org.uk/topic",[t.Id])
        let aboutTopic = Object.from (Owl.Uri(string scope))

        let rationaleScope = scope.Enter (Identifier "rationale")
        let discussionScope= scope.Enter (Identifier "discussion")

        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from topic.Uri)
                yield (a,individual)
                yield (Predicate.from  topic.DataProperties.``nice:subject``.Uri, Object.from (string t.Id))
                yield (Predicate.from topic.ObjectProperties.``nice:isTopicOf``.Uri,Object.from guidanceScope)
            ]

        yield! statementsFor (Subject (Owl.Uri (string rationaleScope)))
            [
                yield (a,Object.from rationale.Uri)
                yield (a,Object.from textContent.Uri)
                yield (a,individual)
                yield (Predicate.from chars.Uri,Object.from (string t.Rationale))
                yield (Predicate.from rationale.ObjectProperties.``nice:isRationaleOf``.Uri,Object.from (Owl.Uri(string scope)))
            ]

        yield! statementsFor (Subject (Owl.Uri (string discussionScope)))
            [
                yield (a,Object.from discussion.Uri)
                yield (a,Object.from textContent.Uri)
                yield (a,individual)
                yield (Predicate.from chars.Uri,Object.from (string t.Discussion))
                yield (Predicate.from isAbout.Uri,Object.from (Owl.Uri(string scope)))
            ]

        for q in t.Questions do
            yield! question scope q aboutTopic
        for st in t.Statements do
            yield! statement scope st aboutTopic
        ]

    
    let reccomendation (scope:Scope) (r:Model.Reccomendation) = [
        let guidanceScope = scope
        let scope = Scope("http://nice.org.uk/recommendation",[r.Id]) 
        
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [
                yield (a,Object.from recommendation.Uri)
                yield (a,Object.from textContent.Uri)
                yield (a,individual)
                yield (Predicate.from chars.Uri,Object.from (string r.Body))
                yield (Predicate.from recommendation.DataProperties.``nice:identifier``.Uri,Object.from (string r.Id))
                yield (Predicate.from recommendation.DataProperties.``nice:title``.Uri,Object.from (string r.Title))
                yield (Predicate.from isAbout.Uri,Object.from (Owl.Uri(string (Scope("http://nice.org.uk/topic",[r.Set])))))
                yield (Predicate.from isPartOf.Uri,Object.from (Owl.Uri((string guidanceScope))))
                yield (Predicate.from recommendation.DataProperties.``nice:recommendationStrength``.Uri,Object.from r.Grade)
            ]
    ]

    let guideline (g:Model.Guideline) = [
            let scope = Scope("http://nice.org.uk/guideline", [ g.Id ])
            yield! statementsFor (Subject (Owl.Uri (string scope)))
                [ 
                  yield (a,Object.from guideline.Uri)
                  yield (a,individual)
                  yield (Predicate.from guideline.DataProperties.``nice:title``.Uri,Object.from (string g.Title))
                  yield (Predicate.from guideline.DataProperties.``nice:issued``.Uri,Object.from (new System.DateTimeOffset(g.Issued)))
                ]
      
            for s in g.Sets do
                yield! topic scope s

            for r in g.Reccomendation do
                yield! reccomendation scope r 
        ]

    let qualityStatements (scope:Scope) (statement:Model.QualityStatement) = [
        let scope = Scope("http://nice.org.uk/qualitystatement", [statement.Id])
        printf "%A\r\n" statement
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [
                yield (a,Object.from qualityStatement.Uri)
                yield (a,individual)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from qualityStatement.DataProperties.``nice:title``.Uri,Object.from (string statement.Title))
                yield (Predicate.from chars.Uri,Object.from (string statement.Statement))
                for r in statement.Recommendation do
                    let rScope = Owl.Uri( string (Scope("http://nice.org.uk/recommendation", [r])))
                    yield (Predicate.from isunderPinnedBy.Uri ,Object.from rScope)
            ] 
        
        for m in statement.QualityMeasures do

            let scope = Scope("http://nice.org.uk/qualitymeasure", [m.Id])   
            yield! statementsFor (Subject (Owl.Uri (string scope)))
                [
                    yield (a,Object.from qualityMeasure.Uri)
                    yield (a,individual)
                    yield (a,Object.from textContent.Uri)
                    yield (Predicate.from chars.Uri,Object.from (string m.Description))
                ]
            for n in m.Numerators do
             let nscope = scope.Enter(Identifier "numerators").Enter(m.Id)
             
             yield! statementsFor (Subject (Owl.Uri (string scope)))
                [
                    yield (a,Object.from numerator.Uri)
                    yield (a,individual)
                    yield (a,Object.from textContent.Uri)
                    yield (Predicate.from chars.Uri,Object.from (string n.NumeratorDescription))
                    yield (Predicate.from numerator.ObjectProperties.``nice:hasMeasure``.Uri, Object.from (Owl.Uri(string nscope)))
                ]
            for n in m.Denominators do
             let nscope = scope.Enter(Identifier "denominators").Enter(m.Id)
             
             yield! statementsFor (Subject (Owl.Uri (string scope)))
                [
                    yield (a,Object.from denominator.Uri)
                    yield (a,individual)
                    yield (a,Object.from textContent.Uri)
                    yield (Predicate.from chars.Uri,Object.from (string n.NumeratorDescription))
                    yield (Predicate.from denominator.ObjectProperties.``nice:hasMeasure``.Uri, Object.from (Owl.Uri(string nscope)))
                ]
    ]

    let qualityStandard (s:Model.QualityStandard) = [
        let scope = Scope("http://nice.org.uk/qualitystandard", [s.Id])
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from qualityStandard.Uri)
                yield (a,individual)
                yield (Predicate.from qualityStandard.DataProperties.``nice:title``.Uri,Object.from (string s.Title))
                yield (Predicate.from qualityStandard.DataProperties.``nice:subject``.Uri,Object.from (string s.Subject))
            ]

        for s in s.Statements do
            yield! qualityStatements scope s
    ]

    let organisation (o:Model.Organisation) = [
        let scope = Scope("http://nice.org.uk/organisations", [o.Id])
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from organisation.Uri)
                yield (a,individual)
            ]
    ]

    let sharedLearning (s:Model.SharedLearning) = [
        let scope = Scope("http://nice.org.uk/sharedlearning", [s.Id])
        yield! statementsFor (Subject (Owl.Uri (string scope)))
            [ 
                yield (a,Object.from sharedLearning.Uri)
                yield (a,individual)
                yield (Predicate.from sharedLearning.DataProperties.``nice:hasTitle``.Uri,Object.from (string s.Title))
                yield (Predicate.from sharedLearning.DataProperties.``nice:hasDescription``.Uri,Object.from (string s.Description))
                for o in s.Organisations do
                    let orgscope = Owl.Uri (string (Scope("http://nice.org.uk/organisations", [o])))
                    yield (Predicate.from sharedLearning.ObjectProperties.``nice:wasDevelopedBy``.Uri,Object.from orgscope)   
                for (uri,name) in s.Geo do
                    yield (Predicate.from sharedLearning.ObjectProperties.``nice:hasGeoSetting``.Uri,Object.from uri)   
                for r in s.Recommendations do
                    let rscope = Owl.Uri (string (Scope("http://nice.org.uk/recommendation",[r])))
                    yield (Predicate.from sharedLearning.ObjectProperties.``nice:implements``.Uri,Object.from rscope)
            ]
    ]

    let audit (audit:Model.Audit) = [
        let scope = Scope("http://nice.org.uk/audit",[audit.Id])
        yield! statementsFor(Subject (Owl.Uri(string scope)))
            [
                yield (a,Object.from auditMeasure.Uri)
                yield (a,individual)
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string audit.AuditMeasureDescription))
               
            ]
      
        for ds in audit.DataSources do
            let dScope = Scope("http://nice.org.uk/datasources",[ds.Id]) 
            yield! statementsFor(Subject (Owl.Uri(string dScope)))
                [
                    yield (a,individual)
                    match ds.DataSourceType with 
                    | "National Audit" -> yield (a,Object.from nationalAudit.Uri)
                    | "Journal Article" -> yield (a,Object.from journalArticle.Uri) 
                    yield (Predicate.from chars.Uri,Object.from (string ds.Reference))
                   
                ]
    ]


    let outcomeFramework (o:Model.OutcomeFramework) = [
        let scope = Scope("http://nice.org.uk/outcomesframework",[o.Id])
        yield! statementsFor(Subject (Owl.Uri(string scope)))
            [
                yield (a,individual)
                yield (a,Object.from outcomesFramework.Uri)
                yield (Predicate.from outcomesFramework.DataProperties.``nice:title``.Uri,Object.from o.FrameworkName)
                yield (Predicate.from outcomesFramework.DataProperties.``nice:dateIssued``.Uri,Object.from (new System.DateTimeOffset( o.Date)))
                
            ] 
        for d in o.Domains do 
           
            let dscope =  Scope("http://nice.org.uk/outcomesdomain",[d.Id])
            yield! statementsFor(Subject (Owl.Uri(string dscope)))
                [
                    yield (a,individual)
                    yield (a,Object.from outcomesDomain.Uri)
                    
                    yield (Predicate.from outcomesFramework.DataProperties.``nice:title``.Uri,Object.from d.Title)
                    yield (a,Object.from textContent.Uri)
                    yield (Predicate.from chars.Uri,Object.from (string d.Objective))
                    for i in d.Indicators do
                        yield (Predicate.from outcomesDomain.ObjectProperties.``nice:hasIndicator``.Uri,Object.from (Owl.Uri("http://nice.org.uk/outcomeindicator/" + (string i))))
                ]
    ]

    let outcomeIndicator (o:Model.Outcomeindicator) = [
      let scope = Scope("http://nice.org.uk/outcomeindicator",[o.Id])
      yield! statementsFor(Subject (Owl.Uri(string scope)))
            [
                
                yield (a,individual)
                yield (a,Object.from outcomesFramework.Uri)
                
                yield (Predicate.from outcomesFramework.DataProperties.``nice:title``.Uri,Object.from o.Title)
                
                yield (a,Object.from textContent.Uri)
                yield (Predicate.from chars.Uri,Object.from (string o.OutcomeSought))

                for qs in o.QualityStandards do
                    yield (Predicate.from outcomesIndicator.ObjectProperties.``nice:hasMeasure``.Uri,Object.from (Owl.Uri("http://nice.org.uk/qualitystandard/" + (string qs))))
            ]
     ]

    

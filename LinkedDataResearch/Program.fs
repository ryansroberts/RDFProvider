namespace global

module Csv = 
    open FSharp.Data
    
    type Guideline = CsvProvider< "input/Guideline&Evidence/Guideline.csv" >
    
    type Question = CsvProvider< "input/Guideline&Evidence/Questions.csv" >
    
    type SearchStrategy = CsvProvider< "input/Guideline&Evidence/Searchstrategies.csv" >
    
    type QtoSSmap = CsvProvider< "input/Guideline&Evidence/QuestionToSearchStrategyMap.csv" >
    
    type EvidenceStatements = CsvProvider< "input/Guideline&Evidence/EvidenceStatements.csv" >
    
    type Study = CsvProvider< "input/Guideline&Evidence/Study.csv" >
    
    type EStoStudyMap = CsvProvider< "input/Guideline&Evidence/EStostudymap.csv" >
    
    type Set = CsvProvider< "input/Guideline&Evidence/Set(Topic).csv" >
    
    type SettoQmap = CsvProvider< "input/Guideline&Evidence/SettoQuestionmap.csv" >
    
    type Recommendation = CsvProvider< "input/Guideline&Evidence/Recommendations.csv" >
    
    type QualityStandard = CsvProvider< "input/QualityStandard/QualityStandard.csv" >
    
    type QualityStatment = CsvProvider< "input/QualityStandard/QualityStatements.csv" >
    
    type QualityStatementToReccomendation = CsvProvider< "input/QualityStandard/QSToRecMap.csv" >

    type Audit = CsvProvider< "input/Audit/Audit.csv" >

    type AuditInfoSource = CsvProvider< "input/Audit/AuditInfoSource.csv" >

module Import = 
    open Excel
    open System.IO
    open Model
    
    type Conversion<'a> = 
        | Result of 'a
        | Error of obj array * System.Exception
    
    let csvfile t = 
        let fn = ("input/" + t + ".csv")
        printf "Loading %s\r\n" fn
        fn
    
    let guidelines = Csv.Guideline.Load(csvfile "Guideline&Evidence/Guideline")
    let esToStudyMap = Csv.EStoStudyMap.Load(csvfile "Guideline&Evidence/EStoStudyMap")
    let evidenceStatements = Csv.EvidenceStatements.Load(csvfile "Guideline&Evidence/EvidenceStatements")
    let studies = Csv.Study.Load(csvfile "Guideline&Evidence/Study")
    let setToQuestionMap = Csv.SettoQmap.Load(csvfile "Guideline&Evidence/SettoQuestionmap")
    let sets = Csv.Set.Load(csvfile "Guideline&Evidence/Set(Topic)")
    let questions = Csv.Question.Load(csvfile "Guideline&Evidence/Questions")
    let reccomendations = Csv.Recommendation.Load(csvfile "Guideline&Evidence/Recommendations")
    let searchStrategies = Csv.SearchStrategy.Load(csvfile "Guideline&Evidence/SearchStrategies")
    let questionToSearchStrategies = Csv.QtoSSmap.Load(csvfile "Guideline&Evidence/QuestionToSearchStrategyMap")
    let qualityStandards = Csv.QualityStandard.Load(csvfile "QualityStandard/QualityStandard")
    let qualityStatements = Csv.QualityStatment.Load(csvfile "QualityStandard/QualityStatements")
    let qualityStatementsToReccomendation = 
        Csv.QualityStatementToReccomendation.Load(csvfile "QualityStandard/QSToRecMap")
    let audit = Csv.Audit.Load(csvfile "Audit/Audit")
    let auditInfoSource = Csv.AuditInfoSource.Load(csvfile "Audit/AuditInfoSource")
    
    let loadStudy id = 
        [ let sm = esToStudyMap
          let sx = studies
          for r in sm.Filter(fun s -> s.``Evidence statement GUID`` = id).Rows do
              for r2 in sx.Filter(fun s -> s.``Study GUID`` = r.``Study GUID``).Rows do
                  yield { Id = Identifier r2.``Study GUID``
                          Reference = r2.Reference } ]
    
    let loadStatements id = 
        [ let sx = evidenceStatements
          for s in sx.Filter(fun s -> s.``Set GUID`` = id).Rows do
              yield { Id = Identifier(s.``Evidence statement GUID``)
                      Statement = Body s.``Evidence statement``
                      Studies = loadStudy s.``Evidence statement GUID``
                      EvidenceCategory = s.``Evidence Category Code`` } ]
    
    let loadSearchStrategies id = 
        [ for m in questionToSearchStrategies.Filter(fun s -> s.``Question GUID`` = id).Rows do
              for s in searchStrategies.Filter(fun s -> s.``Search Strategy GUID`` = m.``Search Strategy GUID``).Rows do
                  yield { Id = Identifier s.``Search Strategy GUID``
                          StrategyType = s.``Strategy Type`` } ]
    
    let loadQuestions id = 
        [ let lookup = setToQuestionMap
          for l in setToQuestionMap.Filter(fun f -> f.``Set GUID`` = id).Rows do
              for q in questions.Filter(fun f -> f.``Question GUID`` = l.``Question GUID``).Rows do
                  yield { Id = Identifier q.``Question GUID``
                          Text = Body q.Question
                          SearchStrategies = loadSearchStrategies q.``Question GUID`` } ]
    
    let loadSets id = 
        sets.Rows
        |> Seq.map (fun r -> 
               { Id = Identifier r.``Set GUID``
                 Guid = Guid r.``Set GUID``
                 SetTitle = Title r.Rationale
                 Questions = loadQuestions r.``Set GUID``
                 Statements = loadStatements r.``Set GUID``
                 Rationale = Rationale r.Rationale })
        |> List.ofSeq
    
    let loadReccomendations id = 
        reccomendations.Rows
        |> Seq.map (fun r -> 
               { Id = Identifier r.``Recommendation GUID``
                 Body = Body r.``Recommendation body``
                 Guideline = Identifier r.``Set GUID``
                 Set = Identifier r.``Set GUID``
                 Title = Title r.``Recommendation title``
                 Follows = []
                 Grade = r.``Recommendation Grade Code`` })
        |> List.ofSeq
    
    let loadGuidelines = 
        [ for g in guidelines.Rows do
            
              yield { Id = Identifier g.``Guideline GUID``
                      Title = Title g.``Guideline Title``
                      Reccomendation = loadReccomendations id
                      Sets = loadSets g.``Guideline GUID``
                      Studies = [] 
                      Issued = g.``Guideline Publication Date``
                      } ]
   
    let loadQsRecommendations id = [
        for r in qualityStatementsToReccomendation.Filter(fun s -> s.``Quality statement GUID`` = id).Rows do
            yield Identifier r.``Recommendation GUID``
    ]
    
    let loadQualityStatements id = [
        for q in qualityStatements.Rows do
            yield {
                Id = Identifier q.``Quality statement GUID``
                Title = Title q.``Quality Statement Title``
                Statement = q.``Quality Statement``
                Reccomendation = loadQsRecommendations q.``Quality statement GUID``
            }
    ]
    
    let loadQualityStandards = 
        [ for qstd in qualityStandards.Rows do
              yield { Id = Identifier qstd.``Quality Standard ID``
                      Title = Title qstd.``Quality Standard Title``
                      Subject = qstd.Subject
                      Statements = loadQualityStatements qstd.``Quality Standard ID`` } ]
   
    let loadInfoSource id =
        let is = (auditInfoSource.Filter(fun a -> a.AuditInfoSourceID = id).Rows |> Seq.head)
        {
            Id = Identifier (string is.AuditInfoSourceID)
            SourceName = is.SourceName
            InformationType = is.InformationType
            Notes = is.Notes
        }

    let loadAudit = 
        [ for a in audit.Rows do 
            yield {
                Id = Identifier (string a.``Audit ID``)
                Reccomendation = Identifier a.``Recommendation GUID``
                AuditCriteria = a.AuditCriteria
                NumberFulfil = a.NumberFulfill
                TotalNumber = a.TotalNumber
                PercentAchived = a.PercentAchiev
                Notes = Body a.Notes
                AuditInfoSource = loadInfoSource a.AuditInfoSourceID
                AuditDate = a.AuditDate
            }]
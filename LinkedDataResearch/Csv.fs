namespace global

module Json = 
    open FSharp.Data

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
    
    type Denominator = CsvProvider< "input/QualityStandard/\Denominator.csv" >
    
    type Numerator = CsvProvider< "input/QualityStandard/Numerator.csv" >
    
    type QualityMeasure = CsvProvider< "input/QualityStandard/Quality Measure.csv" >
    
    type QualityStatementToQualityMeasure = CsvProvider< "input/QualityStandard/QS to QM map.csv" >
    
    type QualityMeasureToDeonominator = CsvProvider< "input/QualityStandard/QM to DEN map.csv" >
    
    type QualityMeasureToNumerator = CsvProvider< "input/QualityStandard/QM to NUM map.csv" >
    
    type QualityStatementToReccomendation = CsvProvider< "input/QualityStandard/QSToRecMap.csv" >
    
    type AuditDataSource = CsvProvider< "input/Audit/AuditDataSource.csv" >
    
    type AuditDataSourceMap = CsvProvider< "input/Audit/AuditDataSourceMap.csv" >
    
    type AuditMeasure = CsvProvider< "input/Audit/AuditMeasure.csv" >
    
    type AuditToRecMap = CsvProvider< "input/Audit/AuditToRecMap.csv" >
    
    type Organisation = CsvProvider< "input/SharedLearning/Organisation.csv" >
    
    type SharedLearning = CsvProvider< "input/SharedLearning/SharedLearning.csv" >
    
    type SLearning = CsvProvider< "input/SharedLearning/SLearning.csv" >
    
    type SLToGeo = CsvProvider< "input/SharedLearning/SLToGeo.csv" >
    
    type SLToOrgMap = CsvProvider< "input/SharedLearning/SLToOrgMap.csv" >
    
    type SLToQsMap = CsvProvider< "input/SharedLearning/SLToQsMap.csv" >
    
    type SLToRecMap = CsvProvider< "input/SharedLearning/SLToRecMap.csv" >
    
    type OutcomesFramework = CsvProvider< "input/OutcomesFramework/OutcomesFramework.csv" >
    
    type OutcomeDomain = CsvProvider< "input/OutcomesFramework/OutcomeDomain.csv" >
    
    type OutcomeIndicator = CsvProvider< "input/OutcomesFramework/OutcomeIndicator.csv" >
    
    type DomainToIndicatorMap = CsvProvider< "input/OutcomesFramework/DomainToIndicatorMap.csv" >
    
    type QSToIndicatorMap = CsvProvider< "input/OutcomesFramework/QSToIndicatorMap.csv" >

module Import = 
    open Excel
    open System.IO
    open Model
    
    type Conversion<'a> = 
        | Result of 'a
        | Error of obj array * System.Exception
    
    let csvfile t = 
        let fn = (__SOURCE_DIRECTORY__ + "/input/" + t + ".csv")
        new StreamReader(File.OpenRead(fn), System.Text.Encoding.UTF8, true)
    
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
    let qualityMeasures = Csv.QualityMeasure.Load(csvfile "QualityStandard/Quality Measure")
    let qualityStatementToQualityMeasures = 
        Csv.QualityStatementToQualityMeasure.Load(csvfile "QualityStandard/QS to QM map")
    let qualityMeasureToDenominator = Csv.QualityMeasureToDeonominator.Load(csvfile "QualityStandard/QM to DEN map")
    let qualityMeasureToNumerator = Csv.QualityMeasureToNumerator.Load(csvfile "QualityStandard/QM to NUM map")
    let numerators = Csv.Numerator.Load(csvfile "QualityStandard/Numerator")
    let denominators = Csv.Numerator.Load(csvfile "QualityStandard/Denominator")
    let auditDataSource = Csv.AuditDataSource.Load(csvfile "Audit/AuditDataSource")
    let auditDataSourceMap = Csv.AuditDataSourceMap.Load(csvfile "Audit/AuditDataSourceMap")
    let auditMeasure = Csv.AuditMeasure.Load(csvfile "Audit/AuditMeasure")
    let auditToRecMap = Csv.AuditToRecMap.Load(csvfile "Audit/AuditToRecMap")
    let organisation = Csv.Organisation.Load(csvfile "SharedLearning/Organisation")
    let sharedLearning = Csv.SharedLearning.Load(csvfile "SharedLearning/SharedLearning")
    let slearning = Csv.SLearning.Load(csvfile "SharedLearning/SLearning")
    let sltogeo = Csv.SLToGeo.Load(csvfile "SharedLearning/SLtoGeo")
    let sltoOrgmap = Csv.SLToOrgMap.Load(csvfile "SharedLearning/SlToOrgMap")
    let sltoqsmap = Csv.SLToQsMap.Load(csvfile "SharedLearning/SLToQsMap")
    let outcomesFramework = Csv.OutcomesFramework.Load(csvfile "OutcomesFramework/OutcomesFramework")
    let outcomeDomain = Csv.OutcomeDomain.Load(csvfile "OutcomesFramework/OutcomeDomain")
    let outcomeIndicator = Csv.OutcomeIndicator.Load(csvfile "OutcomesFramework/OutcomeIndicator")
    let domainToIndicatorMap = Csv.DomainToIndicatorMap.Load(csvfile "OutcomesFramework/DomainToIndicatorMap")
    let qSToIndicatorMap = Csv.QSToIndicatorMap.Load(csvfile "OutcomesFramework/QSToIndicatorMap")
    
    let loadStudy id = 
        [ let sm = esToStudyMap
          let sx = studies
          for r in sm.Filter(fun s -> s.``Evidence statement GUID`` = id).Rows do
              for r2 in sx.Filter(fun s -> s.``Study GUID`` = r.``Study GUID``).Rows do
                  yield { Id = Identifier r2.``Study GUID``
                          References = r2.Reference } ]
    
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
    
    let loadSet id  = 
       sets.Filter(fun r -> r.``Set GUID`` = id).Rows
        |> Seq.map (fun r -> 
               { Id = Identifier r.``Set GUID``
                 Guid = Guid r.``Set GUID``
                 SetTitle = Title r.``Set rationale``
                 Discussion = r.``Set discussion``
                 Questions = loadQuestions r.``Set GUID``
                 Statements = loadStatements r.``Set GUID``
                 Rationale = Rationale r.``Set rationale`` })
        |> Seq.head

    let loadSets id = 
        sets.Rows
        |> Seq.map (fun r -> 
               { Id = Identifier r.``Set GUID``
                 Guid = Guid r.``Set GUID``
                 SetTitle = Title r.``Set rationale``
                 Discussion = r.``Set discussion``
                 Questions = loadQuestions r.``Set GUID``
                 Statements = loadStatements r.``Set GUID``
                 Rationale = Rationale r.``Set rationale`` })
        |> List.ofSeq
    
    let loadRecommendations id = 
        reccomendations.Filter(fun r -> r.``Set GUID`` = id).Rows
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
              let sets = loadSets g.``Guideline GUID``
              let recs = [for set in sets do 
                                yield! loadRecommendations (string set.Id)
                             ]
              yield { Id = Identifier g.``Guideline GUID``
                      Title = Title g.``Guideline Title``
                      Reccomendation = recs 
                      Sets = loadSets g.``Guideline GUID``
                      Studies = []
                      Issued = g.``Guideline Publication Date`` } ]
    
    let loadQsRecommendations id = 
        [ for r in qualityStatementsToReccomendation.Filter(fun s -> s.``Quality statement GUID`` = id).Rows do
              yield Identifier r.``Recommendation GUID`` ]
    
    let loadNumerators id = 
        [ for e in qualityMeasureToNumerator.Filter(fun r -> r.``Quality Measure GUID`` = id).Rows do
              let numerator = numerators.Filter(fun r -> r.``Numerator GUID`` = e.``Numerator GUID``).Rows |> Seq.head
              let id = Identifier numerator.``Numerator GUID``
              let desc = Body numerator.``Numerator Description``
              yield { Id = id
                      NumeratorDescription = desc } ]
    
    let loadDenominators id = 
        [ for e in qualityMeasureToDenominator.Filter(fun r -> r.``Quality Measure GUID`` = id).Rows do
              let denominator = 
                  denominators.Filter(fun r -> r.``Numerator GUID`` = e.``Denominator GUID``).Rows |> Seq.head
              let id = Identifier denominator.``Numerator GUID``
              let desc = Body denominator.``Numerator Description``
              yield { Id = id
                      NumeratorDescription = desc } ]
    
    let loadQualityMeasures id = 
        [ for m in qualityStatementToQualityMeasures.Filter(fun r -> r.``Quality Statement GUID`` = id).Rows do
              for q in qualityMeasures.Filter(fun r -> r.``Quality Measure GUID`` = m.``Quality Measure GUID``).Rows do
                  yield { Id = Identifier q.``Quality Measure GUID``
                          Description = Body q.``Quality Measure Description``
                          Numerators = loadNumerators q.``Quality Measure GUID``
                          Denominators = loadDenominators q.``Quality Measure GUID`` } ]
    
    let loadQualityStatements id = 
        [ for q in qualityStatements.Rows do
              yield { Id = Identifier q.``Quality statement GUID``
                      Title = Title q.``Quality Statement Title``
                      Statement = q.``Quality Statement``
                      Recommendation = loadQsRecommendations q.``Quality statement GUID``
                      QualityMeasures = loadQualityMeasures q.``Quality statement GUID`` } ]
    
    let loadQualityStandards = 
        [ for qstd in qualityStandards.Rows do
              yield { Id = Identifier qstd.``Quality Standard ID``
                      Title = Title qstd.``Quality Standard Title``
                      Subject = qstd.Subject
                      Statements = loadQualityStatements qstd.``Quality Standard ID`` } ]
    
    let loadAuditDataSource id = 
        [ for m in auditDataSourceMap.Filter((fun r -> r.``Audit ID`` = id)).Rows do
              for d in auditDataSource.Filter((fun r -> m.DataSource = r.AuditDataSourceID)).Rows do
                  yield { Id = Identifier(d.AuditDataSourceID)
                          Reference = d.Reference
                          DataSourceType = d.DataSourceType
                          Date = d.Date } ]
    
    let loadAuditMeasures = 
        [ for a in auditMeasure.Rows do
              let reco = auditToRecMap.Filter((fun r -> r.``Audit ID`` = a.``Audit ID``)).Rows |> Seq.head
              yield { Id = Identifier(a.``Audit ID``)
                      Recommendation = Identifier reco.Recommendation
                      DataSources = loadAuditDataSource a.``Audit ID``
                      AuditMeasureDescription = Body a.AuditMeasureDescription
                      PercentAchieved = System.Decimal.Parse(a.``Percentage Achieved``.Replace("%", "")) } ]
    
    let loadOrganisations = 
        [ for o in organisation.Rows do
              yield { Id = Identifier o.``Organisation ID``
                      Name = o.OrganisationName
                      Type = o.OrganisationType } ]
    
    let loadSharedLearning = 
        [ for s in sharedLearning.Rows do
              let s1 = slearning.Filter(fun r -> r.``Shared Learning ID`` = s.``Shared Learning ID``).Rows |> Seq.head
              yield { Id = Identifier s1.``Shared Learning ID``
                      Title = Title s1.Title
                      Description = Body s1.Description
                      Aim = s1.Aim
                      Organisations = 
                          [ for r in sltoOrgmap.Filter(fun r -> r.``Shared Learning ID`` = s1.``Shared Learning ID``).Rows -> 
                                Identifier r.``Organisation ID`` ]
                      Recommendations = []
                      QualityStatements = []
                      Geo = [] } ]
    
    let loadOutcomesDomain id = 
        [ for d in outcomeDomain.Filter(fun r -> r.``OutcomesFramework ID`` = id).Rows do
              let indicators = 
                  [ for i in domainToIndicatorMap.Filter(fun r -> r.``Domain GUID`` = d.``Domain GUID``).Rows -> 
                        Identifier i.``Indicator GUID`` ]
              yield { Id = Identifier d.``Domain GUID``
                      Title = d.``Domain Title``
                      Objective = d.``Domain Objective``
                      Indicators = indicators } ]
    
    let loadOutcomeIndicators = 
        [ for i in outcomeIndicator.Rows do
              yield { Id = Identifier i.``Indicator GUID``
                      IndicatorNumber = i.``Indicator No.``
                      Title = i.``Indicator Title``
                      OutcomeSought = i.``Outcome Sought``
                      QualityStandards = 
                          [ for qs in qSToIndicatorMap.Filter(fun r -> r.``Indicator GUID`` = i.``Indicator GUID``).Rows do
                                yield Identifier qs.``Quality Standard ID`` ] } ]
    
    let loadOutcomesFramework = 
        [ for o in outcomesFramework.Rows do
              yield { Id = Identifier o.``OutcomesFramework ID``
                      Date = o.``Date Published``
                      FrameworkName = o.``Outcomes Framework Name``
                      Domains = loadOutcomesDomain o.``OutcomesFramework ID`` } ]

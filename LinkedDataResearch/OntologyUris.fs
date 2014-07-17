module OntologyUris

open System.IO
open System.Text
open NiceOntology

let write path = 
    let sb = StringBuilder()
    sb.AppendLine("var uris = {") |> ignore
    let writeVar t uri = 
        match uri with
        | Owl.Uri(uri) -> sprintf "\t%s : \"%s\"" t (string uri)
    
    let decl = 
        [| writeVar "guideline" guideline.Uri
           writeVar "topic" topic.Uri
           writeVar "isAbout" isAbout.Uri
           writeVar "hasRationale" hasRationale.Uri
           writeVar "rationale" rationale.Uri
           writeVar "question" question.Uri
           writeVar "evidenceStatement" evidenceStatement.Uri
           writeVar "study" study.Uri
           writeVar "recommendation" recommendation.Uri
           writeVar "hasReference" hasReference.Uri
           writeVar "review" review.Uri
           writeVar "qualityStandard" qualityStandard.Uri
           writeVar "qualityStatement" qualityStatement.Uri
           writeVar "semanticTag" semanticTag.Uri
           writeVar "tag" tag.Uri
           writeVar "textContent" textContent.Uri
           writeVar "chars" chars.Uri
           writeVar "annotation" annotation.Uri
           writeVar "specificResource" specificResource.Uri
           writeVar "textPosition" textPosition.Uri |]
    
    sb.AppendLine(System.String.Join(",\r\n", decl)) |> ignore
    sb.AppendLine("};\r\n") |> ignore
    sb.AppendLine("module.exports.uris = uris;") |> ignore
    File.WriteAllText(path, sb.ToString())

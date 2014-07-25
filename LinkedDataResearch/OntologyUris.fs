module OntologyUris

open System.IO
open System.Text
open NiceOntology

let write path = 
    let sb = StringBuilder()
    sb.AppendLine("var uris = {") |> ignore
    let writeVar t uri = (t,uri)
    
    let prefixes =   [ 
        ("nice","http://www.semanticweb.org/amitchell/ontologies/nice_all#")
        ("owl", "http://www.w3.org/2002/07/owl#")
        ("rdfs","http://www.w3.org/2000/01/rdf-schema#")
        ("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
        ("xsd", "http://www.w3.org/2001/XMLSchema#") 
        ("cnt", "http://www.w3.org/2011/content#")
        ("oa","http://www.w3.org/ns/oa#")
        ("prov","http://www.w3.org/ns/prov#")
        ]

    let decl = [
        ("Guideline",guideline.Uri)
        ("Topic",topic.Uri)
        ("isAbout",isAbout.Uri)
        ("hasRationale",hasRationale.Uri)
        ("Rationale",rationale.Uri)
        ("Question",question.Uri)
        ("EvidenceStatement",evidenceStatement.Uri)
        ("Study",study.Uri)
        ("Recommendation",recommendation.Uri)
        ("hasReference",hasReference.Uri)
        ("Review",review.Uri)
        ("QualityStandard",qualityStandard.Uri)
        ("QualityStatement",qualityStatement.Uri)
        ("SemanticTag",semanticTag.Uri)
        ("Tag",tag.Uri)
        ("textContent",textContent.Uri)
        ("chars",chars.Uri)
        ("Annotation",annotation.Uri)
        ("specificResource",specificResource.Uri)
        ("textPosition",textPosition.Uri) ]
            
    for (p,uri) in prefixes do
        sb.AppendLine("\t" + p + " : {" ) |> ignore
        sb.AppendLine("\t\tprefix:" + @"""" + uri + @"""," ) |> ignore

        let uriDecls = [|for (name,uri) in (decl |> List.filter (fun (p,Owl.Uri(b)) -> b.StartsWith uri)) do
                                                match uri with
                                                | Owl.Uri(uri) -> yield "\t\t" + name + ":" + @"""" + name + @""""
                            |]

        sb.AppendLine (System.String.Join (",\r\n",uriDecls)) |> ignore
        sb.AppendLine("\t}," ) |> ignore
    sb.AppendLine("};\r\n") |> ignore
    sb.AppendLine("module.exports = uris;") |> ignore
    File.WriteAllText(path, sb.ToString())

namespace ProvExtractor
open LibGit2Sharp

module NiceOntology =
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
              
    let assertTriples = LinkedData.assertTriples server store "admin" "admin" nsmap

    type nice = LinkedData.Stardog<server, store, ontologyRoot, nsmap>

type Triple = string * string * string
                                  

module Git =
  open NiceOntology
  open Owl

  
  let repo p = new Repository(p)

  let commits (repo:Repository) = 
    seq {yield (null :> Commit,null :> Tree);yield! repo.Commits |> Seq.map (fun c -> (c,c.Tree))}   
    |> Seq.pairwise
    |> Seq.map (fun ((c,t),(c',t')) -> (c',repo.Diff.Compare<TreeChanges>(t,t')))
  
  let nc = "http://nice.org.uk/vcs"

  let p2id (p:string) = ((p.Replace("/","-")).Replace(" ","-")).Replace("\\","-")

  let versionedContent (c:Commit) (i:TreeEntryChanges) (cf:ObjectId -> Blob) = [
    let commit = nc + "-commit-" + c.Sha
    let content = nc  + "-file-" + (p2id i.Path)
    let versionedContent =  content + "-" + i.Oid.Sha
    let chars = cf i.Oid
    let oldContent =  content + "-" + i.OldOid.Sha
    yield! statementsFor (Subject (Owl.Uri versionedContent)) 
            [
                yield (a,Object.from nice.``owl:Thing``.``prov:Entity``.Uri)
                yield (a,Object.from nice.``owl:Thing``.``cnt:ContentAsText``.Uri)
                yield (Predicate.from nice.``owl:Thing``.ObjectProperties.``cnt:chars``.Uri,
                         Object.from  (Owl.Uri("https://raw.githubusercontent.com/ryansroberts/markdownpipeline/" + i.Oid.Sha + "/" + i.Path)))
                yield (Predicate.from nice.``owl:Thing``.ObjectProperties.``prov:specializationOf``.Uri,
                         Object.from (Owl.Uri content))
                yield (Predicate.from nice.``owl:Thing``.ObjectProperties.``prov:wasGeneratedBy``.Uri,
                         Object.from (Owl.Uri commit))
                //yield (Predicate.from nice.``owl:Thing``.ObjectProperties.``prov:wasDerivedFrom``.Uri,
               //          Object.from (Owl.Uri oldContent)) 
                yield (Predicate.from nice.``owl:Thing``.ObjectProperties.``prov:wasAttributedTo``.Uri,
                         Object.from (Owl.Uri (("http://nice.org.uk/identity/git-username-" + p2id c.Committer.Name)))) 
            ] 
  ]

  let qualifiedUsage commit i x = [
    let qu = commit + (sprintf "-qa%d" i) 
    yield! statementsFor ((Subject (Owl.Uri commit)))
        [
            yield(Predicate.from nice.``owl:Thing``.ObjectProperties.``prov:qualifiedUsage``.Uri, 
                    Object.from (Owl.Uri(qu)))
        ]
    yield! statementsFor ((Subject (Owl.Uri qu)))
        [
            yield(a,Object.from nice.``owl:Thing``.``prov:Usage``.Uri)
        ]     
  ]

  let contentFor (repo:Repository) (id:ObjectId) =  repo.Lookup(id) :?> Blob
  let provFor (repo:Repository) (c:Commit,d:TreeChanges) = [
    printfn "Commit "
    let commit = nc + "-commit-" + c.Sha
    let qa = commit + "-qa" 
    yield! statementsFor (Subject (Owl.Uri commit)) 
            [
                yield (a,Object.from nice.``owl:Thing``.``prov:Activity``.Uri)
                yield (Predicate.from nice.``owl:Thing``.``prov:Activity``.ObjectProperties.``prov:qualifiedAssociation``.Uri,
                         Object.from (Owl.Uri qa))
                yield (Predicate.from nice.``owl:Thing``.DataProperties.``prov:startedAtTime``.Uri,
                         Object.from (c.Author.When))
                yield (Predicate.from nice.``owl:Thing``.DataProperties.``prov:endedAtTime``.Uri,
                         Object.from (c.Author.When))
                yield (Predicate.from (Owl.Uri "http://www.w3.org/2000/01/rdf-schema#label"),Object.from c.Message)
                yield (Predicate.from nice.``owl:Thing``.ObjectProperties.``prov:wasAssociatedWith``.Uri,
                         Object.from (Owl.Uri (("http://nice.org.uk/identity/git-username-" + p2id c.Committer.Name))))
                
                for a in d.Added do 
                        yield (Predicate.from nice.``owl:Thing``.``prov:Activity``.ObjectProperties.``prov:used``.Uri,
                                 Object.from (Owl.Uri(nc  + "-file-" + (p2id a.Path) + "-" + a.Oid.Sha)))
                for a in d.Modified do 
                        yield (Predicate.from nice.``owl:Thing``.``prov:Activity``.ObjectProperties.``prov:used``.Uri,
                                 Object.from (Owl.Uri(nc  + "-file-" + (p2id a.Path) + "-" + a.Oid.Sha)))
                               
                if(not((Seq.isEmpty (c.Parents)))) then
                    yield (Predicate.from nice.``owl:Thing``.``prov:Activity``.ObjectProperties.``prov:wasInformedBy``.Uri,
                             Object.from (Owl.Uri(nc + "-commit-" + (c.Parents |> Seq.head).Sha)))

           ]  
    yield! statementsFor ((Subject (Owl.Uri qa)))
        [
            yield(a,Object.from nice.``owl:Thing``.``prov:Association``.Uri)
            yield(Predicate.from nice.``owl:Thing``.``prov:Agent``.Uri, Object.from (Owl.Uri (("http://nice.org.uk/identity/git-username-" + p2id c.Committer.Name))))     
            yield(Predicate.from nice.``owl:Thing``.``prov:Association``.ObjectProperties.``prov:hadRole``.Uri,
                    Object.from "author, comitter")   
        ]
   
    for a in d.Added do yield! versionedContent c a (contentFor repo)
    for m in d.Modified do yield! versionedContent c m (contentFor repo)

  ]

  let walk repo = [for s in commits repo |> Seq.take 2  do yield! provFor repo s]


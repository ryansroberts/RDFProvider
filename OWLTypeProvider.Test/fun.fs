[<ReflectedDefinition>]
module Page
open FunScript
open FunScript.TypeScript
open FSharp.Data

type nice = LinkedData.Stardog<"http://localhost:5820", 
                               "Nice",  
                               "http://www.w3.org/2002/07/owl#Thing", 
                               """nice:http://nice.org/ontology/,
                                  owl:http://www.w3.org/2002/07/owl#""">

type thing = nice.``owl:Thing``

guideline.
type guideline = thing.``http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_guideline#Guideline``
type evidenceStatement = thing.``http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_guideline#EvidenceStatement``
type discussion =  thing.``http://www.semanticweb.org/amitchell/ontologies/2014/5/nice_guideline#Discussion``


let hello () = Globals.window.alert(string discussion.Uri)

let jq(selector : string) = Globals.Dollar.Invoke selector
let (?) jq name = jq("#" + name)

let main() =
  jq?helloWorld.click(fun _ -> hello() :> obj)

do Runtime.Run(components = FunScript.Data.Components.DataProviders)
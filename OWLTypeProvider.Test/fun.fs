[<ReflectedDefinition>]
module Page
open FunScript
open FunScript.TypeScript
open FSharp.Data

type nice = LinkedData.Stardog<"http://localhost:5820", "Nice",  "http://www.w3.org/2002/07/owl#Thing", """nice:http://nice.org/ontology/,
                owl:http://www.w3.org/2002/07/owl#""">

type thing = nice.``owl:Thing``
type guideline = thing.``nice:guideline``
type evidenceStatement = thing.``nice:evidenceStatement``
type discussion =  thing.``nice:discussion``

let stuff = thing.Individuals.``http://nice.org.uk/guideline/CG15``.Uri.ToString()

let hello () = Globals.window.alert(stuff)

let jq(selector : string) = Globals.Dollar.Invoke selector
let (?) jq name = jq("#" + name)

let main() =
  jq?helloWorld.click(fun _ -> hello() :> obj)

let components = 
  FunScript.Data.Components.getDataProviders()
do Runtime.Run(components=components)
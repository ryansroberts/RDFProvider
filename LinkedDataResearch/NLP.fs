module NLP
    open FSharp.Data
    open VDS.RDF
    open VDS.RDF.Parsing
    open System.Xml
    open System.IO
    open System.Text
    open System
    open System.Security.Cryptography
    open Model

    let folder = (__SOURCE_DIRECTORY__ + "/iecache")

    let ensureCacheDir () = 
        if(not(Directory.Exists folder)) then 
            Directory.CreateDirectory folder |> ignore

    let cacheFile (scope:Scope) =   
        let name = Path.GetInvalidFileNameChars()
                    |> Array.fold (fun (a:string) c ->
                        a.Replace(c,'_')
                    ) (string scope) 
        let fn = sprintf "%s/%s.xml" folder name
        printf "%s\r\n" fn
        fn

    let cacheGet (scope:Scope) (text:string) =
        ensureCacheDir()
        
        let fn = cacheFile scope

        if(not(File.Exists fn)) then None
        else Some(File.ReadAllText fn)

    let cacheSet scope text = 
        ensureCacheDir()

        File.WriteAllText(cacheFile scope,text)

        text
     
    let fetch text = 
        printf "Downloading: %s\r\n" text 
        Http.RequestString (
            "http://access.alchemyapi.com/calls/text/TextGetRankedConcepts",
            body= FormValues[("apikey","630ef77c0328ba4cf99c94c7474dd44f8e79f4f4")
                             ("text",text)
                             ("outputMode","rdf")
                             ("showSourceText","enabled")])


    let graphOf (scope:Scope) s = 
        let x = XmlDocument()
        let g = new Graph()
        let p  = RdfXmlParser()

        match cacheGet scope s with
            | Some r -> r
            | None -> (fetch >> (cacheSet scope)) s
        |> (fun s -> x.LoadXml(s);x)
        |> (fun x -> p.Load(g,x))
    
        g
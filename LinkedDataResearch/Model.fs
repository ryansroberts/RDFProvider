module Model

type Identifier(s : string) = 
    member x.S = s
    override x.ToString() = x.S
    static member (+) (l : Identifier, r : Identifier) = Identifier(l.S + "/" + r.S)

type Scope(root : string, path : Identifier list) = 
    member x.Path = path
    
    override x.ToString() = 
        string (path
                |> List.rev
                |> List.fold (+) (Identifier root))
    
    member x.Enter(id : Identifier) = Scope(root, id :: x.Path)
    member x.Leave = Scope(root, x.Path.Tail)

type Guid(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Rationale(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Title(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Part(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Chapter(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Scenario(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Population(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type Body(s : string) = 
    member x.s = s
    override x.ToString() = s.ToString()

type StrategyType = 
    | NotSpecified
    | DatabaseSearch
    | ExpertReview

type Subject = 
    { Id : Identifier }

and Set = 
    { Id : Identifier
      Guid : Guid
      SetTitle : Title
      Questions : Question list
      Statements : Statement list
      Rationale : Rationale }

and Guideline = 
    { Id : Identifier
      Title : Title
      Reccomendation : Reccomendation list
      Sets : Set list
      Studies : Study list
      Issued : System.DateTime }

and Reccomendation = 
    { Id : Identifier
      Body : Body
      Guideline : Identifier
      Title : Title
      Set : Identifier
      Follows : Identifier list
      Grade: string }

and Study = 
    { Id : Identifier
      Reference : string }

and Statement = 
    { Id : Identifier
      Statement : Body
      Studies : Study list 
      EvidenceCategory : string}

and Question = 
    { Id : Identifier
      Text : Body
      SearchStrategies : SearchStrategy list }

and SearchStrategy = 
    { Id : Identifier
      StrategyType : string }

and QualityStandard =
    {
      Id :Identifier
      Title :Title
      Subject : string
      Statements: QualityStatement list
    }

and QualityStatement = 
    {
      Id :Identifier
      Title : Title
      Statement : string
      Reccomendation : Identifier list
    }

and AuditInfoSource = {
    Id: Identifier
    SourceName : string
    InformationType : string
    Notes : string
}

and Audit = {
    Id : Identifier
    Reccomendation : Identifier
    AuditCriteria : string
    NumberFulfil : System.Nullable<int>
    TotalNumber : System.Nullable<int>
    PercentAchived : decimal
    Notes : Body
    AuditInfoSource : AuditInfoSource
    AuditDate : System.DateTime option
}

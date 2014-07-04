module Query
open Owl
open System
open System.Linq
open System.Text
open System.Collections.Generic
open Microsoft.FSharp.Core.CompilerServices
open System.Linq.Expressions

type Individual = class end

type binding = string

type OwlQuery = 
| Cons
| Prefix of OwlQuery * String * System.Uri
| Binding of OwlQuery * binding list
| Take of OwlQuery * int
| Skip of OwlQuery * int

type IWithQueryable = 
    abstract Query : string -> Individual list


module internal QueryImplementation = 
    open System.Linq
    open System.Linq.Expressions
    open System.Reflection

    let (|MethodWithName|_|) (s:string) (m:MethodInfo) =  if s = m.Name then Some () else None
    let (|PropertyWithName|_|) (s:string) (m:PropertyInfo) =  if s = m.Name then Some () else None

    let (|MethodCall|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.Call, (:? MethodCallExpression as e) ->  
            Some ((match e.Object with null -> None | obj -> Some obj), e.Method, Seq.toList e.Arguments)
        | _ -> None

    let (|AsType|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.TypeAs, (:? UnaryExpression as e) ->  Some (e.Operand, e.Type)
        | _ -> None

    let (|NewArray|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.NewArrayInit, (:? NewArrayExpression as e) ->  Some (Seq.toList e.Expressions)
        | _ -> None

    let (|PropertyGet|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.MemberAccess, ( :? MemberExpression as e) -> 
            match e.Member with 
            | :? PropertyInfo as p -> 
                 Some ((match e.Expression with null -> None | obj -> Some obj), p)
            | _ -> None
        | _ -> None

    let (|Constant|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.Constant, (:? ConstantExpression as ce) ->  Some (ce.Value, ce.Type)
        | _ -> None

    let (|String|_|) = function | Constant((:? string as s),_) -> Some s | _ -> None
    let (|Int32|_|) = function | Constant((:? int as s),_) -> Some s | _ -> None
    let (|Null|_|) = function Constant(null,_) -> Some () | _ -> None
    let (|Double|_|) = function Constant((:? double as s),_) -> Some s | _ -> None
    let (|Decimal|_|) = function Constant((:? decimal as s),_) -> Some s | _ -> None

    let (|Convert|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.Convert, (:? UnaryExpression as ce) ->  Some (ce.Operand, ce.Type)
        | _ -> None
    
    let (|Var|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.Parameter, (:? ParameterExpression as ce) ->  Some ce
        | _ -> None

    let (|Lambda|_|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.Lambda, (:? LambdaExpression as ce) ->  Some (Seq.toList ce.Parameters, ce.Body)
        | _ -> None

    let (|LetExpr|_|) (e:System.Linq.Expressions.Expression) = 
        match e with 
        | MethodCall(Some (Lambda([v],body)), m, [arg]) when m.Name = "Invoke" ->  Some(v,arg,body)
        | _ -> None

    let (|OptionalQuote|) (e:Expression) = 
        match e.NodeType, e with 
        | ExpressionType.Quote, (:? UnaryExpression as ce) ->  ce.Operand
        | _ -> e

open QueryImplementation
//type OwlQueryProvider = 
//    interface System.Linq.IQueryProvider with 
//        member provider.CreateQuery(e:Expression) : IQueryable = failwithf "CreateQuery, e = %A" e
//
//        /// This member is called by LINQ's .Where, .Select, etc.
//        member provider.CreateQuery<'T>(e:Expression) : IQueryable<'T> = 
//        member provider.Execute(e:Expression) : obj = failwith "Execute, untyped: nyi"
//        member provider.Execute<'T>(e:Expression) : 'T = 
//            match e with 
//            | MethodCall(None, ((MethodWithName "Count" | MethodWithName "ApproximateCount") as meth), [ SourceWithQueryData source ]) ->
//                //printfn "count/estimate-count"
//                let queryData = source.FreebaseQueryData
//                let extraConstraint = [ ("return", quote (if meth.Name = "Count" then "count" else "estimate-count"))  ]
//                let quæt typeId = getBaseTypeId queryData
//                let query = sprintf "{ '/type/object/type' : '%s' %s }" typeId.Id queryText 
//                let count = source.FreebaseDataConnection.Connection.Query<int>(query, fun j -> j.AsInteger())
//                box count  :?> 'T
//            | _ ->
//                whenAllElseFails e 
//
//
//type OwlQueryable<'T>(store:VDS.RDF.Storage.IQueryableStorage) =
//    interface IQueryable<'T>
//    interface IQueryable with 
//            member x.Provider = OwlQueryable.Provider
//            member x.Expression =  Expression.Constant(x,typeof<IQueryable<'T>>) :> Expression 
//            member x.ElementType = typeof<'T>
//    interface seq<'T> with 
//            member x.GetEnumerator() = (Seq.cast<'T> (queryDataAsEnumerable fbDataConn data)).GetEnumerator()
//    interface System.Collections.IEnumerable with 
//            member x.GetEnumerator() = (x :> seq<'T>).GetEnumerator() :> System.Collections.IEnumerator 
//and OwlOrderedQueryable<'T>(store:VDS.RDF.Storage.IQueryableStorage) = 
//        interface IOrderedQueryable<'T> 
//        interface IQueryable<'T> 
//        interface IQueryable with 
//             member x.Provider = FreebaseQueryableStatics.Provider
//             member x.Expression =  Expression.Constant(x,typeof<IOrderedQueryable<'T>>) :> Expression 
//             member x.ElementType = typeof<'T>
//        interface seq<'T> with member x.GetEnumerator() = (Seq.cast<'T> (queryDataAsEnumerable fbDataConn data)).GetEnumerator()
//        interface System.Collections.IEnumerable with member x.GetEnumerator() = (x :> seq<'T>).GetEnumerator() :> System.Collections.IEnumerator
//    

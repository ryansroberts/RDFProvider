
open System.Text

type Op =
  | Number of int
  | Plus
  | Minus
  | Times
  | Divide
  | Openbrace
  | Closebrace


type Calc =
  | Cons
  | Accumulate of int * Calc
  | Operation of int * Op * Calc

let fail () = raise (System.Exception "boom")



let rec apply op calc =
    match op,calc with
    | Number(x),Cons -> Accumulate(x,Cons)
    | Number(x),Operation(y,op',c) ->
        match op' with
        | Plus   -> Accumulate(x + y,c)
        | Minus  -> Accumulate(x - y,c)
        | Times  -> Accumulate(x * y,c)
        | Divide -> Accumulate(x / y,c)
        | _ -> fail ()
    | Openbrace,Operation(y,op,c) ->
        Accumulate(0,Operation(y,op,c))
    | Closebrace,Accumulate(y,Operation(x,op,c)) ->
        apply (Number(x)) (Operation(y,op,c))
    | op,Accumulate(x,c) -> Operation(x,op,c)
    | _,_ -> fail ()

let rec tokens s = [
    let recOp l =
        match l with
        | 'a'::tail -> (Some Plus,tail)
        | 'b'::tail -> (Some Minus,tail)
        | 'c'::tail -> (Some Times,tail)
        | 'd'::tail -> (Some Divide,tail)
        | 'e'::tail -> (Some Openbrace,tail)
        | 'f'::tail -> (Some Closebrace,tail)
        | _ -> (None,l)

    let recNum l =
        let rec recNum l ac =
            printf "reccin %A\r\n" (l,ac) 
            match l,ac with
            | n::tail,_ when n >= '0' && n <= '9' -> recNum tail (n::ac)
            | d::tail,a::atail ->
                let num = ac |> List.fold (fun (a:StringBuilder) (c:char) -> a.Append(c)) (StringBuilder())
                let num = System.Int32.Parse(string num)
                (Some (Number num),l)
            | _ -> (None,l)
        recNum l []

    match s,recOp s,recNum s with
    | [],_,_ -> ()
    | _,(None,_),(None,_) -> fail ()
    | _,(Some op,tail),_ -> yield! op::tokens tail
    | _,_,(Some op,tail) -> yield! op::tokens tail
  
]

let calculate s = 
    tokens (s |> List.ofSeq)
    |> Seq.fold (fun calc op -> apply op calc) (Cons)

tokens ("1a2" |> List.ofSeq) 


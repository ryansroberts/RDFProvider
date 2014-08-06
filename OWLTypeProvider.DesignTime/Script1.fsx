﻿type Op =
    | Plus
    | Minus
    | Times
    | Divide

type StackOp =
    | Openbrace
    | Closebrace

type Input = 
    | Number of int
    | Op of Op
    | StackOp of StackOp

type Register = 
    | Accumulate of int
    | Operation of int * Op
    | Error

type Stack = Register list    

type Calc =
  | Calc of Register * Stack
  with static member cons = (Accumulate 0,[]) 

let rec apply c o =
    printf "%A\r\n" (c,o)
    match o, c with
    | Number(x), (Accumulate _ ,s) -> (Accumulate x,s)                    //Number replaces number in accumulator
    | Number(x), (Operation(y, o),s) ->                                   //Apply operator to operands
        match o with
        | Plus   -> (Accumulate (y + x),s)
        | Minus  -> (Accumulate (y - x),s)
        | Times  -> (Accumulate (y * x),s)
        | Divide -> (Accumulate (y / x),s)
    | StackOp (Openbrace), (o,s) -> (Accumulate 0,o::s)                    //Push accumulator onto stack
    | StackOp (Closebrace),(Accumulate x,s::sx) -> apply (s,sx) (Number x) //Pop operation and apply to accumulator
    | Op (o) , (Accumulate x,s) -> (Operation (x, o),s)
    | _,(_,s) -> (Error,s)

let (|Regex|_|) pattern input = 
    let m = System.Text.RegularExpressions.Regex.Match (input, pattern)
    if m.Success then 
        Some (List.tail [ for g in m.Groups -> g.Value ])
    else None

let rec tokens s =     
      match s with
      | Regex "^(\d+)" [ m ] -> Some (Number (int m), m)
      | Regex "^(a).*" [ m ] -> Some (Op(Plus), m)
      | Regex "^(b).*" [ m ] -> Some (Op(Minus), m)
      | Regex "^(c).*" [ m ] -> Some (Op(Times), m)
      | Regex "^(d).*" [ m ] -> Some (Op(Divide), m)
      | Regex "^(e).*" [ m ] -> Some (StackOp(Openbrace), m)
      | Regex "^(f).*" [ m ] -> Some (StackOp(Closebrace),m)
      | _ -> None
      |>
      function 
      | None -> []
      | Some (op, m) -> op::tokens (s.Substring m.Length) 
    
let calculate s = List.fold apply Calc.cons (tokens s)

let a = for x in a do

let accumulator c =
  match c with 
  | (Accumulate(n),_) -> n

let acceptance = [(calculate "3a2c4")
                  (calculate "32a2d2")
                  (calculate "500a10b66c32")
                  (calculate "3ae4c66fb32")
                  (calculate "3c4d2aee2a4c41fc4f")]
match List.map accumulator acceptance = [20;17;14208;235;990] with
  | true -> printfn "Pass"
  | false -> printfn "Fail %A" acceptance

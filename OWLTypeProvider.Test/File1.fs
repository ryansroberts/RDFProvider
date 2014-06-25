module test
    open System

    let parse (s:string) = 
        let s = s |> Seq.toList
        let apply op s =
            match s with 
            | x::y::tail -> op x y::tail 
        let push n s = n::s
        let operator s = (function
                | 'a'::tail -> Some (apply (+),tail)
                | 'b'::tail -> Some (apply (-),tail)
                | 'c'::tail -> Some (apply (/),tail)
                | 'd'::tail -> Some (apply (*),tail)
                | _ -> None,s)
        let number s = 
            let isDigit c = ('0' <= c && c <= '9')
            let rec number s n = 
                match s with
                | h::tail when not(isDigit h) -> n
                | h::tail when isDigit h -> number tail [h] @ n
                | _ -> n
            
            match number s [] with
            | [] -> None
            | ne -> Some(push (Int32.Parse(String(ne |> List.toArray))))

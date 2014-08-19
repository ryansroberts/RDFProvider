

type Tasks =
  | Empty
  | Task of string * Tasks list
  



let rec append t tx =
  match t,tx with
  | (up,dwn),Empty -> Some(Task (up,[Task(dwn,[])]))
  | (up,dwn),Task(up',tx) ->
    match (up = up') with
      | true -> Some(Task(up,tx @ [Task(dwn,[])]))
      | false -> for t in tx do
                match append (up,dwn),t with
                | Some(t) -> Some()  



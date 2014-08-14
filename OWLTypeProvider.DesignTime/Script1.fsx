type unionType =
  | Something of int * string
  | SomethingElse of int * int
  | AnotherThing of int list


let matchStuff s =
  match s with
    | (x,_) -> x


    
  

namespace Owl
    open System
    
    type Property =
        |ObjectProperty
        |DataProperty


    type Class () = 
        class 
        end

    module Manipulation = 
        let inline uri arg = 
            (^a : (static member Uri : ^a -> System.Uri) arg) 

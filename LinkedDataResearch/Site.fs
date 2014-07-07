module Site


open NiceOntology

let guidelines = 
    query { 
        for g in guideline.Individuals do

        select g
    }

open Suave
open Suave.Web
open Suave.Http
open Suave.Http.Applicatives
open Suave.Http.Files
open Suave.Http.Successful
open Suave.Types
open Suave.Session
open Suave.Log
open Response
open Types.Codes

let turtle q : WebPart = 
    
    fun ctx -> 
        { ctx with response = 
                       { ctx.response with status = HTTP_200
                                           content = Bytes q } }
        |> succeed

let guidance : WebPart = GET >>= choose [ url "/guidelines" >>= turtle guidelines ]

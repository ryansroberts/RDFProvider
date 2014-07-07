#if INTERACTIVE
#load "../GenerateSetupScript.fsx"

GenerateSetupScript.generateSetupScript __SOURCE_DIRECTORY__ "OWLTypeProvider.DesignTime"
#load "__setup__OWLTypeProvider.DesignTime__.fsx"
#else
module internal Test
#endif


open System
open System.IO
open System.Net
open LinkedData

let (++) a b = Path.Combine(a, b)
let resolutionFolder = ""
let outputFolder = __SOURCE_DIRECTORY__ ++ ".." ++ "OWLTypeProvider.Test" ++ "expected"
let assemblyName = "OWLTypeProvider.DesignTime.dll"

type Platform = Net40
open TypeProviderInstantiation

let dump signatureOnly ignoreOutput platform saveToFileSystem (inst:TypeProviderInstantiation) =
    let runtimeAssembly = 
        match platform with
        | Net40 -> __SOURCE_DIRECTORY__ ++ ".." ++ "bin" ++ assemblyName
    inst.Dump resolutionFolder (if saveToFileSystem then outputFolder else "") runtimeAssembly signatureOnly ignoreOutput
    |> Console.WriteLine

let dumpAll inst = 
    dump false false Net40 true inst

let args = { 
  Path = __SOURCE_DIRECTORY__ ++ "wine.ttl"
  BaseUri = "http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#wine"
  NSMap = ""
}

dumpAll (TypeProviderInstantiation.FileProvider (args))

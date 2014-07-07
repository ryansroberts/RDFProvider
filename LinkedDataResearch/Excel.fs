module Excel
    open Excel
    open FSharp.Data
    open System.IO

    
    type Array = 
        static member join delimiter xs = 
            xs
            |> Array.map string
            |> String.concat delimiter

    let load path = 
        ExcelReaderFactory.CreateOpenXmlReader((File.Open(path, FileMode.Open, FileAccess.Read))).AsDataSet()
    let (++) l r = Path.Combine(l, r)
    let loadXlsx name = load (__SOURCE_DIRECTORY__ ++ "input" ++ name + ".xlsx")

    let exportCsv name (ds : System.Data.DataSet) = 
        seq { 
            let normaliseTableName (n : string) = 
                (n.Split ' ')
                |> Seq.map (fun s -> 
                       System.Char.ToUpper s.[0] |> ignore
                       s.Trim())
                |> Seq.fold (+) ""
            for t in ds.Tables do
                printf "export %s\r\n" t.TableName
                let name = __SOURCE_DIRECTORY__ ++ "input" ++ name + "_" + normaliseTableName t.TableName + ".csv"
                use f = new System.IO.StreamWriter(File.OpenWrite name)
                for r in t.Rows do
                    f.WriteLine(r.ItemArray
                                |> Array.map string
                                |> Array.map (sprintf "\"%s\"")
                                |> Array.join ",")
                f.Close()
                yield name
        }

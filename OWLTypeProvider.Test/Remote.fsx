#r "../OWLTypeProvider.DesignTime/bin/Debug/DotNetRdf.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/VDS.Common.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/Newtonsoft.Json.dll"
#r "../OWLTypeProvider.DesignTime/bin/Debug/OWLTypeProvider.DesignTime.dll"


type dbpedia = LinkedData.RemoteSparql<"http://dbpedia.org/sparql","http://dbpedia.org/ontology/ReligiousBuilding","db:http://dbpedia.org/ontology/,dbr:http://dbpedia.org/resource/">

dbpedia.``db:ReligiousBuilding``.Individuals.``dbr:Dormition_of_the_Theotokos_Cathedral,_Cluj-Napoca``.Statements
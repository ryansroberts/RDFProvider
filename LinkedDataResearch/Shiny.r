#install.packages(c('SPARQL','igraph','network','ergm'),dependencies=TRUE)
library(SPARQL)
library(igraph)
library(network)
library(ergm)

endpoint <- "http://localhost:5820/Nice/query"
sparql_prefix <- "PREFIX content: <http://www.w3.org/2011/content#>
                  PREFIX oa: <http://www.w3.org/ns/oa#>
                  PREFIX nice: <http://www.semanticweb.org/amitchell/ontologies/nice_all#>
                  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
"

options <- NULL
prefix <- c("nice","http://www.semanticweb.org/amitchell/ontologies/nice_all#")
options <- "output=xml"

q <- paste(sparql_prefix,
  'select ?t ?txt
   where {
    ?t a nice:Recommendation .
    ?t nice:isPartOf* ?t1 .
    ?tgt a oa:SpecificResource .
    ?tgt oa:hasSource ?t  .
    ?ann oa:hasTarget ?tgt .
    ?ann oa:hasBody/content:chars ?txt .
    ?ann oa:hasBody/owl:sameAs ?tag .
   } limit 1000')

res <- SPARQL(endpoint,q,ns=prefix,extra=options,format="xml")$results

conceptrecmatrix = as.matrix(ifelse(table(res$t,res$txt) > 0, 1, 0))

cr <- graph.incidence(conceptrecmatrix)

write.graph(cr,'concept_rec.graphml',format="graphml")

namespace lol

open Rdf
open Owl


type restaurant = LinkedData.Stardog< "http://localhost:5820", "Geo", "http://www.w3.org/2002/07/owl#Thing", """food:http://www.mooney.net/restaurant#,
                                   owl:http://www.w3.org/2002/07/owl#,
                                   tel:http://telegraphis.net/data/,
                                   geo:http://www.geonames.org/ontology#
                                """ >


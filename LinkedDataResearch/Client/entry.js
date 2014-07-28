var N3   = require('n3'),
    uris = require('./uris.js').uris,
    parser = N3.Parser(),
    SparkleSparkleGo = require('./sparkle-sparkle-go.js'),
    domify = require('domify');

var sparql = new SparkleSparkleGo('/sparql/query{?query*}');

var recommendations = {};


sparql
  .query('PREFIX nice: <http://www.semanticweb.org/amitchell/ontologies/nice_all#>\
PREFIX content: <http://www.w3.org/2011/content#>\
PREFIX oa: <http://www.w3.org/ns/oa#>\
PREFIX prov: <http://www.w3.org/ns/prov-o#>\
\
\
CONSTRUCT {\
  ?rec content:chars ?cnt .\
}\
WHERE {\
  ?rec a nice:Recommendation .\
    ?rec content:chars ?cnt .\
     ?ann oa:hasTarget ?rec . \
?ann oa:hasBody/content:chars "Gastroparesis"  .\
\
\
}')
  .execute(function (err, data){

    if (!err){

      parser.parse(data, function (err, triple, prefixes) {



        // bear in mind this fires once for each triple.. 
        if (triple){

          recommendations[triple.subject] = triple.object.replace(/\n\?\s/g, '<br> - ');

        } else {

          var output = document.getElementById('output');

          var header = domify('<h2>All recommendations for Gastroparesis</h2>');

          var list = domify('<ul></ul>');

          output.appendChild( header );
          output.appendChild( list );

          for (var rec in recommendations){

            if (recommendations.hasOwnProperty(rec)){

              var recommendation = domify('<li><h3>' + rec + '</h3><p>' + recommendations[rec] + '</p></li>');
              list.appendChild(recommendation);

            }

          }

        }

      });

    }

  });


var N3   = require('n3'),
    uris = require('./uris.js'),
    queries = require('./queries.js'),
    parser = N3.Parser(),
    SparkleSparkleGo = require('./sparkle-sparkle-go.js'),
    domify = require('domify'),
    colourhash = require('./colour_hash.js');



var sparql = new SparkleSparkleGo('/sparql/query{?query*}');

var recommendations = {};
var tags = {};


sparql
  .query(queries.contentMatching('nice:Recommendation','Gastroparesis'))
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

              var recommendation = domify('<li><h3 bgcolor="' + colourhash(30,25,rec) + '">' + rec + '</h3><p>' + recommendations[rec] + '</p></li>');
              list.appendChild(recommendation);

            }
          }
        }
      });
    }
  });

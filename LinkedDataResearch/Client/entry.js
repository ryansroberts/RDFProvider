var N3   = require('n3'),
    uris = require('./uris.js').uris,
    parser = N3.Parser(),
    SparkleSparkleGo = require('./sparkle-sparkle-go.js');

var sparql = new SparkleSparkleGo('/sparql/query{?query*}');

sparql
  .query('describe <http://nice.org.uk/guideline//CG15>')
  .execute(function (err, data){

    if (!err){

      parser.parse(data, function (err, triple, prefixes) {

        // bear in mind this fires once for each triple.. 
        if (triple){
          document.querySelector('#output').innerHTML += '<p>' + triple.subject + ' ' + triple.predicate + ' ' + triple.object + '</p>';
        }

      });

    }

  });

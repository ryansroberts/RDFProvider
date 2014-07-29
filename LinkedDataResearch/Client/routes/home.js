var queries = require('../queries.js'),
    SparkleSparkleGo = require('../sparkle-sparkle-go.js'),
    parseTriples = require('../triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}');

module.exports = function (ctx, uri){

  sparql
    .query(queries.contentMatching('nice:Recommendation','Gastroparesis'))
    .execute(parseTriples(function (err, triples){

      if (!err){

        var recommendations = {};

        triples.forEach(function (triple){

          recommendations[triple.subject] = markdownParser(triple.object.replace(/\n\?\s/g, '\n- '));

        });

        var output = document.getElementById('output');
        var header = domify('<h2>All recommendations for Gastroparesis</h2>');
        var list = domify('<ul></ul>');

        output.appendChild( header );
        output.appendChild( list );

        for (var rec in recommendations){

          if (recommendations.hasOwnProperty(rec)){

            var recommendation = domify('<li><h3>' + rec + '</h3><p>' + recommendations[rec] + '</p></li>');
            var evidenceStatements = domify('<p><a href="#/evidence-statements/' + encodeURI(rec) + '">Find evidence statements supporting this recommendation</a></p>');
            var studies = domify('<p><a href="#/studies/<' + encodeURI(rec) + '>">Find studies supporting this recommendation</a></p>');

            // append..
            list.appendChild(recommendation);
            list.appendChild(evidenceStatements);
            list.appendChild(studies);

          }
        }

      }

    }));
}

module.exports.cleanUp = function (){

  document.getElementById('output').innerHTML = "";

}
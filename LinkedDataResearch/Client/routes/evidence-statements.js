var queries = require('../queries.js'),
    SparkleSparkleGo = require('../sparkle-sparkle-go.js'),
    parseTriples = require('../triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}');

module.exports = function (ctx, uri){

  uri = uri.replace('/evidence-statements/', '');

  console.log(uri);

  sparql
    .query(queries.relatedEvidenceStatements(uri))
    .execute(parseTriples(function (err, triples){

      console.log(triples);

    }));

}

module.exports.cleanUp = function (){

  document.getElementById('output').innerHTML = "";

}
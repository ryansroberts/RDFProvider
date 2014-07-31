var queries = require('../queries.js'),
    SparkleSparkleGo = require('./sparkle-sparkle-go.js'),
    parseTriples = require('./triN3ty.js'),
    uris = require('../uris.js'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    _ = require('underscore');

module.exports = function (individual, fn){
  
  sparql
    .query(queries.annotatedContent(individual))
    .execute(parseTriples(function (err, triples){

      var text = _.find(triples, function (triple){

        return triple.predicate === uris.cnt.prefix + uris.cnt.chars;

      });

      if (!err){

        fn (false, text.object, triples);

      } else {
        fn (err);
      }

    }))

}
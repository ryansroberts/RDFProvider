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

      var concepts = {};

      var sameAs = _.filter(triples, function (triple){

        return triple.predicate === uris.owl.prefix + "sameAs";

      });

      _.each(sameAs, function (triple){

        var concept = triple.object.replace(/"/g, '');

        concepts[triple.subject] = {
          concept : concept,
          selectors : []
        };

        var selector = _.find(triples, function (t){

          return t.predicate === uris.oa.prefix + "hasSelector" && t.subject === triple.subject

        });

        var selections = _.filter(triples, function (triple){

          if (triple.subject === selector.object){
           return triple;
          }

        });

        _.map(selections, function (selection){

          concepts[triple.subject].selectors.push(parseXMLInt(selection.object));

        });

      });

      console.log(concepts);

      if (!err){

        fn (false, text.object || "", concepts);

      } else {

        fn (err);

      }

    }))

}

function parseXMLInt (stupidString){

  return parseInt(stupidString.match(/"([0-9]+)"/)[1], 10);

}
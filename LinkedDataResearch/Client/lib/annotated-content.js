var queries = require('../queries.js'),
    domify = require('domify'),
    SparkleSparkleGo = require('../lib/sparkle-sparkle-go.js'),
    n3 = require('n3'),
    parseTriples = require('./triN3ty.js'),
    crc = require('crc'),
    uris = require('../uris.js'),
    colour = require('rgb'),
    _ = require('underscore'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    lambda = require('functional.js'),
    shinyButton = require('./shiny.js');

function parseXMLInt (stupidString){
  return parseInt(stupidString.match(/"([0-9]+)"/)[1], 10);
}

function loadAnnotatedContent (uri,fn) {
    sparql
    .query(queries.annotatedContent(uri))
    .execute(parseTriples(function (err, triples){

      var shiny = shinyButton(triples);


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

         var drugbankIds = _.filter(triples,function(t){
             return t.subject === triple.subject && t.predicate === uris.nice.prefix + "hasDrugBankId";
         });
          
         var meshId = _.filter(triples,function(t){
             return t.subject === triple.subject && t.predicate === uris.nice.prefix + "hasMeshId";
         })


          concepts[triple.subject].drugbank = [];
          _.each(drugbankIds,function(t){
              concepts[triple.subject].drugbank.push(String.prototype.match.call(t.object,/"(.*?)"/)[0].replace("\"",""));
          });
        
          concepts[triple.subject].mesh = [];
          _.each(meshId,function(t){
              concepts[triple.subject].mesh.push(String.prototype.match.call(t.object,/"(.*?)"/)[0].replace("\"",""));
          });
 
      });

      if (!err){

          if(!text) {fn(false,"",concepts, shiny);}
          else fn (false, n3.Util.getLiteralValue(text.object) || "", concepts, shiny);

      } else {

        fn (err);
      }
    }))
};

module.exports = loadAnnotatedContent;

var queries = require('../queries.js'),
    //edity = require('../lib/editable.js'),
    SparkleSparkleGo = require('../lib/sparkle-sparkle-go.js'),
    parseTriples = require('../lib/triN3ty.js'),
    //markdownParser = require('marked'),
    //spannerify = require('../lib/spannerify.js'),
    //lambda = require('functional.js'),
    //annotatedcontent = require('../lib/annotated-content.js'),
    //domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    shinyButton = require('../lib/shiny.js');

module.exports = function (ctx, uri){

  document.getElementById('output').innerHTML = "";

  sparql
      .query(queries.shinyGraph())
      .execute(parseTriples(function(err, triples) {
          if (!err) {
             var button = shinyButton(triples);
             button.click();
          }
      }));

}
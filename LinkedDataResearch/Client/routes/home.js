var queries = require('../queries.js'),
    SparkleSparkleGo = require('../sparkle-sparkle-go.js'),
    parseTriples = require('../triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}');

module.exports = function (ctx, uri){

  document.getElementById('output').innerHTML = "";

  var output = document.getElementById('output');
  var header = domify('<h2></h2>');
  var list = domify('<ul></ul>');
  var label = domify('<label for="tags">Concept: </label>');
  var tags = domify('<input name="tags" type="text" list="tags" />');
  output.appendChild(label);
  output.appendChild(tags);
  var dl = domify('<datalist id="tags"/>'); 
  output.appendChild( dl );
  output.appendChild( header );
  output.appendChild( list );

  sparql
    .query(queries.tagsForType('nice:Recommendation'))
    .execute(parseTriples(function (err,tx) {
        if(!err) {
            var tagHolder = {};
            tx.forEach(function (t){
              tagHolder[t.subject] = t.object; 
            });

            var output = document.getElementById('output');
            for(var t in tagHolder) {
                dl.appendChild(domify('<option value=' + tagHolder[t] + ' />'));

            }
            tags.addEventListener('change',function (e) {
                console.log(e);
                header.innerHTML = "All recommendations for " + e.target.value;
                list.innerHTML = "";
                loadRecommendations(e.target.value);
            });
        }
    }));

  var loadRecommendations = function (tag) {
    sparql
      .query(queries.contentMatching('nice:Recommendation',tag))
      .execute(parseTriples(function (err, triples){

        if (!err){

          var recommendations = {};

          triples.forEach(function (triple){

            recommendations[triple.subject] = markdownParser(triple.object.replace(/\n\?\s/g, '\n- '));

          });

           for (var rec in recommendations){

            if (recommendations.hasOwnProperty(rec)){

              var recommendation = domify('<li><h3>' + rec + '</h3><p>' + recommendations[rec] + '</p></li>');
              var evidenceStatements = domify('<p><a href="#/evidence-statements/' + rec + '">Investigate the evidence behind this recommendation</a></p>');

              // append..
              list.appendChild(recommendation);
              list.appendChild(evidenceStatements);

            }
          }
        }
    }));
  }
}

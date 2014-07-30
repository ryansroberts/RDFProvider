var queries = require('../queries.js'),
    SparkleSparkleGo = require('../sparkle-sparkle-go.js'),
    parseTriples = require('../triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    _ = require('underscore'),
    crc = require('crc'),
    colour = require('rgb');

module.exports = function (ctx, uri){

  var output = document.getElementById('output')

  output.innerHTML = "";

  uri = uri.replace('/evidence-statements/', '');

  var statementList = domify('<ul></ul>');
  var discussionSection = domify('<section class="discussion"><h4>Discussion</h4></section>');

  output.appendChild(domify('<h3>Evidence For Recommendation ' + uri + '</h3>'));
  
  output.appendChild(discussionSection);

  output.appendChild(domify('<h4>Evidence statements</h4>'))

  output.appendChild(statementList);


  // load the discussion...
  sparql
    .query(queries.recommendationDiscussion(uri))
    .execute(parseTriples(function (err, triples){

      sparql
        .query(queries.annotatedContent(triples[0].object))
        .execute(parseTriples(function (err, triples){

          var discussion = _.find(triples, function (triple){

            return triple.predicate === "http://www.w3.org/2011/content#chars";

          });

          discussionSection.appendChild(domify('<p>' + discussion.object + '</p>'));

        }));


    }));

  // load the evidence statements..
  sparql
    .query(queries.relatedEvidenceStatements(uri))
    .execute(parseTriples(function (err, triples){

      triples.forEach(function (triple){

        var item = domify('<li>Loading ' + triple.object + '</li>');
        statementList.appendChild(item);

        sparql
          .query(queries.annotatedContent(triple.object))
          .execute(parseTriples(function evidenceStatementDetail(err, triples){

            if (!err){

              item.innerHTML = "";

              var title = _.find(triples, function (triple){

                return triple.predicate === "http://www.w3.org/2011/content#chars";

              });
              
              var detail = domify('<h3>' + title.subject + '</h4><p>' + title.object.replace(/�/g, '') + '</p>');
              item.appendChild(detail);  

              // make a colour chart of concepts..
              _.each(triples, function (triple){

                if (triple.predicate === "http://www.w3.org/2002/07/owl#SameAs"){

                  item.appendChild(
                    domify(
                      '<div style =" display: inline-block; background: ' +
                      colour('hsl(' + new crc.CRC8().update( triple.object ).checksum() + ',50,50)') + 
                      '">' + triple.object +'</div>'
                    )
                  )

                }


              })            

            }

          }))

      });

    }));

}
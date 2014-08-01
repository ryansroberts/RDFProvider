var queries = require('../queries.js'),
    SparkleSparkleGo = require('../lib/sparkle-sparkle-go.js'),
    parseTriples = require('../lib/triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    _ = require('underscore'),
    crc = require('crc'),
    uris = require('../uris'),
    colour = require('rgb'),
    getAnnotatedContent = require('../lib/annotated-content.js');

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
    .execute(parseTriples(processDiscussion.bind(this, discussionSection)));

  // load the evidence statements..
  sparql
    .query(queries.relatedEvidenceStatements(uri))
    .execute(parseTriples(processEvidenceStatementList.bind(this, statementList)));

}

function processDiscussion(parent, err, triples){

  getAnnotatedContent(triples[0].object, function(err, chars, triples){

    parent.appendChild(domify('<p>' + chars + '</p>'));

  });

}

function processEvidenceStatementList (parent, err, triples){

  var references = {};

  triples.forEach(function (triple){

    if (triple.predicate === uris.nice.prefix + "isSupportedBy"){

      var item = domify('<li>Loading ' + triple.object + '</li>');
      parent.appendChild(item);

      var references = _.filter(triples, function (otherTriple){
        return otherTriple.subject === triple.object;
      });

      getAnnotatedContent(triple.object, function (err, text, annotations){

        if (!err){

          item.innerHTML = "";
          item.appendChild(domify('<h3>' + triple.object + '</h4><p>' + text + '</p>'));

          processAnnotateEvidenceStatement(item, references, annotations);

        } else {

          item.innerHTML = "<p>Error loading!</p>";

        }

      });

    }

  });

}

function processAnnotateEvidenceStatement (item, references, annotations){

  // get the annotated study text... 
  _.each(references, function (triple){

    var ref = domify('<p>Loading...</p>');
    item.appendChild(ref);

    getAnnotatedContent(triple.object, function (err, text, annotations){

      ref.innerHTML = "";
      ref.appendChild(domify('<cite>' + text + '</cite>'))

    });

  });

  // make a colour chart of concepts..
  _.each(annotations, function (annotation, uri){

    item.appendChild(domify(
      '<div style =" display: inline-block; padding:0 10px; background: ' +
      colour('hsl(' + new crc.CRC8().update( annotation.concept ).checksum() + ',25,25)') + 
      '"><a style="color:#fff; text-decoration: none;" target="new" href="'+ uri + '">' + annotation.concept +'</a></div>'
    ));

  });
}
var queries = require('../queries.js'),
    SparkleSparkleGo = require('../sparkle-sparkle-go.js'),
    parseTriples = require('../triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    _ = require('underscore'),
    crc = require('crc'),
    uris = require('../uris'),
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
    .execute(parseTriples(processDiscussion.bind(this, discussionSection)));

  // load the evidence statements..
  sparql
    .query(queries.relatedEvidenceStatements(uri))
    .execute(parseTriples(processEvidenceStatementList.bind(this, statementList)));

}

function processDiscussion(parent, err, triples){

 sparql
  .query(queries.annotatedContent(triples[0].object))
  .execute(parseTriples(function (err, triples){

    var discussion = _.find(triples, function (triple){

      return triple.predicate === "http://www.w3.org/2011/content#chars";

    });

    parent.appendChild(domify('<p>' + discussion.object + '</p>'));

  }));
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

      sparql
        .query(queries.annotatedContent(triple.object))
        .execute(parseTriples(processAnnotateEvidenceStatement.bind(this, item, references)));

    } //else if (triple.predicate === uris.nice.prefix + "hasReference") {
      //references[triple.subject] = triple.object;
   // }

  });

}

function processAnnotateEvidenceStatement (item, references, err, triples){

  item.innerHTML = "";

  var title = _.find(triples, function (triple){

    return triple.predicate === uris.cnt.prefix + uris.cnt.chars;

  });
  
  var detail = domify('<h3>' + title.subject + '</h4><p>' + title.object.replace(/�/g, '') + '</p>');
  item.appendChild(detail);

  // get the annotated study text... 
  _.each(references, function (triple){

    var ref = domify('<p>Loading...</p>');
    item.appendChild(ref);

    sparql
      .query(queries.annotatedContent(triple.object))
      .execute(parseTriples(processAnnotatedStudy.bind(this, ref)));

  });

  //if (references[triple.object]){
  //  item.appendChild(domify('<p>References: ' + references[triple.object]+ '</p>'));
  //} 

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

function processAnnotatedStudy (ref, err, triples){

  ref.innerHTML = "";

  var text = _.find(triples, function (triple){
    return triple.predicate === uris.cnt.prefix + uris.cnt.chars;;       
  });

  ref.appendChild(domify('<cite>' + text.object + '</cite>'));

}
var queries = require('../queries.js'),
    SparkleSparkleGo = require('../lib/sparkle-sparkle-go.js'),
    parseTriples = require('../lib/triN3ty.js'),
    markdownParser = require('marked'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}'),
    _ = require('underscore'),
    lambda = require('functional.js'),
    crc = require('crc'),
    uris = require('../uris'),
    getAnnotatedContent = require('../lib/annotated-content.js'),
    spannerify = require('../lib/spannerify');


module.exports = function(ctx, uri) {


    var output = document.getElementById('output');

    output.innerHTML = "";

    uri = uri.replace('/evidence-statements/', '');

    output.appendChild(domify('<h3>Recommendation ' + uri + '</h3>'));

    var recommendation = domify('<section class="rec"></section>');
    var statementList = domify('<ul></ul>');
    var discussionSection = domify('<section class="discussion"><h4>Discussion</h4></section>');


    var filters = domify('<section class="filters" style="display:none;"></section>');
    output.appendChild(filters);

    filters.appendChild(domify('<ul id="annotationkeys"></ul>'));
    filters.appendChild(domify('<ul id="meshkeys"></ul>'));
    filters.appendChild(domify('<ul id="drugbankkeys"></ul>'));

    output.appendChild(recommendation);

    

    output.appendChild(discussionSection);

    output.appendChild(domify('<h4>Evidence statements</h4>'));

    output.appendChild(statementList);


    getAnnotatedContent(uri, function(err, text, annotations) {

        recommendation.appendChild(domify('<p>' + text + '</em></p>'));

        /*
        if (!err) {

            item.innerHTML = "";
            item.appendChild(domify('<h3>' + triple.object + '</h4><p>' + spannerify(text, annotations) + '</p>'));
            
            processAnnotatedEvidenceStatement(item, references, annotations);

        } else {

            item.innerHTML = "<p>Error loading!</p>";

        }
        */
    });

    // load the discussion...
    sparql
        .query(queries.recommendationDiscussion(uri))
        .execute(parseTriples(processDiscussion.bind(this, discussionSection)));

    // load the evidence statements..
    sparql
        .query(queries.relatedEvidenceStatements(uri))
        .execute(parseTriples(processEvidenceStatementList.bind(this, statementList)));

}

function processDiscussion(parent, err, triples) {

    getAnnotatedContent(triples[0].object, function(err, chars, annotations) {

        var p = parent.appendChild(domify('<p>' + spannerify(chars, annotations) + '</p>'));


    });

}


function processEvidenceStatementList(parent, err, triples) {

    var references = {};

    var processStatement = function(triple) {
        if (triple.predicate === uris.nice.prefix + "isSupportedBy") {

            var item = domify('<li>Loading ' + triple.object + '</li>');
            parent.appendChild(item);

            var references = lambda.filter(function(otherTriple) {
                return otherTriple.subject === triple.object;
            }, triples);


            getAnnotatedContent(triple.object, function(err, text, annotations) {

                if (!err) {

                    item.innerHTML = "";
                    item.appendChild(domify('<h3>' + triple.object + '</h4><p>' + spannerify(text, annotations) + '</p>'));
                    
                    processAnnotatedEvidenceStatement(item, references, annotations);

                } else {

                    item.innerHTML = "<p>Error loading!</p>";

                }
            });
        }
    }

    lambda.each(processStatement, triples);
}

function processAnnotatedEvidenceStatement(item, references, annotations) {

    var appendRef = function(triple) {
        var ref = domify('<p>Loading...</p>');
        item.appendChild(ref);

        getAnnotatedContent(triple.object, function(err, text, annotations) {
            ref.innerHTML = "";
            ref.appendChild(domify('<cite>' + spannerify(text, annotations) + '</cite>'))
        });
    };


    lambda.each(appendRef, references);
}

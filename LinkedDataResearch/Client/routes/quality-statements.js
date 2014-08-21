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



function processStatements(parent, err, triples) {

    getAnnotatedContent(triples[0].object, function(err, chars, annotations) {
        var p = parent.appendChild(domify('<p>' + spannerify(chars, annotations) + '</p>'));
    });

}



module.exports = function(ctx, uri) {
    var output = document.getElementById('output');

    output.innerHTML = "";

    uri = uri.replace('/quality-statements/', '');

    var statementList = domify('<ul></ul>');

    output.appendChild(domify('<ul id="annotationkeys"></ul>'));
    output.appendChild(domify('<ul id="meshkeys"></ul>'));
    output.appendChild(domify('<ul id="drugbankkeys"></ul>'));

    output.appendChild(domify('<h3>Quality statements for Recommendation ' + uri + '</h3>'));

    output.appendChild(statementList);

    sparql
        .query(queries.qualityStatementsFor(uri))
        .execute(parseTriples(processStatements.bind(this, statementList)));

};


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

    uri = uri.replace('/comissioner/', '');

    var statementList = domify('<ul></ul>');
    var discussionSection = domify('<section class="discussion"><h4>Discussion</h4></section>');

    output.appendChild(domify('<ul id="annotationkeys"></ul>'));
    output.appendChild(domify('<ul id="meshkeys"></ul>'));
    output.appendChild(domify('<ul id="drugbankkeys"></ul>'));

    output.appendChild(domify('<h3>Evidence For Recommendation ' + uri + '</h3>'));

    output.appendChild(discussionSection);

    output.appendChild(domify('<h4>Evidence statements</h4>'));

    output.appendChild(statementList);


}


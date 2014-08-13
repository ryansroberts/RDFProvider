var queries = require('../queries.js'),
    edity = require('../lib/editable.js'),
    SparkleSparkleGo = require('../lib/sparkle-sparkle-go.js'),
    parseTriples = require('../lib/triN3ty.js'),
    markdownParser = require('marked'),
    spannerify = require('../lib/spannerify.js'),
    lambda = require('functional.js'),
    annotatedcontent = require('../lib/annotated-content.js'),
    domify = require('domify'),
    sparql = new SparkleSparkleGo('/sparql/query{?query*}');

module.exports = function(ctx, uri) {

    document.getElementById('output').innerHTML = "";

    var output = document.getElementById('output');
    var header = domify('<h2></h2>');

    var list = domify('<ul></ul>');
    var label = domify('<label for="tags">Concept: </label>');
    var tags = domify('<input name="tags" type="text" list="tags" />');

    output.appendChild(label);
    output.appendChild(tags);
    var dl = domify('<datalist id="tags"/>');
    output.appendChild(dl);

    output.appendChild(header);
    output.appendChild(domify('<ul id="annotationkeys"></ul>'));
    output.appendChild(domify('<ul id="meshkeys"></ul>'));
    output.appendChild(domify('<ul id="drugbankkeys"></ul>'));

    output.appendChild(list);

    sparql
        .query(queries.tagsForType('nice:Recommendation'))
        .execute(parseTriples(function(err, tx) {
            if (!err) {
                var tagHolder = {};
                tx.forEach(function(t) {
                    tagHolder[t.subject] = t.object;
                });

                var output = document.getElementById('output');
                for (var t in tagHolder) {
                    dl.appendChild(domify('<option value=' + tagHolder[t] + ' />'));

                }
                tags.addEventListener('change', function(e) {
                    header.innerHTML = "All recommendations for " + e.target.value;
                    list.innerHTML = "";
                    loadRecommendations(e.target.value);
                });
            }
        }));

    function loadInteractions(uri,interactions) {
        sparql.query(queries.interactionsForUris([uri]))
            .execute(parseTriples(function(err, tx) {
                if (!err) {
                    lambda.each(function(t){
                        interactions.appendChild(domify('<li>' + t.object + '</li>'));
                    },tx);
                }
            }));
    }

    function loadRecommendations(tag) {
        sparql
            .query(queries.contentMatching('nice:Recommendation', tag))
            .execute(parseTriples(function(err, triples) {

                if (!err) {
                    var recommendations = {};

                    triples.forEach(function(triple) {
                        recommendations[triple.subject] = markdownParser(triple.object.replace(/\n\?\s/g, '\n- '));
                    });

                    for (var rec in recommendations) {
                        if (recommendations.hasOwnProperty(rec)) {
                            function editableRec(text, annotations, recommendation) {
                                recommendation = list.appendChild(recommendation);
                                var editable =  edity(domify(spannerify(text, annotations)),rec);
                                recommendation.appendChild(editable);
                            }

                            annotatedcontent(rec, function(err, text, annotations) {
                                
                                var recommendation = domify('<li><h3>' + rec + '</h3></li>');
                                editableRec(text, annotations, recommendation);

                                var interactions = domify('<ul class="interactions"></ul>');

                                loadInteractions(rec,interactions);

                                var evidenceStatements = domify('<p><a href="#/evidence-statements/' + rec + '">Investigate the evidence behind this recommendation</a></p>');

                                // append..
                                list.appendChild(recommendation);
                                list.appendChild(interactions);
                                list.appendChild(evidenceStatements);
                            });

                        }
                    }
                }
            }));
    }
}

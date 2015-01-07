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

    var inputContainers = domify('<section></section>');

    output.appendChild(inputContainers);

    var list = domify('<ul style="margin-top:50px"></ul>');
    var label = domify('<label for="tags">Find recommendations by concept: </label>');
    var tags = domify('<input name="tags" type="text" list="tags" />');

    inputContainers.appendChild(label);
    inputContainers.appendChild(tags);
    var dl = domify('<datalist id="tags"/>');
    inputContainers.appendChild(dl);

    output.appendChild(header);

    var label2 = domify('<label for="studies">Find recommendations by study: </label>');
    var tags2 = domify('<input name="studies" type="text" list="studies" />');


    inputContainers.appendChild(label2);
    inputContainers.appendChild(tags2);
    var dl2 = domify('<datalist id="studies"/>');
    inputContainers.appendChild(dl2);

    var toggleFilters = domify('<button type="button" class="btn">Toggle Filtering By Concept</button>');

    var filters = domify('<section class="filters" style="display:none; margin-top: 20px;"><h3>Concepts found in these recommendations. Click a concept to filter the list.</h3></section>');
        output.appendChild(toggleFilters);
    output.appendChild(filters);

    toggleFilters.addEventListener('click', function (e){

        if (filters.style.display === "none"){
            filters.style.display = "block";
        } else {
            filters.style.display = "none";
        }

    }, false)

    filters.appendChild(domify('<ul id="annotationkeys"></ul>'));
    filters.appendChild(domify('<ul id="meshkeys"></ul>'));
    filters.appendChild(domify('<ul id="drugbankkeys"></ul>'));

    var conceptLookups = {};

    window.conceptLookups = conceptLookups;

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
                    document.getElementById('annotationkeys').innerHTML = "";
                    document.getElementById('meshkeys').innerHTML = "";
                    document.getElementById('drugbankkeys').innerHTML = "";
                    list.innerHTML = "";
                    loadRecommendations(e.target.value);
                });

            }
        }));

    sparql
        .query(queries.allStudies())
        .execute(parseTriples(function (err, tx){
            if (!err){
                var studyHolder = {};
                tx.forEach(function (t){
                    studyHolder[t.subject] = t.object;
                });

                for (var t in studyHolder){
                    dl2.appendChild(domify('<option value=' + studyHolder[t] + ' />'));
                }

                tags2.addEventListener('change', function (e){
                    var guid;

                    header.innerHTML = "All recommendations derived from " + e.target.value;

                    tx.forEach(function (t){ 
                        if (t.object.indexOf(e.target.value) !== -1){ 
                            guid = t.subject;
                        } 
                    });

                    document.getElementById('annotationkeys').innerHTML = "";
                    document.getElementById('meshkeys').innerHTML = "";
                    document.getElementById('drugbankkeys').innerHTML = "";
                    list.innerHTML = "";
                    loadStudyRecommendations(guid);
                });

            }

        }));

    function loadInteractions(uri,interactions) {
        sparql.query(queries.interactionsForUris([uri]))
            .execute(parseTriples(function(err, tx) {
                if (!err) {
                    if (tx.length){
                        interactions.style.display="block";
                    }
                    lambda.each(function(t){
                        if(t.predicate === "http://purl.org/dc/terms/")
                        {
                            var txt =  markdownParser(t.object.replace(/\n\?\s/g, '\n- '));

                            interactions.appendChild(domify('<li style="color:#990000">' + txt  + '</li>'));
                        }
                    },tx);
                }
            }));
    }

    function loadStudyRecommendations(study){

        sparql
            .query(queries.recommendationsFrom(study))
            .execute(parseTriples(function (err, triples){

                var container;

                if (!err) {
                    var recommendations = {}, rec;

                    triples.forEach(function(triple) {
                        recommendations[triple.subject] = markdownParser(triple.object.replace(/\n\?\s/g, '\n- '));
                    });



                    for (rec in recommendations) {
                        if (recommendations.hasOwnProperty(rec)) {

                            container = domify('<li class="thing"></li>');
                            list.appendChild(container);

                            function editableRec(text, annotations, recommendation) {
                                recommendation = list.appendChild(recommendation);
                                var editable =  edity(domify(spannerify(text, annotations, function (uri, el){

                                    for (var i = 0; i < list.childNodes.length; i++){

                                        list.childNodes[i].style.display = "none";

                                    }

                                    conceptLookups[uri].forEach(function (node){

                                        node.style.display = "";

                                    });

                                    var keys = document.querySelectorAll('ul#annotationkeys a, ul#meshkeys a, ul#drugbankkeys a');

                                    for (i = 0; i < keys.length; i++){
                                        keys[i].parentNode.style.opacity = "0.2";
                                    }

                                    el.parentNode.style.opacity = "1";

                                })),rec);
                                recommendation.appendChild(editable);
                            }
                     
                            annotatedcontent(rec, (function(rec, container, err, text, annotations, shiny) {

                                var dedupe = {};

                                var recommendation = domify('<div><h3>' + rec + '</h3></div>');

                                recommendation.appendChild(shiny);

                                for (var a in annotations){
                                    if (!conceptLookups[a] && !dedupe[a]){
                                        conceptLookups[a] = [];
                                    }
                                    conceptLookups[a].push(container);
                                    dedupe[a] = true;
                                    
                                }

                                editableRec(text, annotations, recommendation);

                                var interactions = domify('<ul class="interactions" style="display:none;"></ul>');
                                interactions.appendChild(domify('<h4>Drug Interactions from DrugBank</h4>'))

                                loadInteractions(rec,interactions);
                                container.appendChild(recommendation);
                                container.appendChild(interactions);
                                
                                var evidenceStatements = domify('<p><ul><li><a href="#/evidence-statements/' + rec + '">Investigate the evidence behind this recommendation</a></li><li><a href="#/quality-statements/' + rec + '">Quality statements  under pinned by this recommendation </a></li></ul></p>');
                                
                                var statements = container.appendChild(evidenceStatements);

                               // list.appendChild(container)

                            }).bind({}, rec, container));

                        }

                    }
                }
            }));
    }

    function loadRecommendations(tag) {
        sparql
            .query(queries.contentMatching('nice:Recommendation', tag))
            .execute(parseTriples(function(err, triples) {

                var container;

                if (!err) {
                    var recommendations = {}, rec;

                    triples.forEach(function(triple) {
                        recommendations[triple.subject] = markdownParser(triple.object.replace(/\n\?\s/g, '\n- '));
                    });



                    for (rec in recommendations) {
                        if (recommendations.hasOwnProperty(rec)) {

                            container = domify('<li class="thing"></li>');
                            list.appendChild(container);

                            function editableRec(text, annotations, recommendation) {
                                recommendation = list.appendChild(recommendation);
                                var editable =  edity(domify(spannerify(text, annotations, function (uri, el){

                                    for (var i = 0; i < list.childNodes.length; i++){

                                        list.childNodes[i].style.display = "none";

                                    }

                                    conceptLookups[uri].forEach(function (node){

                                        node.style.display = "";

                                    });

                                    var keys = document.querySelectorAll('ul#annotationkeys a, ul#meshkeys a, ul#drugbankkeys a');

                                    for (i = 0; i < keys.length; i++){
                                        keys[i].parentNode.style.opacity = "0.2";
                                    }

                                    el.parentNode.style.opacity = "1";

                                })),rec);
                                recommendation.appendChild(editable);
                            }
                     
                            annotatedcontent(rec, (function(rec, container, err, text, annotations, shiny) {

                                var dedupe = {};

                                var recommendation = domify('<div><h3>' + rec + '</h3></div>');

                                recommendation.appendChild(shiny);

                                for (var a in annotations){
                                    if (!conceptLookups[a] && !dedupe[a]){
                                        conceptLookups[a] = [];
                                    }
                                    conceptLookups[a].push(container);
                                    dedupe[a] = true;
                                    
                                }

                                editableRec(text, annotations, recommendation);

                                var interactions = domify('<ul class="interactions" style="display:none;"></ul>');
                                interactions.appendChild(domify('<h4>Drug Interactions from DrugBank</h4>'))

                                loadInteractions(rec,interactions);
                                container.appendChild(recommendation);
                                container.appendChild(interactions);
                                
                                var evidenceStatements = domify('<p><ul><li><a href="#/evidence-statements/' + rec + '">Investigate the evidence behind this recommendation</a></li><li><a href="#/quality-statements/' + rec + '">Quality statements  under pinned by this recommendation </a></li></ul></p>');
                                
                                var statements = container.appendChild(evidenceStatements);

                               // list.appendChild(container)

                            }).bind({}, rec, container));

                        }

                    }
                }
            }));
    }
}

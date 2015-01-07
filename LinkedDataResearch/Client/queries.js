var uris = require('./uris.js'),
    lambda = require('functional.js');

var concat = function(arr) {
    return Array.prototype.join.call(arguments, '\r\n');
};

var uri = function(s) {
    return '<' + s + '>';
};

var prefixes = concat(
    'prefix nice:' + uri(uris.nice.prefix),
    'prefix oa:' + uri(uris.oa.prefix),
    'prefix content:' + uri(uris.cnt.prefix),
    'prefix prov:' + uri(uris.prov.prefix),
    'prefix owl:' + uri(uris.owl.prefix),
    'prefix rdfs:' + uri(uris.rdfs.prefix)
);

function uriList(uris) {
    return lambda.map(function(i) {
        return '<' + i + '>';
    }, uris).join(',');
}


module.exports = {
    outcomeDomains: function() {
        return concat(
            prefixes,
            'construct {',
            '?d content:chars ?c',
            '}',
            'where ',
            '{',
            '?d a nice:OutcomesDomain .',
            '?d content:chars ?c',
            '}'
        );
    },
    qualityStatementsFor: function(r) {
        return concat(
            prefixes,
            'construct {',
            uri(r) + ' nice:underpins ?qs . ',
            '}',
            'where ',
            '{',
            uri(r) + 'nice:underpins ?qs .',
            '?qs a nice:QualityStatement . ',
            '}'
        );
    },
    interactionsForUris: function(uris) {
        return concat(
            prefixes,
            'construct {',
            '?item content:chars ?chars .',
            '?item nice:tag ?tag .',
            '?tag <http://bio2rdf.org/drugbank_vocabulary:Drug-Drug-Interaction> ?interaction .',
            '?interaction <http://purl.org/dc/terms/> ?title .',
            '}',
            'where {',
            '?item a nice:Recommendation .',
            '?tgt a oa:SpecificResource .',
            '?item content:chars ?chars .',
            '?tgt oa:hasSource ?item .',
            '?ann oa:hasTarget ?tgt .',
            '?ann oa:hasBody/owl:sameAs ?tag .',
            '?tag nice:hasDrugBankId ?db . ',
            'BIND(IRI(CONCAT("http://bio2rdf.org/drugbank:",STR(?db))) as ?dburi) .',
            '?interaction <http://bio2rdf.org/drugbank_vocabulary:Drug-Drug-Interaction> ?dburi1,?dburi2 .',
            'filter(?dburi1=?dburi && ?dburi != ?dburi2)',
            '?interaction <http://purl.org/dc/terms/title> ?title .',
            'FILTER(?item in (' + uriList(uris) + '))',
            '}'
        );
    },
    tagsForType: function(type) {
        return concat(
            prefixes,
            'construct {',
            '?tag owl:sameAs ?cnt',
            '}',
            '{',
            '?tgt a oa:SpecificResource .',
            '?tgt oa:hasSource ?rec .',
            '?rec a ' + type + ' .',
            '?ann oa:hasTarget ?tgt .',
            '?ann oa:hasBody/content:chars ?cnt .',
            '?ann oa:hasBody/owl:sameAs ?tag ',
            '}'
        );
    },
    annotatedContent: function(individual) {
        return concat(
            prefixes,
            'construct {',
            uri(individual) + ' content:chars ?cnt .',
            uri(individual) + ' oa:tag ?tag .',
            '?tag owl:sameAs ?txt .',
            '?tag oa:hasSelector ?sl .',
            '?sl oa:start ?st .',
            '?sl oa:end ?end .',
            '?tag nice:hasMeshId ?mesh .',
            '?tag nice:hasDrugBankId ?db .',
            '}',
            'where {',
            '?tgt a oa:SpecificResource .',
            uri(individual) + ' content:chars ?cnt .',
            '?tgt oa:hasSource ' + uri(individual) + '  .',
            '?ann oa:hasTarget ?tgt .',
            '?ann oa:hasBody/content:chars ?txt .',
            '?ann oa:hasBody/owl:sameAs ?tag .',
            '?tgt oa:hasSelector ?sl .',
            '?sl oa:start ?st .',
            '?sl oa:end ?end .',
            'optional {?tag nice:hasMeshId ?mesh}  .',
            'optional {?tag nice:hasDrugBankId ?db}  .',
            '}'
        );
    },
    contentMatching: function(type, tag) {
        return concat(
            prefixes,
            'construct {',
            '?rec content:chars ?cnt .',
            '}',
            'where {',
            '?tgt a oa:SpecificResource .',
            '?tgt oa:hasSource ?rec .',
            '?rec a ' + type + ' . ',
            '?rec content:chars ?cnt .',
            '?ann oa:hasTarget ?tgt .',
            '?ann oa:hasBody/content:chars "' + tag + '"',
            '}'
        );
    },
    relatedEvidenceStatements: function(individual) {
        return concat(
            prefixes,
            'construct {',
            uri(individual) + ' nice:isSupportedBy ?es .',
            '?es nice:hasReference ?gr',
            '}',
            'WHERE {',
            uri(individual) + ' nice:isAbout ?t .',
            '?t a nice:Topic .',
            uri(individual) + ' a nice:Recommendation .',
            '?es nice:isAbout ?t .',
            '?es a nice:EvidenceStatement .',
            'optional {',
            '?st nice:isSummarisedBy ?es .',
            '?st a nice:Study .',
            '?st nice:hasReference ?gr .',
            '}',
            '}'
        );

    },
    recommendationDiscussion: function(individual) {
        return concat(
            prefixes,
            'construct {',
            uri(individual) + ' nice:CreatedAsAResultOf ?dis',
            '}',
            'WHERE {',
            '?dis nice:isAbout ?t .',
            '?dis a nice:Discussion .',
            '?t a nice:Topic .',
            uri(individual) + ' a nice:Recommendation .',
            uri(individual) + ' nice:isAbout ?t',
            '}'
        );

    },
    'shinyGraph' : function (){
        return concat(
            prefixes,

            'construct',
            '{',
            '?t oa:tag ?tag .',
            '?tag owl:sameAs ?txt.',
            '}',
            'where {',
            '?t nice:isPartOf* ?t1 .',
            '?tgt a oa:SpecificResource .',
            '?tgt oa:hasSource ?t  .',
            '?ann oa:hasTarget ?tgt .',
            '?ann oa:hasBody/content:chars ?txt .',
            '?ann oa:hasBody/owl:sameAs ?tag .',
            '} LIMIT 500'
        );
    },
    'allStudies' : function (){
        return concat(
            prefixes,
            'construct {',
              '?gr content:chars ?cnt .',
            '}',
            'WHERE {',
                '?gr content:chars ?cnt',
                '{',
                  'SELECT DISTINCT ?gr ',
                  'WHERE {',
                      '?st a nice:Study .',
                      '?st nice:hasReference ?gr .',
                      '?gr content:chars ?cnt .',
                  '}',
                '}',
            '}'
        );

    },
    'recommendationsFrom' : function (study){
        return concat(
            prefixes,
        'construct { ?rec nice:Influenced <' + study + '>}',
        'WHERE {',
         '?est nice:hasReference <' + study +'> .',
         '?est nice:isSummarisedBy ?es .',
         '?es nice:isAbout ?t .',
         '?dis a nice:Discussion .',
         '?dis nice:isAbout ?t .',
         '?t a nice:Topic .',
         '?rec a nice:Recommendation .',
         '?rec nice:isAbout ?t ',
        '}'
        )        
    }
};

var uris = require('./uris.js');

var concat = function (arr) {
    return Array.prototype.join.call(arguments,'\r\n')
};

var uri = function (s) {
    return '<' + s +  '>';
};

var prefixes = concat(
    'prefix nice:' + uri(uris.nice.prefix),
    'prefix oa:' + uri(uris.oa.prefix),
    'prefix content:' + uri(uris.cnt.prefix),
    'prefix prov:' + uri(uris.prov.prefix),
    'prefix owl:' + uri(uris.owl.prefix),
    'prefix rdfs:' + uri(uris.rdfs.prefix)
);

module.exports = {
    tagsForType : function (type) {
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
    annotatedContent : function (individual) {
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
    contentMatching : function (type,tag) {
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
    relatedEvidenceStatements : function (individual){
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
    recommendationDiscussion : function (individual){
        return concat(
            prefixes,
            'construct {',
               uri(individual) +  ' nice:CreatedAsAResultOf ?dis',
            '}',
            'WHERE {',
                '?dis nice:isAbout ?t .',
                '?dis a nice:Discussion .',
                '?t a nice:Topic .',
                uri(individual) +   ' a nice:Recommendation .',
                uri(individual) +  ' nice:isAbout ?t',
            '}'
        )

    }
};

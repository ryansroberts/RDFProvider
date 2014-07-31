var uris = require('./uris.js');

var concat = function(arr) {
    return Array.prototype.join.call(arguments,'\r\n')
};

var uri = function(s) {
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
                uri(individual) + ' nice:semanticTag ?tag .',
                '?tag owl:SameAs ?concept .',
            '}', 
            'where {',
              uri(individual) + ' a content:ContentAsText .',
              uri(individual) + ' content:chars ?cnt .',
              'optional {',
                  '?ann oa:hasTarget ' + uri(individual) + ' .',
                  
                  '?ann oa:hasBody ?txt .',
                  '?txt a content:ContentAsText .',
                  '?txt content:chars ?concept .',
                  
                  '?ann oa:hasBody ?tag .',
              '}',
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
            '<http://nice.org.uk/recommendation/CG87R1.14.3.2> nice:isSupportedBy ?es .',
            '?es nice:hasReference ?gr',
            '}',
            'WHERE {',
            '<http://nice.org.uk/recommendation/CG87R1.14.3.2> nice:isAbout ?t .',
            '?t a nice:Topic .',
            '<http://nice.org.uk/recommendation/CG87R1.14.3.2> a nice:Recommendation .',
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

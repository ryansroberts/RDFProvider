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
	   return prefixed;
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
                '?rec a ' + type + ' .',
                '?rec a owl:NamedIndividual .',
                '?rec a content:ContentAsText .',
                '?rec content:chars ?cnt .',
                '?ann oa:hasTarget ?rec . ',
                '?ann oa:hasBody/content:chars "' + tag + '" .',
            '}'
        );
    },
    relatedEvidenceStatements : function (individual){
        return concat(
            prefixes, 
            'construct {',
                uri(individual) + ' nice:isSupportedBy ?st ',
            '}',
            'WHERE {',
                uri(individual) + ' nice:isAbout ?t .',
                '?t a nice:Topic .',
                uri(individual) + ' a nice:Recommendation .',
                '?st nice:isAbout ?t .',
                '?st a nice:EvidenceStatement .',
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

var uris = require('./uris.js');

var concat = function(arr) {
    var r = [];

    for(var i = 0;i !== arr.length;i++){
        r += arr[i] + '\r\n';
    }

    return r;
};

var uri = function(s) {
    return '<' + s +  '>';
};

var prefixes = concat([
    'prefix nice:' + uri(uris.nice.prefix),
    'prefix oa:' + uri(uris.oa.prefix),
    'prefix content:' + uri(uris.cnt.prefix),
    'prefix prov:' + uri(uris.prov.prefix),
    'prefix owl:' + uri(uris.owl.prefix),
    'prefix rdfs:' + uri(uris.rdfs.prefix)
]);

module.exports = {
    tagsForType : function(type) {
	return prefixed + concat([
	    
	]);
    },
    annotatedContent : function(cnt) {
        return prefixes + concat([
        'construct {',
        uri(cnt) + ' content:chars ?cnt .',
        '?ann oa:hasTarget ' + uri(cnt) + ' .',
        '?ann oa:start ?st .',
        '?ann oa:end ?end .',
        '',
        '}',
        'where {',
        uri(cnt) + ' a content:ContentAsText .',
        uri(cnt) + ' content:chars ?cnt .',
        '?ann oa:hasTarget ' + uri(cnt) + ' . ',
        '?ann a owl:NamedIndividual .',
        '?ann oa:hasSource ?src .',
        '?src a owl:NamedIndividual .',
        '?ann oa:hasSelector ?slt .',
        '?slt a owl:NamedIndividual .',
        '?slt oa:start ?st .',
        '?slt oa:end ?end .',
        '}'
        ]);
    },
    contentMatching : function(type,tag) {
        return prefixes + concat([
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
        ]);
    }
};

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

var prefxies = concat([
    'prefix nice:' + uri(uris.nice.prefix),
    'prexix oa:' + uri(uris.oa.prefix),
    'prexix content:' + uri(uris.cnt.prefix),
    'prexix prov:' + uri(uris.prov.prefix),
    'prexix owl:' + uri(uris.owl.prefix),
    'prexix rdfs:' + uri(uris.rdfs.prefix)
]);


module.exports = {
    annotatedContent : function(cnt) {
        return concat([
	'construct {',
	uri(cnt) + ' content:chars ?cnt .',
	'?ann oa:hasTarget ' + uri(cnt) + ' .',
	'?ann nice:semanticTag ?tag .',
	'?ann oa:start ?st .',
	'?ann oa:end ?end .',
	'',
	'}',
	'where {',
	uri(cnt) + ' a content:ContentAsText .',
	uri(cnt) + ' content:chars ?cnt .',
	'?ann oa:hasTarget ' + uri(cnt) + ' . ',
	'?ann oa:hasSource ?src .',
	'?ann oa:hasSelector ?slt .',
	'?slt oa:start ?st .',
	'?slt oa:end ?end .',
	'}'
        ]);
    },
    contentMatching : function(type,tag) {
	return concat([
	'construct {',
	'?rec content:chars ?cnt .',
	'}',
	'where {',
	'?rec a ' + uri(type) + ' .',
	'?rec a content:ContentAsText .',
	'?rec content:chars ?cnt .',
	'?ann oa:hasTarget ?rec . ',
	'?ann oa:hasBody/content:chars "' + tag + ' " .',
	'}'
	]);
    }
};

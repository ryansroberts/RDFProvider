var crc = require('crc'),
    colour = require('rgb'),
    domify = require('domify')

function spannerify(content, annotations) {
    var spannered = "",
        chk = new crc.CRC32().update(content).checksum(),
        style = "";
    
    for(var i = 0; i != content.length;i++) {
        spannered += '<span class="char' + i + '">' + content[i] + '</span>';
    }

    style += '<style>'; 
    for(an in annotations) {
        var start = annotations[an].selectors[1] + 1,
            end = annotations[an].selectors[0] + 1;

        annotationKey(an,annotations[an]);

        for(var i = start;i != end + 1;i++){
            style += '.annotated' + chk + ' .char' + i + '{ border-bottom: solid ' + conceptColor(an,annotations[an].concept) + ' 2px; }\r\n'; 
        }
    }
    style += '</style>'

    document.getElementsByTagName('head')[0].appendChild(domify(style));
   

    return '<div class="annotated' + chk + ' ">' + spannered + '</div>';
}

function conceptColor(uri, text) {
    return colour('hsl(' + new crc.CRC8().update(text).checksum() + ',' +  new crc.CRC8().update(uri).checksum() % 50 + ',50)');
}

function listFor(annotation) {
    if(annotation.mesh.length) return "meshkeys";
    if(annotation.drugbank.length) return "drugbankkeys";
    return "annotationkeys";
}

function annotationKey(uri, annotation) {
    var k = "key_" + new crc.CRC8().update(uri).checksum();
    if (document.getElementById(k)) return;


   
    var li = document.getElementById(listFor(annotation)).appendChild(domify(
        '<li id="' + k + '" style =" display: inline-block; padding:0 10px; background: ' + conceptColor(uri, annotation.concept) + '"></li>'
    ));

    console.table(annotation);

    var freebaseUri = uri.replace("http://rdf.freebase.com/ns/m.", "http://freebase.com/m/");

    li.appendChild(domify('<a style="color:#fff; text-decoration: none;" target="new" href="' + freebaseUri + '">' + annotation.concept + '</a>'))

    var meshUri = 'http://www.nlm.nih.gov/cgi/mesh/2011/MB_cgi?field=uid&term=';

    if (annotation.mesh.length) {
        li.appendChild(domify('<a style="color:#fff; text-decoration: none;" target="new" href="' + meshUri + '"><sub>MeSH</sub></a>'))
    }

    if (annotation.drugbank.length) {
        li.appendChild(domify('<a style="color:#fff; text-decoration: none;" target="new" href="http://www.drugbank.ca/drugs/' + '"><sub>Drugbank</sub></a>'))
    }
}

module.exports = spannerify;

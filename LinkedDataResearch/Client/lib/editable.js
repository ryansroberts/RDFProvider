var annotatedContent = require('./annotated-content.js'),
    domify = require('domify'),
    spannerify = require('./spannerify.js');




function editable(element, uri) {

    element.setAttribute('contenteditable', true);
    element.setAttribute('uri', uri);

    element.addEventListener('keyup', function(e) {
        if (e.which === 13 && !e.shiftKey) {
            var r = new XMLHttpRequest();
            var m = window.encodeURI("s=" + uri + "&o=" + element.textContent);
            r.open('POST', '/updatecontent', true);
            r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                    annotatedContent(uri, function(err, text, annotations) {
                        var newEditable = editable(domify(spannerify(text,annotations)),uri);
                        element.parentElement.replaceChild(newEditable,element);
                    });
                }
            };

            r.send(m);
        }
    });

    return element;
}


module.exports = editable;

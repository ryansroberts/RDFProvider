var annotatedContent = require('./annotated-content.js'),
    domify = require('domify'),
    spannerify = require('./spannerify.js'),
    shiny = require('./shiny.js');





function editable(element, uri) {

    element.setAttribute('contenteditable', true);
    element.setAttribute('uri', uri);


    
    element.addEventListener('keyup', function(e) {
        if (e.which === 13 && !e.shiftKey) {
            var r = new XMLHttpRequest();
            var m = window.encodeURI("s=" + uri + "&o=" + element.textContent);
            r.open('POST', '/updatecontent', true);
            r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            debugger

            var overlay = element.parentElement.replaceChild(domify('<div><h2 style="width:100%">Annotating </h2> <div id="loader"><div id="top"></div><div id="bottom"></div><div id="line"></div></div>'), element);

            r.onreadystatechange = function() {
                if (r.readyState == 4 && r.status == 200) {
                    annotatedContent(uri, function(err, text, annotations) {
                        var newEditable = editable(domify(spannerify(text,annotations)),uri);
                        overlay.parentElement.replaceChild(newEditable,overlay);
                    });
                }
            };

            r.send(m);
        }
    });

    return element;
}


module.exports = editable;

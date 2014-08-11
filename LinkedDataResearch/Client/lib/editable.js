

module.exports = function (element,uri,reload) {
    
    element.setAttribute('contenteditable',true);
    element.setAttribute('uri',uri);
    
    element.addEventListener('keyup',function(e) {
        if(e.which = 13 && e.shiftKey ){
            var r = new XMLHttpRequest();
            var m = window.encodeURI("s=" + uri + "&o=" + element.textContent);
            r.open('POST','/updatecontent',true);
            r.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            r.send(m,function(res) {
               
                element.parentElement.replaceChild(
                    reload(),element);
            });
        }
    });

    return element;
}

var defaultURL = 'nhsevidence.github.io/NICE.Bootstrap/'; //<---- CHANGE TO YOUR WEBSITE URL

//function to check load state of each frame
function allLoaded() {
    var results = [];

    $('iframe')
        .each(function() {
            if(!$(this).data('loaded')) {
                results.push( false );
            }
        });

    var result = (results.length > 0) ? false : true;

    return result;
};

function loadPage($frame, url) {
  if ( url.substr(0,7) !== 'http://' && url.substr(0,8) !== 'https://' && url.substr(0, 7) !== 'file://' ) {
      url = 'http://' + url;
  }

  $('iframe').not( $frame ).attr('src', url).data('loaded', false);
}

(function () {

    $(document)
        .on('change', 'input[name="viewport-ratio"]', function() {
            $('#frames')[ $('input[name="viewport-ratio"]:checked').val() === 'normal' ? 'addClass' : 'removeClass' ]('widthOnly');
        })
        .on('submit', 'form', function( e ) {
            var url = $('#url input[type=text]').val();

            if ( url ) {
                location.hash = '#' + encodeURI( url );

                loadPage( '', url );
            }

            e.preventDefault();
        })
        .on('load', 'iframe', function() {
            var $this = $(this);
            var url = '';
            var error = false;

            try {
                url = $this.contents().get(0).location.href;
            } catch(e) {
                var hash = decodeURI( location.hash.replace('#', '') );

                error = true;

                url = hash !== '' ? hash : defaultURL;
            }

            //load other pages with the same URL
            if ( allLoaded() ) {
                if ( error ) {
                    alert('Browsers prevent navigation from inside iframes across domains.\nPlease use the textbox at the top for external sites.');
                } else {
                    loadPage( $this, url );
                }
            }

            //when frame loads, hide loader graphic
            else {
                error = false;

                $(this).data( 'loaded', true );
            }
        });
})();


//when document loads
$(function() {
    var hash = decodeURI( location.hash.replace('#', '') )
      , url = hash !== '' ? hash : defaultURL;

    //query string
    var qsArray = window.location.href.split('?');
    var qs = qsArray[qsArray.length-1];

    $('#url input[type=text]').val( url );

    //set slidable div width
    $('#frames #inner')
        .css('width', function() {
            var width = 0;

            $('.frame').each(function(){
                width += $(this).outerWidth() + 20 + 15
            });

            return width;
        });

    loadPage( '', url );

});

var uris = require('./uris.js'),
    Router = require('halogen-route').Router;
    app = new Router;

app
  .route('/evidence-statements/*')
    .on('activate', require('./routes/evidence-statements.js') )
  .route('/studies/*')
    .on('activate', function (ctx, uri){

      uri = uri.replace('/studies/', '');

    })
  .route('/')
    .on('activate', require('./routes/home.js') )
    .on('deactivate', require('./routes/home.js').cleanUp )
  .route('')
    .on('activate', function(){
      app.navigateTo('/');      
    })
  .listen();

var uris = require('./uris.js'),
    Router = require('halogen-route').Router;
    app = new Router;

app
  .route('/evidence-statements/*')
    .on('activate', require('./routes/evidence-statements.js') )
    .on('deactivate', require('./routes/evidence-statements.js').cleanUp )
  .route('/studies/*')
    .on('activate', function (ctx, uri){

      uri = uri.replace('/studies/', '');

      console.log(uri);

    })
  .route('/')
    .on('activate', require('./routes/home.js') )
    .on('deactivate', require('./routes/home.js').cleanUp )
  .listen();

app.navigateTo('/');
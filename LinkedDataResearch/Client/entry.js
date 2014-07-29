var uris = require('./uris.js'),
    Router = require('halogen-route').Router;
    app = new Router;

app
  .route('/evidence-statements/*')
    .on('activate', function (ctx, uri){

      uri = uri.replace('/evidence-statements/', '');

      alert(uri);

    })
    //.on('deactivate', function (ctx, uri){
    //  // clean up? 
    //
    //})
  .route('/studies/*')
    .on('activate', function (ctx, uri){

      uri = uri.replace('/studies/', '');

      alert(uri);

    })
  .route('/')
    .on('activate', require('./routes/home.js') )
    .on('deactivate', require('./routes/home.js').cleanUp )
  .listen();

app.navigateTo('/');
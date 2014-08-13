var uris = require('./uris.js'),
    Router = require('halogen-route').Router,
    app = new Router;



app
  .route('/evidence-statements/*')
    .on('activate', require('./routes/evidence-statements.js') )
  .route('/')
    .on('activate', require('./routes/home.js') )
  .route('')
    .on('activate', function (){
      app.navigateTo('/');      
    })
  .listen();

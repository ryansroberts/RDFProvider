var uriTemplate = require('uritemplate');
var http = require('http');

function SparkleSparkleGo ( uri ){

  this.rootUri = uriTemplate.parse(uri);
  return this;

}

SparkleSparkleGo.prototype = {

  query : function setQuery(query){

    var uri = this.rootUri.expand({ query : {
        query : query
      }
    });

    return {

      execute : function executeQuery(callback){

        http.get({ path : uri}, function (res){

          var buffer = '';

          res.on('data', function (data){

            buffer += data;

          });

          res.on('end', function (){

            callback(false, buffer);

          });

        });

      }

    };

  }

};

module.exports = SparkleSparkleGo;


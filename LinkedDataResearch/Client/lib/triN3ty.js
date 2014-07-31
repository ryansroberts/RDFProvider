var N3 = require('n3');

module.exports = function (done, error){

  return function (err, data){

    if (!err){
      var parser = new N3.Parser();
      var triples = [];
      parser.parse(data, function (error, triple, prefixes){

        if (triple){
          triples.push(triple);
        } else {
          done (false, triples);
        }

      });
    } else {
        done (err);
    }

  }

};
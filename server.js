var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Species = require('./model/Species');
var db = 'mongodb://localhost/testDB';
var port = 8080;

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('You are very welcome');
});


// find all species, method = GET
app.get('/species', function(req, res) {
  console.log('getting all species');
  res.set('Content-Type', 'application/json')
  Species.find({})
  .exec(function(err, species){
    if(err){
      res.send('error has occoured');
    }else{
      console.log(species)
      res.json(species);
    }
  });
});

// find one species, method = GET
app.get('/species/:id', function(req, res) {
  console.log('getting one species');
  Species.findOne({
    _id: req.params.id
  })
  .exec(function(err, species) {
    if(err) {
      res.send('error occured');
    } else {
      console.log(species);
      res.json(species);
    }
  });
});

//save one species, method = POST
app.post('/species', function(req, res) {
  console.log('posting one species');

  var newSpecies = new Species();

  newSpecies.name = req.body.name;
  newSpecies.image = req.body.image;

  newSpecies.save(function(err, species){
    if(err){
      res.send('error saving species');
    } else{
      console.log(species);
      res.send(species);
    }
  })
});

// update a species, method = PUT
app.put('/species/:id', function(req, res) {
  Species.findOneAndUpdate({
      _id: req.params.id
    },
    {$set: {name: req.body.name,
            image: req.body.image}},
    {upsert: true},
    function(err, newSpecies) {
      if(err) {
        console.log('error occured');
      } else{
        console.log(newSpecies);
        res.send(newSpecies);
      }
    });
});

// delete a species, method = DELETE
app.delete('/species/:id', function(req, res) {
  Species.findOneAndRemove({
    _id: req.params.id
  }, function(err, species) {
    if(err) {
      res.send('error occured during deleting a species');
    }else {
      console.log(species);
      res.status(204);
    }
  })
})


app.listen(port, function() {
  console.log('app listening on port ' + port);
});

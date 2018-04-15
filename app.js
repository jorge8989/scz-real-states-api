var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
Property = require('./models/property');

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.set('port', process.env.port || 3010);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/scz-real-states');
var db = mongoose.connection;

app.get('/', function(req, res) {
  res.send('scz-real-states API');
});

app.listen(app.get('port'), function(){
  console.log('app running on port ' + app.get('port'));
});

app.get('/api/properties', function(req, res) {
  Property.getProperties(function(err, properties) {
    if (err) throw err;
    res.json({"data": properties });
  });
})

app.get('/api/properties/:_id', function(req, res) {
  Property.findProperty(req.params._id, function(err, property) {
    if (err) throw err;
    res.json({"data": property});
  });
});

app.post('/api/properties', function(req, res) {
  Property.addProperty(req.body, function(err, property) {
    if (err) throw err;
    res.json({"data": property});
  });
});

app.delete('/api/properties/:_id', function(req, res) {
  Property.removeProperty(req.params._id, function(err, property) {
    if (err) throw err;
    res.json(property);
  });
});

app.put('/api/properties/:_id', function(req, res) {
  Property.updateProperty(req.params._id, req.body, function(err, property) {
    if (err) throw err;
    res.json({"data": property});
  });
});

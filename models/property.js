var mongoose = require('mongoose');

var propertySchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  create_date: {
    type: Date,
    default: Date.now
  },
});

var Property = module.exports = mongoose.model('Property', propertySchema);

module.exports.getProperties = function(callback, limit) {
  Property.find(callback).limit(limit);
}

module.exports.addProperty = function(property, callback) {
  Property.create(property, callback);
}

module.exports.removeProperty = function(id, callback) {
  var query = {_id: id};
  Property.remove(query, callback);
}

module.exports.findProperty = function(id, callback) {
  var query = {_id: id};
  Property.findById(query, callback);
}

module.exports.updateProperty = function(id, property, callback) {
  var query = {_id: id};
  Property.findOneAndUpdate(query, property, {new: true}, callback);
}

var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
  description: {
    type: String,
    required: false
  },
  photoUrl: {
    type: String,
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  },
  create_date: {
    type: Date,
    default: Date.now
  },
});

var Photo = module.exports = mongoose.model('Photo', photoSchema);

module.exports.getPhotos = function(callback, limit) {
  Photo.find(callback).limit(limit);
}

module.exports.addPhoto = function(photo, callback) {
  Photo.create(photo, callback);
}

module.exports.removePhoto = function(id, callback) {
  var query = {_id: id};
  Photo.remove(query, callback);
}

module.exports.findPhoto = function(id, callback) {
  var query = {_id: id};
  Photo.findById(query, callback);
}

module.exports.updatePhoto = function(id, photo, callback) {
  var query = {_id: id};
  Photo.findOneAndUpdate(query, photo, {new: true}, callback);
}

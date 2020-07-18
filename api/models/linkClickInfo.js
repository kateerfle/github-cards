let mongoose = require('mongoose');
const { Double } = require('mongodb');

let linkClickInfoSchema = new mongoose.Schema({
  url: String,
  name: String,
  date: Date,
  location: Double //not sure what to put here for type
});

linkClickInfoSchema.pre('save', function (next) {
    let now = Date.now()
    this.date = now
    // Call the next function in the pre-save chain
    next();    
  });

linkClickInfoSchema.methods.toJSONFor = function() {
  return {
    url: this.url,
    name: this.name,
    date: this.date,
    location: this.location
  };
};

module.exports = mongoose.model('ClickInfo', linkClickInfoSchema)

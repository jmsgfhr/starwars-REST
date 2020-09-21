const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlanetSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  weather: { type: String, required: true, max: 100 },
  terrain: { type: String, required: true, max: 100 },
  episodes: { type: Number, required: false },
});

// Export the model
module.exports = mongoose.model('Planet', PlanetSchema);

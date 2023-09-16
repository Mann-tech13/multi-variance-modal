const mongoose = require("mongoose");

const colorChangeSchema = new mongoose.Schema({
  javascriptCode: String,
});

const Variance = mongoose.model("variance", colorChangeSchema);

module.exports = Variance;
const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});

const HomeModel = mongoose.model("Home", HomeSchema);

// module.exports = HomeModel;

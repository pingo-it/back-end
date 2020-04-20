const mongoose = require("mongoose");

const galerieSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  image: [
    {
      type: String,
      // required: true,
    },
  ],
});

module.exports = mongoose.model("image", galerieSchema);

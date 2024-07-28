const mongoose = require('mongoose');

const TextSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const Text = mongoose.model('Text', TextSchema);

module.exports = Text;

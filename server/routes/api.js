const express = require('express');
const router = express.Router();
const Text = require('../models/textModel');

// Route to get text content
router.get('/api/text', async (req, res) => {
  try {
    const textData = await Text.findOne({});
    res.json(textData ? textData.content : '');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to save text content
router.post('/api/text', async (req, res) => {
  const { content } = req.body;
  try {
    const textData = await Text.findOneAndUpdate({}, { content }, { upsert: true, new: true });
    res.json(textData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

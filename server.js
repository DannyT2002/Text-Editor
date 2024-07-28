const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const apiRoutes = require('./server/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Use API routes
app.use('/', apiRoutes);

// All other routes should serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

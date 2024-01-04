// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Importing routes
const apiRoutes = require('./apiRoutes');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/eduaid', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use apiRoutes
app.use('/api', apiRoutes);

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Catch all for handling React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the API server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// Importing required modules
const express = require('express');
const router = express.Router();

// Importing models
const User = require('./userModel');
const Resource = require('./resourceModel');

// Importing OpenAI module
const openai = require('./openai');

// Route for user registration
router.post('/register', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for user login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route for getting educational resources
router.get('/resources', async (req, res) => {
  try {
    const resources = await Resource.find({});
    res.send(resources);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for asking questions to the AI
router.post('/ask', async (req, res) => {
  try {
    const response = await openai.ask(req.body.question);
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route for getting user progress
router.get('/progress/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new Error('User not found');
    }
    res.send(user.progress);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

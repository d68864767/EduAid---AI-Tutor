// Importing required module
const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// OpenAI API endpoint
const OPENAI_API = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Function to ask a question to the AI
const ask = async (question) => {
  try {
    const response = await axios.post(
      OPENAI_API,
      {
        prompt: question,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].text.trim();
    } else {
      throw new Error('No response from OpenAI');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Export the ask function
module.exports = {
  ask
};

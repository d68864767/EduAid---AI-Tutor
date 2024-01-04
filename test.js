// Importing required modules
const request = require('supertest');
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

// Use apiRoutes
app.use('/api', apiRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/eduaid_test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test user registration', () => {
    test('It should create a new user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'testuser@test.com'
            });
        expect(response.statusCode).toBe(201);
    });
});

describe('Test user login', () => {
    test('It should login the user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'testuser@test.com',
                password: 'testpassword'
            });
        expect(response.statusCode).toBe(200);
    });
});

describe('Test getting educational resources', () => {
    test('It should get all resources', async () => {
        const response = await request(app).get('/api/resources');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test asking questions to the AI', () => {
    test('It should get a response from the AI', async () => {
        const response = await request(app)
            .post('/api/ask')
            .send({
                question: 'What is the capital of France?'
            });
        expect(response.statusCode).toBe(200);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

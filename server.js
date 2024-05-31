const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const path = require('path');

// Set the environment variable programmatically to the JSON key file in the same directory
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(__dirname, 'psqlreactagent-ibki-b78752511b3e.json'); // Replace with the actual name of your JSON key file

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reactproject',
  password: 'connectioni',
  port: 5432,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err.stack));

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

// Existing routes
app.get('/api/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      console.error('Error executing customers query:', error.stack);
      res.status(500).json({ error: 'An error occurred while fetching customers' });
      return;
    }
    res.status(200).json(results.rows);
  });
});

app.get('/api/orders', (req, res) => {
  pool.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      console.error('Error executing orders query:', error.stack);
      res.status(500).json({ error: 'An error occurred while fetching orders' });
      return;
    }
    res.status(200).json(results.rows);
  });
});

// Dialogflow setup
const projectId = 'psqlreactagent-ibki'; // Replace with your Dialogflow project ID

app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;
  const sessionId = uuid.v4(); // Generate a new session ID for each conversation
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ reply: result.fulfillmentText });
  } catch (error) {
    console.error('Dialogflow API error: ', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

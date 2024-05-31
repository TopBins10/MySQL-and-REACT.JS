const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dialogflow = require('dialogflow');
const { v4: uuidv4 } = require('uuid');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reactproject',
  password: '*********',
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
const projectId = 'my-dialogflow-agent';

app.post('/api/chatbot', async (req, res) => {
  const { message } = req.body;
  const sessionId = uuidv4();
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

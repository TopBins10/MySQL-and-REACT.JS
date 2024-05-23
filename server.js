const { Pool } = require('pg');
const express = require('express');
const cors = require('cors');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'reactproject',
  password: 'VMessi#10',
  port: 5432,
});

pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database:', err.stack));

const app = express();
app.use(cors());

const port = 3001;

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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
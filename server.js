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

const app = express();
app.use(cors());

const port = 3001; // Add this line

app.get('/api/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

app.get('/api/orders', (req, res) => {
  pool.query('SELECT * FROM orders', (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// Start the server
app.listen(port, () => { // Use the port variable here
  console.log(`Server running on port ${port}`);
});


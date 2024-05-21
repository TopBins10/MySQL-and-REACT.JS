const express = require('express');
const mysql = require('mysql2');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(cors());

app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'VMessi#10',
  database: 'demo_app'
});

// Test MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

// Define a route to fetch data from the Customers table
app.get('/api/customers', (req, res) => {
    connection.query('SELECT * FROM Customers', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  // Define a route to fetch data from the Orders table
  app.get('/api/orders', (req, res) => {
    connection.query('SELECT * FROM Orders', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

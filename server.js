const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Database configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'akashbhade',
  password: 'akash',
  port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const submission_date = new Date().toISOString();

  pool.query('INSERT INTO contact_form_submissions (name, email, message, submission_date) VALUES ($1, $2, $3, $4)', 
             [name, email, message, submission_date], 
             (error, results) => {
    if (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    } else {
      console.log('Data saved successfully');
      res.status(200).send('Data saved successfully');
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'Ksbn046497', // Your MySQL password
  database: 'restaurant' // The name of your database
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL!');
  }
});

// Handle POST requests to /reserve
app.post('/reserve', (req, res) => {
  const { name, email, phone, date, time, guests } = req.body;

  const query = `INSERT INTO reservations (name, email, phone, date, time, guests)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, email, phone, date, time, guests], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error saving reservation.');
    } else {
      res.status(200).send('Reservation saved successfully!');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

var mysql = require('mysql');
require('dotenv').config()

var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  port     : "3306"
});
connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });
  
  connection.end();

const express = require('express')
const app = express()
app.get('/', (req, res) => {
  res.send('This is a different message!')
})
app.listen(3001, () => console.log('Server running on port 3001'))

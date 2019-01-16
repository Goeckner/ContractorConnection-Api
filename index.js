var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "contractorconnectionrds.cj0ol8bj3xlc.us-east-2.rds.amazonaws.com",
  user     : "Admin",
  password : "ContractorConnection",
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

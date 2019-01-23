const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./app/routes/appRoutes')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('This is a different message!')
})
app.listen(3001, () => console.log('Server running on port 3001'))
routes(app)

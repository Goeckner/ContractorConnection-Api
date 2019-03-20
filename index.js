const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./app/routes/appRoutes')
const cors = require('cors')
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({secret: 'secretive', key: 'sid'}))

app.use(cors())

app.get('/', (req, res) => {
  res.send('This is a different message!')
})

// var httpsServer = https.createServer(credentials, app)
// httpsServer.listen(3001, () => console.log('Server running on port 3001'));
 app.listen(3001, () => console.log('Server running on port 3001'))

routes(app)

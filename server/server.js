const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
const cors = require('cors')
const path = require('path')

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions)) //cors

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  //res.send('get teg')
});

app.use('/api/todos', require('./controllers/todos'));
app.use('/api/users', require('./controllers/users'));
app.use('/api/photos', require('./controllers/photos'));

app.listen(process.env.PORT || 5000, () => console.log('app on port 5000!'));
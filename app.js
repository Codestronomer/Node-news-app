const express = require('express');
const newsRouter = require('./src/routes/news')
const config = require('config');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.Port || 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use(bodyParser.urlencoded({ extended: false }))

// Templating Engine
app.set('views', './src/views')
app.set('view engine', 'ejs')

// Routes
app.use('/', newsRouter)

// Listening on port 3000
app.listen(port, () => console.log(`Listening on Port ${port}`))
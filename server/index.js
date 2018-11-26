const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const i18n = require('i18n');
const http = require('http');

const keys = require('./config');
const router = require('./router');

const app = express();

i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '/locales'),
  objectNotation: true,
});

// db
mongoose.set('useCreateIndex', true);
mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

// middleware
app.use(i18n.init);
app.use(morgan('combined'));
app.use(bodyParser.json());

// routes
router(app);

// server init
const port = process.env.PORT || 3001;

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'testing') {
  server.listen(port, () => console.log(`Running on port ${port}`));
}

module.exports = app;

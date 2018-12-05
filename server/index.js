const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const i18n = require('i18n');
const http = require('http');

const keys = require('./config');
const baseRouter = require('./router');
const apiRouters = require('./router/apiRouters');

const app = express();

global.__basedir = __dirname;

i18n.configure({
  locales: ['es', 'en'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '/locales'),
});

// db
mongoose.set('useCreateIndex', true);
mongoose.connect(
  keys.mongoUri,
  { useNewUrlParser: true },
);

// middleware
app.use(i18n.init);
app.use(morgan('combined'));
app.use(bodyParser.json());

// routes
baseRouter(app);
apiRouters(app);

// server init
const port = process.env.PORT || 3001;

const server = http.createServer(app);

if (process.env.NODE_ENV !== 'testing') {
  server.listen(port, () => console.log(`Running on port ${port}`));
}

module.exports = app;

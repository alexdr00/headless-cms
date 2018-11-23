const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const keys = require('./config');
const router = require('./router');

const app = express();

mongoose.set('useCreateIndex', true);

if (process.env.NODE_ENV !== 'testing') {
  mongoose.connect(keys.mongoUri, { useNewUrlParser: true });
}

// middleware
app.use(morgan('combined'));
app.use(bodyParser.json());

// routes
router(app);

// server init
const port = process.env.PORT || 3001;

const serverConnection = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


module.exports = { serverConnection, app };

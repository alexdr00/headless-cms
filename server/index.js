const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config');
const router = require('./router');

const app = express();

mongoose.connect(keys.mongoUri, { useNewUrlParser: true });

// middleware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

// routes
router(app);

// server init
const port = process.env.PORT || 3001;

app.listen(port);

module.exports = app;

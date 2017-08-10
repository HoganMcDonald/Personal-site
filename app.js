//env vars
require('dotenv').config({path:'./.env'});

// requires
const bodyParser = require('body-parser'),
  express = require('express'),
  mongoose = require('mongoose'),
  session = require('express-session'),
  passport = require('./modules/strategies/userStrategy');

const app = express();

//routes
const index = require('./modules/routes/index');

//uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// create session and tell app to use it
app.use(session({
  secret: process.env.SESSION_SECRET,
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: { maxage: 43200000, secure: false }
}));

// passport set up
app.use(passport.initialize());
app.use(passport.session());

//use routes
app.use('/', index);

// mongo set up
const MongoURI = process.env.MONGODB_URI
const MongoDB = mongoose.connect(MongoURI).connection;
MongoDB.on('error', ( err ) => {
  console.log('mongodb connection error:', err);
});
MongoDB.once('open', () => {
  console.log('mongodb connection is open');
});

// server
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log('Server listening on port', server.address().port));

const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const passport = require('passport');
const debug = require('debug')('server') // debug logger
const morgan = require('morgan')         // request logger

const userRouter = require('./routes/user');
const characterRouter = require('./routes/character');
const spellRouter = require('./routes/spell');
const searchRouter = require('./routes/search');
const jwtStrategy = require('./utils/auth');

const app = express();
debug('booting %o', 'Compendium API');

const corsOptions = {
  origin: process.env.CORS_WHITELIST,
  // function (origin, callback) {
  //   if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== "production" && !origin)) {
  //     callback(null, true)
  //   } else {
  //     callback('Not allowed by CORS')
  //   }
  // },
  credentials: true,
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

passport.use(jwtStrategy);

// Routes
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/character', passport.authenticate('jwt', { session: false }), characterRouter);
app.use('/spell', passport.authenticate('jwt', { session: false }), spellRouter);
app.use('/search', passport.authenticate('jwt', { session: false }), searchRouter);

// Default route
app.use('/', function(req, res) {
  res.send('Compendium api works!');
});

module.exports = app;

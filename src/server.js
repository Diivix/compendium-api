require('dotenv').config()

const express = require('express');
const http = require('http');
const helmet = require('helmet');
// const cors = require('cors')
const passport = require('passport');
const debug = require('debug')('server') // debug logger
const morgan = require('morgan')         // request logger

const userRouter = require('./routes/user');
const characterRouter = require('./routes/characters');
// const spellsRouter = require('./routes/spells');
const jwtStrategy = require('./utils/jwtAuth');

const app = express();
debug('booting %o', 'Compendium API');

// const corsWhitelist = process.env.CORS_WHITELIST.split(",");
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (corsWhitelist.indexOf(origin) !== -1 || (process.env.NODE_ENV !== "production" && !origin)) {
//       callback(null, true)
//     } else {
//       callback('Not allowed by CORS')
//     }
//   }
// }

// app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

passport.use(jwtStrategy);

// Routes
app.use('/user', passport.authenticate('jwt', { session: false }), userRouter);
app.use('/characters', passport.authenticate('jwt', { session: false }), characterRouter);
// app.use('/spells', passport.authenticate('jwt', { session: false }), spellsRouter);

// Default route
app.use('/', function(req, res) {
  res.send('Compendium api works!');
});

http.createServer(app).listen(process.env.PORT);
// https.createServer({
//   key: fs.readFileSync(process.env.SERVER_KEY),
//   cert: fs.readFileSync(process.env.SERVER_CERT)
// }, app).listen(process.env.PORT);

debug('Server listening on port ' + process.env.PORT);

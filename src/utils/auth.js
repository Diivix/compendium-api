const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('../models');
const fs = require('fs');
const debug = require('debug')('utils:jwtAuth'); // debug logger

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
opts.secretOrKey = fs.readFileSync(process.env.PUBLIC_KEY);
opts.issuer = process.env.JWT_ISSUER;
opts.audience = process.env.JWT_AUDIENCE;
opts.algorithm = ["RS256"];

const strategy = new JwtStrategy(opts, function(jwt_payload, done) {
  debug('Authenticating with Passport jwt strategy');
  debug('JWT payload is: %o', JSON.stringify(jwt_payload));
  db.users
    .findOrCreate({ where: { email: jwt_payload.email } })
    .then(([user, created]) => {
      if(created) {
        debug('User created, new user is %o', user.email);
      } else {
        debug('User found, existing user is %o', user.email);
      }
      return done(null, user);
    })
    .catch(err => {
      debug(err);
      return done(err, false);
    });
});

module.exports = strategy;

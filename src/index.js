const http = require('http');
const debug = require('debug')('index') // debug logger
const server = require('./server');

http.createServer(server).listen(process.env.PORT);
debug('Server listening on port ' + process.env.PORT);

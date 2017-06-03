#!/usr/bin/env node

const serveDir = (process.argv.length > 2 ? process.argv[2] : process.cwd());
server = require('../lib/server.js')(serveDir);

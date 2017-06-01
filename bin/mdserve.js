// libraries
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
// own
const md = require('markdown-it')(require('../lib/highlight-code')());

// set templating engine
app.set('view engine', 'pug');

// emit socket message when file content change
function watchFile(fileName){
  watchFile.watchers = watchFile.watchers || [];

  if (watchFile.watchers[fileName])
	  return;

  watchFile.watchers[fileName] = chokidar.watch(fileName);
  watchFile.watchers[fileName].on('change', (path) => {
	  openFile(fileName, (err, data) => {
	    if (!err)
		    io.emit(fileName, md.render(data));
	  });
  });
}

// open file from file system
function openFile(fileName, callback){
  fs.readFile(fileName, 'utf8', callback);
}

server.listen(2212);

io.on('connection', () => {
  console.log('new client connected');
});

// share hightlight.js files
const dir = path.join(__dirname, '..', 'node_modules');
app.use('/static', express.static(dir)) ;

// route that opens markdown file
app.get('/:file', (req, res) => {
  let fileName = path.join(__dirname, req.params.file);
  openFile(fileName, (err, data) => {
	  if (err){
	    res.status(404).send('Not found');
	  } else {
	    res.render('index', {
		    fileName: fileName,
		    content: md.render(data)
	    });
	    watchFile(fileName);
	  }
  });
});

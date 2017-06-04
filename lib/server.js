// libraries
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const md = require('markdown-it')(require('./highlight-code')());

module.exports = (baseDir) =>  {

  // set templating engine
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '..', 'views'));

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
  const assets =  'assets';
  app.use('/static', express.static(path.join(__dirname, '..', assets)));

  // route that opens markdown file
  app.get('/:file', (req, res) => {
    let fileName = path.join(baseDir, req.params.file);
    openFile(fileName, (err, data) => {
	    if (err){
	      res.status(404).send('Not found');
	    } else {
        // check if file is markdown
        if (fileName.match(/^.*md$/)) {
	        res.render('index', {
		        fileName: fileName,
		        content: md.render(data)
	        });
	        watchFile(fileName);
        } else {
          res.sendFile(fileName);
        }
	    }
    });
  });
  return app;
}

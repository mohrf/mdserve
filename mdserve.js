// libraries
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fs = require('fs');
const chokidar = require('chokidar');
const md = require('markdown-it')(); 

// set templating engine
app.set('view engine', 'pug'); 

// file watchers
const watchers = []; 

/** 
 * Watch fileName and emit socket
 * message with file content 
 * change.
 */
function watchFile(fileName){
    if (watchers[fileName])
	return;

    watchers[fileName] = chokidar.watch(fileName); 
    watchers[fileName].on('change', (path) => {
	openFile(fileName, (err, data) => { 
	    if (!err)
		io.emit(fileName, md.render(data));
	}); 
    });
}
/** 
 * Open file from file system 
 */
function openFile(fileName, callback){
    fs.readFile(fileName, 'utf8', callback); 
} 

server.listen(2212);

io.on('connection', () => {
    console.log('new client connected');
}); 

// Route that opens markdown file
app.get('/:file', (req, res) => { 
    let fileName = __dirname + '/' + req.params.file;
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




// start up
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var server = http;
app.set('port', (process.env.PORT || 3333));
app.use('/public', express.static(__dirname + '/public'));
app.get('/', function(request, response) {
	response.sendFile('pirata2.html', {
		root : __dirname
	});
});
app.get('*', function(request, response) {
	response.sendFile('404.html', {
		root : __dirname
	});
});
var users = []

io.on('connection', function(socket){
    addUser(socket.id, socket);
    socket.on('pause_all', function(){
        pauseAll();
    });
    socket.on('resume_all', function(position){
        resumeAll(position);
    });
    socket.on('disconnect', function(){
        removeUser(socket.id);
    })
});

function pauseAll(){
    for (var i=0;i<users.length;i++){
        users[i]._s.emit('pause');
    }
}

function resumeAll(position){
    for (var i=0;i<users.length;i++){
        users[i]._s.emit('resume', position);
    }
}

function addUser(id, socket){
    var newUser = {};
    newUser['id'] = id;
    newUser['_s'] = socket;
    users.push(newUser);
}

function removeUser(id){
    for (var i=0;i<users.length;i++){
        if(users[i].id == socket.id){
            users.splice(i,1);
            break;
        }
    }
}

http.listen(app.get('port'), function() {
	console.log('listening on ' + app.get('port'));
});
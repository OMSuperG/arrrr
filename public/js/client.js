var socket = io();

function pauseAll() {
    socket.emit('pause_all', {})
}

socket.on('algo', function(data){
    //update ui
});
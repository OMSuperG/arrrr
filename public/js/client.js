var socket = io.connect();
var getVideo = document.getElementById("pirata");

function resumeAll() {
    socket.emit('resume_all', position)
}

function pauseAll() {
    socket.emit('pause_all', {})
}

function changeSource(vid) {
    var source = document.getElementById("fuente");
    source.setAttribute('src', vid);
    getVideo.load()
}

function openFullscreen() {
    var elem = document.getElementById("pirata");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

socket.on('resume', function(position){
    getVideo.currentTime = position
    getVideo.play();
});

socket.on('pause', function(){
    getVideo.pause();
});
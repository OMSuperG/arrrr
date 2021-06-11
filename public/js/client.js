var socket = io.connect();

function resumeAll() {
    var getVideo = document.getElementById("pirata");
    var position = getVideo.currentTime;
    socket.emit('resume_all', position);
}

function pauseAll() {
    socket.emit('pause_all', {});
}

function changeSource(vid) {
    var source = document.getElementById("fuente");
    var getVideo = document.getElementById("pirata");
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
    var getVideo = document.getElementById("pirata");
    getVideo.currentTime = position;
    getVideo.play();
});

socket.on('pause', function(){
    var getVideo = document.getElementById("pirata");
    getVideo.pause();
});
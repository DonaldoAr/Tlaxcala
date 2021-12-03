(function() {

    var streaming = false,
        video        = document.querySelector('#video'),
        cover        = document.querySelector('#cover'),
        canvas       = document.querySelector('#canvas'),
        photo        = document.querySelector('#photo'),
        startbutton  = document.querySelector('#startbutton'),
        width = 200,
        height = 0;
  
    navigator.getMedia = ( navigator.getUserMedia || 
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);
  
    navigator.getMedia(
      { 
        video: true, 
        audio: false 
      },
      function(stream) {
        if (navigator.mozGetUserMedia) { 
          video.mozSrcObject = stream;
        } else {
          video.srcObject =  stream;
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );
  
    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);
  
    function takepicture() {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      var info = data.split(';');
      console.log(info);
      var xhr = new XMLHttpRequest ();
      // xhr.open("POST","http://192.168.0.11:8000/img",true);
      xhr.open("POST","http://localhost:8000/img",true);
      xhr.onreadystatechange = function () {
          if(xhr.readyState == 4 && xhr.status == 200){
              console.log(xhr.responseText);
          }
      }
      xhr.send(info[1].replace('base64,',''));
    }
  
    startbutton.addEventListener('click', function(ev){
        takepicture();
      ev.preventDefault();
    }, false);
  
  })();  
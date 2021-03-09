// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');
var camera = document.getElementById('camerabutton');
var id3 = document.getElementById('id03')
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
window.onclick = function(event) {
  if (event.target == modal2) {
    // modal2.style.display = "none";
  }
}
window.onclick = function(event) {
  if (event.target == id3) {
    id3.style.display = "none";
  }
}


camera.addEventListener('click',function(){
  id3.style.display='block';
  startup();
},false);

/* JS comes here */
// (function() {

  var width = 320; // We will scale the photo width to this
  var height = 0; // This will be computed based on the input stream

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
       id3.style.display = "block";
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');
      clearbutton = document.getElementById('clearbutton');

      navigator.mediaDevices.getUserMedia({
              video: true,
              audio: false
          })
          .then(function(stream) {
              video.srcObject = stream;
              video.play();
          })
          .catch(function(err) {
              console.log("An error occurred: " + err);
          });
          // adding eventlistner to video
          //canplay event runs when the video is ready to start
      video.addEventListener('canplay', function(ev) {
          if (!streaming) {
              height = video.videoHeight / (video.videoWidth / width);
              // if height is a illegal number(like infinity,undefined etc)
              if (isNaN(height)) {
                  height = width / (4 / 3);
              }
              // setting video attributes
              video.setAttribute('width', width);
              video.setAttribute('height', height);
              canvas.setAttribute('width', width);
              canvas.setAttribute('height', height);
              streaming = true;
              // console.log("video")
          }
      }, false);

      startbutton.addEventListener('click', function(ev) {
          takepicture();
          // prevents a link opening url
          ev.preventDefault();
          // console.log("button")
          //this false is for stop capturing(start from parent to childs)
      }, false);

      

      clearbutton.addEventListener('click', function(ev) {
         
          const a= document.createElement("a");
          // document.body.appendChild(a);
          a.href=canvas.toDataURL();
          a.download="image.jpeg";
          a.click();
          // document.body.removeChild(a);

          
          ev.preventDefault();
      }, false);


      clearphoto();
      
  }


  function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);

      var data = canvas.toDataURL('image/png');
      // console.log(data)
      photo.setAttribute('src', data);
      
  }

  function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
          canvas.width = width;
          canvas.height = height;
          context.drawImage(video, 0, 0, width, height);

          var data = canvas.toDataURL('image/png');
          // console.log(data)
          photo.setAttribute('src', data);
      } else {
          clearphoto();
      }
  }

  // function stopvideo(stream) {
  //     stream.getTracks().forEach(function(track) {
  //         if (track.readyState == 'live') {
  //             track.stop();
  //         }
  //     });
  // }

  // window.addEventListener('load', startup, false);
 
// })();
// camera.addEventListener('click', startup, false);
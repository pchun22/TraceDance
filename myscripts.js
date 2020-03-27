function loadVideo() {
  var vidURL = document.getElementById("videoURL").value; //get youtube link from box
  var ytEmbedLink = "https://www.youtube.com/embed/" + vidURL.substr(-11,11); //convert link to proper embed link format
  document.getElementById("youtubeWindow").src = ytEmbedLink; //set youtubeWindow source to be specified video
}


function myFunction() {
  var x = document.getElementById("myURL").value;
  document.getElementById("demo").innerHTML = x;
}


document.querySelector('#get-access').addEventListener('click', async function init(e){
  try{
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
    document.querySelector('video').srcObject = stream
    document.querySlector('#get-access').setAttribute('hidden', true)
  } catch (error) {
    alert(`${errorr.name}`)
    console.error(error)
  }
})

/*var video = document.getElementById("videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}

/*var video = document.getElementById("videoElement");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Something went wrong!");
    });
}*/

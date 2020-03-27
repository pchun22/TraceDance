function loadVideo() {
  var vidURL = document.getElementById("videoURL").value; //get youtube link from box
  var ytEmbedLink = "https://www.youtube.com/embed/" + vidURL.substr(-11,11); //convert link to proper embed link format
  document.getElementById("youtubeWindow").src = ytEmbedLink; //set youtubeWindow source to be specified video
}


function myFunction() {
  var x = document.getElementById("myURL").value;
  document.getElementById("demo").innerHTML = x;
}

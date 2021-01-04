var player; //YT.Player object
var videoTime = 0;
var timeUpdater = null;
var loopOn = false;

// Load video player using Youtube API
function onYouTubeIframeAPIReady() {
	player = new YT.Player('yt-player', {
    videoId: 'lDyuqtOmbHk',
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
	$('#yt-player').addClass("yt-window"); // modify class to fit properly
}

function onPlayerReady(event) {}

function onPlayerStateChange(event) {
	if(player.getPlayerState() != 1){ //if not playing
		this.innerHTML = '<i class="fas fa-pause"></i>';
	}
	else {
		this.innerHTML = '<i class="fas fa-play"></i>';
	}
}


// play/pause button
$("#yt-play").click( function(){
	if(player.getPlayerState() != 1){ //if not playing
		player.playVideo();
	}
	else {
		player.pauseVideo();
	}
});

// update youtube video button
$("#yt-submit").click( function(){
	var vidData = {};
  vidData.url = $(".video-url").val();
  vidData.start = $(".start-time").val();
  vidData.end = $(".end-time").val();
  console.log(vidData);

  // use a dictionary to pass all the specified parameters to updateYoutubeURL
  updateYoutubeURL(vidData);
});

// parse passed video data to create link. TODO: add parameters
function updateYoutubeURL(data){
  var id = data.url.slice(-11); //get the last 11 chars
  var start = data.start;
  var end = data.end;
  player.loadVideoById(id, start);
	//if loop is checked
	loopVideo(start, end);
}

function loopVideo(start, end){
	timeUpdater = setInterval(updateTime.bind(null, start, end), 100); //call updateTime function .1 seconds
}

// update the time and call timeCheck
function updateTime(start, end) {
	var oldTime = videoTime;
	if(player && player.getCurrentTime) {
		videoTime = player.getCurrentTime();
	}
	if(videoTime !== oldTime) {
		timeCheck(videoTime, start, end);
	}
}

// check to see if current time is greater than end time
function timeCheck(currentTime, startTime, endTime){
	if(currentTime > endTime){
		if(loopOn){
			player.seekTo(startTime); //go back to start of video
		}
		else {
			player.pauseVideo(); //pause at end time
		}
	}
}

// loop checkbox
$(".yt-loop").on("change", function(){
  if (this.checked) {
		loopOn = true;
  }
  else {
		loopOn = false;
  }
});

// mirror checkbox
$(".yt-mirror").on("change", function(){
  if (this.checked) {
    $(".yt-container").addClass("mirrored");
  }
  else {
    $(".yt-container").removeClass("mirrored");
  }
});

// NOT USED ******



// event handler for checkboxes, consolidate this into one function?

$(".cam-mirror").on("change", function(){
  if (this.checked) {
    $(".cam-container").addClass("mirrored");
  }
  else {
    $(".cam-container").removeClass("mirrored");
  }
});

//live webcam, no recording
function liveCam(){
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }) // constraints in {}
        //getUserMedia returns a promise that resolves to a MediaStream object if successful
        .then(function (stream) {
          $("#camera")[0].srcObject = stream;
        })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}

// call funciton on webpage load
liveCam();

// call liveCam function on click of live button
$("#live-cam").click( function(){
  $("#recording").addClass("hidden");
  $("#camera").removeClass("hidden");
  liveCam();
});


// From https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element

let preview = document.getElementById("camera");
let recording = document.getElementById("recording");
let stopButton = document.getElementById("stop-button");
let recordingTimeMS = 5000;

function wait(delayInMS) {
  return new Promise(resolve => setTimeout(resolve, delayInMS));
}

function startRecording(stream, lengthInMS) {
  let recorder = new MediaRecorder(stream);
  let data = [];

  recorder.ondataavailable = event => data.push(event.data);
  recorder.start();
  console.log(recorder.state + " for " + (lengthInMS/1000) + " seconds...");

  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = event => reject(event.name);
  });

  let recorded = wait(lengthInMS).then(
    () => recorder.state == "recording" && recorder.stop()
  );

  return Promise.all([
    stopped,
    recorded
  ])
  .then(() => data);
}
function stop(stream) {
  stream.getTracks().forEach(track => track.stop());
}

$("#cam-record")[0].addEventListener("click", function() {
  $("#recording").addClass("hidden");
  $("#camera").removeClass("hidden");
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  }).then(stream => {
    preview.srcObject = stream;
    // downloadButton.href = stream;
    // preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    return new Promise(resolve => preview.onplaying = resolve);
  }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
  .then (recordedChunks => {
    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    recording.src = URL.createObjectURL(recordedBlob);
    //downloadButton.href = recording.src;
    //downloadButton.download = "RecordedVideo.webm";

    console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
        recordedBlob.type + " media.");
    $("#camera").addClass("hidden");
    $("#recording").removeClass("hidden");
  })
  .catch(console.log);
}, false);

stopButton.addEventListener("click", function() {
  stop(preview.srcObject);
}, false);

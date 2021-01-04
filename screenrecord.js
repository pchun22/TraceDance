$(".video-url").change(function(){
    var url= $(".video-url").val();
    var start = url.indexOf("watch?v=");
    var end = url.indexOf("&");
    var id = ""
    if(start > -1){
        id = url.substring(start + "watch?v=".length, end)
    } else {
        id = url.split("/").pop()
    }

    var embedLink = "https://www.youtube.com/embed/" + id;
    console.log("updating youtube video to " + embedLink)
    $(".yt-video").attr("src", embedLink)
});


// set up elements
const mirror = $(".cam-mirror");
const start = $("#start-record");
const stop = $("#stop-record");
const recordedVideo = $("#video-recording")[0];
let recorder, stream;


// event handler for checkboxes, consolidate this into one function?

mirror.on("change", function() {
    if (this.checked) {
        $(".cam-container").addClass("mirrored");
    } else {
        $(".cam-container").removeClass("mirrored");
    }
});

//live webcam, no recording
function liveCam() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
                video: true
            }) // constraints in {}
            //getUserMedia returns a promise that resolves to a MediaStream object if successful
            .then(function(stream) {
                $("#camera")[0].srcObject = stream;
            })
            .catch(function(err0r) {
                console.log("Something went wrong!");
            });
    }
}

// call funciton on webpage load
liveCam();

// screen recording
async function startRecording() {
    let constraints = {
        video: {
            cursor: "always"
        },
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
        }
    }

    stream = await navigator.mediaDevices.getDisplayMedia(constraints);
    recorder = new MediaRecorder(stream);

    const chunks = [];
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = e => {
        console.log("stopped");
        const completeBlob = new Blob(chunks, {
            type: chunks[0].type
        });
        recordedVideo.src = URL.createObjectURL(completeBlob);
        // hide original content
        $("#recorded-state").removeClass("hidden");
        $("#live-state").addClass("hidden");
    };

    recorder.start();
}

// start/stop button event listeners
start.click(function() {
    start.attr("disabled", true);
    stop.removeAttr("disabled");

    startRecording();
});

stop.click(function() {
    stop.attr("disabled", true);
    start.removeAttr("disabled");

    recorder.stop();
    stream.getVideoTracks()[0].stop();
});

// button to go back
$(".go-back").click(function(){
    $("#live-state").removeClass("hidden");
    $("#recorded-state").addClass("hidden");
});

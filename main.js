Status = "";
objects = [];
function preload() {
    audio = loadSound("alarm-clock-short-6402.mp3");
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    webcam = createCapture(VIDEO);
    webcam.hide();
    classifier = ml5.objectDetector("cocossd", modelLoaded);

}
function modelLoaded() {
    console.log("Model is successfully loaded!");
    Status = true;

}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        console.log("done :)");
        objects = results;
    }
}
function draw() {
    image(webcam, 0, 0, 600, 500);
    if (Status != "") {
        classifier.detect(webcam, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: Object(s) detected.";
            fill("red");
            noFill();
            stroke("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person") {
                audio.stop();
                document.getElementById("status").innerHTML = "status: Baby found.";
            } else {
                audio.play();
                document.getElementById("status").innerHTML = "status: Baby not found.";
            }
        }
        if(objects.length == 0) {
            audio.play();
            document.getElementById("status").innerHTML = "status: Baby not found.";
        }
    }
}
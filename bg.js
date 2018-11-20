var triangles;
var state;
const states = [0, 1];
const width = 7;
var columnCount;
var heights = [];
var noiseIndex = 0;
var backgroundCol;
var prevMouseX;
var prevMouseY;


function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent("background");

    backgroundCol = color(255, 255, 255);
    stroke(0);
    columnCount = windowWidth / width;
    GetNewHeights();
}

function draw() {
    GetNewHeights();
    for (let i = 0; i < columnCount; i++) {
        var height = heights[i] + windowHeight * 50 / 100;

        line(windowWidth / columnCount * i, height, windowWidth / columnCount * i + windowWidth / columnCount, height);
    }
    //background(backgroundCol);
    // if (mouseX != prevMouseX || mouseY != prevMouseY) {
    //     GetNewHeights();
    //     for (let i = 0; i < columnCount; i++) {
    //         var height = heights[i] + windowHeight * 50 / 100;

    //         line(windowWidth / columnCount * i, height, windowWidth / columnCount * i + windowWidth / columnCount, height);
    //     }
    //     prevMouseX = mouseX;
    //     prevMouseY = mouseY;
    // }

}

function mouseWheel(event) {
    GetNewHeights();
    for (let i = 0; i < columnCount; i++) {
        var height = heights[i] + windowHeight * 50 / 100;

        line(windowWidth / columnCount * i, height, windowWidth / columnCount * i + windowWidth / columnCount, height);
    }
}

function GetNewHeights() {
    heights = [];
    noiseIndex += 0.005;
    for (let i = 0; i < columnCount; i++) {
        heights.push(noise(i + noiseIndex) * 800);
    }
}
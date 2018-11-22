var triangles
var state
const states = [0, 1]
var columnCount
var heights = []
var noiseIndex = 0
var backgroundCol
var prevMouseX
var prevMouseY
var lines = []
var delta
p5.disableFriendlyErrors = true

function setup () {
  columnWidth = windowWidth / 215
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent('background')
  frameRate(60)
  backgroundCol = color(255, 255, 255)
  columnCount = windowWidth / columnWidth
  for (let i = 0; i < columnCount; i++) {
    lines[i] = []
  }
}

function draw () {
  background(color(255, 255, 255))
  GetNewHeights(0.005)
  delta = mouseY / 300
  prevMouseX = mouseX
  for (let i = 0; i < columnCount; i++) {
    var height = GetHeight(i)

    AddLine(i, height)
    RemoveLine(i, height)

    for (let j = 0; j < lines[i].length; j++) {
      var x1 = lines[i][j][0] + delta
      var y1 = lines[i][j][1]
      var x2 = lines[i][j][2] - delta
      var y2 = lines[i][j][3]
      line(x1 - mouseX / 70, y1, x2 - mouseX / 70, y2)
    }
  }
}

function GetHeight (i) {
  return heights[i] + windowHeight * 50 / 100
}

// function mouseWheel (event) {
//   GetNewHeights(0.005)
//   for (let i = 0; i < columnCount; i++) {
//     var height = GetHeight(i)

//     AddLine(i, height)
//     RemoveLine(i, height)
//   }
// }

function AddLine (columnIndex, height) {
  var newLine = [
    windowWidth / columnCount * columnIndex,
    height,
    windowWidth / columnCount * columnIndex + windowWidth / columnCount,
    height
  ]
  stroke(0)
  lines[columnIndex].push(newLine)
}

function RemoveLine (columnIndex) {
  if (lines[columnIndex].length > 40) {
    lines[columnIndex].shift()
  }
}

function GetNewHeights (ni) {
  heights = []
  noiseIndex += ni
  for (let i = 0; i < columnCount; i++) {
    heights.push(noise(i + noiseIndex) * 500)
  }
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}

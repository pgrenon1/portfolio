var triangles
var state
const states = [0, 1]
const width = 7
var columnCount
var heights = []
var noiseIndex = 0
var backgroundCol
var prevMouseX
var prevMouseY
var lines = []

function setup () {
  var cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent('background')

  backgroundCol = color(255, 255, 255)
  stroke(0)
  columnCount = windowWidth / width
  for (let i = 0; i < columnCount; i++) {
    lines[i] = []
  }
  GetNewHeights(0.005)
}

function draw () {
  console.log(frameRate())
  background(color(255, 255, 255))
  GetNewHeights(0.005)
  for (let i = 0; i < columnCount; i++) {
    var height = heights[i] + windowHeight * 50 / 100

    AddLine(i, height)
    RemoveLine(i, height)

    for (let j = 0; j < lines[i].length; j++) {
      var x1 = lines[i][j][0]
      var y1 = lines[i][j][1]
      var x2 = lines[i][j][2]
      var y2 = lines[i][j][3]
      line(x1, y1, x2, y2)
    }
  }
}

function mouseWheel (event) {
  GetNewHeights(0.005)
  for (let i = 0; i < columnCount; i++) {
    var height = heights[i] + windowHeight * 50 / 100

    AddLine(i, height)
    RemoveLine(i, height)
  }
}

function AddLine (columnIndex, height) {
  var newLine = [
    windowWidth / columnCount * columnIndex,
    height,
    windowWidth / columnCount * columnIndex + windowWidth / columnCount,
    height
  ]

  lines[columnIndex].push(newLine)
}

function RemoveLine (columnIndex) {
  if (lines[columnIndex].length > 50) {
    lines[columnIndex].shift()
  }
}

function GetNewHeights (ni) {
  heights = []
  noiseIndex += ni
  for (let i = 0; i < columnCount; i++) {
    heights.push(noise(i + noiseIndex) * 800)
  }
}

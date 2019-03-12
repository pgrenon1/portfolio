var columnCount
var heights = []
var noiseIndex = 0
var backgroundCol
var lines = []
var animationHeight = 2000
var moveUp = false
var cnv
p5.disableFriendlyErrors = true

function setup() {
  columnWidth = windowWidth / 50
  cnv = createCanvas(windowWidth, windowHeight)
  cnv.parent('background')

  backgroundCol = color(10, 10, 10)
  columnCount = windowWidth / columnWidth
  for (let i = 0; i < columnCount; i++) {
    lines[i] = []
  }

  // menuItems = selectAll('.menu-item')
  // for (i in menuItems) {
  //   menuItems[i].mousePressed(MoveUp)
  // }

  // nameButton = select('.name')
  // nameButton.mousePressed(MoveDown)
}

function draw() {
  // if (moveUp && animationHeight > -200) {
  //   animationHeight -= 15
  // } else if (!moveUp && animationHeight < 2000) {
  //   animationHeight += 15
  // }

  background(backgroundCol)
  GetNewHeights(0.003)

  for (let i = 0; i < columnCount; i++) {
    var height = GetHeight(i)

    AddLine(i, height)
    RemoveLine(i, height)

    for (let j = 0; j < lines[i].length; j++) {
      var x1 = lines[i][j][0]
      var y1 = lines[i][j][1] / 2
      var x2 = lines[i][j][2]
      var y2 = lines[i][j][3] / 2
      if (abs(mouseX - i * windowWidth / 50) <= 100) {
        strokeWeight(10)
      } else {
        strokeWeight(3)
      }
      stroke(255, 255, 255, 30)
      line(x1, y1, x2, y2)
    }
  }
  textSize(15)
  fill(255)
  text(Math.round(frameRate()), windowWidth - 20, windowHeight - 20)
}

function GetHeight(i) {
  return heights[i]
}

function AddLine(columnIndex, height) {
  var newLine = [
    (windowWidth / columnCount) * columnIndex,
    height,
    (windowWidth / columnCount) * columnIndex + windowWidth / columnCount,
    height
  ]
  lines[columnIndex].push(newLine)
}

function RemoveLine(columnIndex) {
  if (lines[columnIndex].length > 20) {
    lines[columnIndex].shift()
  }
}

function GetNewHeights(ni) {
  heights = []
  noiseIndex += ni
  for (let i = 0; i < columnCount; i++) {
    heights.push(noise(i + noiseIndex) * animationHeight)
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function MoveUp() {
  moveUp = true
}

function MoveDown() {
  moveUp = false
}

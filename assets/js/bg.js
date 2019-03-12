var columnCount
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
    lines.push(new Line(columnWidth * i, 0, columnWidth))
  }

  menuItems = selectAll('.menu-item')
  for (i in menuItems) {
    menuItems[i].mousePressed(MoveUp)
  }
  nameButton = select('.name')
  nameButton.mousePressed(MoveDown)

  stroke(255, 255, 255, 30)

  textSize(15)
  fill(255)
}

function draw() {
  background(backgroundCol)

  if (moveUp && animationHeight > -200) {
    animationHeight -= 15
  } else if (!moveUp && animationHeight < 2000) {
    animationHeight += 15
  }

  noiseIndex += 0.003
  for (let i = 0; i < lines.length; i++) {
    if (abs(mouseX - i * windowWidth / 50) <= 100) {
      strokeWeight(10)
    } else {
      strokeWeight(3)
    }
    lines[i].update(noise(i + noiseIndex) * animationHeight / 2)
    lines[i].show()
  }

  text(Math.round(frameRate()), windowWidth - 20, windowHeight - 20)
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

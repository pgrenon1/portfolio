var backgroundCol

function setup () {
  var menu = select('.menu')
  var cnv = createCanvas(menu.width / 2, menu.height)
  cnv.parent('gizmo')
  backgroundCol = color(0, 0, 0)
}

function draw () {
  background(backgroundCol)
}

function Line(x, y, width) {
    this.x = x
    this.y = y
    this.width = windowWidth / columnCount
    this.history = []

    this.update = function (height) {
        this.y = height

        var v = createVector(this.x, this.y)
        this.history.push(v)
        if (this.history.length > 10) {
            this.history.splice(0, 1)
        }
    }

    this.show = function () {
        line(this.x, this.y, this.x + this.width, this.y2)

        for (let i = 0; i < this.history.length; i++) {
            var pos = this.history[i]

            line(pos.x, pos.y, pos.x + width, pos.y)
        }
    }

}
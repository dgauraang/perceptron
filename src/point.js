class Point {
    constructor(x = Math.random() * (canvas.width - 20) + 10, y = Math.random() * (canvas.height - 20) + 10, radius = 10){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    /*
        Draws a black point with a radius of 10px at 
        position point in context.
        The fill color is green if the training algo is correct,
        red if incorrect.
    */
    draw(context, correct) {
        context.save();
        context.beginPath();
        context.ellipse(this.x, this.y, this.radius, this.radius, Math.PI / 2, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = correct ? 'rgb(200, 255, 0)' : 'rgb(255, 0, 0)';
        context.fill();
            context.fillStyle = 'rgb(0, 0, 0)';
            context.font = "50px serif";
            context.fillText("(" + Math.floor(this.x) + ", " + Math.floor(this.y) + ")", canvas.width - 160, canvas.height - 50, 150);
        context.restore();
    }
}

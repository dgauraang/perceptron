function load() {
   let body = document.querySelector('body');
   return new Promise(function(res, err){
       body.onload = res;
   });
}

function initPerceptron() {
    let perceptron = new Perceptron([Math.random() * 2 - 1, Math.random() * 2 - 1], [[1, 2], [8, 2], [32, 5], [1, 3], [1, 5], [53, 200], [400, 200], [200, 512], [33, 2]], [-1, 1, 1, -1, -1, -1, 1, -1, 1], 2);
    return perceptron;
}

function datumGen(width, height) {
    return [Math.random() * (width - 20) + 10, Math.random() * (height -20) + 10]
}

function drawLine(context) {
    // draw the y = -x line
    context.fillStyle = 'rgb(0, 0, 0)';
    context.beginPath();
    context.moveTo(canvas.width, canvas.height);
    context.lineTo(0, 0);
    context.stroke();
    context.closePath();

}

function trainNet(context, percep) {
    let output = percep.train();
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawLine(context);
    if(!output.x){
        let datum = datumGen(canvas.width, canvas.height);
        let point = new Point(datum[0], datum[1], 10);
        point.draw(context, percep.valid(datum, percep.processData(datum)));
    }
    else{
        let point = new Point(output.x, output.y, 10);
        point.draw(context, output.success);
    }
}


function draw() {
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    let percep = initPerceptron();
    let datum = datumGen(canvas.width, canvas.height);
    if(canvas.getContext) {
        let a = new Point();
        a.draw(context, percep.valid(datum, percep.processData(datum)));
        drawLine(context);
        canvas.addEventListener('click', () => trainNet(context, percep), false);
    } 
    else {
        console.log("There is no context :(");
    }
}

load().then(() => draw());

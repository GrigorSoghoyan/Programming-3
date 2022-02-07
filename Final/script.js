var socket = io();

 side = 30

function setup() {
    createCanvas(20 * side, 8 * side);
    background("#acacac");
}

function draw(matrix) {
    console.log(matrix);
    
for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        var obj = matrix[y][x];
        if (obj == 1) {
            fill("green");
            rect(x * side, y * side, side, side)
        }
        else if (obj == 2) {
            fill("yellow");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 3) {
            fill("teal");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 4) {
            fill("purple");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 5) {
            fill("black");
            rect(x * side, y * side, side, side);
        }
    }
}

}

setInterval(
    function () {
    socket.on('send matrix', draw)
    },1000
)
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

matrix = [[2, 2, 1, 2, 1, 0, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 0, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 1, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 0, 1],
[1, 2, 1, 0, 1, 1, 1],
[1, 0, 2, 0, 1, 0, 1],
[0, 1, 0, 1, 0, 0, 1]]

io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)

            }
        }
    }
}

io.sockets.emit('send matrix', matrix)

function game() {
    for (var i in grassArr) {
        grassArr[i].mul()
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game,1000)

io.on('connection', function () {
    createObject(matrix)
})
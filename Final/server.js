var express = require('express');
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
matrix = [[0, 2, 1, 2, 1, 0, 1, 2, 2, 1, 2, 1, 0, 1, 1, 2],
[0, 0, 1, 2, 1, 0, 1, 0, 4, 1, 5, 1, 0, 1, 1, 0, 1, 1, 2],
[1, 3, 4, 2, 5, 0, 1, 3, 2, 2, 1, 5, 4, 2, 1, 0, 1, 1, 2],
[0, 1, 0, 1, 3, 0, 2, 2, 0, 0, 3, 2, 0, 0, 1, 0, 1, 1, 2],
[0, 2, 1, 2, 1, 0, 1, 2, 2, 1, 2, 1, 0, 1, 1, 0, 1, 1, 2],
[0, 0, 1, 2, 1, 0, 1, 0, 4, 1, 5, 1, 0, 1, 1, 0, 1, 1, 2],
[1, 3, 4, 2, 5, 0, 1, 3, 2, 2, 1, 5, 4, 2, 1, 0, 1, 1, 2],
[0, 1, 0, 1, 3, 0, 2, 2, 0, 0, 3, 2, 0, 0, 1, 0, 1, 1, 2]]


    io.sockets.emit('send matrix', matrix)

    grassArr = [];
    grassEaterArr = []
    let cactusArr = []
    let flowerArr = []
    let trashArr = []

    Grass = require("./grass")
    GrassEater = require("./GrassEater")
    Flower = require("./flower")
    Cactus = require("./cactus")
    Trash = require("./trash")


    
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
                else if (matrix[y][x] == 3) {
                    var ca = new Cactus(x, y, 3);
                    cactusArr.push(ca)

                }
                else if (matrix[y][x] == 4) {
                    var fl = new Flower(x, y, 4);
                    flowerArr.push(fl)

                }
                else if (matrix[y][x] == 5) {
                    var tr = new Trash(x, y, 5);
                    trashArr.push(tr)

                }
            }
        }
        io.sockets.emit('send matrix', matrix)


    }

    function game() {
        for (var i in grassArr) {
            grassArr[i].mul()
        }
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
        for (var i in trashArr) {
            trashArr[i].mul();
        }
        io.sockets.emit("send matrix", matrix);
    }

    setInterval(game, 1000)
    
io.on('connection', function () {
    createObject(matrix)
})
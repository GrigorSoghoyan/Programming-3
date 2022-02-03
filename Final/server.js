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

function generator(matLen, gr, grEat, ca, fl, tr) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < ca; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < fl; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < tr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

let side = 20;

let matrix = generator(15, 30, 5, 8, 6, 2);

let grassArr = []
let grassEaterArr = []
let cactusArr = []
let flowerArr = []
let trashArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Cactus = require("./Cactus")
Flower = require("./Flower")
Trash = require("./Trash")

function setup() {
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    frameRate(5)
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let ca = new Cactus(x, y)
                cactusArr.push(ca)
            }
            else if (matrix[y][x] == 4) {
                let fl = new Flower(x, y)
                flowerArr.push(fl)
            }
            else if (matrix[y][x] == 5) {
                let tr = new Trash(x, y)
                trashArr.push(tr)
            }
        }
    }
}


    io.sockets.emit('send matrix', matrix)


    
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

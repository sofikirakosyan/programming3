var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000);

function randomNum(min, max) {
   let result = Math.floor(Math.random() * (max + min) - min);
   return result;
}
let Grass = require('./Grass');
let GrassEater = require('./GrassEater');
let predator = require('./predator');
let Bomb = require('./Bomb');
let Tiger = require('./Tiger');
let Time = require('./Time');

matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
tigerArr = [];
bombArr = [];
timeArr = [];

function createCanvas() {
   function MatrixGenerator(size, countGrass, countGrassEater, predatorCount, tigerCount, bombCount, timeCount) {
      for (let y = 0; y < size; y++) {
         matrix.push([])
         for (var x = 0; x < size; x++) {
            matrix[y].push(0)
         }
      }
      for (let k = 0; k < countGrass; k++) {
         let x = (randomNum(0, size))
         let y = (randomNum(0, size))
         console.log(x, y)
         if (matrix[y][x] == 0) {
            matrix[y][x] = 1
         }
         // else {
         //     k--
         // }
      }
      for (let k = 0; k < countGrassEater; k++) {
         let x = (randomNum(0, size))
         let y = (randomNum(0, size))
         if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
         }
         // else {
         //     k--
         // }
      }
      for (let k = 0; k < predatorCount; k++) {
         let x = (randomNum(0, size))
         let y = (randomNum(0, size))
         if (matrix[y][x] == 0) {
            matrix[y][x] = 3
         }
         // else {
         //     k--
         // }
      }
      for (let k = 0; k < tigerCount; k++) {
         let x = (randomNum(0, size))
         let y = (randomNum(0, size))
         if (matrix[y][x] == 0) {
            matrix[y][x] = 4
         }
         // else {
         //     k--
         // }
      }
      for (let k = 0; k < bombCount; k++) {
         let x = (randomNum(0, size))
         let y = (randomNum(0, size))
         if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
         }
         // else {
         //     k--
         // }
      }
      for (let k = 0; k < timeCount; k++) {
         let x = (randomNum(0, size))
         let y = (randomNum(0, size))
         if (matrix[y][x] == 0) {
            matrix[y][x] = 6;
         }
         //else {
         //k--
         //}
      }
   }



   MatrixGenerator(40, 35, 28, 19, 14, 20, 5);


   for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
         if (matrix[y][x] == 1) {
            let gr = new Grass(x, y, 1);
            grassArr.push(gr);
         }
         else if (matrix[y][x] == 2) {
            let gre = new GrassEater(x, y, 2)
            grassEaterArr.push(gre);
         }
         else if (matrix[y][x] == 3) {
            var gre = new predator(x, y, 3)
            predatorArr.push(gre);
         }
         else if (matrix[y][x] == 4) {
            var gre = new Tiger(x, y, 4)
            tigerArr.push(gre);
         }
         else if (matrix[y][x] == 5) {
            var bom = new Bomb(x, y, 5)
            bombArr.push(bom);
         }
         else if (matrix[y][x] == 6) {
            var time = new Time(x, y, 6)
            timeArr.push(time);
         }
      }
      return matrix;
   }
}

function playGame() {
   for (let i in grassArr) {
      grassArr[i].mul()
   }
   for (let i in grassEaterArr) {
      grassEaterArr[i].eat()
   }

   for (let i in predatorArr) {
      predatorArr[i].eat()
   }
   for (let i in tigerArr) {
      tigerArr[i].eat()
   }
   for (let i in bombArr) {
      bombArr[i].eat()
   }
   for (let i in timeArr) {
      timeArr[i].eat()
   }
   io.emit("matrix", matrix)
   return matrix;
}


setInterval(playGame, 1000);

createCanvas()

io.on("connection", function (socket) {
   socket.emit('matrix', matrix);
});



// let obj = {
//    1: grassArr
//    2: grassEaterArr
//    3: predatorArr
//    4: tigerArr
//    5: bombArr
//    6: timeArr
// }
// socket.emit("size",1)




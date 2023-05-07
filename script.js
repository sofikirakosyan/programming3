var matrix = [];
var side = 10;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var tigerArr = [];
var bombArr = [];

function MatrixGenerator(size, countGrass, countGrassEater, predatorCount, tigerCount, bombCount) {
    for (let y = 0; y < size; y++) {
        matrix.push([])
        for (var x = 0; x < size; x++) {
            matrix[y].push(0)
        }
    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < predatorCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < tigerCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < bombCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
        // else {
        //     k--
        // }
    }
}

function setup() {
     MatrixGenerator(50, 60, 60, 60, 28, 3);
   
    frameRate(6);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
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
        }
    }
}



function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("purple");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }
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


}
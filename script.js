let socket = io();
var side = 30;

function setup() {
    createCanvas(30 * side, 30 * side);
    background('#acacac');
}

function drawmatrix(matrix) {
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
            else if (matrix[y][x] == 6) {
                fill("red");
            }
            rect(x * side, y * side, side, side);
        }
    }

}


socket.on('matrix', function (matrix) {
    drawmatrix(matrix);
})
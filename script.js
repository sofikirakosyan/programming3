let socket = io();
var side = 30;
let matrix = [];
let objects = [];

var xLength = 50;
var yLength = 50;

//exanaki het kapvac popoxakanner
let currentWeatherr = "Spring"
let weatherDocument = document.getElementById("weather")

let cheatButton = document.getElementById("cheatButton")

let cheatMode = false;
let cheatSheet = document.getElementById("cheatSheet")
let clickRadius = 0;
let clickRadiusRange = document.getElementById("clickRadiusRange")
let toIndex = 5;
let toIndexDocument = document.getElementById("toIndex")


let grassEatenDocument = document.getElementById("grassEaten");
let grassBurntDocument = document.getElementById("grassBurnt");
let grassEaterEatenDocument = document.getElementById("grassEaterEaten");
let tilesExplodedDocument = document.getElementById("tilesExploded");
let grassSprayedDocument = document.getElementById("grassSprayed");
let currentNumberOfGrassDocument = document.getElementById("currentNumberOfGrass");

socket.on("initial", function(matrix){
    matrixx = matrix;
})

window.addEventListener("click", function(){
    var xCoordinate = Math.floor(mouseX/side)
    var yCoordinate = Math.floor(mouseY/side)
    if(cheatMode){
        clickRadius = parseInt(clickRadiusRange.value)
        updateToIndex()
        socket.emit("onCheatClicked", xCoordinate, yCoordinate, clickRadius, toIndex)
    }
   
})

function setup(){
    createCanvas(xLength * side, yLength * side);
    background('#acacac');
}
 

function drawWholeRect() {
    for (var y = 0; y < matrixx.length; y++) {
        for (var x = 0; x < matrixx[y].length; x++) {
            drawRect(x,y, matrixx)
        }
    }

}

function drawRect(x,y, matrix){
    let e = matrix[y][x];
       if (e == 1){
            if(currentWeatherr == "Spring") fill("green");
            else if(currentWeatherr =="Summer") fill(60, 240, 5)
            else if(currentWeatherr == "Winter") fill(220, 245, 220)
            else fill(150, 209, 0)
       } 
       else if(e == 2) fill("yellow");
       else if(e == 3) fill("pink");
       else if(e == 4) fill("purple")
       else if(e == 5) fill("blue")
       else if(e == 98) fill("orange")
       else if(e == 99) fill("black")
       else  fill("#acacac");
    
       rect(x * side, y * side, side, side);
}

function updateToIndex(){
    switch(toIndexDocument.value){
        case "Grass":
            toIndex = 1;
            return;
        case "GrassEater":
            toIndex = 2;
            return;
        case "Predator":
            toIndex = 3;
            return;
        case "Tiger":
            toIndex = 4;
            return;
        case "Bomb":
            toIndex = 5;
            return;
        case "Time":
            toIndex = 98;
            return;
    }
}

function tigerShowdown(){
    socket.emit("tigerShowdown");
}

function grassDay(){
    socket.emit("grassDay")
}

function burnTheWorld(){
    socket.emit("burnTheWorld")
}

socket.on("updateWholeRect", function(matrix, objects){
    matrixx =  matrix;
    objectss = objects;
    drawWholeRect()
})

socket.on("updateWeather", function(currentWeather){
    currentWeatherr = currentWeather;
    weatherDocument.innerHTML = currentWeather;
})

cheatButton.addEventListener("change", function(){
    cheatSheet.hidden = !cheatSheet.hidden; 
    cheatMode = !cheatMode;
})

socket.on("statistics", function(values){
    grassEatenDocument.innerHTML = "Grass Eaten: " + values[0];
    grassBurntDocument.innerHTML = "Grass Burnt: " + values[1];
    grassEaterEatenDocument.innerHTML = "Grass Eaters Eaten: " + values[2];
    tilesExplodedDocument.innerHTML = "Tiles Exploded: " + values[3];
    grassSprayedDocument.innerHTML = "Grass Sprayed: " + values[4];
    currentNumberOfGrassDocument.innerHTML = "Current Number of Grass: " + values[5];
})


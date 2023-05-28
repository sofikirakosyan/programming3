
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static("../programming_3"));

app.get("/", function(req, res){
   res.redirect("index.html")
});

server.listen(3000, function(){
   
});


const Weather = {
   Spring: "Spring",
   Summer: "Summer",
   Fall: "Fall",
   Winter: "Winter"
}

currentWeather = Weather.Spring
currentFrame = 0;

var framRate = 10;

xLength = 50;
yLength = 50;

matrix = [];

objects = [];


let Grass = require("./Grass")
let GrassEater = require("./GrassEater")
let Predator = require("./Predator")
let Tiger = require("./tiger")
let Bomb = require("./Bomb")
let Time = require("./Time")
let Fire = require("./Fire");

grassEaten = 0
grassBurnt = 0
grassEaterEaten = 0
tilesExploded = 0
grassSprayed = 0;
currentNumberOfGrass = 0;

GlobalMethods = {
  classify : function(number, x, y){
      switch(number){
          case 0:
              return null;
          case 1:
            currentNumberOfGrass++;
              return new Grass(x,y);
          case 2:
             var genderChooser = Math.random();
             if(genderChooser < 0.4) return new GrassEater(x,y, "male") //40% chance of male
             else return new GrassEater(x,y, "female"); //60% chance of female
              
          case 3:
            var genderChooser = Math.random();
            if(genderChooser < 0.4) return new Predator(x,y, "male") //40% chance of male
            else return new Predator(x,y, "female"); //60% chance of female
          case 4:
              return new Tiger(x,y);
          case 5:
              return new Bomb(x,y);
          case 98:
              return new Fire(x,y);
      }
   },

   changeMatrix: function(x, y, value, spread, remover = -1){
      if(matrix[y][x] == 1){
         if(remover == 2 || remover == 3)
            grassEaten++;
         
         else if(remover == 98)
            grassBurnt++;
      }

      else if(matrix[y][x] == 2){
         if(remover == 3)
            grassEaterEaten++;
      }

       matrix[y][x] = value;
       if(spread == true && value != 0) objects.push(GlobalMethods.classify(value, x, y));
   },

   deleteObject: function(x,y){
      for(var i in objects){
         if(x == objects[i].x && y == objects[i].y){
            if(objects[i].id == 1) currentNumberOfGrass--;
            objects.splice(i,1);
            break; 
         }
      }
   }
}

function isValid(x,y){
   return x >= 0 && y >= 0 && y < matrix.length && x < matrix[y].length;
}

function createCanvas(){
   console.log("A user joined!")
   for (let y = 0; y < yLength; y++) {
         matrix.push([])
         for (let x = 0; x < xLength; x++) {
            let number = Math.random() * 100
            if(number < 5) number = 0; 
            else if(number < 90) number = 1; //grass
            else if(number < 97) number = 2; //grassEater
            else if(number < 99) number = 3; //predator
            else if(number < 99.5) number = 4; //tiger
            else number = 5; //bomb
            matrix[y].push(number);

            let object = GlobalMethods.classify(number, x, y);
            if(object != null) objects.push(object);
            
         }
   }

   io.emit("updateWholeRect", matrix)
   
}

function drawGame(){
   updateWeather()
   for(let i in objects){
      objects[i].move();
   }

   io.emit("updateWholeRect", matrix)

   io.emit("statistics", [grassEaten,grassBurnt,grassEaterEaten,tilesExploded,grassSprayed,currentNumberOfGrass])

   return matrix;

}

function updateWeather(){
   currentFrame += 1;
   if(currentFrame == 0){
      currentWeather = Weather.Spring;
      io.emit("updateWeather", currentWeather)
      updateObjectsWeather()
   } 
   else if(currentFrame == 50){
      currentWeather = Weather.Summer
      io.emit("updateWeather", currentWeather)
      updateObjectsWeather()
   }
   else if(currentFrame == 100){
      currentWeather = Weather.Fall
      io.emit("updateWeather", currentWeather)
      updateObjectsWeather()
   }
   else if(currentFrame == 150){
      currentFrame = -50
      currentWeather = Weather.Winter
      io.emit("updateWeather", currentWeather)
      updateObjectsWeather()
   }
}

function updateObjectsWeather(){
   saveStatistics()
   for(var i in objects){
      objects[i].weatherChanged(currentWeather)
   }
}

function saveStatistics(){
   let statistics ={
      "grassEaten" : grassEaten,
      "grassBurnt" : grassBurnt,
      "grassEaterEaten" : grassEaterEaten,
      "tilesExploded" : tilesExploded,
      "grassSprayed" : grassSprayed,
      "currentNumberOfGrass" : currentNumberOfGrass,
   }

   var stringifiedStats = JSON.stringify(statistics);

   var fs = require('fs');
   fs.writeFile("statistics.json", stringifiedStats, function(err, result) {
      if(err) console.log('error', err);
   });
}


setInterval(drawGame, 1000/framRate)
clearInterval()

io.on("connection", function(socket){
   grassEaten = 0;
   grassBurnt = 0;
   grassEaterEaten = 0;
   tilesExploded = 0;
   grassSprayed = 0;
   currentNumberOfGrass = 0;
   matrix = [];
   objects = [];
   createCanvas()
   socket.emit("initial", matrix)

   socket.on("disconnect", function(){
      console.log("A user left!")
      saveStatistics()
   });

   socket.on("onCheatClicked", function(x, y, radius, toIndex){
      if(!isValid(x,y)) return
      var spread = toIndex > 0;

      for(var yy = y - radius; yy <= y + radius; yy++){
         for(var xx = x - radius; xx <= x + radius; xx++){
            if(isValid(xx,yy)){
               if(matrix[yy][xx] != 0){
                  GlobalMethods.deleteObject(xx,yy)
               }
               GlobalMethods.changeMatrix(xx,yy, toIndex, spread);
            }
         }
      }
      io.emit("updateWholeRect", matrix)
      
   });
   
   socket.on("tigerShowdown", function(){
      for(var i in objects){
         if(objects[i].id == 4){
            objects[i].goHam()
         }
      }
   })

   socket.on("grassDay", function(){
      for (let y = 0; y < yLength; y++) {
         for (let x = 0; x < xLength; x++) {
            if(matrix[y][x] == 0){
               var rand = Math.random() * 100;
               if(rand < 30){ 
                  matrix[y][x] = 1;
                  objects.push(GlobalMethods.classify(1, x, y));
               }
            }
         }

      }
   })

   socket.on("burnTheWorld", function(){
      for (let y = 0; y < yLength; y++) {
         for (let x = 0; x < xLength; x++) {
            if(x == 0 || y == 0 || x == xLength - 1 || y == yLength - 1){ 
               if(matrix[y][x] != 0){
                  GlobalMethods.deleteObject(x,y)
               }
               matrix[y][x] = 98
               objects.push(GlobalMethods.classify(98,x,y))
            }

            else if(matrix[y][x] == 1){
               var rand = Math.random() * 100;
               if(rand < 10){ 
                  GlobalMethods.deleteObject(x,y)

                  matrix[y][x] = 98;
                  objects.push(GlobalMethods.classify(98, x, y));
               }
            }
         }

      }
   })
   
})
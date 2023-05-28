let Grass = require("./Grass")

module.exports = class Tiger extends Grass{ 
    constructor(x,y){
        super(x,y, 34);

        this.effectRadius = 2; 
        this.spreadRadius = 1; 
        this.id = 5; 
        this.weatherChanged(currentWeather)
    }

    move(){
        if (++this.step < this.moveSpeed) return;

        let grass = [];

        for (let xx = this.x - this.effectRadius; xx < this.x + this.effectRadius; xx++) {
            for (let yy = this.y - this.effectRadius; yy < this.y + this.effectRadius; yy++) {
                if(this.isValid(xx,yy)){
                   if(matrix[yy][xx] == 1){
                        grass.push([xx,yy]) 
                        grassSprayed++;
                   } 
                   else if(matrix[yy][xx] == 98) this.remove(xx,yy); 
                }
            }
        }
        
        for(let i in grass){
            this.spreadGrass(grass[i][0], grass[i][1]);
        }
        this.step = 0;
    }

    spreadGrass(x, y) {
        for (let xx = x - this.spreadRadius; xx < x + this.spreadRadius; xx++){
            for (let yy = y - this.spreadRadius; yy < y + this.spreadRadius; yy++){
                if(this.isValid(xx,yy) && matrix[yy][xx] == 0) GlobalMethods.changeMatrix(xx, yy, 1, true) 
            }
        }
    }

    weatherChanged(weather){
        switch(weather){
            case "Spring":
                this.moveSpeed = 34;
                this.spreadRadius = 1;
                this.effectRadius = 2;
                return;
            case "Summer":
                this.moveSpeed = 28;
                this.spreadRadius = 2;
                this.effectRadius = 3;
                return;
            case "Fall":
                this.moveSpeed = 36;
                this.spreadRadius = 1;
                this.effectRadius = 2;
                return;
            case "Winter":
                this.moveSpeed = 38;
                this.spreadRadius = 1;
                this.effectRadius = 1;
        }
    }
}
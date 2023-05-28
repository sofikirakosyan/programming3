
let Grass = require("./Grass")

module.exports = class Bomb extends Grass {
    constructor(x, y, direction) {
        super(x, y, 1);
        this.direction = direction;
        this.explosionRadius = 8;
        this.fireChance = 5
        this.id = 99;
        this.weatherChanged(currentWeather)
    }

    move() {
        let x = this.x + this.direction[0]; 
        let y = this.y + this.direction[1]; 
        if (this.isValid(x, y)) { 
            this.remove(x, y);
            GlobalMethods.changeMatrix(x, y, this.id, false);
            GlobalMethods.changeMatrix(this.x, this.y, 0, false);
            this.changeCoords(x, y);
        }
        else {
            this.remove(this.x, this.y);
            for (let xx = this.x - this.explosionRadius; xx < this.x + this.explosionRadius; xx++) {
                for (let yy = this.y - this.explosionRadius; yy < this.y + this.explosionRadius; yy++) {
                    if (this.isValid(xx, yy) && matrix[yy][xx] != 0) { 
                        let random = Math.random() * 100;
                        if (random > 75) continue; 

                        if(matrix[yy][xx] == 1  && random < this.fireChance){ 
                            this.remove(xx, yy);
                            GlobalMethods.changeMatrix(xx,yy, 98, true)
                        }
                        else{
                            this.remove(xx, yy);
                        }
                        tilesExploded++; 
                    }
                }
            }
        }
    }

    weatherChanged(weather){
        switch(weather){
            case "Spring":
                this.explosionRadius = 8;
                this.fireChance = 5;
                return;
            case "Summer":
                this.explosionRadius = 9;
                this.fireChance = 15;
                return;
            case "Fall":
                this.explosionRadius = 8;
                this.fireChance = 5;
                return;
            case "Winter":
                this.explosionRadius = 7;
                this.fireChance = 2;
        }
    }
}

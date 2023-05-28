
const Bomb = require("./Bomb");
let  Grass = require("./Grass")

module.exports = class Time extends Grass { 
    constructor(x, y) {
        super(x, y, 14);
        this.shootSpeed = 4
        this.shootStep = 0;
        this.isHam = false;
        this.hamStep = 10;
        this.id = 4;
        this.weatherChanged(currentWeather)
    }

    move() {
        if (++this.step < this.moveSpeed) return;

        if(this.isHam){
            this.hamStep --;
            if(this.hamStep == 0){
                this.isHam = false;
                this.hamStep = 10;
                this.moveSpeed = 14;
                this.weatherChanged(currentWeather)
            }
        }
        this.shootStep++;

        
        if (this.shootStep >= this.shootSpeed) {
            let direction = this.random(this.directions);
            let bulletX = direction[0];
            let bulletY = direction[1];
            if (this.isValid(bulletX, bulletY)) {
                this.remove(bulletX, bulletY)
                GlobalMethods.changeMatrix(bulletX, bulletY, 99, false)
                objects.push(new Bomb(bulletX, bulletY, [bulletX - this.x, bulletY - this.y]))
            }
            this.shootStep = 0;
        }

        let coords = this.random(this.chooseCell(0)) 
        if (coords == undefined) return;

        let x = coords[0];
        let y = coords[1];

        GlobalMethods.changeMatrix(x, y, this.id, false); 
        GlobalMethods.changeMatrix(this.x, this.y, 0, false); 
        this.changeCoords(x, y); 

        this.step = 0;

    }

    goHam(){
        this.moveSpeed = 5;
        this.shootSpeed = 1;
        this.isHam = true;
    }

    weatherChanged(weather){
        if(!this.isHam){
            switch(weather){
                case "Spring":
                    this.shootSpeed = 4;
                    return;
                case "Summer":
                    this.shootSpeed = 3;
                    return;
                case "Fall":
                    this.shootSpeed = 4;
                    return;
                case "Winter":
                    this.shootSpeed = 5;
            }
        }
    }
}



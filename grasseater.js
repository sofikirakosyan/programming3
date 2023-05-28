let Grass = require('./grass');
module.exports = class GrassEater extends Grass {
    constructor(x, y, gender) {
        super(x, y, 5);
        this.energy = 4;
        this.gender = gender;
        this.target = 1;
        this.id = 2;
        this.moveSpeed +=1;
        this.multiply += 3;
        this.weatherChanged(currentWeather)
    }

    move() {
        if (this.energy <= 0) {
            this.remove(this.x, this.y);
            return;
        }
        if (++this.step < this.moveSpeed) return;

        let target = this.target
        let coords;
        do {
            coords = this.random(this.chooseCell(target--)); 
        } while (coords == undefined && target >= 0)

        if (target == -1) this.energy--; 
        else this.energy += target + 1;

        if (coords == undefined) return; 

        let x = coords[0];
        let y = coords[1];

        if (target != -1) this.remove(x, y, this.id); 

        GlobalMethods.changeMatrix(x, y, this.id, false) 
        if (this.energy >= this.multiply) {
            if(this.gender == "female"){
                this.energy = 4;
                GlobalMethods.changeMatrix(this.x, this.y, this.id, true) 
            }
            else{
                this.energy--; 
                GlobalMethods.changeMatrix(this.x, this.y, 0, false) 
            } 
        }


        else { 
            GlobalMethods.changeMatrix(this.x, this.y, 0, false)
        }
        this.changeCoords(x, y); 

        this.step = 0;
    }

    weatherChanged(weather){
        switch(weather){
            case "Spring":
                this.moveSpeed -= 1;
                this.multiply -= 3;
                return;
            case "Summer":
                this.moveSpeed -= 1;
                this.multiply -= 3;
                return;
            case "Fall":
                this.moveSpeed += 1;
                this.multiply += 3;
                return;
            case "Winter":
                this.moveSpeed += 1;
                this.multiply += 3;
        }
    }
}
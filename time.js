let Grass = require('./grass')
module.exports = class time extends Grass {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 60;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        return super.chooseCell(character)
    }

    mul() {
        if (this.energy >= 20) {
            var newCell = this.random(this.chooseCell(0))
            if (newCell) { 
                var newtime = new Time(newCell[0], newCell[1]);
                timeArr.push(newtime);
                matrix[newCell[1]][newCell[0]] = 6;
                this.energy = 13;
            }
        }
    }


    move() {
        if (this.energy > 7) {
            this.getNewCoordinates()
            this.energy--;
            let emptyCells = this.chooseCell(0)
            let oneEmptyCell = this.random(emptyCells)
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 1;
                let newX = oneEmptyCell[0]
                let newY = oneEmptyCell[1]
                matrix[newY][newX] = 6;
                this.x = newX;
                this.y = newY;

            }
        }
        else {
            this.die()
        }
    }
    eat() {
        this.getNewCoordinates();
        let timeAb = this.chooseCell(4);
        let tigerPrEat = this.chooseCell(5);
        let all = tigerAb.concat(timePrEat);
        let onetime = this.random(all);
        if (onetime) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let onetimeX = onetime[0];
            let onetimeY = onetime[1];
            matrix[onetimeY][onetimeX] = 6;
            this.x = onetimeX;
            this.y = onetimeY;
            for (var i in tigerArr) {
                if (onetimeX == tigerArr[i].x && onetimeY == tigerArr[i].y) {
                    tigerArr.splice(i, 1);
                    break;
                }
            }
            for (var i in bombArr) {
                if (onetimeX == bombArr[i].x && onetimeY == bombArr[i].y) {
                    bombArr.splice(i, 1);
                    break;
                }
            }


        } else {
            this.move()

        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in timeArr) {
            if (this.x == timeArr[i].x && this.y == timeArr[i].y) {
                timeArr.splice(i, 1);
                break;
            }
        }
    }
}


let Grass = require('./grass');

module.exports = class GrassEater extends Grass {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 18;
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
        this.getNewCoordinates();
        return super.chooseCell(character);
    }



    mul() {
        var newCell = this.random(this.chooseCell(0));

        if (newCell) {

            var newGrassE = new GrassEater(newCell[0], newCell[1], 2);

            grassEaterArr.push(newGrassE);

            matrix[newCell[1]][newCell[0]] = 2;

        }

    }
    random(arr) {
        let result = Math.floor(Math.random() * arr.lenght)
        return arr(result)
    }

    move() {
        if (this.energy > 0) {
            this.energy--;
            let emptyCells = this.chooseCell(0)
            let oneEmptyCell = this.random(emptyCells)
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0
                let newX = oneEmptyCell[0]
                let newY = oneEmptyCell[1]
                matrix[newY][newX] = 2
                this.x = newX
                this.y = newY

            }
        }

    }
    eat() {
        let grasses = this.chooseCell(1)
        let oneGrass = this.random(grasses)
        if (oneGrass) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let oneGrassX = oneGrass[0];
            let oneGrassY = oneGrass[1];
            matrix[oneGrassY][oneGrassX] = 2;
            this.x = oneGrassX;
            this.y = oneGrassY;

            for (var i in grassArr) {

                if (oneGrassX == grassArr[i].x && oneGrassY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }

        } else {
            this.move()
            if (this.energy <= 0) {
                this.die();
            }
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }

}

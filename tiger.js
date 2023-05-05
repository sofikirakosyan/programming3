//tiger@ mi kerpar e vor@ir yetevic toxnum e grass
//uni mi shat hetaqrqir arancnahatkutyun
class Tiger {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 20;
        this.index = index;
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
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }

    mul() {
        if (this.energy >= 10) {
            var newCell = random(this.chooseCell(0))
            if (newCell) { //[3,4]
                var newtiger = new Tiger(newCell[0], newCell[1]);
                tigerArr.push(newtiger);
                matrix[newCell[1]][newCell[0]] = 4;
                this.energy = 2;
            }
        }
    }




    move() {
        if (this.energy > 0) {
            this.getNewCoordinates()
            this.energy--;
            let emptyCells = this.chooseCell(0)
            let oneEmptyCell = random(emptyCells)
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 1;
                let newX = oneEmptyCell[0]
                let newY = oneEmptyCell[1]
                matrix[newY][newX] = 4;
                this.x = newX
                this.y = newY

            }
        }
        else {
            this.die()
        }
    }
    //na utum e xotaker ev gishatich
    //arancnahatkutyun 1-nra imastn ayn e wor hamerashx apri xoteri het,dra hamar nra energian skzbum 30 e
    //na aynqan e kangnum ev spasum minchev ir koghqi 8 vandaknerum hajtnvi xotaker kam gishatich;
    eat() {
        this.getNewCoordinates()
        let tigerAb = this.chooseCell(3)
        let tigerGrEat = this.chooseCell(2)
        let all = tigerAb.concat(tigerGrEat)
        let onetiger = random(all)
        if (onetiger) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let onetigerX = onetiger[0];
            let onetigerY = onetiger[1];
            matrix[onetigerY][onetigerX] = 4;
            this.x = onetigerX;
            this.y = onetigerY;
            for (var i in grassEaterArr) {
                if (onetigerX == grassEaterArr[i].x && onetigerY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in predatorArr) {
                if (onetigerX == predatorArr[i].x && onetigerY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }


        } else {
            this.move()

        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in tigerArr) {
            if (this.x == tigerArr[i].x && this.y == tigerArr[i].y) {
                tigerArr.splice(i, 1);
                break;
            }
        }
    }
}


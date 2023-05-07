class predator extends Grass{
    constructor(x, y, index) {
    super(x,y,index)
        this.energy = 8;
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
        var newCell = random(this.chooseCell(0)); 
        if (newCell) { 
            var newGrassE = new GrassEater(newCell[0], newCell[1], 3); 
            grassEaterArr.push(newGrassE); 
            matrix[newCell[1]][newCell[0]] = 3; 
        }

    }

    move() {
        if (this.energy > 0) {
            this.energy--;
    
            let emptyCells = this.chooseCell(0)
            let oneEmptyCell = random(emptyCells)
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 0
                let newX = oneEmptyCell[0]
                let newY = oneEmptyCell[1]
                matrix[newY][newX] = 3
                this.x = newX
                this.y = newY

            }
        }
        
    }
    eat() {
        let grasses = this.chooseCell(2)
        let oneGrass = random(grasses)
        if (oneGrass) {
            this.energy++;
            matrix[this.y][this.x] = 0;
            let oneGrassX = oneGrass[0];
            let oneGrassY = oneGrass[1];
            matrix[oneGrassY][oneGrassX] = 3;
            this.x = oneGrassX;
            this.y = oneGrassY; 
            for (var i in grassEaterArr) { 
                if (oneGrassX == grassEaterArr[i].x && oneGrassY == grassEaterArr[i].y) {
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
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }

}

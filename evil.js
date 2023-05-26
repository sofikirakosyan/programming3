let Grass = require('./grass')
module.exports = class evil extends Grass {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 90;
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
        if (this.energy >= 30) {
            var newCell = this.random(this.chooseCell(0))
            if (newCell) { 
                var newtime = new Time(newCell[0], newCell[1]);
                evilArr.push(newtime);
                matrix[newCell[1]][newCell[0]] = 7;
                this.energy = 25;
            }
        }
    }


    move() {
        if (this.energy > 23) {
            this.getNewCoordinates()
            this.energy--;
            let emptyCells = this.chooseCell(0)
            let oneEmptyCell = this.random(emptyCells)
            if (oneEmptyCell) {
                matrix[this.y][this.x] = 1;
                let newX = oneEmptyCell[0]
                let newY = oneEmptyCell[1]
                matrix[newY][newX] = 7;
                this.x = newX;
                this.y = newY;

            }
        }
        else {
            this.die()
        }
    }
    eat() {
      var found = this.chooseCell(6);
      var newCell = this.random(found);

      if (newCell) {
          var newX = newCell[0];
          var newY = newCell[1];
          matrix[newY][newX] = 7;

          matrix[this.y][this.x] = 0;

          this.x = newX;
          this.y = newY;
          this.energy++;

          for (var i in evilArr) {
              if (newX == evilArr[i].x && newY == evilArr[i].y) {
                  evilArr.splice(i, 1);
                  break;
              }
          }
          if (this.energy >= 27) {
              this.mul();
          }
      }
      else {
          this.move();
      }
  }


    die() {
        matrix[this.y][this.x] = 0;
        for (var i in evilArr) {
            if (this.x == evilArr[i].x && this.y == evilArr[i].y) {
                evilArr.splice(i, 1);
                break;
            }
        }
    }
}


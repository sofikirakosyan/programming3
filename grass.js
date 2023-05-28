module.exports = class Grass {
    constructor(x, y, moveSpeed) {
        this.x = x;
        this.y = y;
        this.moveSpeed = moveSpeed;
        this.step = 0;
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

    chooseCell(number) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (this.isValid(x,y)) {
                if (matrix[y][x] == number) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    //tarmacnum e coordinatnery
    changeCoords(x,y){
        this.x = x;
        this.y = y;
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

    remove(x,y, from){
        GlobalMethods.deleteObject(x,y)
        GlobalMethods.changeMatrix(x,y, 0, false, from);
    }

    isValid(x,y){
        return x >= 0 && y >= 0 && y < matrix.length && x < matrix[y].length;
    }

    random(arr) {
        let result = Math.floor(Math.random() * arr.length)
        return arr[result];
    }
}


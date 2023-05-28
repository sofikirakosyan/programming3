let GrassEater = require('./GrassEater');
module.exports = class predator extends GrassEater{
    constructor(x, y) {
    super(x,y)
        this.energy = 5;
        this.multiply = 18;
        this.target = 2;
        this.id = 3;
        this.moveSpeed = 8;
    }
}
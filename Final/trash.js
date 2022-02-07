module.exports = class Trash extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
    }
    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                var tr = new Trash(x, y, 5)
                trashArr.push(tr)
                this.multiply = 0;
            }
        }
    }
}
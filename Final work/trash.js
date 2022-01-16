class Trash extends LivingCreature {

    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newTrash = new Trash(newX, newY);
            trashArr.push(newTrash);
            this.multiply = 0;
        }
    }

}
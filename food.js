'use strict';
function food () {
	var newFood = game.add.sprite(0, 0, 'food');
	newFood.name = 'food';
	newFood.customUpdate = function customUpdate (grid) {
		var newCol = this.col - 1;
		if (newCol < 0) {
			// newCol = grid.cols - 1;
			grid.remove(this.row, this.col, this);
			this.destroy();
		} else {
			grid.remove(this.row, this.col, this);
			grid.add(this.row, newCol, this);
		}
	};
	return newFood;
};



















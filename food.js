/*
 * @author Matthew Zimmerman
 * Defines food and it's properties.
 */

'use strict';
function food () {
	var newFood = game.add.sprite(0, 0, 'food');
	newFood.name = 'food';
	// move up
	newFood.customUpdate = function customUpdate (grid) {
		var newCol = this.col - 1;
		/*
		 * Rather than dying it is of course preferable to have each food and
		 * enemy be recycled from a pool. For the scale of this game however there
		 * is no noticable difference and thus my implementation is superior
		 * due to clarity.
		 */
		// die if off screen
		if (newCol < 0) {
			grid.remove(this.row, this.col, this);
			this.destroy();
		} else {
			grid.remove(this.row, this.col, this);
			grid.add(this.row, newCol, this);
		}
	};
	return newFood;
};



















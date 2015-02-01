/*
 * @author Matthew Zimmerman
 * Defines and enemy and it's properties.
 */

'use strict';
function enemy () {
	var newEnemy = game.add.sprite(0, 0, 'enemy');
	newEnemy.name = 'enemy';
	// move down
	newEnemy.customUpdate = function customUpdate (grid) {
		var newCol = this.col + 1;
		// die if off screen
		if (newCol >= grid.cols) {
			grid.remove(this.row, this.col, this);
			this.destroy();
		} else {
			grid.remove(this.row, this.col, this);
			grid.add(this.row, newCol, this);
		}
	};
	return newEnemy;
};

















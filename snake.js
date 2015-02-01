/*
 * @author Matthew Zimmerman
 * Defines a snake and it's functions.
 */

'use strict';
function snake (isHead) {
	var newElement;
	// set sprite type based on whether it is a head or a tail
	if (isHead) {
		newElement = game.add.sprite(0, 0, 'snakeHead');
	} else {
		newElement = game.add.sprite(0, 0, 'snakeTail');
	}
	newElement.lastRow = 0; // which row was last visited
	newElement.lastCol = 0;
	newElement.name = 'snake';
	newElement.link = undefined; // the child for a linked list
	// move to new location and tell child to move to current location
	newElement.moveTo = function moveTo (row, col, grid) {
		this.lastRow = this.row;
		this.lastCol = this.col;
		grid.remove(this.lastRow, this.lastCol, this);
		grid.add(row, col, this);
		if (this.link != undefined) {
			this.link.moveTo(this.lastRow, this.lastCol, grid);
		}
	};
	newElement.addTail = addTail;
	return newElement;
}
// place a child at old position. it is safe to assume a last position
// exists since a snake must move to eat food.
function addTail () {
	var tail = this;
		while (tail.link != undefined) {
			tail = tail.link;
		}
		var newElement = new snake();
		grid.add(tail.lastRow, tail.lastCol, newElement);
		tail.link = newElement;
		return newElement;
}


















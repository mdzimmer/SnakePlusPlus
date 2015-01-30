'use strict';
function snake (isHead) {
	var newElement;
	if (isHead) {
		newElement = game.add.sprite(0, 0, 'snakeHead');
	} else {
		newElement = game.add.sprite(0, 0, 'snakeTail');
	}
	newElement.lastRow = 0;
	newElement.lastCol = 0;
	newElement.name = 'snake';
	newElement.link = undefined;
	newElement.moveTo = function moveTo (row, col, grid) {
		this.lastRow = this.row;
		this.lastCol = this.col;
		grid.remove(this.lastRow, this.lastCol, this);
		grid.add(row, col, this);
		if (this.link != undefined) {
			this.link.moveTo(this.lastRow, this.lastCol, grid);
		}
	};
	/*
	newElement.customDestroy = function customDestroy () {
		if (this.link != undefined) {
			this.link.customDestroy();
		}
		this.destroy(false);
	};
	*/
	newElement.addTail = addTail;
	return newElement;
}
/*
function moveTo () {
	this.lastRow = this.row;
	this.lastCol = this.col;
	grid.remove(this.lastRow, this.lastCol, this);
	grid.add(row, col, this);
	if (this.link != undefined) {
		this.link.moveTo(this.lastRow, this.lastCol, grid);
	}
}
function customDestroy () {
	if (this.link != undefined) {
		this.link.customDestroy();
	}
	this.destroy(false);
}
*/
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
/*
var SnakeHead = function(game) {
	Phaser.Sprite.call(this, game, 0, 0, 'snakeHead');
	this.lastRow = 0;
	this.lastCol = 0;
	this.link = undefined;
};
SnakeHead.prototype = Object.create(Phaser.Sprite.prototype);
SnakeHead.prototype.constructor = SnakeHead;
SnakeHead.prototype.update = function () {
	
};
SnakeHead.prototype.moveTo = moveTo;
SnakeHead.prototype.customDestroy = customDestroy;
SnakeHead.prototype.addTail = addTail;
*/


















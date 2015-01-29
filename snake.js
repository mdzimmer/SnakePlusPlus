function snakeElement () {
	var newElement = game.add.sprite(0, 0, 'snakeTail');
	newElement.link = undefined;
	newElement.moveTo = function moveTo (row, col, grid) {
		var oldRow = this.row;
		var oldCol = this.col;
		grid.remove(oldRow, oldCol, this);
		grid.add(row, col, this);
		if (this.link != undefined) {
			this.link.moveTo(oldRow, oldCol, grid);
		}
	};
	newElement.customDestroy = function customDestroy () {
		if (this.link != undefined) {
			this.link.customDestroy();
		}
		this.destroy(false);
	};
	return newElement;
}
function addTail () {
	var tail = this;
	while (tail.link != undefined) {
		tail = tail.link;
	}
	var newElement = new snakeElement();
	tail.link = newElement;
	return newElement;
}
function initialiseSnake () {
	var head = new snakeElement();
	head.addTail = addTail;
	return head;
};























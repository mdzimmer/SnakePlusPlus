'use strict';
function initialiseGrid (size, rows, cols) {
	var grid = {};
	grid.array = [];
	grid.size = size;
	grid.rows = rows;
	grid.cols = cols;
	grid.itNum = 0;
	grid.add = function add (row, col, member) {
		this.array[row][col].push(member);
		member.width = member.height = this.size;
		member.x = row * this.size;
		member.y = col * this.size;
		member.row = row;
		member.col = col;
	};
	grid.addRandom = function addRandom (member) {
		var randomRow = Math.floor(Math.random() * rows);
		var randomCol = Math.floor(Math.random() * cols);
		this.add(randomRow, randomCol, member);
	};
	grid.addRandomBot = function addRandomBot (member) {
		var randomRow = Math.floor(Math.random() * rows);
		this.add(randomRow, this.cols - 1, member);
	};
	grid.addRandomTop = function addRandomTop (member) {
		var randomRow = Math.floor(Math.random() * rows);
		this.add(randomRow, 0, member);
	};
	grid.remove = function remove (row, col, member) {
		var element = this.array[row][col];
		for (var i = 0; i < element.length; ++i) {
			if (element[i] == member) {
				element.splice(i, 1);
				return;
			}
		}
		throw new Error('remove() failed to find element');
	};
	grid.getFood = function getFood (row, col) {
		var element = this.array[row][col];
		for (var i = 0; i < element.length; ++i) {
			if (element[i].name == 'food') {
				element[i].destroy(false);
				element.splice(i, 1);
				return true;
			}
		}
		return false;
	};
	grid.customUpdate = function customUpdate (_grid) {
		this.itNum++;
		for (var row = 0; row < this.rows; ++row) {
			for (var col = 0; col < this.cols; ++col) {
				var element = this.array[row][col];
				for (var i = 0; i < element.length; ++i) {
					if (element[i].hasOwnProperty('customUpdate') && (!element[i].hasOwnProperty('itNum') || element[i].itNum < this.itNum)) {
						element[i].itNum = this.itNum;
						element[i].customUpdate(_grid);
					}
				}
			}
		}
	};
	grid.clear = function clear () {
		for (var row = 0; row < this.rows; ++row) {
			for (var col = 0; col < this.cols; ++col) {
				var element = this.array[row][col];
				for (var i = 0; i < element.length; ++i) {
					element[i].destroy();
				}
			}
		}
	};
	grid.hasEnemy = function hasEnemy (row, col) {
		var element = this.array[row][col];
		for (var i = 0; i < element.length; ++i) {
			if (element[i].name == 'enemy') {
				return true;
			}
		}
		return false;
	};
	grid.hasSnake = function hasSnake (row, col) {
		var element = this.array[row][col];
		for (var i = 0; i < element.length; ++i) {
			if (element[i].name == 'snake') {
				return true;
			}
		}
		return false;
	};
	for (var i = 0; i < rows; ++i) {
		var col = [];
		for (var j = 0; j < cols; ++j) {
			col.push(new Array());
		}
		grid.array.push(col);
	}
	return grid;
}

































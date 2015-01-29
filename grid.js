function initialiseGrid (size, rows, cols) {
	var grid = {};
	grid.array = [];
	grid.size = size;
	grid.rows = rows;
	grid.cols = cols;
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
	for (var i = 0; i < rows; ++i) {
		var col = [];
		for (var j = 0; j < cols; ++j) {
			col.push(new Array());
		}
		grid.array.push(col);
	}
	return grid;
}

































var game = new Phaser.Game(800, 800, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
var cursors;
var gridSize = 20;
var numRows = 40;
var numCols = 40;
var TICKTIME = 100; // number of miliseconds between ticks of action
var grid;
var snakeHead;
var snakeTail;
var foods = [];
var enemies = [];
var DIRECTIONS = {
	UP: 0,
	RIGHT: 1,
	DOWN: 2,
	LEFT: 3
};
var dir = DIRECTIONS.RIGHT;

function preload () {
	game.load.image('snakeHead', 'assets/snakeHead.png');
	game.load.image('snakeTail', 'assets/snakeTail.png');
	game.load.image('food', 'assets/food.png');
	game.load.image('enemy', 'assets/enemy.png');
}

function create () {
	// background color
	game.stage.backgroundColor = '#FFFFCC';
	// grid
	grid = initialiseGrid(gridSize, numRows, numCols);
	// snake
	snakeHead = initialiseSnake();
	grid.add(0, 0, snakeHead);
	/*
	// test food
	var newFood = new food();
	foods.push(newFood);
	grid.addRandom(newFood);
	*/
	// input
	cursors = game.input.keyboard.createCursorKeys();
	// game action
	game.time.events.loop(TICKTIME, action, this);
}

function update () {
	// input
	if (cursors.right.isDown && dir != DIRECTIONS.LEFT) {
		dir = DIRECTIONS.RIGHT;
	}
	if (cursors.left.isDown && dir != DIRECTIONS.RIGHT) {
		dir = DIRECTIONS.LEFT;
	}
	if (cursors.up.isDown && dir != DIRECTIONS.UP) {
		dir = DIRECTIONS.UP;
	}
	if (cursors.down.isDown && dir != DIRECTIONS.DOWN) {
		dir = DIRECTIONS.DOWN;
	}
}

function action () {
	// input
	var newRow = snakeHead.row;
	var newCol = snakeHead.col;
	if (dir == DIRECTIONS.UP) {
		newCol--;
	} else if (dir == DIRECTIONS.RIGHT) {
		newRow++;
	} else if (dir == DIRECTIONS.DOWN) {
		newCol++;
	} else if (dir == DIRECTIONS.LEFT) {
		newRow--;
	}
	// test bounds
	if (newRow >= numRows || newRow < 0 || newCol >= numCols || newCol < 0) {
		restart();
		return;
	}
	// test collisions
	// TODO: test collisions
	// move
	snakeHead.moveTo(newRow, newCol, grid);
}

function restart () {
	// grid
	grid = initialiseGrid(gridSize, numRows, numCols);
	// snake
	snakeHead.customDestroy();
	snakeHead = initialiseSnake();
	grid.add(0, 0, snakeHead);
	// food
	food = [];
	// enemies
	enemies = [];
	// direction
	dir = DIRECTIONS.RIGHT;
}






















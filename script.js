'use strict';
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
var cursors;
var gridSize = 20;
var numRows = 40;
var numCols = 40;
var TICKTIME = 100; // number of miliseconds between ticks of action
var FOODCHANCE = 20; // chance of food spawning per action
var grid;
var snakeHead;
var snakeTail;
var DIRECTIONS = {
	UP: 0,
	RIGHT: 1,
	DOWN: 2,
	LEFT: 3
};
var dir;
var ctrl;

function preload () {
	game.load.image('snakeHead', 'assets/snakeHead.png');
	game.load.image('snakeTail', 'assets/snakeTail.png');
	game.load.image('food', 'assets/food.png');
	game.load.image('enemy', 'assets/enemy.png');
}

function create () {
	// background color
	game.stage.backgroundColor = '#FFFFCC';
	// input
	cursors = game.input.keyboard.createCursorKeys();
	// game action
	game.time.events.loop(TICKTIME, action, this);
	// initialise members
	init();
}

function update () {
	// input
	if (cursors.right.isDown && dir != DIRECTIONS.LEFT) {
		ctrl = DIRECTIONS.RIGHT;
	}
	if (cursors.left.isDown && dir != DIRECTIONS.RIGHT) {
		ctrl = DIRECTIONS.LEFT;
	}
	if (cursors.up.isDown && dir != DIRECTIONS.DOWN) {
		ctrl = DIRECTIONS.UP;
	}
	if (cursors.down.isDown && dir != DIRECTIONS.UP) {
		ctrl = DIRECTIONS.DOWN;
	}
}

function action () {
	// add new food
	if (Math.random() * 100 <= FOODCHANCE) {
		grid.addRandomBot(new food());
	}
	// move grid elements
	grid.customUpdate(grid);
	// next space
	var newRow = snakeHead.row;
	var newCol = snakeHead.col;
	if (ctrl == DIRECTIONS.UP) {
		newCol--;
		dir = DIRECTIONS.UP;
	} else if (ctrl == DIRECTIONS.RIGHT) {
		newRow++;
		dir = DIRECTIONS.RIGHT;
	} else if (ctrl == DIRECTIONS.DOWN) {
		newCol++;
		dir = DIRECTIONS.DOWN;
	} else if (ctrl == DIRECTIONS.LEFT) {
		newRow--;
		dir = DIRECTIONS.LEFT;
	}
	// test bounds
	if (newRow >= numRows || newRow < 0 || newCol >= numCols || newCol < 0) {
		restart();
		return;
	}
	// test collisions
	if (grid.getFood(newRow, newCol)) {
		snakeHead.addTail();
	}
	// move
	snakeHead.moveTo(newRow, newCol, grid);
}

function init () {
	// grid
	grid = initialiseGrid(gridSize, numRows, numCols);
	// snake
	snakeHead = snake(true);
	grid.add(0, 0, snakeHead);
	// direction
	dir = DIRECTIONS.RIGHT;
	// grid.addRandomBot(new food());
}

function restart () {
	// grid
	grid.clear();
	// initialise new game
	init();
}




















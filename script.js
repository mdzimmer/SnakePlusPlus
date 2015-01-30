'use strict';
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });
var cursors;
var gridSize = 20;
var numRows = 40;
var numCols = 40;
var TICKTIME = 100; // number of miliseconds between ticks of action
var FOODCHANCE = 20; // chance of food spawning per action
var ENEMYCHANCE = 20; // chance of enemy spawning per action
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
var foodGroup;
var enemyGroup;
var playerGroup;
var score;
var scoreText;

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
	// groups
	playerGroup = game.add.group();
	playerGroup.z = 3;
	foodGroup = game.add.group();
	foodGroup.z = 1;
	enemyGroup = game.add.group();
	enemyGroup.z = 2;
	// score
	scoreText = game.add.text(20, 20, "SCORE: 0", {font: "30px Arial", fill: "#000000"});
	// initialise members
	init();
	///
	game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(action);
	game.input.keyboard.addKey(Phaser.Keyboard.ZERO).onDown.add(addEnemy);
	game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(addFood);
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
		addFood();
	}
	// add new enemy
	if (Math.random() * 100 <= ENEMYCHANCE) {
		addEnemy();
	}
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
	if (grid.hasSnake(newRow, newCol)) {
		restart();
		return;
	}
	// pre test
	if (grid.getFood(newRow, newCol)) {
		playerGroup.add(snakeHead.addTail());
		addScore(1);
	}
	if (grid.hasEnemy(newRow, newCol)) {
		restart();
		return;
	}
	// move grid elements
	grid.customUpdate(grid);
	// post test
	if (grid.getFood(newRow, newCol)) {
		playerGroup.add(snakeHead.addTail());
		addScore(1);
	}
	if (grid.hasEnemy(newRow, newCol)) {
		restart();
		return;
	}
	// move
	snakeHead.moveTo(newRow, newCol, grid);
}

function addFood () {
	var newFood = new food();
	foodGroup.add(newFood);
	grid.addRandomBot(newFood);
}

function addEnemy () {
	var newEnemy = new enemy();
	enemyGroup.add(newEnemy);
	grid.addRandomTop(newEnemy);
}

function addScore (amt) {
	score += amt;
	scoreText.setText("SCORE: " + score);
}

function init () {
	// grid
	grid = initialiseGrid(gridSize, numRows, numCols);
	// snake
	snakeHead = snake(true);
	grid.add(0, 0, snakeHead);
	playerGroup.add(snakeHead);
	// movement
	ctrl = DIRECTIONS.RIGHT;
	dir = DIRECTIONS.RIGHT;
	// score
	score = 0;
	scoreText.text = "SCORE: " + score;
}

function restart () {
	// grid
	grid.clear();
	// initialise new game
	init();
}




















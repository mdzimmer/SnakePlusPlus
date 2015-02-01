/*
 * @author Matthew Zimmerman
 * Main script for the program. Collects grid, snake, food, and enemies. Handles spawning,
 * grid updates, collision, and user input.
 */


'use strict';
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update }); // create engine singleton
var cursors; // reference to listener object that handles user input
var gridSize = 20; // pixel size of a grid cell
var numRows = 40; // how many rows accross the grid is
var numCols = 40; // how many columns high the grid is
var TICKTIME = 100; // number of miliseconds between ticks of action
var FOODCHANCE = 20; // chance of food spawning per action
var ENEMYCHANCE = 20; // chance of enemy spawning per action
var grid; // reference to grid singleton
var snakeHead; // head of snake linked list
var snakeTail; // tail of snake linked list
// enum for possible directions snake can travel
var DIRECTIONS = {
	UP: 0,
	RIGHT: 1,
	DOWN: 2,
	LEFT: 3
};
/*
 * Dir and Ctrl need to be seperate since the user's input is taken
 * each frame but the snake's direction is only updated every action tick.
 */
var dir; // current movement direction
var ctrl; // last user input
/*
 * Groups serve many purposes in Phaser but here I use them to define the
 * render order for sprites.
 */
var foodGroup; // layer for food
var enemyGroup; // layer for enemies
var playerGroup; // layer for player
var score; // number for score
var scoreText; // text object to display score

// called before load, or something, i don't really get loading in this engine
function preload () {
	// load assets
	game.load.image('snakeHead', 'assets/snakeHead.png');
	game.load.image('snakeTail', 'assets/snakeTail.png');
	game.load.image('food', 'assets/food.png');
	game.load.image('enemy', 'assets/enemy.png');
}

// called once on start of game
function create () {
	// background color
	game.stage.backgroundColor = '#FFFFCC';
	// input
	cursors = game.input.keyboard.createCursorKeys();
	// game action
	/*
	 * Creates a custom update tick to get the unified movement effect of snake.
	 */
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
	/// debug keys
	// game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(action);
	// game.input.keyboard.addKey(Phaser.Keyboard.ZERO).onDown.add(addEnemy);
	// game.input.keyboard.addKey(Phaser.Keyboard.ONE).onDown.add(addFood);
}

// called every frame (ideally)
function update () {
	// input
	/*
	 * Tests prevent snake from 'turning in on itself.'
	 */
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

// called once every defined tick
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
	/*
	 * Since there are two cases to account for, the player hitting the object before and after it moves,
	 * two passes are made. This is hard to describe in words, but it was a necesary addition without further
	 * changing the way grid works.
	 */
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
	/*
	 * Since I couldn't figure out how to override update, in fact all my prototypes are
	 * created through factories which is not ideal for this implementation, this calls them
	 * directly and also helps to overcome javascript's difficulty with order of script injection
	 * defining member access. In the future I'll use RequireJS to overcome this but sadly it was made
	 * by console command plebs who want me to RTFM.
	 */
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

// adds a food to the game
function addFood () {
	var newFood = new food();
	foodGroup.add(newFood);
	grid.addRandomBot(newFood);
}

// adds an enemy to the game
function addEnemy () {
	var newEnemy = new enemy();
	enemyGroup.add(newEnemy);
	grid.addRandomTop(newEnemy);
}

// adds an amount to the score
function addScore (amt) {
	score += amt;
	scoreText.setText("SCORE: " + score);
}

// sets the game up
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

// clears the game and starts new setup
function restart () {
	// grid
	grid.clear();
	// initialise new game
	init();
}




















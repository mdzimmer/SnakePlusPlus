Matthew Zimmerman (mdzimmer@ucsc.edu)
CMPM 20, Assignment 3
SnakePlusPlus
=======================================
WARNING: The engine I used sadly causes javascript to deny
access to local files, thus my game can only be run in the
context of a server. Please play it at the link below:

http://mdzimmer.github.io/SnakePlusPlus/

If the link does not work or there is any problem with this
sort of entry I accept any/all point deduction.
======================================
Controls:
ARROW KEYS to move your snake
======================================
Description:
You are the blue block at the top left. Move into the same
space in the grid as a food (green) block to grow your tail.
Avoid enemy (red) blocks.
Hitting walls, enemies, and your own tail will cause a reset.
Score is in the upper left.
======================================
"Innovation":
Food moves and an enemy block type is added. I think it's fun.
At the same time it does require some unique rules. Food and enemies
can pass through your translucent tail without harming you and they
are partly visible. Eating and dying can only be done by the head
(the solid blue block).
=====================================
Dependencies:
Uses Richard Davey's Phaser engine, which can be found at:

phaser.io
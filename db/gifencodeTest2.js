var GIFEncoder = require('gifencoder');
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');



// use node-canvas 
var canvas = new Canvas(256, 192);
var ctx = canvas.getContext('2d');

canvas.toData
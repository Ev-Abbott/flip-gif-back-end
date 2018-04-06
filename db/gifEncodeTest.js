var GIFEncoder = require('gifencoder');
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');

let imgURL1 = fs.readFileSync('./test-IMGURL.txt', 'utf-8');
let img = new Image;
img.src = imgURL1;
let imgURL2 = fs.readFileSync('./test-IMGURL2.txt', 'utf-8');
let img2 = new Image;
img2.src = imgURL2;
 
var encoder = new GIFEncoder(370, 370);
// stream the results as they are available into myanimated.gif 
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
 
encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat 
encoder.setDelay(500);  // frame delay in ms 
encoder.setQuality(10); // image quality. 10 is default. 
 
// use node-canvas 
var canvas = new Canvas(370, 370);
var ctx = canvas.getContext('2d');
 
// red rectangle 
ctx.clearRect(0, 0, 370, 370);
ctx.drawImage(img, 0, 0, 370, 370);
encoder.addFrame(ctx);
 
// green rectangle 
ctx.clearRect(0, 0, 370, 370);
ctx.drawImage(img2, 0, 0, 370, 370);
encoder.addFrame(ctx);
 
encoder.finish();




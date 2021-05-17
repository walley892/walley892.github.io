import {loadText} from "./utils.js";

var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var glslCanvas = new GlslCanvas(canvas);

var frag = await loadText("testFrag.frag");

glslCanvas.load(frag);
export {canvas, glslCanvas};

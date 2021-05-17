import {loadText} from "./utils.js";

var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var glslCanvas = new GlslCanvas(canvas);

loadText("testFrag.frag").then(text => glslCanvas.load(text));

export {canvas, glslCanvas};

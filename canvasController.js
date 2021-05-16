import {OscSceneController} from "./oscController.js";
var canvasWidth, canvasHeight;
var canvas;

function setUpCanvas() {
	canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
}

setUpCanvas();

var controller = new OscSceneController(canvas);
controller.initScene();

window.setInterval(controller.update.bind(controller), 10);
window.setInterval(controller.drawScene.bind(controller), 10);

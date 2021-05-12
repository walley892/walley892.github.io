import {placeNodes, getNodes} from "./oscController";
var canvasWidth, canvasHeight;
var canvas;
function setUpCanvas() {
	canvas = document.getElementById("mainCanvas");
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientWidth;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
}

function drawOscNode(node){
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(node.posX, node.posY, 25, 2*Math.PI);
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.fill();
}

function initOscContoller(){
	placeNodes(25, 1, canvasHeight/2, canvasWidth/2);
}

function drawOscNodes(){
	var nodes = getNodes();
	for(var i = 0; i < nodes.length; ++i){
		drawOscNode(nodes[i]);
	}
}

setUpCanvas();
placeNodes();

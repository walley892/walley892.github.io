import {placeNodes, getNodes, placeNNodesInRing} from "./oscController.js";
var canvasWidth, canvasHeight;
var canvas;

function setUpCanvas() {
	canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
}

function drawOscNode(node){
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(node.posX, node.posY, node.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'rgb(255, 0, 0)';
	ctx.fill();
}

function initOscController(){
	var nodes_per_ring = [10, 8];
	var ring_sizes = [canvasWidth/22, canvasWidth/10];
	placeNodes(nodes_per_ring, ring_sizes, canvasWidth/2, canvasHeight/2);
	placeNNodesInRing(4, canvasWidth/5, 145, canvasWidth/2, canvasHeight/2);
}

function drawOscNodes(){
	var nodes = getNodes();
	for(var i = 0; i < nodes.length; ++i){
		drawOscNode(nodes[i]);
	}
}

setUpCanvas();
initOscController();
drawOscNodes();

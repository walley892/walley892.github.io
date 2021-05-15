import {placeNodes, getNodes, placeNNodesInRing, updateNodes} from "./oscController.js";
var canvasWidth, canvasHeight;
var canvas;

function setUpCanvas() {
	canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
}

function drawText(){
	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext("2d");
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	var nodes = getNodes();
	var node = nodes[nodes.length-1];
	ctx.fillText(":)", node.posX, node.posY); 
	node = nodes[nodes.length-2];
	ctx.fillText("about", node.posX, node.posY); 
	node = nodes[nodes.length-3];
	ctx.fillText("etc.", node.posX, node.posY); 
	node = nodes[nodes.length-4];
	ctx.fillText("projects", node.posX, node.posY); 
	node = nodes[0];
	ctx.fillText("E", node.posX, node.posY); 
}

function clearOscNode(node){
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(node.posX, node.posY, node.radius + 1, 0, 2*Math.PI);
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fill();
}

function drawOscNode(node){
	clearOscNode(node);
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(node.posX, node.posY, node.radius, 0, 2*Math.PI);
	var state = node.state;
	var red = Math.floor(state*255);
	var blue = 255 - red;
	ctx.globalAlpha = state;
	//ctx.fillStyle = 'rgb(' + red + ', '+blue+', 0)';
	ctx.fillStyle = 'rgb(0, 255, 255)';
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
	drawText();
}

setUpCanvas();
initOscController();
drawOscNodes();
window.setInterval(updateNodes, 10);
window.setInterval(drawOscNodes, 10);

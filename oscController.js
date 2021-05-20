import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";

class Node{
	constructor(posX, posY, radius){
            this.posX = posX;
            this.posY = posY;
            this.state = Math.random();
	    this.prevState = this.state;
	    this.radius = radius;
            this.neighbors = [];
        }
	addNeighbor(node){
	    this.neighbors.push(node);
	}
}

var nodes = [];

function polarToCartesian(r, theta){
	return [r*Math.cos(theta), r*Math.sin(theta)];
}

function placeNNodesInRing(nNodes, bigRadius, littleRadius, centerX, centerY){
	var deltaAngle = (2*Math.PI)/nNodes;
	var prevLength = nodes.length;
	for(var i = 0; i < nNodes; ++i){
		var angle = deltaAngle*i;
		var pos = polarToCartesian(bigRadius, angle);
		var newNode = new Node(centerX + pos[0], centerY + pos[1], littleRadius);
		nodes.push(newNode);
		if(i != 0){
			newNode.addNeighbor(nodes[nodes.length-1]);
			nodes[nodes.length-1].addNeighbor(newNode);
		}	
		if(i == nNodes -1){
			newNode.addNeighbor(nodes[prevLength]);
			nodes[prevLength].addNeighbor(newNode);
		}
	}
}


//place n_nodes[i] rings around the ith concentric ring of radius radii[i]
function placeNodes(n_nodes, radii, centerX, centerY){
	// Add the center node
	nodes.push(new Node(centerX, centerY, 50/baseScreenWidth));
	for (var i = 0; i < radii.length; ++i){
		var nodes_in_ring = n_nodes[i];
		var bigRadius = radii[i];
		var littleRadius = bigRadius*Math.sin(Math.PI/nodes_in_ring);
		placeNNodesInRing(nodes_in_ring, bigRadius, littleRadius, centerX, centerY);
	}
}


function getNodes(){
	return nodes;
}

function updateState(){
	for(var i = 0; i < nodes.length; ++i){
		nodes[i].state = nodes[i].state + 0.001;
		nodes[i].prevState = nodes[i].state;
	}
}

function kickNeighbors(){
	for(var i = 0; i < nodes.length; ++i){
		if(nodes[i].prevState >=1){
			for(var j = 0; j < nodes[i].neighbors.length; ++j){
				nodes[i].neighbors[j].state += 0.005;
			}
		}
	}
}

function setToZero(){
	for(var i = 0; i < nodes.length; ++i){
		if(nodes[i].prevState >=1){
			nodes[i].state = 0;
		}
	}
}

function updateNodes(){
	updateState();
	kickNeighbors();
	setToZero();
}

function drawText(canvas){
	var ctx = canvas.getContext("2d");
	ctx.globalAlpha = 1;
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

function clearOscNode(node, canvas){
	var ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.arc(node.posX, node.posY, node.radius + 1, 0, 2*Math.PI);
	ctx.globalAlpha = 1;
	ctx.fillStyle = 'rgb(0, 0, 0)';
	ctx.fill();
}

function drawOscNode(node, canvas){
	clearOscNode(node, canvas);
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

class OscSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.glslCanvas = glslCanvas;
	}
	initScene(){
		var nodes_per_ring = [10, 8];
		var ring_sizes = [(baseScreenWidth/16) / baseScreenWidth, (baseScreenWidth/6) / baseScreenWidth];
		placeNodes(nodes_per_ring, ring_sizes, (baseScreenWidth/2)/baseScreenWidth, (baseScreenHeight/2)/baseScreenHeight);
		placeNNodesInRing(4, (baseScreenWidth/3)/baseScreenWidth, 200/baseScreenWidth, (baseScreenWidth/2)/baseScreenWidth, (baseScreenHeight/2)/baseScreenHeight);
	}
	fragFile(){
		return "oscFrag.frag";
	}
	drawScene(){
		this.glslCanvas.setUniform("u_position", ...(nodes.map((node) => [node.posX, node.posY])));
		this.glslCanvas.setUniform("u_radius", ...(nodes.map((node) => node.radius)));
		this.glslCanvas.setUniform("u_state", ...(nodes.map((node) => node.state)));
	}
	update(){
		updateNodes();
	}
}

export {OscSceneController, getNodes};

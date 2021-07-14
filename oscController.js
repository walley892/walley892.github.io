import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";
import {sizeAndPlaceElementInCircle} from "./utils.js";

class Node{
	constructor(posX, posY, radius, state=0){
            this.posX = posX;
            this.posY = posY;
	    if(state == 0){
		this.state = Math.random();
	    }else{
		this.state = state;
	    }
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
		var state = angle/(2*Math.PI); 
		var pos = polarToCartesian(bigRadius, angle);
		var newNode = new Node(centerX + pos[0], centerY + pos[1], littleRadius, state);
		nodes.push(newNode);
		/*
		for(var j = prevLength; j < nodes.length-1; ++j){
			nodes[j].addNeighbor(newNode);
			newNode.addNeighbor(nodes[j]);
		}
		*/
		if(i != 0){
			nodes[nodes.length-1].addNeighbor(newNode);
		}	
		if(i == nNodes -1){
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
		nodes[i].state = nodes[i].state + 0.01*(2 - (nodes[i].state*0.3));
		nodes[i].prevState = nodes[i].state;
	}
}

function kickNeighbors(){
	for(var i = 0; i < nodes.length; ++i){
		if(nodes[i].prevState >=1){
			for(var j = 0; j < nodes[i].neighbors.length; ++j){
				nodes[i].neighbors[j].state += 0.05;
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

function distance(x1, y1, x2, y2){
	var x = x1 - x2;
	var y = y1 - y2;
	return Math.sqrt(x*x + y*y);
}

class OscSceneController extends SceneController{
	constructor(canvas, glslCanvas, canvasController){
		super(canvas, glslCanvas);
		this.glslCanvas = glslCanvas;
		this.canvas = canvas;
		this.canvasController = canvasController;
		this._elements = [];
	}
	createHtml(){
		this._elements.push(document.createElement("p"));
		this._elements.push(document.createElement("p"));
		this._elements.push(document.createElement("p"));
		this._elements.push(document.createElement("p"));
		this._elements[0].innerHTML = "projects";
		this._elements[1].innerHTML = "I'm evan :)";
		this._elements[2].innerHTML = "about";
		for(var i = 0; i < this._elements.length; ++i){
			this._elements[i].style.color = "black";
		}

		document.body.appendChild(this._elements[0]);
		document.body.appendChild(this._elements[1]);
		document.body.appendChild(this._elements[2]);
		this._elements[0].addEventListener('click', function(){
			this.canvasController.switchSceneString("eye");
		}.bind(this));
		this._elements[2].addEventListener('click', function(){
			this.canvasController.switchSceneString("domain");
		}.bind(this));

		for(var i = 0; i < this._elements.length; ++i){
			this._elements[i].style.zIndex = "2";
		}

		this.placeHtml();
	}
	placeHtml(){
		sizeAndPlaceElementInCircle(nodes[19].posX, nodes[19].posY, nodes[19].radius, this.canvas, this._elements[0]);
		sizeAndPlaceElementInCircle(nodes[20].posX, nodes[20].posY, nodes[20].radius, this.canvas, this._elements[1]);
		sizeAndPlaceElementInCircle(nodes[21].posX, nodes[21].posY, nodes[21].radius, this.canvas, this._elements[2]);
	}
	tearDownHtml(){
		for(var i = 0; i < this._elements.length; ++i){
			this._elements[i].remove();
		}
		this.glslCanvas.uniforms = {};
	}
	onClick(x, y){
		/*
		if(distance(x, y, nodes[nodes.length-1].posX, nodes[nodes.length-1].posY) < nodes[nodes.length-1].radius){
			this.canvasController.switchSceneString("domain");
		}
		*/
	}
	initScene(){
		if(nodes.length == 0){
			var nodes_per_ring = [10, 8];
			var ring_sizes = [(baseScreenWidth/16) / baseScreenWidth, (baseScreenWidth/6) / baseScreenWidth];
			placeNodes(nodes_per_ring, ring_sizes, (baseScreenWidth/2)/baseScreenWidth, (baseScreenHeight/2)/baseScreenHeight);
			placeNNodesInRing(4, (baseScreenWidth/3)/baseScreenWidth, 200/baseScreenWidth, (baseScreenWidth/2)/baseScreenWidth, (baseScreenHeight/2)/baseScreenHeight);
		}
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

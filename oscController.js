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


//place n_nodes[i] rings around the ith concentric ring of radius radii[i]
function placeNodes(n_nodes, radii, centerX, centerY){
	// Add the center node
	nodes.push(new Node(centerX, centerY, 50));
	for (var i = 0; i < radii.length; ++i){
		var nodes_in_ring = n_nodes[i];
		var bigradius = radii[i];
		var deltaAngle = (2*Math.PI)/nodes_in_ring;
		var littleradius = bigradius*Math.sin(Math.PI/nodes_in_ring);
		for(var j = 0; j < nodes_in_ring; ++j){
			var angle = deltaAngle*j;
			var pos = polarToCartesian(bigradius, angle);
			var newNode = new Node(centerX + pos[0], centerY + pos[1], littleradius);
			nodes.push(newNode);
			nodes[0].addNeighbor(newNode);
			if(j != 0){
				newNode.addNeighbor(nodes[nodes.length-1]);
				nodes[node.length-1].addNeighbor(newNode);
			}
		}
	}
}

function placeNNodesInRing(nNodes, bigRadius, littleRadius, centerX, centerY){
	var deltaAngle = (2*Math.PI)/nNodes;
	for(var i = 0; i < nNodes; ++i){
		var angle = deltaAngle*i;
		var pos = polarToCartesian(bigRadius, angle);
		nodes.push(new Node(centerX + pos[0], centerY + pos[1], littleRadius));
	}
}


function getNodes(){
	return nodes;
}

function updateState(){
	for(var i = 0; i < nodes.length; ++i){
		nodes[i].state = nodes[i].state + 0.03;
		nodes[i].prevState = nodes[i].state;
	}
}

function kickNeighbors(){
	for(var i = 0; i < nodes.length; ++i){
		if(nodes[i].prevState >=1){
			for(var j = 0; j < nodes[i].neighbors.length; ++j){
				nodes[i].neighbors[j].state += 0.01;
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

export {placeNodes, getNodes, placeNNodesInRing, updateNodes};

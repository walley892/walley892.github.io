class Node{
	constructor(posX, posY, radius){
            this.posX = posX;
            this.posY = posY;
            this.state = Math.random();
	    this.radius = radius;
            this.neighbors = [];
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
			nodes.push(new Node(centerX + pos[0], centerY + pos[1], littleradius));
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

export {placeNodes, getNodes, placeNNodesInRing};

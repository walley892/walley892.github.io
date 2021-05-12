class Node{
	constructor(posX, posY){
            this.posX = posX;
            this.posY = posY;
            this.state = Math.random();
            this.neighbors = [];
        }
}

var nodes = [];

function polarToCartesian(r, theta){
	return [r*Math.cos(theta), r*Math.sin(theta)];
}

//place nodes of radius radius in n_rings concentric rings
function placeNodes(radius, n_rings, centerX, centerY){
	// Add the center node
	nodes.push(new Node(centerX, centerY));
	for (var i = 0; i < n_rings; ++i){
		var bigRadius = 2*radius*(i+1);
		nodes_in_ring = Math.PI/(Math.asin(radius/bigRadius));
		var deltaAngle = Math.PI/nodes_in_ring;
		for(var j = 0; j < nodes_in_ring; ++j){
			var angle = deltaAngle*j;
			var pos = polarToCartesian(bigRadius, angle);
			nodes.push(new Node(centerX + pos[0], centerY + pos[1]));
		}
	}
}

function getNodes(){
	return nodes;
}

export {placeNodes, getNodes};

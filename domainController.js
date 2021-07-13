import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";
import {sizeAndPlaceElementInCircle} from "./utils.js";

class DomainSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.glslCanvas = glslCanvas;
		this.T = 0;
		this._elements = [];
	}
	createHtml(){
		this._elements.push(document.createElement("p"));
		this._elements[0].innerHTML = "I'm Evan and I like to translate cool ideas into code";
		this._elements.push(document.createElement("p"));
		this._elements[1].innerHTML = "Math nerd | code artist | computer graphics enthusiast | full stack developer | VR developer";
		this._elements.push(document.createElement("p"));
		this._elements[2].innerHTML = "programming languages are just tools (but typed Python is my favorite :) )";
		this._elements.push(document.createElement("p"));
		this._elements[3].innerHTML = "projects";
		this._elements.push(document.createElement("p"));
		this._elements[4].innerHTML = "home";
		this._elements.push(document.createElement("p"));
		this._elements[5].innerHTML = "main contact:";
		this._elements.push(document.createElement("p"));
		this._elements[6].innerHTML = "evanwall@buffalo.edu";
		for(var i = 0; i < 7; ++i){
			document.body.appendChild(this._elements[i]);
		}
		this.placeHtml();
	}
	placeHtml(){
		sizeAndPlaceElementInCircle(0.5, 6.0/7.0, 0.8, this.canvas, this._elements[0]);
		sizeAndPlaceElementInCircle(0.5, 5.0/7.0, 0.7, this.canvas, this._elements[1]);
		sizeAndPlaceElementInCircle(0.5, 4.0/7.0, 0.6, this.canvas, this._elements[2]);
		sizeAndPlaceElementInCircle(0.2, 3.0/7.0, 0.1, this.canvas, this._elements[3]);
		sizeAndPlaceElementInCircle(0.8, 3.0/7.0, 0.1, this.canvas, this._elements[4]);
		sizeAndPlaceElementInCircle(0.5, 2.0/7.0, 0.1, this.canvas, this._elements[5]);
		sizeAndPlaceElementInCircle(0.5, 1.0/7.0, 0.1, this.canvas, this._elements[6]);
	}
	tearDownHtml(){
		for(var i = 0; i < 7; ++i){
			this._elements[i].remove();
		}
	}


	initScene(){
	}
	fragFile(){
		return "testFrag.frag";
	}
	drawScene(){
		this.glslCanvas.setUniform("u_t", this.T/180);
	}
	update(){
		this.T = this.T + 1;
	}
}

export {DomainSceneController};

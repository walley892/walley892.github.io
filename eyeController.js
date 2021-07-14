import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";


class EyeSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.canvas = canvas;
		this.glslCanvas = glslCanvas;
		this.T = 0;
		this._elements = [];
	}
	createHtml(){
		var elementWidth = this.canvas.width/5.0;
		var elementHeight = this.canvas.height/4.0;
		for(var j = 0; j < 3; ++j){
			for(var i = 0; i < 2; ++i){
				var img = document.createElement("img");
				img.src = "./earth.jpg";
				img.style.width = elementWidth + "px";
				img.style.height = elementHeight + "px";
				img.style.position = "absolute";
				img.style.top = (i+1)*elementHeight/3 - elementHeight/2;
				img.style.left = (j+i)*elementWidth/4 - elementWidth/2;
				document.body.appendChild(img);
				this._elements.push(img);
			}
		}
	}
	placeHtml(){

	}
	initScene(){
	}
	fragFile(){
		return "testFrag1.frag";
	}
	drawScene(){
		this.glslCanvas.setUniform("u_t", this.T/80);
	}
	update(){
		this.T = this.T + 1;
	}
}

export {EyeSceneController};

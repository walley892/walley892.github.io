import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";

class EyeSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.glslCanvas = glslCanvas;
		this.T = 0;

	}
	createHtml(){
		var img = document.createElement("img");
		img.src = "./earth.jpg";
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

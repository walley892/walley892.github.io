import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";

class TestSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.glslCanvas = glslCanvas;
		this.T = 0;

	}
	initScene(){
	}
	fragFile(){
		return "testFrag.frag";
	}
	drawScene(){
		this.glslCanvas.setUniform("u_t", this.T/50);
	}
	update(){
		this.T = this.T + 1;
	}
}

export {TestSceneController};

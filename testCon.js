import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";

class TestSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.glslCanvas = glslCanvas;
	}
	initScene(){
	}
	fragFile(){
		return "testFrag.frag";
	}
	drawScene(){
		//this.glslCanvas.setUniform("u_state", ...(nodes.map((node) => node.state)));
	}
	update(){
	}
}

export {TestSceneController};

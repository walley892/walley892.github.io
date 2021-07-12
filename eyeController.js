import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

class EyeSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.canvas = canvas;
		this.glslCanvas = glslCanvas;
		this.mouse = {x:0, y:0};
		document.addEventListener('mouseMove', function(e) {
			this.mouse = getMousePos(this.canvas, e);
		}.bind(this));
		this.T = 0;

	}
	createHtml(){
		var img = document.createElement("img");
		img.src = "./earth.jpg";
		document.body.appendChild(img);
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
		this.glslCanvas.setUniform("mouse_pos", this.mouse.x, this.mouse.y);
	}
	update(){
		this.T = this.T + 1;
	}
}

export {EyeSceneController};

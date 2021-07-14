import {SceneController} from "./base_scene_controller.js";
import {baseScreenWidth, baseScreenHeight} from "./magicNumbers.js";
import {sizeAndPlaceElementInCircle} from "./utils.js";

class EyeSceneController extends SceneController{
	constructor(canvas, glslCanvas){
		super(canvas, glslCanvas);
		this.canvas = canvas;
		this.glslCanvas = glslCanvas;
		this.T = 0;
		this._elements = [];
	}
	createHtml(){
		for(var j = 0; j < 3; ++j){
			for(var i = 0; i < 2; ++i){
				if(i == 1 && j == 2){
					var text = document.createElement("p");
					text.innerHTML = "home";
					document.body.appendChild(text);
					this._elements.push(text);
					text = document.createElement("p");
					text.innerHTML = "projects";
					document.body.appendChild(text);
					this._elements.push(text);
				}else{
					var img = document.createElement("img");
					img.src = "./earth.jpg";
					document.body.appendChild(img);
					this._elements.push(img);
				}
			}
		}
		this.placeHtml();
	}
	placeHtml(){
		var elementWidth = this.canvas.width/5.0;
		var elementHeight = this.canvas.height/4.0;
		for(var j = 0; j < 3; ++j){
			for(var i = 0; i < 2; ++i){
				if(i == 1 && j == 2){
					var topText = this._elements[j*2 + i];
					var y = (i+1)*this.canvas.height/3.0;
					var x = (j+1)*this.canvas.width/4.0;
					sizeAndPlaceElementInCircle(x, y + 0.1, 0.1, this.canvas, topText);
					var bottomText = this._elements[j*2 + i + 1];
					sizeAndPlaceElementInCircle(x, y - 0.1, 0.1, this.canvas, bottomText);
				}else{
					var img = this._elements[j*2 + i];
					img.style.width = elementWidth + "px";
					img.style.height = elementHeight + "px";
					img.style.position = "absolute";
					img.style.top = ((i+1)*this.canvas.height/3.0 - elementHeight/2.0) + "px";
					img.style.left = ((j+1)*this.canvas.width/4.0 - elementWidth/2.0) + "px";
				}
			}
		}
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

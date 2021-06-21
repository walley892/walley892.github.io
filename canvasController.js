import {OscSceneController} from "./oscController.js";
import {loadText} from "./utils.js";

class SiteController{
	constructor(){
		this.canvas = document.getElementById("mainCanvas");
		this.glslCanvas = new GlslCanvas(this.canvas);
		var body = document.getElementById("main_body");
		this.overlay = document.getElementById("overlay");
		this.canvas.height = body.clientHeight; 
		this.canvas.width = body.clientWidth;
		this.activeScene = null;
	}
	setScene(sceneControllerCls){
		this.activeScene = new sceneControllerCls(this.canvas, this.glslCanvas);
		loadText(this.activeScene.fragFile()).then((frag) => this.glslCanvas.load(frag));
	}
	startActiveScene(){
		this.activeScene.initScene();
		this.activeSceneUpdate = window.setInterval(
			this.activeScene.update.bind(this.activeScene),
			20
		);
		this.activeSceneDraw = window.setInterval(
			this.activeScene.drawScene.bind(this.activeScene),
			20
		);
	}
	fadeOut(){
		this.overlay.style.backgroundColor = "rgba(1, 1, 1, 1)";
	}
	fadeIn(){
		this.overlay.style.backgroundColor = "rgba(1, 1, 1, 0)";
	}
	switchScene(newSceneCls){
		this.fadeOut();
		window.setTimeout(this.fadeIn.bind(this), 2000);
	}
}

window.onload = function(){

var siteController = new SiteController();

siteController.setScene(OscSceneController);
siteController.startActiveScene();
siteController.switchScene(null);
};

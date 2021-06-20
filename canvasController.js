import {OscSceneController} from "./oscController.js";
import {loadText} from "./utils.js";

class SiteController{
	constructor(){
		this.canvas = document.getElementById("mainCanvas");
		this.glslCanvas = new GlslCanvas(this.canvas);
		var body = document.getElementById("main_body");
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
}

document.onload = function(){

var siteController = new SiteController();

siteController.setScene(OscSceneController);
siteController.startActiveScene();
};

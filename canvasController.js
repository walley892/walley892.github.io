import {OscSceneController} from "./oscController.js";
import * as glslCanvas from "https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/dist/GlslCanvas.js";


class SiteController{
	constructor(){
		this.canvas = document.getElementById("mainCanvas");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.activeScene = null;
	}
	setScene(sceneControllerCls){
		this.activeScene = new sceneControllerCls(this.canvas);
	}
	startActiveScene(){
		this.activeScene.initScene();
		this.activeSceneUpdate = window.setInterval(
			this.activeScene.update.bind(this.activeScene),
			10
		);
		this.activeSceneDraw = window.setInterval(
			this.activeScene.drawScene.bind(this.activeScene),
			10
		);
	}
}

var siteController = new SiteController();

siteController.setScene(OscSceneController);
siteController.startActiveScene();

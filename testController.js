import {TestSceneController} from "./testCon.js";
import {loadText} from "./utils.js";

class SiteController{
	constructor(){
		this.canvas = document.getElementById("mainCanvas");
		this.glslCanvas = new GlslCanvas(this.canvas);
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
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

var siteController = new SiteController();

siteController.setScene(TestSceneController);
siteController.startActiveScene();
export {siteController};

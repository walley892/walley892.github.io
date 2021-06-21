import {loadText} from "./utils.js";
import {OscSceneController} from "./oscController.js";
import {DomainSceneController} from "./domainController.js";
import {EyeSceneController} from "./eyeController.js";

class SiteController{
	constructor(){
		this.canvas = document.getElementById("mainCanvas");
		this.glslCanvas = new GlslCanvas(this.canvas);
		var body = document.getElementById("main_body");
		this._clickListener = null;
		this.overlay = document.getElementById("overlay");
		this.canvas.height = body.clientHeight; 
		this.canvas.width = body.clientWidth;
		this.activeScene = null;
		
	}
	setScene(sceneControllerCls){
		this.activeScene = new sceneControllerCls(this.canvas, this.glslCanvas, this);
		if(this._clickLisetner != null){
			this.canvas.removeEventListener('click', this._clickListener);
		}
		this._clickListener = function(event){
			alert(event.clientX/this.canvas.height);
			alert(event.clientY/this.canvas.width);
			this.activeScene.onClick.bind(this.activeScene)(
				event.clientX/this.canvas.height,
				event.clientY/this.canvas.width,
			);
		}.bind(this);
		this.canvas.addEventListener("click", this._clickListener);
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
		window.setTimeout(this.setScene.bind(this), 2000, newSceneCls);
		window.setTimeout(this.startActiveScene.bind(this), 2050);
		window.setTimeout(this.fadeIn.bind(this), 2100);
	}
	switchSceneString(sceneString){
		var cls = null;
		if(sceneString == "osc"){
			cls = OscSceneController;
		}else if(sceneString == "domain"){
			cls = DomainSceneController;
		}else if(sceneString == "eye"){
			cls = EyeSceneController;
		}
		this.switchScene(cls);
	}
}

window.onload = function(){

var siteController = new SiteController();

siteController.setScene(OscSceneController);
siteController.startActiveScene();
};

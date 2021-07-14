import {loadText, getMousePos} from "./utils.js";
import {OscSceneController} from "./oscController.js";
import {DomainSceneController} from "./domainController.js";
import {EyeSceneController} from "./eyeController.js";

class SiteController{
	init(){
		this.canvas = document.getElementById("mainCanvas");
		var body = document.getElementById("main_body");
		this.canvas.height = body.clientHeight; 
		this.canvas.width = body.clientWidth;
		this.glslCanvas = new GlslCanvas(this.canvas);
		this._clickListener = null;
		this.overlay = document.getElementById("overlay");
		this.glslCanvas.height = this.canvas.height;
		this.glslCanvas.width = this.canvas.width;
		this.activeScene = null;
		window.onresize = function(){
			this.activeScene.placeHtml();
		}.bind(this);
		this.mouse = {x:0, y:0};
		document.addEventListener('mousemove', function(e) {
			this.mouse = getMousePos(this.canvas, e);
		}.bind(this));
		window.setInterval(
			this.setDefaultUniforms.bind(this),
			20
		)
		this.glslCanvas.resize();
	}
	setDefaultUniforms(){
		this.glslCanvas.setUniform("mouse_pos", this.mouse.x, this.mouse.y);
	}
	setScene(sceneControllerCls){
		this.activeScene = new sceneControllerCls(this.canvas, this.glslCanvas, this);
		if(this._clickListener != null){
			this.canvas.removeEventListener('click', this._clickListener);
		}
		this._clickListener = function(event){
			this.activeScene.onClick.bind(this.activeScene)(
				event.clientX/this.canvas.width,
				event.clientY/this.canvas.height,
			);
		}.bind(this);
		this.canvas.addEventListener("click", this._clickListener);
		loadText(this.activeScene.fragFile()).then((frag) => this.glslCanvas.load(frag));
	}
	startActiveScene(){
		this.activeScene.initScene();
		this.activeScene.createHtml();
		if(this.activeSceneUpdate != null){
			window.clearInterval(this.activeSceneUpdate);
			window.clearInterval(this.activeSceneDraw);
		}
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
		window.setTimeout(this.activeScene.tearDownHtml.bind(this.activeScene), 2000, newSceneCls);
		window.setTimeout(this.setScene.bind(this), 2100, newSceneCls);
		window.setTimeout(this.startActiveScene.bind(this), 2150);
		window.setTimeout(this.fadeIn.bind(this), 2200);
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
var siteController = new SiteController();
window.onload = function(){
siteController.init();
siteController.setScene(OscSceneController);
siteController.startActiveScene();
};
export {siteController};

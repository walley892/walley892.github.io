var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var glslCanvas = new GlslCanvas(canvas);
export {canvas, glslCanvas};

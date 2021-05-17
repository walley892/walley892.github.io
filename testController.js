var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var glslCanvas = new GlslCanvas(canvas);

var frag = "main() {\ngl_FragColor = vec4(1.0, 0, 0, 1);\n}\n";

glslCanvas.load(frag);
export {canvas, glslCanvas};

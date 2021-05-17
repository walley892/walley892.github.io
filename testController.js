var canvas = document.getElementById("mainCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


var glslCanvas = new GlslCanvas(canvas);

var frag = "uniform mediump vec2 u_resolution;\n void main() {\ngl_FragColor = vec4(gl_FragCoord.x/u_resolution.x, 0, 0, 1);\n}\n";

glslCanvas.load(frag);
export {canvas, glslCanvas};

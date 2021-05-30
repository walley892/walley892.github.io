precision mediump float;

uniform vec2 u_resolution;
uniform float u_t;
uniform vec2 u_mouse;

float dist(vec2 p1, vec2 p2){
    float d1 = p1.x-p2.x;
    float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}
void main(){
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

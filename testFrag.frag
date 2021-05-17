mediump float dist(mediump vec2 p1, mediump vec2 p2){
	return sqrt(p1.x*p2.x + p1.y*p2.y);
}

uniform mediump vec2 u_resolution;

void main(){
	gl_FragColor = vec4(dist(mediump vec2(0, 0), glFragCoord.xy/u_resolution.xy) 0, 0, 1);
}

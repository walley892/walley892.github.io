mediump float dist(vec2 p1, vec2 p2){
    mediump float d1 = p1.x-p2.x;
    mediump float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}

uniform mediump vec2 u_resolution;
uniform mediump vec2 u_position[19];
uniform mediump float u_state[19];


void main(){
	mediump vec4 c = (0, 0, 0 ,0);
	for(int i = 0; i < 19; ++i){
		mediump float state = u_state[i];
		mediump vec2 position = u_position[i];
		c += vec4(state/dist(position, glFragCoord.xy/u_resolution.xy) 0.0, 0.0, 1.0);
	}
	gl_FragColor = c;
}

precision lowp float dist(vec2 p1, vec2 p2){
    precision lowp float d1 = p1.x-p2.x;
    precision lowp float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}

uniform precision lowp vec2 u_resolution;
uniform precision lowp vec2 u_position[23];
uniform precision lowp float u_state[23];
uniform precision lowp float u_radius[23];


void main(){
	precision lowp vec4 c = vec4(0.0, 0.0, 0.0 ,0.0);
	for(int i = 0; i < 23; ++i){
		precision lowp float state = u_state[i];
		precision lowp vec2 position = u_position[i];
		precision lowp float radius = u_radius[i];
		precision lowp float d = dist(position, gl_FragCoord.xy/u_resolution.xy);
		if(position.x != 0.0 && position.y != 0.0 && d < radius) {
		    c += vec4(state/(1.0+((d*d)/(radius*radius))), 0.0, 0.0, 1.0);
		}
	}
	gl_FragColor = c;
}

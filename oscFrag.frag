precision lowp float;


float dist(vec2 p1, vec2 p2){
    float d1 = p1.x-p2.x;
    float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}

uniform vec2 u_resolution;
uniform vec2 u_position[23];
uniform float u_state[23];
uniform float u_radius[23];


void main(){
	vec4 c = vec4(0.0, 0.0, 0.0 ,0.0);
	for(int i = 0; i < 23; ++i){
		float state = u_state[i];
		vec2 position = u_position[i];
		float radius = u_radius[i];
		float d = dist(position, gl_FragCoord.xy/u_resolution.xy);
		if(position.x != 0.0 && position.y != 0.0 && d < radius) {
		    c += vec4(state/(1.0+((d*d)/(radius*radius))), 0.0, 0.0, 1.0);
		}
	}
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

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
	int n_x = 5;
	int n_y = 5;
	float my_x = floor((gl_FragCoord.x/u_resolution.x)* float (n_x));
	float my_y = floor((gl_FragCoord.y/u_resolution.y)* float( n_y));
	float c_x = my_x / (float(n_x)) + (1.0/(2.0*float(n_x)));
	float c_y = my_y / (float(n_y)) + (1.0/(2.0*float(n_y)));
	float d = dist(vec2(c_x, c_y), gl_FragCoord.xy/u_resolution.xy)*4.0;
    	vec4 c = vec4(0.3/(1.0+(d*d*d)), 0.0, 0.0, 1.0);
	gl_FragColor = c;
}

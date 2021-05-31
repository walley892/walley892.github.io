precision mediump float;
uniform vec2 u_resolution;
uniform float u_t;
uniform vec2 u_mouse;

float dist(vec2 p1, vec2 p2){
    float d1 = p1.x-p2.x;
    float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

vec3 phi(vec2 uv){
	return vec3(uv.x, uv.y, sqrt(1.0 - uv.x*uv.x - uv.y*uv.y) - 1.0);
}


void main(){
	int n_x = int(floor(25.0 * (cos(u_t/2.0) + 2.0)/2.0));
	int n_y = int(floor(25.0 * (cos(u_t/2.0) + 2.0)/2.0));
	float my_x = floor((gl_FragCoord.x/u_resolution.x)* float (n_x));
	float my_y = floor((gl_FragCoord.y/u_resolution.y)* float( n_y));
	
	float len_x = 1.0/float(n_x);
	float len_y = 1.0/float(n_y);

	vec2 pos_raw = gl_FragCoord.xy/u_resolution.xy;

	vec2 pos_normalized = vec2(map(pos_raw.x, my_x/float(n_x), my_x/float(n_x) + len_x, 0.0, 1.0),  map(pos_raw.y, my_y/float(n_y), my_y/float(n_y) + len_y, 0.0, 1.0)); 

	//float c_x = my_x / (float(n_x)) + (1.0/(2.0*float(n_x)));
	//float c_y = my_y / (float(n_y)) + (1.0/(2.0*float(n_y)));
	float d = dist(vec2(0.5, 0.5), pos_normalized);
	if(d < 0.5){
    		//gl_FragColor= vec4(0.005/(0.005+pow(d,3.0)), 0.0, 0.0, 1.0);
    		gl_FragColor= vec4(phi(pos_normalized).z, 0.0, 0.0, 1.0);
	}else{
		gl_FragColor = vec4(0.0,0.0,0.0,0.0);
	}
}

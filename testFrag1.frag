precision mediump float;
uniform vec2 u_resolution;
uniform float u_t;
uniform vec2 u_mouse;

float dist(vec2 p1, vec2 p2){
    float d1 = p1.x-p2.x;
    float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}
float dist_3(vec3 p1, vec3 p2){
    float d1 = p1.x-p2.x;
    float d2 = p1.y-p2.y;
    float d3 = p1.z-p2.z;
    return sqrt(d1*d1 + d2*d2 + d3*d3);
}

float map(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

vec3 phi(vec2 uv, float radius){
	return vec3(uv.x, uv.y, sqrt(radius - uv.x*uv.x - uv.y*uv.y));
}

vec3 phi_u(vec2 uv, float radius){
	return vec3(1.0, 0.0, (1.0/sqrt(radius - uv.x*uv.x - uv.y*uv.y)) * (-uv.x));
}

vec3 phi_v(vec2 uv, float radius){
	return vec3(0.0, 1.0, (1.0/sqrt(radius - uv.x*uv.x - uv.y*uv.y)) * (-uv.y));
}

vec3 normalized(vec3 v){
	float d = 1.0/dist_3(vec3(0.0, 0.0, 0.0), v);
	return vec3(d*v.x, d*v.y, d*v.z);
}

float when_lt(float a, float b){
	return max(abs(sign(b - a)), 0.0);
}

void main(){
	int n_x = 12;
	int n_y = 12;
	float my_x = floor((gl_FragCoord.x/u_resolution.x)* float (n_x));
	float my_y = floor((gl_FragCoord.y/u_resolution.y)* float( n_y));
	
	float len_x = 1.0/float(n_x);
	float len_y = 1.0/float(n_y);

	vec2 pos_raw = gl_FragCoord.xy/u_resolution.xy;

	vec2 pos_normalized = vec2(map(pos_raw.x, my_x/float(n_x), my_x/float(n_x) + len_x, 0.0, 1.0),  map(pos_raw.y, my_y/float(n_y), my_y/float(n_y) + len_y, 0.0, 1.0)) - vec2(0.5, 0.5); 

	float c_x = my_x / (float(n_x)) + (1.0/(2.0*float(n_x)));
	float c_y = my_y / (float(n_y)) + (1.0/(2.0*float(n_y)));
	vec3 normalized_mouse_pos = vec3(1.0*(u_mouse.x/u_resolution.x - c_x), 1.0*(u_mouse.y/u_resolution.y - c_y), 0.5);
	float light_d_2 = dist(normalized_mouse_pos.xy, vec2(0.0, 0.0));
	vec3 pos_3 = phi(pos_normalized, 0.4) + vec3(0.0, 0.0, -0.5 - exp(0.2/light_d_2));
	float light_d = dist_3(normalized_mouse_pos, pos_3);
	float d = dist(vec2(0.0, 0.0), pos_normalized);
	float radius = 0.4 - exp(0.2/pow(light_d_2, 1.3))*0.05;
	if(d < radius){
				float c = dot(cross(normalized(phi_u(pos_normalized, radius)), normalized(phi_v(pos_normalized, radius))), normalized(normalized_mouse_pos -pos_3));
    		gl_FragColor= (8.0/(1.0+light_d*light_d*2.0))*vec4(0.0,  (0.3/acos(c))*0.6, 0.6, 0.0);
	}else{
			gl_FragColor = vec4(0.0,0.0,0.0,0.0);
	}	
}

precision mediump float;

uniform vec2 u_resolution;

float dist(vec2 p1, vec2 p2){
    float d1 = p1.x-p2.x;
    float d2 = p1.y-p2.y;
    return sqrt(d1*d1 + d2*d2);
}

vec2 conj(vec2 a){
	return vec2(a.x, -a.y);
}

vec2 complex_divide(vec2 a, vec2 b){
	float denom = b.x*b.x + b.y*b.y;
	return vec2((a.x*b.x + a.y*b.y)/denom, (a.y*b.x - a.x*b.y)/denom);
}

vec2 complex_multiply(vec2 a, vec2 b){
	return vec2(a.x*b.x - a.y*b.y, a.x*b.y + a.y*b.x);
}

float complex_mag(vec2 a){
	return dist(a, vec2(0, 0));
}

float complex_arg(vec2 a){
	return atan2(a.y, a.x);
}

vec3 hsl2rgb(vec3 c){
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

void main(){
	vec2 coord = vec2(gl_FragCoord.xy/u_resolution.xy);
	vec3 color_hsl = vec3(complex_arg(coord), 1, 0.5);
	vec4 color_rgba = vec4(hlsl2rgb(color_hlsl),0.0);
	gl_FragColor = color_rgba;
}

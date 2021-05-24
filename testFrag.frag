precision mediump float;

uniform vec2 u_resolution;
uniform float u_t;

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
	a = (1.0/complex_mag(a))*a;
	return atan(a.y, a.x);
}

vec2 poly_3(vec2 c, vec2[3] coeffs){
	vec2 ret = vec2(0.0, 0.0);
	vec2 curr = vec2(1.0, 0.0);
	for(int i = 0; i < 3; ++i){
		curr = complex_multiply(c, curr);
		ret = ret + complex_multiply(coeffs[i], curr);
	}
	return ret;
}

vec2 color_func(vec2 a){
	float t = (sin(u_t) + 1.0)/2.0;
	vec2 singOne = 0.05*vec2(cos(u_t), sin(u_t));
	vec2 singOneCoeffs[3];
	singOneCoeffs[0] = vec2(0.0, 0.0);
	singOneCoeffs[1] = vec2(0.0, 0.5);
	singOneCoeffs[2] = vec2(1.0, 0.0);

	vec2 aCoeffs[3];
	aCoeffs[0] = vec2(0.0, 0.0);
	aCoeffs[1] = vec2(0.0, 0.0);
	aCoeffs[2] = vec2(1.0, 0.0);

	return complex_divide(poly_3(a, aCoeffs) - vec2(2, 0),poly_3(singOne, singOneCoeffs));
}

vec3 hsl2rgb(vec3 c){
    vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );
    return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
}

void main(){
	vec2 coord =2.0*(gl_FragCoord.xy/u_resolution.xy - vec2(0.5, 0.5));
	coord = color_func(coord);
	float l = (complex_arg(coord) + 3.14)/6.28;
	if(l > 0.5){
		l = 1.0 - l;
	}
	vec3 color_hsl = vec3((complex_arg(coord)/6.28)/4.0, 1, l*0.6);
	vec4 color_rgba = vec4(hsl2rgb(color_hsl),1.0);
	gl_FragColor = color_rgba;
}

precision mediump float;

uniform sampler2D uTexture;
uniform float uAlpha;

// todo #3 - receive texture coordinates and verify correctness by 
// using them to set the pixel color
varying vec2 v_texcoord; 


void main(void) {
    // todo #5 - sample a color from the texture and visualize
    //gl_FragColor = texture2D(uTexture, v_texcoord);
    gl_FragColor = vec4(texture2D(uTexture, v_texcoord).rgb, uAlpha);


    //gl_FragColor = vec4(v_texcoord.x, v_texcoord.y, 0.0, uAlpha);
}



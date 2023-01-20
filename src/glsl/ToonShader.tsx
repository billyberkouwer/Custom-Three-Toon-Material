import {
    Color,
    Vector3
} from 'three';
import VertexShader from './ToonShader.vert';
import FragmentShader from './ToonShader.frag';

export const ToonShaderHatching = {

    uniforms: {

        'uDirLightPos': { value: new Vector3(0, 2, 0) },
        'uDirLightColor': { value: new Color(0xffffff) },
        'uTime' : { value: 0 },

        'uAmbientLightColor': { value: new Color(0x050505) },

        'uBaseColor': { value: new Color(0xFFA500) },
        'uLineColor1': { value: new Color(0xFF0000) },
        'uLineColor2': { value: new Color(0xFF0000) },
        'uLineColor3': { value: new Color(0xFF0000) },
        'uLineColor4': { value: new Color(0xF00000) },
        'uLineColor5': { value: new Color(0xFBCEB1) },
        'uLineColor6': { value: new Color(0xFBCEB1) },

    },

    vertexShader: VertexShader,

    fragmentShader: FragmentShader

};
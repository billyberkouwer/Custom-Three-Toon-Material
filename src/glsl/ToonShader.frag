uniform vec3 uBaseColor;
uniform vec3 uLineColor1;
uniform vec3 uLineColor2;
uniform vec3 uLineColor3;
uniform vec3 uLineColor4;
uniform vec3 uLineColor5;
uniform vec3 uLineColor6;

uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;

uniform vec3 uAmbientLightColor;

varying vec3 vNormal;

void main(){
    
    float directionalLightWeighting=max(dot(normalize(vNormal),uDirLightPos),0.);
    vec3 lightWeighting=uAmbientLightColor+uDirLightColor*directionalLightWeighting;
    
    gl_FragColor=vec4(uBaseColor,1.);
    
    if(length(lightWeighting)>4.999){
        
        if(mod(gl_FragCoord.x+gl_FragCoord.y-5.,5.)==0.){
            
            gl_FragColor=vec4(uLineColor6,1.);
            
        }
        
    }
    
    if(length(lightWeighting)>4.999){
        
        if(mod(gl_FragCoord.x-gl_FragCoord.y,5.)==0.){
            
            gl_FragColor=vec4(uLineColor6,1.);
            
        }
        
    }
    
    if(length(lightWeighting)>3.){
        
        if(mod(gl_FragCoord.x-gl_FragCoord.y,10.)==0.){
            
            gl_FragColor=vec4(uLineColor6,1.);
            
        }
        
    }
    
    if(length(lightWeighting)>2.){
        
        if(mod(gl_FragCoord.x+gl_FragCoord.y+5.,10.)==0.){
            
            gl_FragColor=vec4(uLineColor5,1.);
            
        }
        
    }
    
    if(length(lightWeighting)<1.){
        
        if(mod(gl_FragCoord.x+gl_FragCoord.y,5.)==0.){
            
            gl_FragColor=vec4(uLineColor1,1.);
            
        }
        
    }
    
    if(length(lightWeighting)<.75){
        
        if(mod(gl_FragCoord.x-gl_FragCoord.y,10.)==0.){
            
            gl_FragColor=vec4(uLineColor2,1.);
            
        }
        
    }
    
    if(length(lightWeighting)<.50){
        
        if(mod(gl_FragCoord.x+gl_FragCoord.y-5.,10.)==0.){
            
            gl_FragColor=vec4(uLineColor3,1.);
            
        }
        
    }
    
    if(length(lightWeighting)<.3465){
        
        if(mod(gl_FragCoord.x-gl_FragCoord.y-5.,10.)==0.){
            
            gl_FragColor=vec4(uLineColor4,1.);
            
        }
        
    }
    
}
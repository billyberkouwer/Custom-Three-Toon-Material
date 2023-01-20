import { ToonShaderHatching } from '@/glsl/ToonShader';
import { useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ShaderMaterial, Mesh } from 'three';


export default function SphereMesh() {
    const mesh = useRef() as MutableRefObject<Mesh | null>

    const { scene } = useThree()

    useEffect(() => {
        if (mesh.current && scene) {
            mesh.current.material = new ShaderMaterial(ToonShaderHatching);
            console.log(mesh.current)
            mesh.current.material.needsUpdate = true;
        }
    }, [scene])

    let time = 0;

    useFrame((state, delta) => {
        time += 1 * delta;
        const shaderMaterial = (mesh.current?.material as ShaderMaterial);
        if (shaderMaterial.uniforms.uTime) {
            shaderMaterial.uniforms.uTime.value = time;
        }
    })

    return (
        <mesh ref={el => mesh.current = el} position={[-1, 0, -0.5]}>
            <sphereGeometry args={[1,32,16]} />
        </mesh>
    )
}
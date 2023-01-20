import { ToonShaderHatching } from '@/glsl/ToonShader';
import { useGLTF } from '@react-three/drei';
import { Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ShaderMaterial, Mesh, Material } from 'three';


export default function BeerFlowMesh() {
    const ref = useRef() as MutableRefObject<Mesh | null>
    const gltf = useGLTF('/beer-tube.gltf');

    const { scene } = useThree()

    useEffect(() => {
        if (gltf && scene) {
            gltf.scene.traverse((obj) => {
                if (obj.type === 'Mesh') {
                    ToonShaderHatching.uniforms.uIntensity.value = 0.1;
                    (obj as Mesh).material = new ShaderMaterial(ToonShaderHatching);
                    ((obj as Mesh).material as Material).needsUpdate = true;
                }
            })
        }
    }, [scene, gltf])

    useEffect(() => {
        console.log(gltf)
    }, [gltf])

    let time = 0;

    useFrame((state, delta) => {
        let mesh: Mesh | undefined;

        gltf.scene.traverse((obj) => {
            if (obj.type === 'Mesh') {
                mesh = obj as Mesh;
            }
        });

        if ((mesh?.material as ShaderMaterial).uniforms?.uTime) {
            console.log('tick')
            time += 1 * delta;
            (mesh?.material as ShaderMaterial).uniforms.uTime.value = time;
        }
    })

    return (
        <primitive object={gltf.scene} />
    )
}
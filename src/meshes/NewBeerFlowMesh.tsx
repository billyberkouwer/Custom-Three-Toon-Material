import { ToonShaderMaterial } from '@/glsl/toon/ToonShaderMaterial';
import { ToonShaderHatching } from '@/glsl/ToonShader';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { ShaderMaterial, Mesh, Material, AnimationMixer, AnimationClip, MeshToonMaterial, MeshBasicMaterial, MeshLambertMaterial } from 'three';


export default function NewBeerFlowMesh() {
    const ref = useRef() as MutableRefObject<Mesh | null>
    const { nodes, animations } = useGLTF('/beer-tube-shape-key.gltf');
    const { actions } = useAnimations(animations, ref)
    // const { scene } = useThree()

    

    useEffect(() => {
        if (nodes) {
            nodes.Cylinder.material = new ShaderMaterial(ToonShaderHatching)
        }
    }, [nodes, animations, actions])

    let time = 0;

    useFrame((state, delta) => {
        if ((nodes?.Cylinder.material as ShaderMaterial).uniforms?.uTime) {
            console.log('tick')
            time += 1 * delta;
            (nodes?.Cylinder.material as ShaderMaterial).uniforms.uTime.value = time;
        }
    })

    return (
        <primitive object={nodes.Cylinder} ref={ref} />
    )
}
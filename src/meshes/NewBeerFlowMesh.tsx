import { ToonShaderMaterial } from '@/glsl/toon/ToonShaderMaterial';
import { ToonShaderHatching } from '@/glsl/ToonShader';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Selection, Select, EffectComposer, Outline, DepthOfField } from '@react-three/postprocessing'

import { ShaderMaterial, Mesh, Material, AnimationMixer, AnimationClip, MeshToonMaterial, MeshBasicMaterial, MeshLambertMaterial, DoubleSide } from 'three';


export default function NewBeerFlowMesh() {
    const ref = useRef() as MutableRefObject<Mesh | null>
    const { nodes, animations } = useGLTF('/miller-full-scene.gltf');
    const { actions } = useAnimations(animations, ref)
    // const { scene } = useThree()

    
    useEffect(() => {
        if (nodes) {
            (nodes?.Cylinder as Mesh).material = new ShaderMaterial(ToonShaderHatching);
            console.log(nodes);
            // nodes.Scene.traverse(obj => {
            //     if (obj === 'mesh') {
            //         obj.material.side = DoubleSide;
            //     }
            // })
        }
    }, [nodes, animations, actions])

    let time = 0;

    useFrame((state, delta) => {
        if (((nodes?.Cylinder as Mesh).material as ShaderMaterial).uniforms?.uTime) {
            console.log('tick');
            time += 1 * delta;
            ((nodes?.Cylinder as Mesh).material as ShaderMaterial).uniforms.uTime.value = time;
        }
    })

    return (
        <Selection>
            <EffectComposer multisampling={8} autoClear={true}>
                <Outline visibleEdgeColor={0} edgeStrength={1} width={100} />
            </EffectComposer>
            <Select enabled>
                <primitive object={nodes.Scene} ref={ref} />
            </Select>
        </Selection>
    )
}
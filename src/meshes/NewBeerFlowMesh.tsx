import { ToonShaderMaterial } from '@/glsl/toon/ToonShaderMaterial';
import { ToonShaderHatching } from '@/glsl/ToonShader';
import { Effects, useAnimations, useGLTF, Bounds } from '@react-three/drei';
import { Object3DNode, useFrame, useThree } from '@react-three/fiber';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Selection, Select, EffectComposer, Outline, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction, Resizer, KernelSize } from 'postprocessing'


import { ShaderMaterial, Mesh, Material, AnimationMixer, AnimationClip, MeshToonMaterial, MeshBasicMaterial, MeshLambertMaterial, DoubleSide } from 'three';


export default function NewBeerFlowMesh() {
    const ref = useRef() as MutableRefObject<Mesh | null>
    const { nodes, animations } = useGLTF('/miller-full-scene.gltf');
    const { actions } = useAnimations(animations, ref)
    const { size } = useThree()
    
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
        <>
            <primitive object={nodes.Scene} />
            {/* <Selection>
                    <EffectComposer multisampling={0} autoClear={false}>
                        <Outline
                            selection={[ref]}
                            selectionLayer={10} // selection layer
                            blendFunction={BlendFunction.ALPHA} // set this to BlendFunction.ALPHA for dark outlines
                            edgeStrength={1000} // the edge strength
                            pulseSpeed={0.0} // a pulse speed. A value of zero disables the pulse effect
                            visibleEdgeColor="black" // the color of visible edges
                            hiddenEdgeColor="black" // the color of hidden edges
                            width={size.width} // render width
                            height={size.height} // render height
                            kernelSize={KernelSize.LARGE} // blur kernel size
                            blur={true} // whether the outline should be blurred
                            xRay={true} // indicates whether X-Ray outlines are enabled
                        />
                    </EffectComposer>
                    <Bounds>
                        <Select enabled>
                            <primitive object={nodes.Cylinder} ref={ref} />
                        </Select>
                    </Bounds>
                </Selection> */}
        </>
    )
}
const begin_vertex = /* glsl */ `
    vec3 transPos = position;

	transPos = vec3(transPos.r, transPos.g , transPos.b);
    vec3 transformed = vec3( transPos );
`

export default begin_vertex

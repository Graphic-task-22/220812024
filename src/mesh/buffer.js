import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
    0, 0, 0,
    100, 0, 0,
    0, 100, 0,

    // 0, 100, 0,
    // 100, 0, 0,
    100, 100, 0
]);

const attribute = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attribute;

const indexes = new Uint16Array([
    0, 1, 2, 2, 1, 3 // 顶点索引顺序
]);
geometry.index = new THREE.BufferAttribute(indexes, 1);  //1 个为一组。

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('orange'),
});

const buffer = new THREE.Mesh(geometry, material);

export default buffer;
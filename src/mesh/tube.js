import * as THREE from 'three';
import { Wireframe } from 'three/examples/jsm/Addons.js';

const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

// const texture = loader.load('./src/assets/stone.png');
// texture.wrapS = THREE.RepeatWrapping;
// texture.repeat.x = 20;
// texture.colorSpace = THREE.SRGBColorSpace;
const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide,
    // map: texture,
    // aoMap: texture,
    wireframe:true
});

const tube = new THREE.Mesh(geometry, material);

export default tube;

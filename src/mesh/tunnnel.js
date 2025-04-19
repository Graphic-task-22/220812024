import * as THREE from 'three';
import { Loader } from 'three/webgpu';



const path = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-100, 20, 90),
    new THREE.Vector3(-40, 80, 100),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(100, -40, 80),
    new THREE.Vector3(150, 60, 60)
]);

const geometry = new THREE.TubeGeometry(path, 100, 10, 20,true);

const loader=new THREE.TextureLoader();
const texture=loader.load("./src/assets/stone.png");
texture.wrapS=THREE.RepeatWrapping;
texture.colorSpace=THREE.SRGBColorSpace;
texture.repeat.x=10;
const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    map:texture,
    aoMap: texture
});

const tunnel = new THREE.Mesh(geometry, material);

export const tubePoints = path.getSpacedPoints(1000);//获取曲线上的点

export default tunnel;

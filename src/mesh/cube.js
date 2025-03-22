import * as THREE from 'three';
const geometry = new THREE.BoxGeometry(50, 50, 50);

console.log(geometry);
// 给一个材质，让它有颜色
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    opacity: 0.5,
    transparent: true,
  });
// Mesh（网格）。 网格包含一个几何体以及作用在此几何体上的材质，我们可以直接将网格对象放入到我们的场景中，并让它在场景中自由移动。
const cube = new THREE.Mesh(geometry, material);

export default cube;
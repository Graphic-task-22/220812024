import * as THREE from 'three';
import { rotate } from 'three/tsl';
import { createNoise2D } from 'simplex-noise';
const noise2D = createNoise2D();

// const textureLoader = new THREE.TextureLoader();
// const waveTexture = textureLoader.load('./src/assets/wave-texture2.png');
// waveTexture.wrapS = waveTexture.wrapT = THREE.RepeatWrapping;
// waveTexture.repeat.set(10, 10); // 控制重复次数（根据地形大小调）
// waveTexture.offset.y -= 0.001; // 水流方向和速度

const geometry = new THREE.PlaneGeometry(500, 500, 50, 50); // 设置分段

const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x2288cc), // 蓝绿渐变
    wireframe: true,
  });
  
  
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(Math.PI / 2);

// //对这些顶点做位置的随机变化
// const positions = geometry.attributes.position;//得到所有顶点坐标
// for (let i = 0; i < positions.count; i++) {
//   let z = Math.random() * 20
//   positions.setZ(i, z);
// }

export default mesh;
export function updatePosition() {
    const positions = geometry.attributes.position;
  
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
  
      const z = noise2D(x / 150, y / 150) * 50;
      const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;
  
      positions.setZ(i, z + sinNum);
    }
    positions.needsUpdate = true;
  }
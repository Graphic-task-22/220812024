import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Cow from './mesh/Cow.js';
import createHouse from './mesh/House.js';

// 初始化场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(10, 4, 10);

// 创建渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 添加控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 添加光源
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 10, 7);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040));

// 添加地面
const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshStandardMaterial({ color: 0x3a5f0b })
);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// 动画控制变量
let mixer = null;
let clock = new THREE.Clock();
let cowActions = {};
let currentAction = null;

// 加载奶牛模型
Cow.load()
    .then(cowModel => {
        scene.add(cowModel.model);
        cowModel.model.position.set(-3, 0, 7);
        cowModel.model.scale.set(0.5, 0.5, 0.5);

        // 初始化动画混合器
        if (cowModel.animations && cowModel.animations.length > 0) {
            mixer = new THREE.AnimationMixer(cowModel.model);
            
            // 创建动画动作集
            cowModel.animations.forEach((clip, index) => {
                cowActions[clip.name || `action_${index}`] = mixer.clipAction(clip);
            });

            // 设置GUI控制器
            const gui = new GUI();
            const animationFolder = gui.addFolder('Cow Animations');
            
            // 添加动画选择器
            const animationController = {
                animation: Object.keys(cowActions)[0],
                wireframe: false
            };
            
            animationFolder.add(animationController, 'animation', Object.keys(cowActions))
                .name('Animation')
                .onChange(name => {
                    if(currentAction) currentAction.stop();
                    currentAction = cowActions[name];
                    currentAction.play();
                });
            
            // 添加动画速度控制
            animationFolder.add(mixer, 'timeScale', 0.1, 2)
                .name('Speed')
                .step(0.1);
            
            // 添加线框显示控制
            animationFolder.add(animationController, 'wireframe')
                .name('Wireframe')
                .onChange(value => {
                    cowModel.model.traverse(child => {
                        if (child.isMesh) {
                            child.material.wireframe = value;
                        }
                    });
                });
            
            animationFolder.open();
            
            // 默认播放第一个动画
            currentAction = cowActions[Object.keys(cowActions)[0]];
            currentAction.play();
        }
    })
    .catch(error => {
        console.error('奶牛模型加载失败:', error);
    });

// 添加房屋模型
const house = createHouse();
house.position.set(3, 0, 0);
house.scale.set(0.8, 0.8, 0.8);
scene.add(house);

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    
    if (mixer) {
        mixer.update(delta);
    }
    
    controls.update();
    renderer.render(scene, camera);
}
animate();

// 响应式调整
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

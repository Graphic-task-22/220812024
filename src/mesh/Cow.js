import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const Cow = {
    model: new THREE.Group(),
    animations: null,
    mixer: null,
    load: function() {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader();
            loader.load(
                './src/model/Cow.gltf',
                (gltf) => {
                    this.model.add(gltf.scene);
                    this.animations = gltf.animations;
                    this.mixer = new THREE.AnimationMixer(gltf.scene);
                    
                    // 默认播放第一个动画
                    if(this.animations && this.animations.length > 0) {
                        this.mixer.clipAction(this.animations[0]).play();
                    }
                    
                    resolve(this);
                },
                undefined,
                (error) => reject(error)
            );
        });
    }
};

export default Cow;
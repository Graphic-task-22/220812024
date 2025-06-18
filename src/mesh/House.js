import * as THREE from 'three';

export default function createHouse() {
    const house = new THREE.Group();
    
    // 房屋主体 (立方体)
    const bodyGeometry = new THREE.BoxGeometry(10, 6, 8);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xf0e0b0,
        roughness: 0.7
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 3;
    house.add(body);

    // 屋顶 (三角锥)
    const roofGeometry = new THREE.ConeGeometry(8, 6, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8b4513,
        roughness: 0.8
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 9;
    house.add(roof);

    // 创建房屋内部空间
    const interiorGeometry = new THREE.BoxGeometry(9.8, 5.8, 7.8);
    const interiorMaterial = new THREE.MeshStandardMaterial({
        color: 0x654321,
        side: THREE.BackSide
    });
    const interior = new THREE.Mesh(interiorGeometry, interiorMaterial);
    interior.position.y = 3;
    house.add(interior);

    // 门 (带门框和透明部分)
    const doorFrameGeometry = new THREE.BoxGeometry(2.2, 3.2, 0.6);
    const doorFrameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.5
    });
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 1.5, 4);
    house.add(doorFrame);

    const doorGeometry = new THREE.BoxGeometry(1.8, 2.8, 0.1);
    const doorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.5,
        transparent: true,
        opacity: 0.8
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(0, 1.5, 4.3);
    house.add(door);

    // 窗户 (带窗框)
    const windowFrameGeometry = new THREE.BoxGeometry(1.7, 1.7, 0.4);
    const windowFrameMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x654321,
        roughness: 0.5
    });
    
    // 左侧窗户
    const windowLeftFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
    windowLeftFrame.position.set(-3, 4, 4);
    house.add(windowLeftFrame);

    const windowLeft = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 0.1),
        new THREE.MeshStandardMaterial({ 
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.6
        })
    );
    windowLeft.position.set(-3, 4, 4.2);
    house.add(windowLeft);

    // 右侧窗户
    const windowRightFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
    windowRightFrame.position.set(3, 4, 4);
    house.add(windowRightFrame);

    const windowRight = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 1.5, 0.1),
        new THREE.MeshStandardMaterial({ 
            color: 0x87ceeb,
            transparent: true,
            opacity: 0.6
        })
    );
    windowRight.position.set(3, 4, 4.2);
    house.add(windowRight);

    // 门口台阶
    const stepGeometry = new THREE.BoxGeometry(2.5, 0.3, 1.5);
    const stepMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        roughness: 0.7
    });
    const step1 = new THREE.Mesh(stepGeometry, stepMaterial);
    step1.position.set(0, 0.15, 4.5);
    house.add(step1);

    const step2 = new THREE.Mesh(stepGeometry, stepMaterial);
    step2.position.set(0, 0.45, 4.2);
    house.add(step2);

    return house;
}

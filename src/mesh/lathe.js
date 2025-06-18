import * as THREE from 'three';

const pointsArr = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(40, 80),
    new THREE.Vector2(0, 180)
];

const geometry = new THREE.LatheGeometry(pointsArr);

const materail = new THREE.MeshLambertMaterial({
    color: new THREE.Color('pink'),
    side: THREE.DoubleSide
});

const lathe = new THREE.Mesh(geometry, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(pointsArr);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
lathe.add(points2, line2);

export default lathe;

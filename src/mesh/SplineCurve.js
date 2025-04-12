import * as THREE from 'three';

// Create a sine-like wave
const curve = new THREE.SplineCurve( [
	new THREE.Vector2( -100, 0 ),
	new THREE.Vector2( -50, 50 ),
	new THREE.Vector2( 0, 0 ),
	new THREE.Vector2( 50, -50 ),
	new THREE.Vector2( 100, 0 )
] );


const pointsArr = curve.getPoints(20);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsArr);

const material = new THREE.LineBasicMaterial({ 
    color: new THREE.Color('orange') 
});

// Create the final object to add to the scene
const splineObject = new THREE.Line( geometry, material );

const pointsMaterial = new THREE.PointsMaterial({
    color: new THREE.Color('pink'),
    size: 5
});
const points = new THREE.Points(geometry, pointsMaterial);
splineObject.add(points);



export default splineObject;
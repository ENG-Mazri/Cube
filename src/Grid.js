import * as THREE from 'three';

const grid = new THREE.GridHelper( 1000, 400 );
grid.receiveShadow = true;
grid.position.y = 0;
grid.material.opacity = 0.9;
grid.material.transparent = true;

export default grid
import * as THREE from 'three';
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0xb300ff} );
const box = new THREE.Mesh( geometry, material );


export default box
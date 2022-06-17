import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera( 
    30,
    window.innerWidth/window.innerHeight,
    1,
    1000 );

export default camera
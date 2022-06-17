import * as THREE from 'three';
import {Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';


var sceneObject = new THREE.Object3D();
var Loader = new Rhino3dmLoader();
Loader.setLibraryPath( 'rhino3dm/' );
Loader.load('tower.3dm',function ( object ) {
		sceneObject.add( object );
		return sceneObject;
	});

export default sceneObject 
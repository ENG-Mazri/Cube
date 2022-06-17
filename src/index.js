import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import {Rhino3dmLoader } from 'three/examples/jsm/loaders/3DMLoader';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
//import { GPUPicker } from 'three_gpu_picking';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore/lite';
//import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';
//import { IFCLoader } from 'three/examples/jsm/loaders/ifc/web-ifc-api';
//import { wasm } from 'webpack';
import axes from './Axes';
import box from './Box';
import camera from './Camera';
import grid from './Grid';
import light from './Light';
import machine from './Machine';
import renderer from './Renderer';
import resize from './Resize';
import scene from './Scene';
import sceneObject from './3dm';
//import db from './fireBaseData';
//import sceneObject2 from './IfcLoader';
import { Object3D } from 'three';
import PickHelper from './picker';

let myrange = document.getElementById('myrange');
let radioX = document.getElementById('x');
let radioY = document.getElementById('y');
let radioZ = document.getElementById('z');
let nameData = document.getElementById('nameData');
let typeData = document.getElementById('typeData');
let layerData = document.getElementById('layerData');
let clearBtn = document.getElementById('clearBtn');
let objTypeData = document.getElementById('objTypeData');
let propsData = document.getElementById('propsData');
let materialData = document.getElementById('materialData');
let myAudio = document.getElementById('myAudio');
function playAudio() { 
  myAudio.play(); 
} 


//*** MAIN SCRIPT ***//
grid.name = 'myGrid';
grid.userData.grid = true;
let sceneBox = new THREE.Box3();
// hover / selection                                 
let raycaster = new THREE.Raycaster();
// Init mouse position so it's not sitting at the center of the screen
let mouse = new THREE.Vector2(-1000);
let selection = [];
let hover = {};




const plane = new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 100);
const helper = new THREE.PlaneHelper( plane, 500, 0xe0ccff );
console.log(helper);
scene.add( helper );
//var picker = new GPUPicker(THREE, renderer, scene, camera);


var gui = new GUI();
box.position.y = box.geometry.parameters.height/2
scene.background = new THREE.Color( 0xf0f0f0 )
// ***Controls***
var controls = new OrbitControls(camera, renderer.domElement);
//controls.enabled = false;
var tcontrols = new TransformControls(camera, renderer.domElement)
//tcontrols.attach(helper)

//tcontrols.axis;
tcontrols.showX = false;
tcontrols.showY = true;
tcontrols.showZ = false;

//var localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);

// Geometry
renderer.localClippingEnabled = true;

//                *   *   *       GUI CONTROLERS     *  *  *
//gui.children[0]._closed = true;
const CuttingPlane = gui.addFolder()
CuttingPlane.$title.innerText = 'Cutting Plane controls';
CuttingPlane.add(plane ,'constant',1,100);
CuttingPlane.add(helper, 'visible');
gui.$title.innerText = 'View Controls';
//let uploadfile = document.getElementsByClassName("file-select-button")
let fileInput = document.getElementById("file-upload-input");

let fileSelect = document.getElementsByClassName("file-upload-select")[0];


var Loader = new Rhino3dmLoader();
Loader.setLibraryPath( 'rhino3dm/' );
Loader.load('sav.3dm',function ( object ) {
  object.rotation.x = -Math.PI / 2;
  object.scale.set(0.005,0.005,0.005)
  scene.add( object );
  console.log(object);
  object.name = 'MyRhinoModel';
  let children_ = object.children;
  children_.forEach( child => {child.userData.selectable = true;
                               child.material.side = THREE.DoubleSide;
                               child.material.clipIntersection = true;
                               child.material.clippingPlanes = [plane];})
})
  



fileSelect.onclick = function() {
	fileInput.click();
}
fileInput.onchange = function() {
	let filename = fileInput.files[0].name;
	let selectName = document.getElementsByClassName("file-select-name")[0];
	selectName.innerText = filename;
  let uploadedAudio = document.getElementById('uploadedAudio');
  function uploadedAudio_(){
    uploadedAudio.play();
  }

  uploadedAudio_();



/*fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  console.log(fileList);});*/

// ***Adding stuff to the scene***
// ***Rhino model***
  let model = filename;
//console.log(typeof model)
  var Loader = new Rhino3dmLoader();
  Loader.setLibraryPath( 'rhino3dm/' );
  Loader.load(model,function ( object ) {
    object.rotation.x = -Math.PI / 2;
    object.scale.set(0.0002,0.0002,0.0002)
		scene.add( object );
    object.name = 'MyRhinoModel';
    
    // Init scene Bounding box
    //sceneBox.setFromObject(object);
    //let boxHelper = new THREE.Box3Helper(sceneBox, 0xffcce6);
    //scene.add(boxHelper);
    //object.userData.draggable = true;
    let children_ = object.children;
    children_.forEach( child => {child.userData.selectable = true;
                                 child.material.side = THREE.DoubleSide;
                                 child.material.clipIntersection = true;
                                 child.material.clippingPlanes = [plane];});
    
    console.log(children_)
    
    

    //getting model elements
    /*let slabs = object.children.slice(0,11);
    let columns = object.children.slice(11,46);
    let trusses = object.children.slice(46,);
    */
    /*
    let children_ = object.children;
    children_.forEach( child => {
      if (child.name ==='Slab'){
        child.material.color.g = 22;
      }else if (child.name ==='Column'){
        child.material.color.b = 22;
      }else if (child.name ==='Truss'){
        child.material.color.r = 22;
      }
      })
    */ 
    

    /*
    function update(){
      
      if (radioX.checked === true){ 
        
        trusses.forEach(truss=>truss.position.x = myrange.value);
      }else if (radioY.checked === true){
        
        trusses.forEach(truss=>truss.position.y = myrange.value);
      }else if (radioZ.checked === true){
        
        trusses.forEach(truss=>truss.position.z = myrange.value);
      }
    
      resetObj();
      hoverObj();
      requestAnimationFrame(update);
    }
    update();
    
    
	});*/
})
}



//sceneObject.rotation.x = -Math.PI / 2;

//sceneObject.scale.set(0.5,0.5,0.5)
//scene.add(sceneObject)
//scene.add(box)
scene.add(light)
scene.add(grid)
scene.add(axes)
scene.add(tcontrols)
camera.position.set(170,170,170)
camera.lookAt(box.position)
resize.start(renderer)


/// *************************** selecting objects****************

function updateSelState(){
  // Set our raycaster to begin selecting objects
  raycaster.setFromCamera(mouse, camera);
  
  // Check if hover is a valid object,
  // If so, reset material and hover object
  if(typeof hover.parent !== 'undefined'){
    hover.traverse((m) => {
      if(!m.material) return;
      m.material.emissiveIntensity = 0.0;
    })
    hover = {};
  }

  // Using the name for our Rhino document
  let doc = scene.children.find(a => a.name === 'MyRhinoModel');

  if(typeof doc !== 'undefined'){
    
    let intersects = raycaster.intersectObjects(doc.children, true);
    
    // If we've intersected things
    if(intersects.length > 0 ){

      // Intersects are sorted by distance to camera
      // Item 0 is the closest object
      hover = intersects[0].object;

      // Grab the top level object that has access to
      // attributes from Rhino
      while(hover.parent.name !== 'MyRhinoModel'){
        hover = hover.parent;
      }

      // Traverse is called on hover and all descendants
      hover.traverse((m) => {
        // Object3D won't have a material, just descendants
        if(!m.material) return;
        m.material.emissive.set(new THREE.Color(0xff66a3));
        m.material.emissiveIntensity = 0.5;
      })
      // controls.enabled = false;
    }
  }
}





document.addEventListener('mousemove', mouseMove);
//document.addEventListener('pointerup', mouseUp);


/*
function resetObj(){
  raycaster.setFromCamera(mouse,camera);
  //if (scene.children != )
  const intersects = raycaster.intersectObjects(scene.children);
  
  for (let i=0; i <intersects.length; i++){
    intersects[i].object.material.transparent = false;
    
  }
}

function hoverObj(){
  raycaster.setFromCamera(mouse,camera);
  const intersects = raycaster.intersectObjects(scene.children);
  let colour = new THREE.Color(0xff99ff);
  if (intersects.length > 0 && intersects[0].object.userData.draggable){
    intersects[0].object.material.transparent = true;
    intersects[0].object.material.opacity = 0.5;
  }
}
*/

document.addEventListener('mouseup',e =>{
  if(selection){
    //console.log(`not found ${selection.name}`);
    //selection.object.material.transparent = false;
    selection = null
    return;}
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse,camera);
  const found = raycaster.intersectObjects(scene.children);
  if (found.length > 0 && found[0].object.userData.selectable){
    selection = found[0].object;
    //selection.material.transparent = true;
    //selection.material.opacity = 0.5;
    //selection.material.color.g = 255;
    //console.log(`found ${selection.name}`);
    propsData.innerText ='Properties';
    nameData.innerText = `Name:   ${selection.name}`;
    typeData.innerText = `Type:   ${selection.type}`;
    layerData.innerText = `Layer:   ${selection.parent.userData.layers[selection.userData.attributes.layerIndex].name}`;
    objTypeData.innerText = `Object type:   ${selection.userData.objectType}`;
    materialData.innerText = `Material: ${selection.material.type}`;
    
    if (radioX.checked === true){ 
        
      selection.forEach(truss=>truss.position.x = myrange.value);
    }else if (radioY.checked === true){
      
      selection.forEach(truss=>truss.position.y = myrange.value);
    }else if (radioZ.checked === true){
      
      selection.forEach(truss=>truss.position.z = myrange.value);
    }
     
    //layerData.innerText = `Layer: ${selection.userData.attributes.layerIndex}`;
    //clearBtn.addEventListener('click',()=>{selection = null
    //return;})
  }
})
/*document.addEventListener('mouseup',e=>{
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
  raycaster.setFromCamera(mouse,camera);
  const found = raycaster.intersectObjects(scene.children);
  if (found.length > 0 != found[0].object.userData.selectable){
    //selection = found[0].object;
    selection.object.material.transparent = false;
    
    //selection.material.color.g = 255;
    //console.log(`found ${selection.name}`);
  }
})
*/
// ******************************Render scene*****************
function render() {
  
  // If canvas needs to be resized
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    let aspect = canvas.clientWidth / canvas.clientHeight;
    let side = Math.max(sceneBox.max.x - sceneBox.min.x, sceneBox.max.z - sceneBox.min.z);
    
    // Ortho camera resize
    camera.left = aspect * side * -1;
    camera.right = aspect * side;
    camera.bottom = side * -1;
    camera.top = side;

    camera.updateProjectionMatrix();
    controls.update();
  }

  renderer.render(scene, camera);
}



        //     *******  Snap Shot camera  *******

let pic = document.getElementById('pic');
pic.addEventListener('click',screenshot);

function screenshot(e) {
  render();
  let canvas = renderer.domElement;
  canvas.toBlob((blob) => {
    saveBlob(blob, `screencapture-${canvas.width}x${canvas.height}.png`);
  });
}
const saveBlob = (function() {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';
  return function saveData(blob, fileName) {
     const url = window.URL.createObjectURL(blob);
     a.href = url;
     a.download = fileName;
     a.click();
  };
}());

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width  = canvas.clientWidth | 0;
  const height = canvas.clientHeight | 0;
  const needResize = canvas.width !== width * pixelRatio || canvas.height !== height * pixelRatio ;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function animate(){
  

  //resetObj();
  //hoverObj();
  render();
  updateSelState();
  requestAnimationFrame(animate);
}
animate();


function getCanvasRelativePosition(event) {
  let canvas = renderer.domElement;
  let rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) * canvas.width  / rect.width,
    y: (event.clientY - rect.top ) * canvas.height / rect.height,
  };
}

function mouseMove(e){
  // prevent menu clicks from causing this to fire
  //if(e.target !== document.querySelector('#c')) return;

  let canvas = renderer.domElement;
  let pos = getCanvasRelativePosition(e);

  mouse.x = (pos.x / canvas.width) * 2 - 1;
  mouse.y = (pos.y / canvas.height) * -2 + 1;
  
}



/*
function mouseMove(event){
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener('mousemove', mouseMove);
*/

machine.addCallback(()=>{
    renderer.render(scene,camera,tcontrols, controls);
});
machine.start()


const firebaseConfig = {
  apiKey: "AIzaSyBB6uTJwKVM2YVQNd8JSvZhIESIMsaiRo0",
  authDomain: "m24-model-viewer.firebaseapp.com",
  projectId: "m24-model-viewer",
  storageBucket: "m24-model-viewer.appspot.com",
  messagingSenderId: "399344527531",
  appId: "1:399344527531:web:46fe98adb48030b1aa6fee",
  measurementId: "${config.measurementId}"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/*try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}*/

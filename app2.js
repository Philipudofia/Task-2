import * as THREE from 'https://cdn.skypack.dev/three@0.133.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js'

const loader = new GLTFLoader()
// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// controls.target.set(0, 1, 0)

var mixer
var modelReady = false

// let object;
loader.load("scene.gltf", function (gltf) {
  const root = gltf.scene;
  root.scale.set(1, 1, 1)
  root.position.set(0, -.6, 0)

  
  scene.add(gltf.scene)

  modelReady = true
  mixer = new THREE.AnimationMixer(gltf);
  var action = mixer.clipAction(gltf.animations[0]);
  action.play();
},function(xhr){
  console.log((xhr.loaded/xhr.total * 100) + "% loaded")
},function(error) {
  console.log("An error occurred")
})

const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5))
// scene.background =  new THREE.Color(0xffffff)
const camera = new THREE.PerspectiveCamera( 60, 300 / 300, 0.1, 1000 );
camera.position.set(0.8, 1.4, 1.0)

const light = new THREE.DirectionalLight(0xffffff, 5)
light.position.set(2.5, 7.5, 15)
scene.add(light)
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  alpha:true
});
renderer.setSize(300,300, true);
canvasContainer.appendChild( renderer.domElement );


// const orbit =  new OrbitControls(camera, renderer.domElement)
// // orbit.enableDamping = true
// // orbit.target.set(0, 1, 0)
let clock = new THREE.Clock();
function animate() {
	requestAnimationFrame( animate );
  // if (modelReady) mixer.update(clock.getDelta());

	renderer.render( scene, camera );
}

animate();

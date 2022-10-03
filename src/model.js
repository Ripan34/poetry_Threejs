import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
//size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./pr.png');

const scene = new THREE.Scene();
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshLambertMaterial({    color: 0x0095DD
} );
const cube = new THREE.Mesh( geometry, material );
// for(let i = 0; i < 5; i++){
//   cube.position.set((Math.random()-0.5) * 10, (Math.random()-0.5) * 10, (Math.random()-0.5) * 10);
  // scene.add( cube );
// }

scene.background = new THREE.Color('black');
// const light =  new THREE.AmbientLight(0xf6e86d);
// scene.add(light, 1000);
// const fontLoader = new FontLoader();
// fontLoader.load(
//   './fonts/myFont.json',
//   (font) => {
//     const textGeo = new TextGeometry(`Gunah \n Maine pyaar he kiya hai, gunah to nhi \n Gareeb to hu, bewafa to nhi \n Dhoondti hai yeh duniya ek khuda ke jhalak \n Teri ankhon mai dekhi hai, har jagah to nhi`, {
//       font: font,
//       size: 0.5,
//       height: 0.1,

//     })
    
//     const textMaterial = new THREE.MeshBasicMaterial({color: 'red'});
//     const textMesh = new THREE.Mesh(textGeo, textMaterial);
//     scene.add(textMesh);
//   }
// )
const canvas = document.querySelector('.webgl');
const loader = new GLTFLoader();
let mixer = null;
loader.load(
  './models/a.glb', (sc) => {
    mixer = new THREE.AnimationMixer(sc.scene);
    const action = mixer.clipAction(sc.animations[0]);
    action.play()
    console.log(sc)
    scene.add(sc.scene);
    sc.animations;
  }
)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);
const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 1, 1000); //(fov, aspectRatio)
camera.position.z = 3.5;
camera.position.y = 1;

var light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.shadowCameraVisible = true;
light.position.set(4, 3, 5);
scene.add(light);

var lightD = new THREE.DirectionalLight(0xffffff, 1);
lightD.castShadow = true;
lightD.shadowCameraVisible = true;
lightD.position.set(-4, 3, 5);
scene.add(lightD);
//ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas);
//damping is for smoothness
controls.enableDamping = true

renderer.render(scene, camera);
const clock = new THREE.Clock();

const tick = () => {
  //update controls
  let elT = clock.getElapsedTime();
  
  controls.update();
  //  cube.rotation.z += 0.01
  //  cube.rotation.y += 0.01
  let r= 0.02;
  if(mixer != null)
    mixer.update(r++)

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();

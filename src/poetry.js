import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

//size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./pr.png');

const scene = new THREE.Scene();

for(let i = 0; i < 5; i++){
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );
  const cube = new THREE.Mesh( geometry, material );
  cube.position.set((Math.random()-0.5) * 10, (Math.random()-0.5) * 10, (Math.random()-0.5) * 10);
  scene.add( cube );
}

const fontLoader = new FontLoader();
fontLoader.load(
  './fonts/myFont.json',
  (font) => {
    const textGeo = new TextGeometry('hello/n hii', {
      font: font,
      size: 0.5,
      height: 0.2,

    })
    
    const textMaterial = new THREE.MeshBasicMaterial({color: 'red'});
    const textMesh = new THREE.Mesh(textGeo, textMaterial);
    scene.add(textMesh);
  }
)
const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);

const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 1, 1000); //(fov, aspectRatio)
camera.position.z = 3.5;
camera.position.y = 1;

//ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas);
//damping is for smoothness
controls.enableDamping = true

renderer.render(scene, camera);

const tick = () => {
  //update controls
  
  controls.update();
  // cube.rotation.z += 0.01
  // cube.rotation.y += 0.01


  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();

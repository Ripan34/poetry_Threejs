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
const shapes = []
const textureLoader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const heartShape = new THREE.Shape();

heartShape.moveTo( 25, 25 );
heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
heartShape.bezierCurveTo( - 30, 0, - 30, 35, - 30, 35 );
heartShape.bezierCurveTo( - 30, 55, - 10, 77, 25, 95 );
heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

const extrudeSettings = { depth: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
const geometryHeart = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

for(let i = 0; i < 50; i++){
const mesh = new THREE.Mesh( geometryHeart, new THREE.MeshPhongMaterial({color: '#ff0022'}) );
  const s = 0.01;
  mesh.scale.set(s,s,s);
  mesh.position.set((Math.random()-0.5) * 18, (Math.random()-0.5) * 12, (Math.random()-0.5) * 12);
  scene.add(mesh);
  shapes.push({shape: mesh, x: Math.random(), y: Math.random(), z: Math.random()});}

scene.background = new THREE.Color('white');
const light =  new THREE.AmbientLight(0xffffff);
scene.add(light, 1000);

const fontLoader = new FontLoader();
fontLoader.load(
  './fonts/myFont.json',
  (font) => {
    const textGeo = new TextGeometry(`
    Rooh 
    Kisay di rooh vich khoh jaana 
    Bhulekhe pai he jaande ne 
    
    Ke eh rooh da maksad hai 
    Kyu hai ehe bhatak diya 
    
    Moh pai jande chehreya naal 
    Fir ne ehe tadaf diya 
    
    Rishta dil to laya jo 
    Sajan yaad nhi krde 
    
    Dhooni sekan dukha di 
    Judayian fer nhi jrday 
    
    Kisay di rooh vich khoh jaana… `, {
      font: font,
      size: 0.5,
      height: 0.1,
    })
    
    const textMaterial = new THREE.MeshBasicMaterial({color: 'black'});
    const textMesh = new THREE.Mesh(textGeo, textMaterial);
    textMesh.position.set(-5, 5, -3);
    scene.add(textMesh);
  }
)
const canvas = document.querySelector('.webgl');

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height);

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //pixel ratio

})
const camera = new THREE.PerspectiveCamera(70, sizes.width/sizes.height, 1, 1000); //(fov, aspectRatio)
camera.position.z = 9;
camera.position.y = 2;
camera.position.x = 2

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
    var speed = 0.05;
    shapes.forEach(el => {
      el.shape.rotation.x += el.x * speed;
      el.shape.rotation.y += el.y * speed;
      el.shape.rotation.z += el.z * speed;
    });

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();

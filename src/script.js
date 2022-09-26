import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import doorImg from '../static/door.jpg';


//TEXTURES
// const image = new Image();
// const texture = new THREE.Texture(image)

// image.onload = () => {
//     texture.needsUpdate = true;
// }
// image.src = '/door.jpg';
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/door.jpg');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);

const material = new THREE.MeshBasicMaterial( { map: texture} );
//mesh is combination of geometry and material
const mesh = new THREE.Mesh(geometry, material);

//mesh.position.normalize() //reduce the length to 1

scene.add(mesh);

//SCALE
//or do it with set(...)
mesh.scale.x = 1;
mesh.scale.y = 0.01;
mesh.scale.z = 2;
//ROTATION
// mesh.rotation.z = 5

//Axes helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper)
//size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //pixel ratio

})
//camera
const camera = new THREE.PerspectiveCamera(60, sizes.width/sizes.height, 0.1, 100); //(fov, aspectRatio)
camera.position.z = 3.5;
camera.position.y = 1;

/**
 * cursor
 */
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5;
    cursor.y = -(e.clientY / sizes.height - 0.5);
    //cursor.y = e.clientY;
})

//look at
//camera.lookAt(mesh.position);
//use group class to create a group
const group = new THREE.Group();
scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 'blue'}));
scene.add(camera); //always add to scene

const canvas = document.querySelector('.webgl');

//ORBIT CONTROLS
const controls = new OrbitControls(camera, canvas);
//damping is for smoothness
controls.enableDamping = true

//RENDERER: render the scene from camera point of view
//result drawn on canvas (HTML element to draw)
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); //pixel ratio
renderer.render(scene, camera);

//ANIMATIONS

const clock = new THREE.Clock();

//using library to animate
//gsap.to(mesh.position, {duration: 1, x: 2});

const tick = () => {
    //update objects
    // let elT = clock.getElapsedTime();
    //  mesh.rotation.y = Math.sin(elT);
    // mesh.rotation.x = Math.cos(elT);

    //mesh.scale.x += 0.01;
    //update camera
    // camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 3;
    // camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 3;
    // camera.position.y = cursor.y * 5;
    // camera.lookAt(mesh.position)

    //update controls
    controls.update()
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();
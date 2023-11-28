//import threeJS
import * as THREE from "three";
import "./styles.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let isPlaying = false;

window.addEventListener("click", function () {
  if (isPlaying === false) {
    playAudio();
    Audio.volume = 0.75;
  }
  isPlaying = true;
});

//Create a Scene
const scene = new THREE.Scene();

//create a sphere (requires material and mesh)
const geometry = new THREE.SphereGeometry(1, 32, 16);

//create material
const material = new THREE.MeshStandardMaterial({
  color: "#287AB8",
});
//create sphere by passing in geometry and material
const sphere = new THREE.Mesh(geometry, material);

//add sphere to scene
scene.add(sphere);

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// add Lights
const light = new THREE.PointLight(0x6699cc, 6, 100);
light.position.set(0, 0, 4);
scene.add(light);
light.castShadow = true;

const secondLight = new THREE.HemisphereLight(0x070707, 0x070707, 20);
scene.add(secondLight);

//add a camera
const camera = new THREE.PerspectiveCamera(
  30,
  sizes.width / sizes.height,
  10,
  2000
);

// position camera back on z axis
camera.position.z = 11;

//Add camera to scene
scene.add(camera);

//Find canvas from html
const canvas = document.querySelector(".webgl");

//Controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 27;

//Create a Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

//Set size of renderer
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);
renderer.setClearColor(0xffffff, 0);

// render scene and camera (Add loop at bottom to adjust window size)
renderer.render(scene, camera);

//Add resizing event listener

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  //removes blurriness when window resizes
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//set animation loop to re-render canvas to adjust sizes

const renderLoop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
};
renderLoop();

function playAudio() {
  new Audio("./space.mp3").play();
}

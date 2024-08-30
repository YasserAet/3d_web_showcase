import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const models = [
  { name: 'eye', path: 'models/eye/scene.gltf' },
  { name: 'model2', path: 'models/model2/scene.gltf' },
  { name: 'model3', path: 'models/model3/scene.gltf' },
  { name: 'model4', path: 'models/model4/scene.gltf' },
  { name: 'model5', path: 'models/model5/scene.gltf' },
  { name: 'model6', path: 'models/model6/scene.gltf' },
  { name: 'model7', path: 'models/model7/scene.gltf' }
];

const scenes = [];
const cameras = [];
const renderers = [];
let autoSpin = false;

// Initialize the scenes
models.forEach((model, index) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
  
  const container = document.getElementById(`container3D-${index + 1}`);
  container.appendChild(renderer.domElement);

  const loader = new GLTFLoader();
  loader.load(model.path, function(gltf) {
    const object = gltf.scene;
    scene.add(object);
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(500, 500, 500);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    
    function animate() {
      requestAnimationFrame(animate);
      
      if (autoSpin) {
        object.rotation.y += 0.01;
      }

      renderer.render(scene, camera);
    }
    
    animate();
  });

  scenes.push(scene);
  cameras.push(camera);
  renderers.push(renderer);
});

// Handle window resizing
window.addEventListener("resize", function () {
  renderers.forEach((renderer, index) => {
    const camera = cameras[index];
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
  });
});

// Toggle auto-spin with the spacebar
document.addEventListener('keydown', function(event) {
  if (event.code === 'Space') {
    autoSpin = !autoSpin;
  }
});

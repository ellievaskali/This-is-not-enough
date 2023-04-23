
import * as THREE from 'https://cdn.skypack.dev/three@0.134.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js';

const container = document.createElement('div');
document.body.appendChild(container);

const scene = new THREE.Scene();
scene.background = null;


const ambientLight = new THREE.AmbientLight(0xBDBDBD, .9);
scene.add(ambientLight);


const light = new THREE.PointLight( 0xffffff, .7, 200 );
light.position.set( 0, 10, 4 );
light.castShadow = true; // default false
scene.add( light );

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0); // The second parameter is the alpha value
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // enable shadow maps
container.appendChild(renderer.domElement);
renderer.domElement.addEventListener('pointermove', onPointerMove);
renderer.domElement.addEventListener('pointerdown', () => {
previousMousePosition = { x: event.clientX, y: event.clientY };
});


const loader_small_head = new OBJLoader();
loader_small_head.load(
  'small_head.obj',
  (object2) => {
          const material = new THREE.MeshStandardMaterial({
            color: 0xDBF227,
            metalness: 0,
            roughness: 0.2,
            wireframe: true,
          
            linewidth: 10, // Set the wireframe thickness here
            opacity: 1, transparent: true});

            object2.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.material = material;
              child.castShadow = true;
              child.receiveShadow = true;
            }
          },
          (xhr) => {
          console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
          },
          (error) => {
          console.error('An error happened', error);
          });

          // Move the object down by 1 unit, scale it and rotate it
        
          object2.position.y = .6;
          object2.position.x = -.9;
          object2.scale.set(.3, .3, .3);
        
        //   // Add a pivot object and set its position to the desired rotation center
        //   const pivot2 = new THREE.Object3D();
        //   // pivot2.position.set(object2.position.x, object2.position.y, object2.position.z);
        //   // pivot2.rotation.set(object2.rotation.x, object2.rotation.y, object2.rotation.z,);
        //   pivot2.scale.set(1, 1, 1.1);
        //   pivot2.add(object2);
        //   scene.add(pivot2);
        //   const controls2 = new OrbitControls(camera, object2);
        //   controls2.target = pivot2.position;
        //   controls2.enableDamping = true;
        // controls2.dampingFactor = 0.05;
        //     // controls limitations
        //     // controls.minAzimuthAngle = -Math.PI;
        //     // controls.maxAzimuthAngle = Math.PI;
        //     controls2.minPolarAngle = Math.PI/6; // 30 degrees in radians
        //     controls2.maxPolarAngle = Math.PI/2; // 90 degrees in radians

  
       });




function animate() {
  requestAnimationFrame(animate);
  object2.rotation.y += 0.003; // rotate the parent object around the y-axis
  renderer.clear(); // Manually clear the renderer
  renderer.render(scene, camera);
// Update OrbitControls
controls.update();
 }

 animate();

   
import * as THREE from 'https://cdn.skypack.dev/three@0.134.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js';

const container = document.createElement('div');
document.body.appendChild(container);


// set the scene
const scene = new THREE.Scene();
scene.background = null; // transparent so we can see the html

const ambientLight = new THREE.AmbientLight(0xBDBDBD, .9);
scene.add(ambientLight);

const light = new THREE.PointLight( 0xffffff, 1, 200 );
light.position.set( 0, 5, 1 );
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


// load head.obj
  const loader_head = new OBJLoader();
  loader_head.load('head.obj',
    (object) => {
      const material = new THREE.MeshStandardMaterial({
        color: 0x0047AB,
        metalness: 0,
        roughness: 0.2,
        wireframe: true,
        opacity: 1, transparent: true
      });
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
          child.castShadow = true;
          child.receiveShadow = true;
        } });
      //scale, move, rotate the head
      object.position.y = 0;
      object.scale.set(1, 1, 1);

      // Add a pivot object and set its position to the desired rotation center
      const pivot = new THREE.Object3D();
      pivot.position.set(object.position.x, object.position.y, object.position.z);
      pivot.rotation.set(object.rotation.x, object.rotation.y, object.rotation.z,);
      pivot.scale.set(1, 1, 1);
      pivot.add(object);
      scene.add(pivot);
        },
        (xhr) => {
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
        },
        (error) => {
        console.error('An error happened', error);
        }
      );

      function onPointerMove(event) {
      }

// load small_head.obj
const loader_head2 = new OBJLoader();
loader_head2.load(
  'small_head2.obj',
  (object2) => {
    const material2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.2,
      opacity: .5, transparent: true,
      emissive: 0xffffff, // blue emissive color
  emissiveIntensity:50 // intensity of the emissive color
    });

      object2.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material2; // apply the default material to the object
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    //scale, move, rotate the head
    object2.position.y = -0.03;
    object2.scale.set(1, 1, 1);

    // Add a pivot object and set its position to the desired rotation center
    const pivot2 = new THREE.Object3D();
    pivot2.position.set(object2.position.x, object2.position.y, object2.position.z);
    pivot2.rotation.set(object2.rotation.x, object2.rotation.y, object2.rotation.z);
    pivot2.scale.set(1, 1, 1);
    pivot2.add(object2);
    scene.add(pivot2);
      },
      (xhr) => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
      console.error('An error happened', error);
      }
    );


// Make thought objects
const radius = 1.6; // set the radius of the circle
const numObjects = 22; // set the number of objects to create
let currentAngle = 0; // initialize the current angle to zero

const waveSpeed = 0.001; // set the speed of the wave
const waveHeight = 0.5; // set the maximum height of the wave

const objects = []; // array to hold the objects
// Create a parent object to hold all the objects
const ringParent = new THREE.Object3D();


for (let i = 0; i < numObjects; i++) {
const x = Math.sin(currentAngle) * radius; // calculate the x-coordinate using sin
const z = Math.cos(currentAngle) * radius ; // calculate the z-coordinate using cos

// create a random geometry and material
const geometry = getRandomGeometry();
const material = getRandomMaterial();

const mesh = new THREE.Mesh(geometry, material); // create a mesh from the geometry and material

mesh.position.set(x, -.015, z); // set the position of the mesh

ringParent.add(mesh); // add the mesh to the parent object
mesh.scale.set(0.04, 0.04, 0.04);  

objects.push(mesh); // add the mesh to the objects array
currentAngle += Math.PI * 2 / numObjects; // increment the current angle
}
scene.add(ringParent);

function getRandomGeometry() {
const geometries = [
  new THREE.BoxGeometry(),
  new THREE.SphereGeometry(),
  new THREE.ConeGeometry(),
  new THREE.TorusGeometry(),
  new THREE.OctahedronGeometry(),
  new THREE.OctahedronGeometry(),
  new THREE.DodecahedronGeometry(),
];
return geometries[Math.floor(Math.random() * geometries.length)]; // choose a random geometry
}

function getRandomMaterial() {
const materials = [
  new THREE.MeshPhongMaterial({ color: 0xDBF227, opacity: 1, transparent: true,  }),
  new THREE.MeshLambertMaterial({ color: 0xDBF227,opacity: .9, transparent: true,  }), 
];
return materials[Math.floor(Math.random() * materials.length)]; // choose a random material
}


// Make trail of objects
const radius2 = 1.6; // set the radius of the circle
const numObjects2 = 400; // set the number of objects to create
let currentAngle2 = 0; // initialize the current angle to zero

const waveSpeed2 = 0.001; // set the speed of the wave
const waveHeight2 = 0.5; // set the maximum height of the wave

const objects2 = []; // array to hold the objects
// Create a parent object to hold all the objects
const ringParent2 = new THREE.Object3D();


for (let i = 0; i < numObjects2; i++) {
const x2 = Math.sin(currentAngle2) * radius2; // calculate the x-coordinate using sin
const z2 = Math.cos(currentAngle2) * radius2 ; // calculate the z-coordinate using cos

// create a random geometry and material
const geometry2 = getRandomGeometry2();
const material2 = getRandomMaterial2();

const mesh2 = new THREE.Mesh(geometry2, material2); // create a mesh from the geometry and material

mesh2.position.set(x2, 5, z2); // set the position of the mesh

ringParent2.add(mesh2); // add the mesh to the parent object
mesh2.scale.set(0.0045, 0.0045, 0.0045);  
objects2.push(mesh2); // add the mesh to the objects array
currentAngle2 += Math.PI * 2 / numObjects2; // increment the current angle
}
scene.add(ringParent2);

function getRandomGeometry2() {
const geometries2 = [
  new THREE.BoxGeometry(),
  new THREE.SphereGeometry(),
  new THREE.ConeGeometry(),
  new THREE.TorusGeometry(),
  new THREE.OctahedronGeometry(),
  new THREE.OctahedronGeometry(),
  new THREE.DodecahedronGeometry(),
];
return geometries2[Math.floor(Math.random() * geometries2.length)]; // choose a random geometry
}

function getRandomMaterial2() {
const materials2 = [
  new THREE.MeshPhongMaterial({ color: 0x0047AB, opacity: 1, transparent: true,  }),
  new THREE.MeshPhongMaterial({ color: 0x0047AB, opacity: .9, transparent: true,  })
];
return materials2[Math.floor(Math.random() * materials2.length)]; // choose a random material
}


// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.target = pivot.position;
controls.enableDamping = true;
controls.dampingFactor = .1;
  
// controls limitations
  controls.minPolarAngle = Math.PI/6; // 30 degrees in radians
  controls.maxPolarAngle = Math.PI/2; // 90 degrees in radians

  
// animate the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.clear(); // Manually clear the renderer
  renderer.render(scene, camera);
 
// create wave of thoughts  
for (let i = 0; i < objects.length; i++) {
  const object = objects[i];
  const angle = currentAngle + i * Math.PI * 5 / numObjects; // calculate the angle for each object
  const y = Math.sin(angle * 3 + Date.now() * waveSpeed) * waveHeight; // calculate the y-coordinate using a sine wave
  object.position.setY(y); // set the y-coordinate of the object's position
}

// create wave of trail of thoughts
for (let i = 0; i < objects2.length; i++) {
  const object2 = objects2[i];
  const angle2 = currentAngle2 + i * Math.PI * 5 / numObjects2; // calculate the angle for each object
  const y2 = Math.sin(angle2 * 3 + Date.now() * waveSpeed2) * waveHeight2; // calculate the y-coordinate using a sine wave
  object2.position.setY(y2); // set the y-coordinate of the object's position
}
     
ringParent.rotation.y += 0.003; // rotate the parent object around the y-axis
ringParent2.rotation.y += 0.003; // rotate the parent object around the y-axis

// Update OrbitControls
controls.update();
 }

 animate();
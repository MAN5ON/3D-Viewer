import * as THREE from "https://threejs.org/build/three.module.js";
import {OrbitControls} from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {STLLoader} from "https://threejs.org/examples/jsm/loaders/STLLoader.js";


//Сцена
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xafdafc );
//Камера
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Рендерер, размером с область камеры, пустой canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.append(renderer.domElement);

//Фигура с геометрией и материалом
const loader = new STLLoader();
loader.load('./models/dino2.stl', function (geometry) {
    const material = new THREE.MeshStandardMaterial({
        color: 0xe6e6fa,
        emissive: 0x2b2b2b,
        specular: 0xe6e6e6,
        metalness: 1,
        roughness: 0.8,
    });
    //Сетка принимающая геометрию и применяющая материал + позиция камеры
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
});

//Новая сцена для света, + цвет света, позиция.
const spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
scene.add(spotLight);
//Ещё один свет
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set(-200, -200, -200);
scene.add(spotLight2);

//Вращение камеры вокруг объекта
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();

//Анимация, рендеринг
function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
}

render();
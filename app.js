import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Raycast from "./js/raycast";

export default class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.currentColor = 0x00ff00;
    this.currentColor2 = 0x0000ff;

    this.raycast = new Raycast(this.camera, this.scene);
    this.mouse = new THREE.Vector2();

    this.resize();
    this.setupResize();
    this.setupMouse();
    this.addObject();
    this.render();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  setupMouse() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("click", () => {
      this.raycast.clickInfo(this.mouse);
    });
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.position.y = 0.1;
    this.camera.updateProjectionMatrix();
  }

  addObject() {
    this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    this.material = new THREE.MeshBasicMaterial({
      color: this.currentColor,
      // wireframe: true,
    });
    this.material2 = new THREE.MeshBasicMaterial({
      color: this.currentColor2,
      // wireframe: true,
    });

    this.object1 = new THREE.Mesh(this.geometry, this.material);
    this.object2 = new THREE.Mesh(this.geometry, this.material2);
    this.object1.position.set(-0.2, 0, 0);
    this.object2.position.set(0.2, 0, 0);
    this.object1.name = "green box";
    this.object2.name = "blue box";

    this.scene.add(this.object1);
    this.scene.add(this.object2);
    this.addFloor();
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(10, 2, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#ffffff", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, -0.11, 0);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);
  }

  addLight() {
    this.color = 0xffffff;
    this.intensity = 1;
    this.light = new THREE.PointLight(this.color, this.intensity);
    this.light.position.set(0, 30, 30);
    this.scene.add(this.light);
  }

  render() {
    // this.object1.rotation.x = this.time / 20;
    // this.object1.rotation.y = this.time / 10;
    // this.object2.rotation.x = this.time / 20;
    // this.object2.rotation.y = this.time / 10;

    this.raycast.update(this.mouse);

    this.renderer.render(this.scene, this.camera);
    this.time += 0.05;
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.querySelector("#container"),
});

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Raycast from "./js/raycast";

const cubes = [
  { name: "object Nana", color: 0xffbd5b, position: { x: -0.3, y: 0, z: -0.3 } },
  { name: "object Riri", color: 0xadff5b, position: { x: 0.3, y: 0, z: -0.3 } },
  { name: "object Momo", color: 0xff82de, position: { x: -0.3, y: 0, z: 0.3 } },
  { name: "object Vivi", color: 0x82c3ff, position: { x: 0.3, y: 0, z: 0.3 } },
];

export default class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 100);
    this.camera.position.set(0, 0, 1.5);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.raycast = new Raycast(this.camera, this.scene);
    this.mouse = new THREE.Vector2();

    this.cubes = options.cubes;
    this.objects = [];

    this.resize();
    this.setupResize();
    this.setupMouse();
    this.setupKeys();
    this.addObject();
    this.render();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  setupKeys() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  setupMouse() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this), false);
    window.addEventListener("click", () => {
      this.raycast.clickInfo(this.mouse);
    });
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 37 /*Left*/:
        console.log("pressing left");

        break;

      case 39 /*Right*/:
        console.log("pressing right");

        break;

      case 38 /*Up*/:
        console.log("pressing up");

        break;

      case 40 /*Up*/:
        console.log("pressing down");

        break;
    }
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
    for (let i = 0; i < this.cubes.length; i++) {
      let material = new THREE.MeshBasicMaterial({
        color: this.cubes[i].color,
      });
      let object = new THREE.Mesh(this.geometry, material);
      object.position.set(this.cubes[i].position.x, this.cubes[i].position.y, this.cubes[i].position.z);
      object.name = this.cubes[i].name;
      this.scene.add(object);
      this.objects.push(object);
    }
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#5D5446", side: THREE.DoubleSide });
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
    this.raycast.update(this.mouse);

    this.renderer.render(this.scene, this.camera);
    this.time += 0.05;
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.querySelector("#container"),
  cubes: cubes,
});

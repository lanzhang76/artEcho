import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 100);
    this.camera.position.set(0, 0.1, 1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xf0d281);
    this.renderer.setSize(this.width, this.height);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;

    this.vasePath = "../models/vase/vase-f1991-150k-4096.gltf";
    this.mammothPath = "../models/mammoth/woolly-mammoth-100k-4096.gltf";
    this.vaseMesh = null;
    this.mammothMesh = null;

    this.loadModels();
    this.resize();
    this.setupResize();
    this.addObject();
    this.render();
  }

  loadModels() {
    //
    // Models TODO:
    // 1. add loading manager;
    // 2. chain Draco GLTF
    // 3. embed model as class/object
    //
    this.loader = new GLTFLoader();
    this.loader.load(this.vasePath, (gltf) => {
      this.vaseMesh = gltf.scene;
      this.scene.add(this.vaseMesh);

      this.boxVase = new THREE.Box3().setFromObject(this.vaseMesh);
      this.vaseMesh.position.set(-0.5, this.boxVase.getSize().y / 2, 0);
    });
    this.loader.load(this.mammothPath, (gltf) => {
      this.mammothMesh = gltf.scene;
      this.scene.add(this.mammothMesh);

      this.boxMammoth = new THREE.Box3().setFromObject(this.mammothMesh);
      this.mammothMesh.position.set(0.5, this.boxMammoth.getSize().y / 2, 0);
    });
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  addObject() {
    // this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    // this.material = new THREE.MeshNormalMaterial();

    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.scene.add(this.mesh);
    this.addFloor();
    this.addLight();
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#131528", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, 0, 0);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);

    this.grid = new THREE.GridHelper(100, 20);
    this.scene.add(this.grid);
  }

  addLight() {
    this.color = 0xffffff;
    this.intensity = 1;
    this.light = new THREE.PointLight(this.color, this.intensity);
    this.light_vase = new THREE.DirectionalLight(this.color, this.intensity, 10);
    this.ambient = new THREE.AmbientLight(0x404040, this.intensity);
    this.light.position.set(0.5, 1, 0.866);

    const targetObject = new THREE.Object3D();
    targetObject.position.set(-0.5, 0, 0);
    this.scene.add(targetObject);
    this.light_vase.target = targetObject;

    this.scene.add(this.light);
    this.scene.add(this.light_vase);
    this.scene.add(this.ambient);
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.time += 0.05;
    window.requestAnimationFrame(this.render.bind(this));
  }
}

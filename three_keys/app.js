import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const cubes = [
  { name: "object Nana", color: 0xffbd5b, position: { x: -1.5, y: 0, z: 0 } },
  { name: "object Riri", color: 0xadff5b, position: { x: -0.5, y: 0, z: 0 } },
  { name: "object Momo", color: 0xff82de, position: { x: 0.5, y: 0, z: 0 } },
  { name: "object Vivi", color: 0x82c3ff, position: { x: 1.5, y: 0, z: 0 } },
];

export default class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 100);
    this.zpos = 1.5;
    this.camera.position.set(0, 0, this.zpos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.gui = new GUI();
    this.lookAtPoint = { x: 0, y: 0, z: 1.5 };

    this.mouse = new THREE.Vector2();

    this.cubes = options.cubes;
    this.objects = [];

    this.goalColor = 0x0000ff;
    this.zoomColor = 0x00ffff;
    this.INTERSECTED = null;
    this.previousIndex = 0;
    this.currentSelected = 0;

    this.VIEWmode = false;
    this.rotateObject = {
      theta: Math.PI * 2,
      distance: 1.5,
    };

    this.loader = new OBJLoader();

    this.resize();
    this.setupResize();
    this.addObject();
    this.setupKeys();
    this.setupGUI();

    this.setupLoader();

    this.addFloor();
    this.render();

    this.select(0);
  }

  setupLoader() {
    // load a resource

    this.loader.load("model/mammoth.obj", this.addObjectToScene.bind(this));

    // this.loader.load(
    //   // resource URL
    //   "../Models/mammoth/mammoth.obj",
    //   // called when resource is loaded
    //   this.addObjectToScene.bind(this),
    //   // called when loading is in progresses
    //   function (xhr) {
    //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    //   },
    //   // called when loading has errors
    //   function (error) {
    //     console.log(error);
    //   }
    // );
  }

  addObjectToScene(model) {
    // console.log("loaded");
    // console.log(object);
    // object.position.set(0, 0, 0);
    // object.scale.set(1, 1, 10);
    // this.scene.add(object);

    model.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material.color = 0xffb830;
      }
    });
    model.position.set(0, 0, -53);
    this.scene.add(model);
    console.log(model);
  }

  setupGUI() {
    this.cubeFolder = this.gui.addFolder("camera");

    this.cubeFolder.add(this.lookAtPoint, "x", -Math.PI * 2, Math.PI * 2, 0.01);
    this.cubeFolder.add(this.lookAtPoint, "y", -Math.PI * 2, Math.PI * 2, 0.01);
    this.cubeFolder.add(this.lookAtPoint, "z", -Math.PI * 2, Math.PI * 2, 0.01);
    this.cubeFolder.add(this.rotateObject, "theta", 0, 20, 0.01);
    this.cubeFolder.add(this.rotateObject, "distance", 0, 10, 0.01);
    this.cubeFolder.open();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  setupKeys() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    switch (event.keyCode) {
      case 37 /*Left*/:
        if (this.VIEWmode == false) {
          this.selectMinus();
        } else {
          this.rotateLeftObject();
        }

        break;

      case 39 /*Right*/:
        if (this.VIEWmode == false) {
          this.selectPlus();
        } else {
          this.rotateRightObject();
        }

        break;

      case 38 /*Up*/:
        if (this.VIEWmode == false) {
          this.enterAroundObject();
        }
        break;

      case 40 /*Down*/:
        if (this.VIEWmode == true) {
          this.exitAroundObject();
        }
        break;
    }
  }

  rotateRightObject() {
    this.rotateObject.theta += 0.1;
  }

  rotateLeftObject() {
    this.rotateObject.theta -= 0.1;
  }

  enterAroundObject() {
    this.currentColor = this.INTERSECTED.material.color.getHex();
    this.INTERSECTED.material.color.set(this.zoomColor);
    this.VIEWmode = true;
    this.camera.position.z -= 0.2;
  }

  exitAroundObject() {
    this.INTERSECTED.material.color.set(this.currentColor);
    this.VIEWmode = false;
    this.cameraAnimation();
    this.camera.position.z += 0.2;
  }

  selectTarget() {
    this.select();
  }

  selectMinus() {
    if (this.currentSelected > 0) {
      this.currentSelected--;
      this.selectTarget(this.currentSelected);
    }
  }

  selectPlus() {
    if (this.currentSelected < this.cubes.length - 1) {
      this.currentSelected++;
      this.selectTarget(this.currentSelected);
    }
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

  // NOT IN USE:
  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#5D5446", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, -0.11, 0);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);
  }

  // NOT IN USE:
  addLight() {
    this.color = 0xffffff;
    this.intensity = 1;
    this.light = new THREE.PointLight(this.color, this.intensity);
    this.light.position.set(0, 30, 30);
    this.scene.add(this.light);
  }

  getHexColor(hexStr) {
    var c = new THREE.Color();
    c.set(hexStr);
    return `#` + c.getHexString(); // "c08000"
  }

  select(index) {
    this.INTERSECTED = this.objects[this.currentSelected];
    var textBox = document.querySelector("#selected");
    textBox.innerText = `${this.INTERSECTED.name} is selected`;
    this.cameraAnimation();
    this.updateColor();
  }

  cameraAnimation() {
    this.lookPos = this.INTERSECTED.position;
    this.coords = { x: this.camera.position.x, y: this.camera.position.y };
    gsap.to(this.coords, {
      x: this.lookPos.x,
      y: this.lookPos.y,
      onUpdate: () => {
        this.camera.position.set(this.coords.x, this.coords.y, this.camera.position.z);
        this.camera.rotation.set(0, 0, 0);
      },
    });
  }

  updateColor() {
    this.objects[this.previousIndex].material.color.set(this.cubes[this.currentSelected].color);
    this.previousIndex = this.currentSelected;
    this.currentColor = this.INTERSECTED.material.color.getHex();
    this.INTERSECTED.material.color.set(this.goalColor);
  }

  render() {
    this.camera.position.x = this.cubes[this.currentSelected].position.x + this.rotateObject.distance * Math.cos(this.rotateObject.theta);
    this.camera.position.z = this.cubes[this.currentSelected].position.z + this.rotateObject.distance * Math.sin(this.rotateObject.theta);
    this.camera.lookAt(this.cubes[this.currentSelected].position.x, 0, this.cubes[this.currentSelected].position.z);
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({
  dom: document.querySelector("#container"),
  cubes: cubes,
});

import * as THREE from "three";
import gsap from "gsap";

export default class Selector {
  constructor(camera, scene, objects) {
    this.scene = scene;
    this.camera = camera;
    this.cubes = objects;
    this.goalColor = 0x0000ff;
    this.INTERSECTED = null;
    this.previousIndex = 0;
    this.index = 0;

    this.select(0);
  }

  getHexColor(hexStr) {
    var c = new THREE.Color();
    c.set(hexStr);
    return `#` + c.getHexString(); // "c08000"
  }

  select(index) {
    this.index = index;
    this.INTERSECTED = this.cubes[this.index];
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
    this.cubes[this.previousIndex].material.color.set(this.currentColor);
    this.previousIndex = this.index;
    this.currentColor = this.INTERSECTED.material.color.getHex();
    this.INTERSECTED.material.color.set(this.goalColor);
  }
}

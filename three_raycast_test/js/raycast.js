import * as THREE from "three";
import gsap from "gsap";

export default class Raycast {
  constructor(camera, scene) {
    this.scene = scene;
    this.camera = camera;
    this.raycaster = new THREE.Raycaster();
    this.goalColor = 0xffffff;
    this.INTERSECTED = null;
  }

  getHexColor(hexStr) {
    var c = new THREE.Color();
    c.set(hexStr);
    return `#` + c.getHexString(); // "c08000"
  }

  clickInfo(mouse) {
    this.checkpoints = mouse;
    this.raycaster.setFromCamera(this.checkpoints, this.camera);
    this.click_intersects = this.raycaster.intersectObjects(this.scene.children);

    var textBox = document.querySelector("#selected");
    if (this.intersects.length) {
      this.objectName = this.click_intersects[0].object.name;
      textBox.innerText = `${this.click_intersects[0].object.name} is selected`;

      if (this.objectName.toString() != "floor") {
        this.cameraAnimation();
      }
    } else {
      textBox.innerText = `nothing is selected`;
    }
  }

  cameraAnimation() {
    this.lookPos = this.intersects[0].object.position;
    this.coords = { x: this.camera.position.x, y: this.camera.position.y };
    gsap.to(this.coords, { x: this.lookPos.x, y: this.lookPos.y, onUpdate: () => this.camera.position.set(this.coords.x, this.coords.y, this.camera.position.z) });
  }

  update(mouse) {
    this.mouse = mouse;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.intersects = this.raycaster.intersectObjects(this.scene.children);

    if (this.INTERSECTED) {
      this.INTERSECTED.material.color.set(this.currentColor);
      this.INTERSECTED = undefined;
    }

    if (this.intersects.length) {
      this.INTERSECTED = this.intersects[0].object;
      this.currentColor = this.INTERSECTED.material.color.getHex();
      this.INTERSECTED.material.color.set(this.goalColor);
    }
  }
}

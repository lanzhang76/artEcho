import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

export class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.scene = new THREE.Scene();
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 100);
    this.camera.position.set(0, 0.2, 0);
    this.camera.rotation.order = "YXZ";

    this.tiltCam = false;

    this.helper = new THREE.CameraHelper(this.camera);
    this.scene.add(this.helper);

    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x2d2d2d);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.setAttribute("role", "application");
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.chamber = 1;
    this.inChamber = true;
    this.currentModels = [];
    this.activated = false;

    this.ogPos = [
      { name: "chamber1", x: 0, y: 0.2, z: 0 },
      { name: "chamber2", x: 0, y: 0, z: 0 },
      { name: "chamber3", x: 0, y: 0, z: 0 },
      { name: "chamber4", x: 0, y: 0, z: 0 },
    ];

    this.chamber1 = [
      { name: "vase", path: "../models/vase/vase-f1991-150k-4096.gltf", mesh: null, box: null, position: { x: -2, y: 0.1, z: -2 }, starePos: { x: -1, y: 0.3, z: -1 }, stare_dist: 0.5 },
      { name: "mammoth", path: "../models/mammoth/woolly-mammoth-100k-4096.gltf", mesh: null, box: null, position: { x: 2, y: 2, z: -2 }, starePos: { x: 1, y: 2, z: -1 }, stare_dist: 3 },
    ];

    this.controlPanel = {
      theta: -Math.PI * 2,
      distance: 2,
      lookAtPoint: { x: 0, y: 0, z: 1.5 },
      currentSelected: 1,
      VIEWmode: false,
      INTERSECTED: { name: "origin", path: null, mesh: null, box: null, position: { x: 0, y: 1, z: 0 } },
      x_randians: 0,
      y_randians: 0,
    };

    this.point = {
      x: -Math.PI / 2,
      y: Math.PI * 2,
      z: -10,
    };
    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.gui = new GUI();

    this.pointRef = {
      radius: 10,
      phi: -Math.PI / 2,
      theta: Math.PI / 2,
    };
    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.textBox = document.querySelector("#selected");

    this.loadModels();
    this.resize();
    this.setupResize();
    this.setupKeys();
    this.addFloor();
    this.addLight();
    this.addSound();
    this.render();
    this.setupGUI();
  }

  loadModels() {
    this.loader = new GLTFLoader();
    if (this.chamber == 1 && this.inChamber == true) {
      this.currentModels = [];
      this.currentModels = this.chamber1;
      for (let model of this.chamber1) {
        this.loader.load(
          model.path,
          (gltf) => {
            model.mesh = gltf.scene;
            this.scene.add(model.mesh);
            model.box = new THREE.Box3().setFromObject(model.mesh);
            model.mesh.position.set(model.position.x, model.box.getSize(new THREE.Vector3()).y / 2, model.position.z);
          },
          (xhr) => {
            // while loading:
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
          }
        );
      }
    }
  }

  setupGUI() {
    this.cubeFolder = this.gui.addFolder("camera");

    this.cubeFolder.add(this.pointRef, "radius", -10, 10, 0.01);
    this.cubeFolder.add(this.pointRef, "phi", -Math.PI * 2, Math.PI * 2, Math.PI / 6);
    this.cubeFolder.add(this.pointRef, "theta", -Math.PI * 2, Math.PI * 2, Math.PI / 4);
    this.cubeFolder.add(this.controlPanel, "theta", -Math.PI * 2, Math.PI * 2, Math.PI / 4);
    this.cubeFolder.open();
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

  setupKeys() {
    window.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onKeyDown(event) {
    // 1. camera rotation: left and right
    if (event.keyCode == 37 && (event.ctrlKey || event.metaKey)) {
      console.log("rotate left");
      this.tiltCam = true;
      this.pointRef.theta -= Math.PI / 4;
    } else if (event.keyCode == 39 && (event.ctrlKey || event.metaKey)) {
      console.log("rotate right");
      this.tiltCam = true;
      this.pointRef.theta += Math.PI / 4;
    }
    console.log(this.pointRef.theta);

    // 2. camera tilt
    if (event.keyCode == 38 && (event.ctrlKey || event.metaKey) && this.pointRef.phi < -Math.PI / 3) {
      console.log("tilt up");
      this.tiltCam = true;
      this.pointRef.phi += Math.PI / 6;
    } else if (event.keyCode == 40 && (event.ctrlKey || event.metaKey) && this.pointRef.phi > (-Math.PI * 3) / 4) {
      console.log("tilt down");
      this.tiltCam = true;
      this.pointRef.phi -= Math.PI / 6;
    }
    console.log(this.pointRef.phi);

    if (this.activated && this.controlPanel.VIEWmode == false) {
      // Chamber Navigation

      // 3. select assets 1-currentModels.length
      if (event.keyCode >= 48 && event.keyCode <= 54) {
        switch (event.keyCode) {
          case 48: // 0 is orginal point
            // reset camera angle and position
            this.pointRef.theta = Math.PI / 2;
            this.textBox.innerText = `nothing is selected`;

            break;
          case 49: // 1
            this.controlPanel.currentSelected = 0;
            this.pointRef.theta = Math.PI * 2 + Math.PI / 4;
            this.select();

            break;
          case 50: // 2
            this.controlPanel.currentSelected = 1;
            this.pointRef.theta = Math.PI * 2 + (Math.PI * 3) / 4;
            this.select();

            break;
        }
      }

      // 4. move switch chambers
    }

    if (this.activated && this.controlPanel.VIEWmode == true) {
      switch (event.keyCode) {
        case 8: // 0 is orginal point
          // reset camera angle and position
          this.pointRef.theta = Math.PI / 2;
          this.moveBackToCenter();
          this.textBox.innerText = `moved back to center`;

        case 37 /*Left*/:
          this.rotateLeftObject();
          break;

        case 39 /*Right*/:
          this.rotateRightObject();
          break;
      }
    }

    // if (this.activated) {
    //   switch (event.keyCode) {
    //     case 37 /*Left*/:
    //       break;

    //     case 39 /*Right*/:
    //       if (this.controlPanel.VIEWmode == false) {
    //         this.selectPlus();
    //       } else {
    //         this.rotateRightObject();
    //       }

    //       break;

    //     case 13 /*Enter*/:
    //       if (this.controlPanel.INTERSECTED != null) {
    //         this.textBox.innerText = `Going into View Mode of model ${this.controlPanel.INTERSECTED.name}`;
    //         this.controlPanel.VIEWmode = true;
    //       }

    //       break;

    //     case 27 /*Escape*/:
    //       if (this.controlPanel.VIEWmode == true) {
    //         this.exitAroundObject();
    //       }
    //       break;

    //     case 40 /*Down*/:
    //       if (this.controlPanel.distance < 10) {
    //         this.controlPanel.distance += 0.1;
    //       }
    //       break;

    //     case 38 /*Up*/:
    //       if (this.controlPanel.distance > 0.3) {
    //         this.controlPanel.distance -= 0.1;
    //       }
    //   }
    // }
  }

  rotateRightObject() {
    this.pointRef.theta -= Math.PI / 4;
  }

  rotateLeftObject() {
    this.pointRef.theta += Math.PI / 4;
  }

  select() {
    this.controlPanel.INTERSECTED = this.currentModels[this.controlPanel.currentSelected];
    this.textBox.innerText = `${this.controlPanel.INTERSECTED.name} is selected`;
    this.point.x = this.controlPanel.INTERSECTED.position.x;
    this.point.y = this.controlPanel.INTERSECTED.position.y;
    this.point.z = this.controlPanel.INTERSECTED.position.z;
    this.animation_ZoomToObject();
    this.controlPanel.VIEWmode = true;
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#131528", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, 0, 0);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);

    this.chamberFloor = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
    this.chamber_mat = new THREE.MeshBasicMaterial({ color: "#f8f8ff", side: THREE.DoubleSide });
    this.chamber1 = new THREE.Mesh(this.chamberFloor, this.chamber_mat);
    this.chamber1.position.set(0, 0.01, 0);
    this.chamber1.rotation.set(Math.PI / 2, 0, 0);
    this.scene.add(this.chamber1);

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

  addSound() {
    const sound = new THREE.PositionalAudio(this.listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("../../sounds/demo.wav", function (buffer) {
      sound.setBuffer(buffer);
      sound.setRefDistance(1);
      sound.setDirectionalCone(180, 230, 0.1);
    });
    this.sound = sound;

    const sphere = new THREE.SphereGeometry(1, 32, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xff2200 });

    const mesh = new THREE.Mesh(sphere, material);
    this.scene.add(mesh);
    mesh.add(sound);
  }

  setActivated() {
    this.activated = true;
    this.sound.play();
  }

  animation_ZoomToObject() {
    gsap.to(this.camera.position, {
      x: this.controlPanel.INTERSECTED.starePos.x,
      y: this.controlPanel.INTERSECTED.starePos.y,
      z: this.controlPanel.INTERSECTED.starePos.z,
      onUpdate: () => {
        this.camera.lookAt(this.point.x, this.point.y, this.point.z);
      },
    });
  }

  moveBackToCenter() {
    this.controlPanel.VIEWmode = false;
    this.clearTarget();
    if (this.chamber == 1) {
      gsap.to(this.camera.position, {
        x: this.ogPos[0].x,
        y: this.ogPos[0].y,
        z: this.ogPos[0].z,
        onUpdate: () => {
          this.camera.lookAt(this.point.x, this.point.y, this.point.z);
        },
      });
    }
  }

  clearTarget() {
    this.pointRef.radius = 10;
    this.pointRef.phi = -Math.PI / 2;
    this.pointRef.theta = Math.PI / 2;
    this.point.x = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta);
    this.point.y = this.pointRef.radius * Math.cos(this.pointRef.phi);
    this.point.z = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta);
  }

  render() {
    if (this.controlPanel.VIEWmode == true) {
      this.camera.position.x = this.point.x + this.controlPanel.INTERSECTED.stare_dist * Math.cos(this.pointRef.theta);
      this.camera.position.z = this.point.z + this.controlPanel.INTERSECTED.stare_dist * Math.sin(this.pointRef.theta);
    }

    if (this.tiltCam == true) {
      this.point.x = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta);
      this.point.y = this.pointRef.radius * Math.cos(this.pointRef.phi);
      this.point.z = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta);
      this.tiltCam = false;
    }

    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.camera.matrixAutoUpdate = true;

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  }
}

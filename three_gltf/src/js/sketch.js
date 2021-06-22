import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";
import { models } from "../data/models";


const audioLoader = new THREE.AudioLoader();
export class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 100);
    this.camera.position.set(0, 1, 0);
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
      { name: "chamber1", x: 0, y: 1, z: 0 },
      { name: "chamber2", x: 0, y: 1, z: -20 },
      { name: "chamber3", x: 0, y: 0, z: 0 },
      { name: "chamber4", x: 0, y: 0, z: 0 },
    ];

    this.rooms = models[4].data;
    this.chamber1 = models[0].data;
    this.chamber2 = models[1].data;
    this.chamber3 = models[2].data;
    this.chamber4 = models[3].data;
    this.chamber1Sound = models[0].soundsFiles;

    this.controlPanel = {
      theta: Math.PI / 2,
      currentSelected: 1,
      VIEWmode: false,
      initialMove: true,
      INTERSECTED: { name: "origin", path: null, mesh: null, box: null, position: { x: 0, y: 0.2, z: 0 } },
      og: { name: "origin", path: null, mesh: null, box: null, position: { x: 0, y: 0.2, z: 0 } },
    };

    this.point = {
      x: -Math.PI / 2,
      y: Math.PI * 2,
      z: -10,
    };

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

    // this.setupGUI();
    this.moveBackToCenter();
    this.clearTarget();
  }

  loadModels() {
    this.loader = new GLTFLoader();
    //room
    for (let room of this.rooms) {
      this.loader.load(
        room.path,
        (gltf) => {
          room.mesh = gltf.scene;
          this.scene.add(room.mesh);

          // room.box = new THREE.Box3().setFromObject(room.mesh);
          room.mesh.scale.set(2.5, 2.5, 2.5);
          room.mesh.position.set(room.position.x, room.position.y, room.position.z);
        },
        (xhr) => {
          // while loading:
          console.log("room" + (xhr.loaded / xhr.total) * 100 + "% loaded");
        }
      );
      this.render();
    }

    //chamber 1 model
    if (this.chamber == 1 && this.inChamber == true) {
      this.currentModels = this.chamber1;
      for (let model of this.chamber1) {
        this.loader.load(
          model.path,
          (gltf) => {
            model.mesh = gltf.scene;
            this.scene.add(model.mesh);

            model.box = new THREE.Box3().setFromObject(model.mesh);
            model.mesh.position.set(model.position.x + model.offset.x, model.box.getSize(new THREE.Vector3()).y / 2 + model.offset.y, model.position.z + model.offset.z);
            model.mesh.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);
          },
          (xhr) => {
            // while loading:
            console.log("models are " + (xhr.loaded / xhr.total) * 100 + "% loaded");
          }
        );
      }
    }

    console.log(this.currentModels);
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
    if (this.activated && this.controlPanel.VIEWmode == false) {
      //
      // ** Chamber Navigation **
      //
      // 1. camera rotation: left and right
      if (event.keyCode == 37 && (event.ctrlKey || event.shiftKey)) {
        console.log("rotate left");
        this.tiltCam = true;
        this.pointRef.theta -= Math.PI / 4;
      } else if (event.keyCode == 39 && (event.ctrlKey || event.shiftKey)) {
        console.log("rotate right");
        this.tiltCam = true;
        this.pointRef.theta += Math.PI / 4;
      }

      // 2. camera tilt
      if (event.keyCode == 38 && (event.ctrlKey || event.shiftKey) && this.pointRef.phi < -Math.PI / 3) {
        console.log("tilt up");
        this.tiltCam = true;
        this.pointRef.phi += Math.PI / 6;
      } else if (event.keyCode == 40 && (event.ctrlKey || event.shiftKey) && this.pointRef.phi > (-Math.PI * 3) / 4) {
        console.log("tilt down");
        this.tiltCam = true;
        this.pointRef.phi -= Math.PI / 6;
      }

      // 3. select assets 1-currentModels.length
      if (event.keyCode >= 48 && event.keyCode <= 54 && event.ctrlKey == false && event.shiftKey == false) {
        console.log(event.shiftKey);
        switch (event.keyCode) {
          case 48: // 0 is orginal point
            // reset camera angle and position
            this.textBox.innerText = `nothing is selected`;
            break;

          case 49: // object 1
            this.controlPanel.currentSelected = 0;
            this.select();
            break;

          case 50: // object 2
            this.controlPanel.currentSelected = 1;
            this.select();
            break;

          case 51: // object 3
            this.controlPanel.currentSelected = 2;
            this.select();
            break;

          case 52: // object 4
            this.controlPanel.currentSelected = 3;
            this.select();
            break;
        }
      }

      // 4. move switch chambers
      // TO BE COMPLETE
      if (event.keyCode >= 48 && event.keyCode <= 54 && (event.ctrlKey || event.shiftKey)) {
        switch (event.keyCode) {
          case 49: // chamber 1
            this.moveToChamber(1);
            this.pointRef.radius = 10;
            break;

          case 50: // chamber 2
            this.moveToChamber(2);
            this.pointRef.radius = 100;
            break;

          case 51: // chamber 3
            this.moveToChamber(3);
            this.pointRef.radius = 200;
            break;

          case 52: // chamber 4
            this.moveToChamber(4);
            this.pointRef.radius = 300;
            break;
        }
      }
    }

    //
    // ** object navigation**
    //

    if (this.activated && this.controlPanel.VIEWmode == true) {
      if (event.shiftKey == false) {
        //Move Around Object Navigation
        switch (event.keyCode) {
          case 8: // del button
            // reset camera angle and position
            this.moveBackToCenter();
            this.textBox.innerText = `moved back to center`;
            break;

          case 27: // escape
            this.moveBackToCenter();
            this.textBox.innerText = `moved back to center`;
            break;

          case 37 /*Left*/:
            this.rotateLeftObject();
            break;

          case 39 /*Right*/:
            this.rotateRightObject();
            break;
        }
      }

      if (event.keyCode == 38 && (event.ctrlKey || event.shiftKey) && this.point.y < this.controlPanel.INTERSECTED.position.y + Math.PI / 3) {
        // up
        this.point.y += Math.PI / 6;
      } else if (event.keyCode == 40 && (event.ctrlKey || event.shiftKey) && this.point.y > this.controlPanel.INTERSECTED.position.y - Math.PI / 4) {
        // down
        this.point.y -= Math.PI / 6;
      }

      if (event.keyCode == 37 && (event.ctrlKey || event.shiftKey)) {
        // right
        if (this.point.z < 0 && this.point.x > this.controlPanel.INTERSECTED.position.x - Math.PI / 3) {
          this.point.x -= Math.PI / 4;
        } else if (this.point.z > 0 && this.point.x < this.controlPanel.INTERSECTED.position.x + Math.PI / 3) {
          // object placed on +z axis
          this.point.x += Math.PI / 4;
        }
      } else if (event.keyCode == 39 && (event.ctrlKey || event.shiftKey)) {
        // left
        if (this.point.z < 0 && this.point.x < this.controlPanel.INTERSECTED.position.x + Math.PI / 3) {
          this.point.x += Math.PI / 4;
        } else if (this.point.z > 0 && this.point.x > this.controlPanel.INTERSECTED.position.x - Math.PI / 3) {
          // object placed on +z axis
          this.point.x -= Math.PI / 4;
        }
      }
    }
  }

  rotateRightObject() {
    this.controlPanel.INTERSECTED.theta -= Math.PI / 4;
    console.log(this.currentModels[this.controlPanel.currentSelected].theta);
  }

  rotateLeftObject() {
    this.controlPanel.INTERSECTED.theta += Math.PI / 4;
    console.log(this.currentModels[this.controlPanel.currentSelected].theta);
  }

  select() {
    this.controlPanel.INTERSECTED = Object.assign({}, this.currentModels[this.controlPanel.currentSelected]);
    this.textBox.innerText = `${this.controlPanel.INTERSECTED.name} is selected`;
    this.animation_ZoomToObject(this.controlPanel.currentSelected);
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(100, 100, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#131528", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, -0.01, 0);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);

    this.chamberFloor = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
    this.chamber_mat = new THREE.MeshBasicMaterial({ color: "#f8f8ff", side: THREE.DoubleSide });
    this.chamber1 = new THREE.Mesh(this.chamberFloor, this.chamber_mat);
    this.chamber1.position.set(0, 0.01, -20);
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
    this.light.position.set(0, 50, 0.866);

    const targetObject = new THREE.Object3D();
    targetObject.position.set(-0.5, 0, 0);
    this.scene.add(targetObject);
    this.light_vase.target = targetObject;

    this.scene.add(this.light);
    this.scene.add(this.light_vase);
    this.scene.add(this.ambient);
  }

  addSound() {
    this.chamber1Sound.forEach((info) => {
      const sound = new THREE.PositionalAudio(this.listener);
      audioLoader.load(info.path, function (buffer) {
        sound.setBuffer(buffer);
        sound.setRefDistance(1.5);
        sound.setDirectionalCone(180, 230, 0.1);
      });
      info.sound = sound;
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      const sphere = new THREE.Mesh( geometry, material );
      sphere.position.copy(info.position);
      sphere.visible = false;
      sphere.add(sound);
      this.scene.add(sphere);
    })

  }

  setActivated() {
    this.activated = true;

    // this.chamber1Sound.forEach((info) => {
    //   info.sound.play();
    // })
  }

  animation_ZoomToObject(index) {
    this.controlPanel.VIEWmode = true;
    this.tiltCam = false;
    gsap.to(this.point, {
      duration: 3,
      ease: "power1.out",
      x: this.controlPanel.INTERSECTED.position.x,
      y: this.controlPanel.INTERSECTED.position.y,
      z: this.controlPanel.INTERSECTED.position.z,
    });
    this.chamber1Sound[index].sound.play();

    if (this.controlPanel.initialMove) {
      gsap.fromTo(
        this.camera.position,
        {
          x: this.ogPos[0].x,
          y: this.ogPos[0].y,
          z: this.ogPos[0].z,
        },
        {
          duration: 3,
          ease: "power1.out",
          x: this.controlPanel.INTERSECTED.position.x + this.controlPanel.INTERSECTED.stare_dist * Math.cos(this.controlPanel.INTERSECTED.theta),
          y: this.controlPanel.INTERSECTED.position.y,
          z: this.controlPanel.INTERSECTED.position.z + this.controlPanel.INTERSECTED.stare_dist * Math.sin(this.controlPanel.INTERSECTED.theta),
          onComplete: () => {
            this.controlPanel.initialMove = false;
          },
        }
      );
    }
  }

  moveBackToCenter() {
    this.controlPanel.VIEWmode = false;
    this.controlPanel.initialMove = true;
    this.tiltCam = true;
    this.clearTarget();
    gsap.to(this.point, {
      duration: 2,
      x: this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta),
      y: this.pointRef.radius * Math.cos(this.pointRef.phi),
      z: this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta),
    });
    if (this.chamber == 1) {
      gsap.fromTo(
        this.camera.position,
        { duration: 2, x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
        {
          duration: 2,
          x: this.ogPos[this.chamber - 1].x,
          y: this.ogPos[this.chamber - 1].y,
          z: this.ogPos[this.chamber - 1].z,
          onUpdate: () => {
            // this.camera.lookAt(this.point.x, this.point.y, this.point.z);
          },
        }
      );
    }
  }

  moveToChamber(num) {
    if (num != this.chamber) {
      this.textBox.innerText = `moving to chamber ${num}`;
      console.log("move to " + num + " chamber.");
      this.chamber = num;
      console.log(this.ogPos[this.chamber - 1]);

      gsap.fromTo(
        this.camera.position,
        { x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
        {
          duration: 10,
          x: this.ogPos[this.chamber - 1].x,
          y: this.ogPos[this.chamber - 1].y,
          z: this.ogPos[this.chamber - 1].z,
          onUpdate: () => {
            // this.camera.lookAt(this.point.x, this.point.y, this.point.z);
          },
        }
      );
    } else {
      this.textBox.innerText = `you are already in chamber ${num}`;
    }
  }

  clearTarget() {
    this.controlPanel.theta = Math.PI * 2;
    this.pointRef.phi = -Math.PI / 2;
    this.pointRef.theta = Math.PI / 2;
  }

  render() {
    if (this.controlPanel.VIEWmode == true && this.controlPanel.initialMove == false) {
      this.camera.position.x = this.controlPanel.INTERSECTED.position.x + this.controlPanel.INTERSECTED.stare_dist * Math.cos(this.controlPanel.INTERSECTED.theta);
      this.camera.position.y = this.controlPanel.INTERSECTED.position.y;
      this.camera.position.z = this.controlPanel.INTERSECTED.position.z + this.controlPanel.INTERSECTED.stare_dist * Math.sin(this.controlPanel.INTERSECTED.theta);
    }

    if (this.controlPanel.VIEWmode == false && this.tiltCam == true) {
      this.point.x = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta);
      this.point.y = this.pointRef.radius * Math.cos(this.pointRef.phi);
      this.point.z = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta);
    }

    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  }
}

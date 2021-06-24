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

    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 500);
    this.camera.position.set(0, 1, 0);
    this.camera.rotation.order = "YXZ";
    this.previous = null;

    this.tiltCam = false;

    this.helper = new THREE.CameraHelper(this.camera);
    this.scene.add(this.helper);

    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    this.echoSound = new THREE.Audio(this.listener);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x2d2d2d);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.setAttribute("role", "application");
    this.container.appendChild(this.renderer.domElement);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.chamber = 1;
    this.inChamber = true;
    this.currentModels = [];
    this.activated = false;
    this.loaded = false;
    this.keyPressed = false;
    this.orbiting = false;

    this.ogPos = [
      { name: "chamber1", x: 0, y: 1, z: 0 },
      { name: "chamber2", x: 0, y: 1, z: -20 },
      { name: "chamber3", x: 0, y: 1, z: -40 },
      { name: "chamber4", x: 0, y: 1, z: -90 },
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

    this.orientation = {
      vertical: 0,
      horizontal: 0,
    };

    // this.gui = new GUI();

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
      this.loaded = true;
      this.render();
    }

    //chamber 1 model
    if (this.chamber == 1 && this.inChamber == true) {
      this.currentModels = this.chamber1;
      for (let model of this.chamber1) {
        this.loadThisModel(model, "room 1");
      }

      for (let model of this.chamber2) {
        this.loadThisModel(model, "room 2");
      }
    }

    // for (let model of this.chamber1) {
    //   this.loadThisModel(model);
    // }

    // for (let model of this.chamber2) {
    //   this.loadThisModel(model);
    // }

    console.log(this.currentModels);
  }

  load2() {
    if (this.chamber == 2 && this.inChamber == true) {
      this.currentModels = this.chamber2;
      for (let model of this.chamber2) {
        this.loadThisModel(model);
      }
    }
  }

  loadThisModel(model, room_name) {
    this.loader.load(
      model.path,
      (gltf) => {
        model.mesh = gltf.scene;
        this.scene.add(model.mesh);

        model.box = new THREE.Box3().setFromObject(model.mesh);
        model.mesh.scale.set(model.scale, model.scale, model.scale);
        model.mesh.position.set(model.position.x + model.offset.x, (model.box.getSize(new THREE.Vector3()).y * model.scale) / 2 + model.offset.y, model.position.z + model.offset.z);
        model.mesh.rotation.set(model.rotation.x, model.rotation.y, model.rotation.z);
      },
      (xhr) => {
        // while loading:
        console.log(room_name + " models are " + (xhr.loaded / xhr.total) * 100 + "% loaded");
      }
    );
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
    //
    // ** ORIGIN-ONLY Camera Rotation **
    //

    if (this.activated && this.loaded == true && this.controlPanel.VIEWmode == false) {
      // 1. camera rotation: left and right at ORIGIN
      if (event.keyCode == 37 && event.shiftKey) {
        //
        console.log("@origin: rotate left");
        this.tiltCam = true;
        this.pointRef.theta -= Math.PI / 4;
      } else if (event.keyCode == 39 && event.shiftKey) {
        //
        console.log("@origin: rotate right");
        this.tiltCam = true;
        this.pointRef.theta += Math.PI / 4;
      }

      if (event.keyCode == 38 && event.shiftKey && this.pointRef.phi < -1.5) {
        //
        console.log("@origin: tilt up", this.pointRef.phi);
        this.tiltCam = true;
        this.pointRef.phi += Math.PI / 6;
      } else if (event.keyCode == 40 && event.shiftKey && this.pointRef.phi > -2) {
        //
        console.log("@origin: tilt down", this.pointRef.phi);
        this.tiltCam = true;
        this.pointRef.phi -= Math.PI / 6;
      }
    }

    // *******************************************************
    // ************* OBJECT-ONLY Camera Rotation *************
    // *******************************************************

    if (this.activated && this.loaded == true && this.controlPanel.VIEWmode == true) {
      //
      // ** LEFT & RIGHT **
      //

      if (event.keyCode == 37 && event.shiftKey && this.orientation.horizontal > -1) {
        // left
        console.log("@object: rotate left");
        this.tiltCam = true;
        this.pointRef.theta -= Math.PI / 4;
        this.orientation.horizontal -= 1;
      } else if (event.keyCode == 39 && event.shiftKey && this.orientation.horizontal < 1) {
        // right
        console.log("@object: rotate right");
        this.tiltCam = true;
        this.pointRef.theta += Math.PI / 4;
        this.orientation.horizontal += 1;
      }

      //
      // ** UP & DOWN **
      //

      if (event.keyCode == 38 && event.shiftKey && this.pointRef.phi < -0.6 && this.orientation.vertical < 1) {
        // up
        console.log("@object: tilt up", this.pointRef.phi);
        this.tiltCam = true;
        this.pointRef.phi += Math.PI / 6;
        this.orientation.vertical += 1;
      } else if (event.keyCode == 40 && event.shiftKey && this.orientation.vertical > -1) {
        // down
        console.log("@object: tilt down", this.pointRef.phi);
        this.tiltCam = true;
        this.pointRef.phi -= Math.PI / 6;
        this.orientation.vertical -= 1;
      }

      //
      // ** ORBIT MOVEMENT **
      //

      if (event.shiftKey == false) {
        //Move Around Object Navigation
        switch (event.keyCode) {
          case 48: // 0
            // reset camera angle and position
            this.moveBackToCenter();
            this.textBox.innerText = `moved back to center`;
            break;

          case 8: // del button
            // reset camera angle and position
            this.moveBackToCenter();
            this.textBox.innerText = `moved back to center`;
            break;

          case 37 /*Left*/:
            // rotate AROUND object
            this.orbiting = true;
            this.rotateLeftObject();
            break;

          case 39 /*Right*/:
            // rotate AROUND object
            this.orbiting = true;
            this.rotateRightObject();
            break;
        }
      }

      //
      // ** PLAY ECHO SOUND W/ SPACE KEY **
      //
      if (event.keyCode === 32) {
        // 32 space bar
        let chamber = this.chamber;
        let object = this.controlPanel.currentSelected;
        let orbit = ((this.controlPanel.INTERSECTED.theta / Math.PI) * 180) / 45 - 1;
        // let verticalAngle = (this.point.y / Math.PI) * 180;
        // let horizontal = (this.point.x / Math.PI) * 180;
        let verticalAngle = (this.pointRef.phi / Math.PI) * 180; //以这个为基数
        let horizontal = (this.pointRef.theta / Math.PI) * 180; //以这个为基数

        console.log("orbit " + orbit + " vertical " + verticalAngle + "horizontal " + horizontal);
        let echoPath = "../Sounds/Chamber1/Object3/0_-45_-30.mp3";
        audioLoader.load(echoPath, (buffer) => {
          this.echoSound.setBuffer(buffer);
        });
        let targetSound = this.chamber1Sound[object];
        gsap.to(targetSound, {
          duration: 0.5,
          ease: "power1.out",
          volume: 0,
          onComplete: () => {
            this.echoSound.play();
            gsap.to(targetSound, {
              duration: 1,
              ease: "power1.out",
              volume: 1,
            });
          },
        });
      }
    }

    //
    // ** GLOBAL KEY BEHAVIORS **
    //

    if (this.activated && this.loaded == true) {
      //
      // ** SELECT MODELS **
      //

      if (event.keyCode >= 48 && event.keyCode <= 54 && event.ctrlKey == false && event.shiftKey == false) {
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

      //
      // ** SELECT CHAMBERS **
      //

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
  }

  rotateRightObject() {
    this.controlPanel.INTERSECTED.theta -= Math.PI / 4;
    gsap.to(this.pointRef, 4.5, {
      theta: this.controlPanel.INTERSECTED.theta,
      onComplete: () => {
        this.orbiting = false;
        console.log("unlocked");
        this.orientation.horizontal = 0;
        this.orientation.vertical = 0;
      },
    });
  }

  rotateLeftObject() {
    this.controlPanel.INTERSECTED.theta += Math.PI / 4;
    gsap.to(this.pointRef, 4.5, {
      theta: this.controlPanel.INTERSECTED.theta,
      onComplete: () => {
        this.orbiting = false;
        this.orientation.horizontal = 0;
        this.orientation.vertical = 0;
        console.log("unlocked");
      },
    });
  }

  select() {
    this.controlPanel.INTERSECTED = Object.assign({}, this.currentModels[this.controlPanel.currentSelected]);
    this.textBox.innerText = `${this.controlPanel.INTERSECTED.name} is selected`;
    this.animation_ZoomToObject(this.controlPanel.currentSelected);
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(100, 150, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#131528", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, -0.01, -50);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);

    // this.chamberFloor = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
    // this.chamber_mat = new THREE.MeshBasicMaterial({ color: "#f8f8ff", side: THREE.DoubleSide });
    // this.chamber1 = new THREE.Mesh(this.chamberFloor, this.chamber_mat);
    // this.chamber1.position.set(0, 0.01, -20);
    // this.chamber1.rotation.set(Math.PI / 2, 0, 0);
    // this.scene.add(this.chamber1);

    // this.grid = new THREE.GridHelper(100, 300);
    this.scene.add(this.grid);
  }

  addLight() {
    this.color = 0xffffff;
    this.intensity = 1;
    this.light = new THREE.PointLight(this.color, this.intensity);
    this.light_1_2 = new THREE.PointLight(this.color, this.intensity, 20);
    this.ambient = new THREE.AmbientLight(0x404040, this.intensity);
    this.light.position.set(2, 3, 0.866);
    this.light_1_2.position.set(2, 3, 3);

    this.scene.add(this.light);
    this.scene.add(this.light_1_2);
    this.scene.add(this.ambient);
  }

  addSound() {
    this.chamber1Sound.forEach((info) => {
      const sound = new THREE.PositionalAudio(this.listener);
      audioLoader.load(info.path, function (buffer) {
        sound.setBuffer(buffer);
        sound.setRefDistance(0.05);
        sound.setLoop(true);
        sound.setDistanceModel("linear");
        sound.setRolloffFactor(1);
        sound.setVolume(info.volume);
        sound.setDirectionalCone(180, 230, 0.1);
        sound.play();
      });
      info.sound = sound;
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(info.position);
      sphere.visible = true;
      sphere.add(sound);
      info.sphere = sphere;
      this.scene.add(sphere);
    });
  }

  setActivated() {
    this.activated = true;
  }

  animation_ZoomToObject(index) {
    this.controlPanel.VIEWmode = true;
    this.tiltCam = false;
    this.pointRef.theta = this.controlPanel.INTERSECTED.theta;

    gsap.to(this.point, {
      duration: 3,
      ease: "power1.out",
      x: this.controlPanel.INTERSECTED.position.x,
      y: this.controlPanel.INTERSECTED.position.y,
      z: this.controlPanel.INTERSECTED.position.z,
    });
    let targetSound = this.chamber1Sound[index];
    gsap.to(targetSound, {
      duration: 3,
      ease: "power1.out",
      volume: 1,
    });
    if (this.previous !== null) {
      let targetSound = this.chamber1Sound[this.previous];
      gsap.to(targetSound, {
        duration: 3,
        ease: "power1.out",
        volume: 0,
      });
    }
    this.previous = index;

    if (this.controlPanel.initialMove) {
      gsap.fromTo(
        this.camera.position,
        {
          duration: 3,
          x: this.camera.position.x,
          y: this.camera.position.y,
          z: this.camera.position.z,
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
    gsap.fromTo(
      this.point,
      { duration: 5, x: this.point.x, y: this.point.y, z: this.point.z },
      {
        duration: 5,
        x: this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta),
        y: this.pointRef.radius * Math.cos(this.pointRef.phi),
        z: this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta),
        onComplete: () => {
          if (this.previous !== null) {
            let previous = this.chamber1Sound[this.previous].sound;
            previous.stop();
          }
          this.previous = null;
        },
      }
    );
    if (this.chamber == 1) {
      gsap.fromTo(
        this.camera.position,
        { duration: 5, x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
        {
          duration: 5,
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
        { duration: 10, x: this.camera.position.x, y: this.camera.position.y, z: this.camera.position.z },
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
      gsap.to(this.camera.position, 5, {
        x: this.controlPanel.INTERSECTED.position.x + this.controlPanel.INTERSECTED.stare_dist * Math.cos(this.controlPanel.INTERSECTED.theta),
        y: this.controlPanel.INTERSECTED.position.y,
        z: this.controlPanel.INTERSECTED.position.z + this.controlPanel.INTERSECTED.stare_dist * Math.sin(this.controlPanel.INTERSECTED.theta),
      });

      if (this.orbiting == true) {
        this.point.x = this.controlPanel.INTERSECTED.position.x;
        this.point.y = this.controlPanel.INTERSECTED.position.y;
        this.point.z = this.controlPanel.INTERSECTED.position.z;
      } else {
        this.point.x = this.controlPanel.INTERSECTED.position.x + this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta);
        this.point.y = this.controlPanel.INTERSECTED.position.y + this.pointRef.radius * Math.cos(this.pointRef.phi);
        this.point.z = this.controlPanel.INTERSECTED.position.z + this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta);
      }
    }

    if (this.controlPanel.VIEWmode == false && this.tiltCam == true) {
      this.point.x = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta);
      this.point.y = this.pointRef.radius * Math.cos(this.pointRef.phi);
      this.point.z = this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta);
      this.tiltCam = false;
    }

    if (this.activated) {
      this.chamber1Sound.forEach((file) => {
        file.sound.setVolume(file.volume);
      });
    }

    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  }
}

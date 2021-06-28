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
    this.camera.rotation.order = "YXZ";
    this.previous = null;

    this.tiltCam = false;

    // this.helper = new THREE.CameraHelper(this.camera);
    // this.scene.add(this.helper);

    this.listener = new THREE.AudioListener();
    this.camera.add(this.listener);
    this.echoSound = new THREE.Audio(this.listener);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0x000000);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.setAttribute("role", "application");
    this.container.appendChild(this.renderer.domElement);

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // CHANGE THIS NUMBER TO START IN THAT CHAMBER
    this.chamber = 1;
    //
    this.inChamber = true;
    this.currentModels = [];
    this.activated = false;
    this.loaded = false;
    this.keyPressed = false;
    this.orbiting = false;

    this.lights = new THREE.Group();

    this.airplaneView = false;

    this.ogPos = [
      { name: "chamber1", x: 0, y: 1, z: -0 },
      { name: "chamber2", x: 0, y: 1, z: -19.3 },
      { name: "chamber3", x: 0, y: 1, z: -38.6 },
      { name: "chamber4", x: 0, y: 1, z: -90 },
    ];
    this.camera.position.set(this.ogPos[this.chamber - 1].x, this.ogPos[this.chamber - 1].y, this.ogPos[this.chamber - 1].z);

    this.rooms = models[4].data;
    this.chambers = [{ chamber1: models[0].data, chamber2: models[1].data, chamber3: models[2].data, chamber4: models[3].data }];
    this.chamber1Sound = models[0].soundsFiles;

    this.controlPanel = {
      theta: Math.PI / 2,
      currentSelected: 1,
      VIEWmode: false,
      initialMove: true,
      INTERSECTED: { name: "origin", path: null, mesh: null, box: null, position: { x: 0, y: 0.2, z: 0 } },
    };

    this.directionCounter = {
      vertical: 0,
      orbit: 0,
      horizontal: 0,
    };

    this.point = {
      x: -Math.PI / 2,
      y: Math.PI * 2,
      z: -10,
    };

    this.orientation = {
      vertical: 0,
      horizontal: 0,
      shuttle: 0,
    };

    // this.gui = new GUI();

    this.pointRef = {
      radius: 1000,
      phi: -Math.PI / 2,
      theta: Math.PI / 2,
    };
    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.textBox = document.querySelector("#selected");

    this.loadModels();
    this.resize();
    this.setupResize();
    this.setupKeys();
    // this.addFloor();
    this.addLight();
    this.addSound();

    //this.setupGUI();
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
          console.log("chambers " + (xhr.loaded / xhr.total) * 100 + "% loaded");
        }
      );
      this.loaded = true;
      this.render();
    }

    // ROOM 1 MODELS
    for (let model of this.chambers[0]["chamber1"]) {
      this.loadThisModel(model, "room 1");
    }

    // // ROOM 2 MODELS
    for (let model of this.chambers[0]["chamber2"]) {
      this.loadThisModel(model, "room 2");
    }

    // // ROOM 3 MODELS
    for (let model of this.chambers[0]["chamber3"]) {
      this.loadThisModel(model, "room 3");
    }

    // // ROOM 4 MODELS
    for (let model of this.chambers[0]["chamber4"]) {
      this.loadThisModel(model, "room 4");
    }

    const chamberName = `chamber${this.chamber}`;
    this.currentModels = this.chambers[0][chamberName];
    console.log(this.currentModels);
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
        console.log(model.name, model.box.getSize());
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
    event.preventDefault();

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

        //sound:
        this.directionCounter.horizontal -= 1;
      } else if (event.keyCode == 39 && event.shiftKey && this.orientation.horizontal < 1) {
        // right
        console.log("@object: rotate right");
        this.tiltCam = true;
        this.pointRef.theta += Math.PI / 4;
        this.orientation.horizontal += 1;

        //sound:
        this.directionCounter.horizontal += 1;
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
        this.directionCounter.vertical += 1;
      } else if (event.keyCode == 40 && event.shiftKey && this.orientation.vertical > -1) {
        // down
        console.log("@object: tilt down", this.pointRef.phi);
        this.tiltCam = true;
        this.pointRef.phi -= Math.PI / 6;
        this.orientation.vertical -= 1;
        this.directionCounter.vertical -= 1;
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
            this.rotateLeftObject();
            break;

          case 39 /*Right*/:
            // rotate AROUND object
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
        let object = this.controlPanel.currentSelected + 1;
        // let theta = this.controlPanel.INTERSECTED.theta;
        // //console.log(theta);
        // //console.log(theta / Math.PI * 180)
        // if(theta < 0){
        //   console.log(Math.ceil(-theta / (Math.PI * 2)));
        //   theta += Math.ceil(-theta / (Math.PI * 2)) * Math.PI * 2;
        // }
        // //console.log(theta / Math.PI * 180);
        // theta = theta > Math.PI * 2 ? theta - (Math.floor(theta / (Math.PI * 2)) * Math.PI * 2) : theta;
        //console.log(theta / Math.PI * 180);
        let orbit = this.directionCounter.orbit;
        //if(orbit > 7) orbit -= 1;
        // let verticalAngle = (this.point.y / Math.PI) * 180;
        // let horizontal = (this.point.x / Math.PI) * 180;
        let verticalAngle = this.directionCounter.vertical * 30; //以这个为基数
        let horizontal = this.directionCounter.horizontal * 45; //以这个为基数

        //console.log("orbit " + orbit + " vertical " + verticalAngle + "horizontal " + horizontal);
        let echoPath = "../sounds/Chamber1/Object" + object + "/" + orbit + "_" + horizontal + "_" + verticalAngle + ".mp3";
        //console.log(echoPath);

        audioLoader.load(echoPath, (buffer) => {
          this.echoSound.setBuffer(buffer);

          let targetSound = this.chamber1Sound[object - 1];
          gsap.to(targetSound, {
            duration: 3,
            ease: "power1.out",
            volume: 0,
            onComplete: () => {
              this.echoSound.play();
              gsap.fromTo(
                targetSound,
                { volume: 0 },
                {
                  delay: 1,
                  duration: 3,
                  ease: "power1.out",
                  volume: 1,
                  onUpdate: function () {
                    targetSound.sound.setVolume(targetSound.volume);
                  },
                }
              );
            },
            onUpdate: function () {
              targetSound.sound.setVolume(targetSound.volume);
            },
          });
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
            break;

          case 50: // chamber 2
            this.moveToChamber(2);
            break;

          case 51: // chamber 3
            this.moveToChamber(3);
            break;

          case 52: // chamber 4
            this.moveToChamber(4);
            break;
        }
      }
    }
  }

  rotateRightObject() {
    if (this.controlPanel.INTERSECTED.name == "shuttle") {
      if (this.orientation.shuttle < 2) {
        this.controlPanel.INTERSECTED.position.z -= 10;
        this.orientation.shuttle += 1;
      }
    } else {
      this.controlPanel.INTERSECTED.theta -= Math.PI / 4;
      this.directionCounter.orbit += 1;
      if (this.directionCounter.orbit > 7) this.directionCounter.orbit = 0;

      console.log("hor: " + this.orientation.horizontal, "ver: " + this.orientation.vertical);
      const diff = this.pointRef.theta - Math.PI / 4;
      gsap.to(this.pointRef, 0.5, {
        theta: diff,
      });
    }
  }

  rotateLeftObject() {
    if (this.controlPanel.INTERSECTED.name == "shuttle") {
      if (this.orientation.shuttle > -2) {
        this.controlPanel.INTERSECTED.position.z += 10;
        this.orientation.shuttle -= 1;
      }
    } else {
      this.controlPanel.INTERSECTED.theta += Math.PI / 4;
      this.directionCounter.orbit -= 1;
      if (this.directionCounter.orbit < 0) this.directionCounter.orbit = 7;

      console.log("hor: " + this.orientation.horizontal, "ver: " + this.orientation.vertical);
      const diff = this.pointRef.theta + Math.PI / 4;
      gsap.to(this.pointRef, 0.5, {
        theta: diff,
      });
    }
  }

  select() {
    this.controlPanel.INTERSECTED = Object.assign({}, this.currentModels[this.controlPanel.currentSelected]);
    console.log(this.controlPanel.INTERSECTED);
    if (Object.keys(this.controlPanel.INTERSECTED).length != 0) {
      this.textBox.innerText = `${this.controlPanel.INTERSECTED.name} is selected`;
      this.directionCounter = { vertical: 0, horizontal: 0, orbit: 0 };
      this.orientation = { horizontal: 0, vertical: 0, shuttle: 0 };
      this.animation_ZoomToObject(this.controlPanel.currentSelected);
    }
  }

  addFloor() {
    this.floor = new THREE.PlaneBufferGeometry(100, 150, 1, 1);
    this.material_floor = new THREE.MeshBasicMaterial({ color: "#131528", side: THREE.DoubleSide });
    this.floorObject = new THREE.Mesh(this.floor, this.material_floor);
    this.floorObject.position.set(0, -0.01, -50);
    this.floorObject.rotation.set(Math.PI / 2, 0, 0);
    this.floorObject.name = "floor";
    this.scene.add(this.floorObject);
  }

  addLight() {
    this.color = 0xffffff;
    this.intensity = 0.5;
    this.light_1 = new THREE.DirectionalLight(this.color, this.intensity);
    this.light_1.position.set(0, 3, 1);
    this.light_1.target.position.set(0, 0, 0);
    this.lights.add(this.light_1);
    this.lights.add(this.light_1.target);

    this.light_1_2 = new THREE.PointLight(this.color, this.intensity);
    this.light_1_2.position.set(2, 3, 3);
    this.lights.add(this.light_1_2);

    this.light_2 = new THREE.PointLight(this.color, this.intensity);
    this.light_2.position.set(0, 3, -19.5);
    this.lights.add(this.light_2);

    this.light_3 = new THREE.PointLight(this.color, this.intensity);
    this.light_3.position.set(0, 3, -38);
    this.lights.add(this.light_3);

    this.light_4 = new THREE.DirectionalLight(this.color, this.intensity);
    this.light_4.position.set(1, 2, -90);
    this.light_4.target.position.set(0, 0, -90);
    this.light_4_1 = new THREE.PointLight(this.color, this.intensity);
    this.light_4_1.position.set(-10, 3, -90);
    this.lights.add(this.light_4);
    this.lights.add(this.light_4.target);
    this.lights.add(this.light_4_1);

    this.ambient = new THREE.AmbientLight(0x404040, this.intensity);

    this.scene.add(this.lights);
    this.scene.add(this.ambient);
  }

  addSound() {
    this.chamber1Sound.forEach((info) => {
      const sound = new THREE.PositionalAudio(this.listener);
      audioLoader.load(info.path, function (buffer) {
        sound.setBuffer(buffer);
        sound.setRefDistance(0.05);
        sound.setLoop(true);
        sound.pause();
        sound.setDistanceModel("linear");
        sound.setRolloffFactor(1);
        sound.setVolume(0);
        sound.setDirectionalCone(180, 230, 0.1);
        // sound.play();
      });
      info.sound = sound;
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.copy(info.position);
      sphere.visible = false;
      sphere.add(sound);
      info.sphere = sphere;
      this.scene.add(sphere);
    });
  }

  setActivated() {
    this.activated = true;
    this.chamber1Sound.forEach((info) => {
      const sound = info.sound;
      sound.play();
      sound.setVolume(0);
    });
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
    console.log(index);
    //console.log(targetSound.sound);
    gsap.to(targetSound, {
      duration: 3,
      ease: "power1.out",
      volume: 1,
      onUpdate: () => {
        targetSound.sound.setVolume(targetSound.volume);
      },
    });
    if (this.previous !== null) {
      let targetSound = this.chamber1Sound[this.previous];
      gsap.to(targetSound, {
        duration: 3,
        ease: "power1.out",
        volume: 0,
        onUpdate: () => {
          targetSound.sound.setVolume(targetSound.volume);
        },
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

  moveToChamber(num) {
    if (num != this.chamber) {
      this.textBox.innerText = `moving to chamber ${num}`;
      console.log("move to " + num + " chamber.");
      this.chamber = num;
      const chamberName = `chamber${this.chamber}`;
      this.currentModels = this.chambers[0][chamberName];
      console.log(this.ogPos[this.chamber - 1].x, this.ogPos[this.chamber - 1].y, this.ogPos[this.chamber - 1].z);

      gsap.to(this.camera.position, {
        duration: 10,
        x: this.ogPos[this.chamber - 1].x,
        y: this.ogPos[this.chamber - 1].y,
        z: this.ogPos[this.chamber - 1].z,
      });
    } else {
      this.textBox.innerText = `you are already in chamber ${num}`;
    }
  }

  clearTarget() {
    this.controlPanel.theta = Math.PI * 2;
    this.pointRef.phi = -Math.PI / 2;
    this.pointRef.theta = Math.PI / 2;

    this.orientation.horizontal = 0;
    this.orientation.vertical = 0;
  }

  render() {
    if (this.controlPanel.VIEWmode == true && this.controlPanel.initialMove == false) {
      gsap.to(this.camera.position, 5, {
        x: this.controlPanel.INTERSECTED.position.x + this.controlPanel.INTERSECTED.stare_dist * Math.cos(this.controlPanel.INTERSECTED.theta),
        y: this.controlPanel.INTERSECTED.position.y,
        z: this.controlPanel.INTERSECTED.position.z + this.controlPanel.INTERSECTED.stare_dist * Math.sin(this.controlPanel.INTERSECTED.theta),
      });
    }

    if (this.controlPanel.VIEWmode == true) {
      gsap.to(this.point, 1, {
        x: this.controlPanel.INTERSECTED.position.x + this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta),
        y: this.controlPanel.INTERSECTED.position.y + this.pointRef.radius * Math.cos(this.pointRef.phi),
        z: this.controlPanel.INTERSECTED.position.z + this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta),
      });
    }

    if (this.controlPanel.VIEWmode == false) {
      gsap.to(this.point, 1, {
        x: this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.cos(this.pointRef.theta),
        y: this.pointRef.radius * Math.cos(this.pointRef.phi),
        z: this.pointRef.radius * Math.sin(this.pointRef.phi) * Math.sin(this.pointRef.theta),
      });
    }

    // if (this.activated) {
    //   this.chamber1Sound.forEach((file) => {
    //     file.sound.setVolume(file.volume);
    //   });
    // }

    this.camera.lookAt(this.point.x, this.point.y, this.point.z);

    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.render.bind(this));
  }
}

import * as THREE from "three";
import gsap from "gsap";
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
    this.listener = new THREE.AudioListener();
    this.camera.add( this.listener );


    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor(0xf0d281);
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.setAttribute('role','application');
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1;

    this.chamber = 1;
    this.inChamber = true;
    this.currentModels = [];
    this.activated = false;

    this.chamber1 = [
      { name: "vase", path: "../models/vase/vase-f1991-150k-4096.gltf", mesh: null, box: null, position: { x: -2, y: null, z: -2 } },
      { name: "mammoth", path: "../models/mammoth/woolly-mammoth-100k-4096.gltf", mesh: null, box: null, position: { x: 2, y: null, z: -2 } },
    ];

    this.controlPanel = {
      theta: Math.PI,
      distance: 2,
      lookAtPoint: { x: 0, y: 0, z: 1.5 },
      currentSelected: 1,
      previousSelected: 0,
      VIEWmode: false,
      INTERSECTED: null,
    };

    this.textBox = document.querySelector("#selected");

    this.loadModels();
    this.resize();
    this.setupResize();
    this.setupKeys();
    this.addWorldObjects();
    this.addSound();
    this.render();
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
    // this.loader.load(this.vasePath, (gltf) => {
    //   this.vaseMesh = gltf.scene;
    //   this.scene.add(this.vaseMesh);

    //   this.boxVase = new THREE.Box3().setFromObject(this.vaseMesh);
    //   this.vaseMesh.position.set(-2, this.boxVase.getSize().y / 2, -2);
    // });
    // this.loader.load(this.mammothPath, (gltf) => {
    //   this.mammothMesh = gltf.scene;
    //   this.scene.add(this.mammothMesh);

    //   this.boxMammoth = new THREE.Box3().setFromObject(this.mammothMesh);
    //   this.mammothMesh.position.set(2, this.boxMammoth.getSize().y / 2, -2);
    // });
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
    if(this.activated){
      switch (event.keyCode) {
        case 37 /*Left*/:
          if (this.controlPanel.VIEWmode == false) {
            this.selectMinus();
          } else {
            this.rotateLeftObject();
          }

          break;

        case 39 /*Right*/:
          if (this.controlPanel.VIEWmode == false) {
            this.selectPlus();
          } else {
            this.rotateRightObject();
          }

          break;

          // case 13 /*Enter*/:
          //   if (this.controlPanel.VIEWmode == false) {
          //     this.enterAroundObject();
          //   }
          //   break;

        case 13 /*Enter*/:
          if (this.controlPanel.INTERSECTED != null) {
            this.textBox.innerText = `Going into View Mode of model ${this.controlPanel.INTERSECTED.name}`;
            this.controlPanel.VIEWmode = true;
          }

          break;

        case 27 /*Escape*/:
          if (this.controlPanel.VIEWmode == true) {
            this.exitAroundObject();
          }
          break;

        case 40 /*Down*/:
          if (this.controlPanel.distance < 10) {
            this.controlPanel.distance += 0.1;
          }
          break;

        case 38 /*Up*/:
          if (this.controlPanel.distance > 0.3) {
            this.controlPanel.distance -= 0.1;
          }
      }
    }

  }

  rotateRightObject() {
    this.controlPanel.theta += 0.1;
  }

  rotateLeftObject() {
    this.controlPanel.theta -= 0.1;
  }

  enterAroundObject() {
    this.controlPanel.VIEWmode = true;
    this.camera.position.z -= 0.2;
  }

  exitAroundObject() {
    this.controlPanel.VIEWmode = false;
    this.cameraAnimation();
    this.camera.position.z += 0.2;
  }

  selectMinus() {
    if (this.controlPanel.currentSelected > 0) {
      this.controlPanel.currentSelected--;
      this.select();
    }
  }

  selectPlus() {
    if (this.controlPanel.currentSelected < this.currentModels.length - 1) {
      this.controlPanel.currentSelected++;
      this.select();
    }
  }

  select() {
    this.controlPanel.INTERSECTED = this.currentModels[this.controlPanel.currentSelected];
    this.textBox.innerText = `${this.controlPanel.INTERSECTED.name} is selected`;
    this.cameraAnimation();
  }

  addWorldObjects() {
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

    this.chamberFloor = new THREE.PlaneBufferGeometry(10, 10, 1, 1);
    this.chamber_mat = new THREE.MeshBasicMaterial({ color: "#c45c54", side: THREE.DoubleSide });
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
    const sound = new THREE.PositionalAudio( this.listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '../../sounds/demo.wav', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setRefDistance( 1 );
      sound.setDirectionalCone( 180, 230, 0.1 );

    });
    this.sound = sound;


    const sphere = new THREE.SphereGeometry( 1, 32, 1 );
    const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );

    const mesh = new THREE.Mesh( sphere, material );
    this.scene.add( mesh );
    mesh.add( sound );
  }

  setActivated(){
    this.activated = true;
    this.sound.play();
  }

  cameraAnimation() {
    this.lookPos = this.controlPanel.INTERSECTED.position;
    this.coords = { x: this.camera.position.x, y: this.camera.position.y };
    gsap.to(this.coords, {
      x: this.lookPos.x,
      y: this.lookPos.y,
      onUpdate: () => {
        this.camera.lookAt(this.lookPos.x, 1, this.lookPos.z);
      },
    });
  }

  render() {
    if (this.controlPanel.VIEWmode == true) {
      this.camera.position.x = this.controlPanel.INTERSECTED.position.x + this.controlPanel.distance * Math.cos(this.controlPanel.theta);
      this.camera.position.z = this.controlPanel.INTERSECTED.position.z + this.controlPanel.distance * Math.sin(this.controlPanel.theta);
      this.camera.lookAt(this.controlPanel.INTERSECTED.position.x, 1, this.controlPanel.INTERSECTED.position.z);
    }

    this.renderer.render(this.scene, this.camera);
    this.time += 0.05;
    window.requestAnimationFrame(this.render.bind(this));
  }
}

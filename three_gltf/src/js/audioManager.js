import { models } from "./models";
import * as THREE from "three";
import gsap from "gsap";

const audioLoader = new THREE.AudioLoader();
class AudioManager {
  constructor() {
    this.onboardingAudio = [];
    this.stepAudio = [];
    this.hintAudio = [];
    this.leaveGallery = false;
    this.hintStopped = false;
    this.firstGalleryPlayed = false;
    this.objectLeft = false;
    this.hintLocked = false;
    this.echoLocked = false;

    for (let i = 1; i < 6; i++) {
      this.onboardingAudio[i] = new Audio("./assets/audio/Onboarding/" + i + ".mp3");
    }
    for (let i = 1; i < 15; i++) {
      let footPath = "./assets/audio/Footstep Sounds/" + i + ".mp3";
      this.stepAudio[i] = new Audio(footPath);
    }
    for (let i = 0; i < 7; i++) {
      let hintPath = "./assets/audio/hints/" + i + ".mp3";
      this.hintAudio[i] = new Audio(hintPath);
    }

    this.onBoardingOn = true;

    this.echoSound = null;
    this.stepSound = null;
    this.gallerySound = null;
    this.bgmSound = null;
    this.hint = null;

    this.objDes = new Audio();
    this.echoDes = new Audio();

    this.keyControlPlaying = false;
    this.galleryInturrpted = false;
    this.bgmInturrpted = false;

    //all positional sound
    this.chambersSound = [models[0].soundsFiles, models[1].soundsFiles, models[2].soundsFiles, models[3].soundsFiles];
    this.prompt = document.querySelector("#prompt");
    this.hint1 = document.querySelector("#hint-1");
    this.hint2 = document.querySelector("#hint-2");
    this.hint3 = document.querySelector("#hint-3");
  }

  playOnboardingFromBeginning(stage) {
    if (this.onBoardingOn) {
      let audio = this.onboardingAudio[stage];
      if (stage === 5) {
        this.playKeyControl();
      } else {
        audio.currentTime = 0;
        audio.play();
      }
    }
  }

  toggleOnboarding(stage) {
    this.onBoardingOn = !this.onBoardingOn;
    if (!this.onBoardingOn) {
      this.onboardingAudio[stage].pause();
    } else {
      this.onboardingAudio[stage].play();
    }
  }

  pauseAllOnboarding() {
    for (let i = 1; i < 6; i++) {
      this.onboardingAudio[i].pause();
    }
    this.keyControlPlaying = false;
  }

  initializeSpaceSound(scene, listener) {
    this.chambersSound.forEach((chamber) => {
      chamber.forEach((info) => {
        const sound = new THREE.PositionalAudio(listener);
        audioLoader.load(info.path, function (buffer) {
          sound.setBuffer(buffer);
          sound.setRefDistance(0.05);
          if (info.name !== "gallery") sound.setLoop(true);
          sound.setDistanceModel("linear");
          sound.setRolloffFactor(1);
          sound.setDirectionalCone(360, 360, 0.1);
        });
        info.sound = sound;
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.copy(info.position);
        sphere.visible = false;
        sphere.add(sound);
        info.sphere = sphere;
        scene.add(sphere);
      });
    });
  }

  playStepSound(num) {
    this.stepSound = this.stepAudio[num];
    this.stepSound.play();
  }

  playEchoSound(chamber, object, orbit, hor, ver) {
    this.echoLocked = true;
    var _this = this;
    let echoPath = "./assets/audio/sounds/Chamber" + chamber + "/Object" + object + "/" + orbit + "_" + hor + "_" + ver + ".mp3";
    this.echoSound = new Audio(echoPath);
    let target = null;
    if (!this.objDes.paused || !this.echoDes.paused) {
      target = !this.objDes.paused ? this.objDes : this.echoDes;
      target.pause();
    }
    let targetSound = this.chambersSound[chamber - 1][object - 1];
    gsap.to(targetSound, {
      duration: 0.5,
      ease: "power1.out",
      volume: 0,
      onComplete: () => {
        this.echoSound.play();
        gsap.fromTo(
          targetSound,
          { volume: 0 },
          {
            delay: 1,
            duration: 1,
            ease: "power1.out",
            volume: targetSound.max,
            onUpdate: function () {
              targetSound.sound.setVolume(targetSound.volume);
            },
            onComplete: function () {
              if (target) target.play();
              _this.echoLocked = false;
            },
          }
        );
      },
      onUpdate: function () {
        targetSound.sound.setVolume(targetSound.volume);
      },
    });
  }

  //E
  playEchoDes(chamber, object) {
    if(!this.echoLocked){
      if (!this.keyControlPlaying) {
        if (!this.echoDes.paused) {
          this.echoDes.pause();
        } else {
          let obj = "./assets/audio/echoDes/ThomasG" + chamber + "O" + object + ".mp3";
          this.echoDes = new Audio(obj);
          //fade out first
          if (!this.objDes.paused) {
            let target = this.objDes;
            gsap.to(target, {
              duration: 0.2,
              ease: "power1.out",
              volume: 0,
              onComplete: function () {
                target.pause();
              },
            });
          }
          this.echoDes.play();
        }
      }
    }

  }
  //D
  playObjDes(chamber, object) {
    if(!this.echoLocked){
      if (!this.keyControlPlaying) {
        if (!this.objDes.paused) {
          this.objDes.pause();
        } else {
          let obj = "./assets/audio/objDes/G" + chamber + "O" + object + ".mp3";
          this.objDes = new Audio(obj);
          if (!this.echoDes.paused) {
            let target = this.echoDes;
            gsap.to(target, {
              duration: 0.2,
              ease: "power1.out",
              volume: 0,
              onComplete: function () {
                target.pause();
              },
            });
          }
          this.objDes.play();
        }
      }
    }

  }

  leaveObject() {
    if (!this.objDes.paused) this.objDes.pause();
    if (!this.echoDes.paused) this.echoDes.pause();
  }

  setActivated(chamber) {
    this.chambersSound[chamber].forEach((info) => {
      const sound = info.sound;
      if (info.name === "gallery") {
        sound.offset = 0;
        sound.setVolume(1);
        sound.play();
        this.gallerySound = info;
      }
    });

    if (chamber === 0) this.firstGalleryPlayed = true;
  }

  zoomAudio(chamber, object) {
    this.leaveGallery = true;
    if (!this.hint.paused) this.hint.pause();
    let soundTL = gsap.timeline();
    if (this.bgmSound !== null) {
      let targetSound = this.bgmSound;
      soundTL.to(targetSound, {
        duration: 1,
        ease: "power1.out",
        volume: 0,
        onUpdate: () => {
          targetSound.sound.setVolume(targetSound.volume);
        },
        onComplete: () => {
          targetSound.sound.pause();
          let target = this.chambersSound[chamber - 1][object];
          target.sound.play();
          soundTL.to(target, {
            duration: 1,
            ease: "power1.out",
            volume: target.max,
            onUpdate: () => {
              target.sound.setVolume(target.volume);
            },
          });
          this.bgmSound = target;
        },
      });
    } else {
      let targetSound = this.chambersSound[chamber - 1][object];
      targetSound.sound.play();
      soundTL.to(targetSound, {
        duration: 2,
        ease: "power1.out",
        volume: targetSound.max,
        onUpdate: () => {
          targetSound.sound.setVolume(targetSound.volume);
        },
      });
      this.bgmSound = targetSound;
    }
  }

  fadeOutBGM() {
    let soundTL = gsap.timeline();
    let targetSound = this.bgmSound;
    if (targetSound) {
      soundTL.to(targetSound, {
        duration: 2,
        ease: "power1.out",
        volume: 0,
        onUpdate: () => {
          targetSound.sound.setVolume(targetSound.volume);
        },
        onComplete: () => {
          targetSound.sound.pause();
        },
      });
    }
  }

  fadeInBGM() {
    let soundTL = gsap.timeline();
    let targetSound = this.bgmSound;
    targetSound.sound.play();
    if (targetSound) {
      soundTL.to(targetSound, {
        duration: 2,
        ease: "power1.out",
        volume: targetSound.max,
        onUpdate: () => {
          targetSound.sound.setVolume(targetSound.volume);
        },
      });
    }
  }

  restorePositionalSound() {
    let keyControl = this.onboardingAudio[5];
    keyControl.pause();
    this.keyControlPlaying = false;
    if (this.galleryInturrpted) {
      this.gallerySound.sound.play();
      this.galleryInturrpted = false;
    }

    if (this.bgmInturrpted) {
      this.fadeInBGM();
      this.bgmInturrpted = false;
    }
  }

  playKeyControl() {
    //pause all audio
    this.leaveObject();
    //pause positional sound
    if (this.gallerySound && this.gallerySound.sound.isPlaying) {
      this.stopGallery();
      this.galleryInturrpted = true;
    }
    if (this.bgmSound && this.bgmSound.sound.isPlaying) {
      this.fadeOutBGM();
      this.bgmInturrpted = true;
    }

    let keyControl = this.onboardingAudio[5];
    keyControl.currentTime = 0;
    keyControl.play();
    this.keyControlPlaying = true;
  }

  stopGallery() {
    if (this.gallerySound) this.gallerySound.sound.stop();
  }

  playGallery(chamber) {
    if (this.gallerySound) this.stopGallery();
    let index = this.chambersSound[chamber - 1].length - 1;
    this.gallerySound = this.chambersSound[chamber - 1][index];
    this.gallerySound.sound.offset = 0;
    this.gallerySound.sound.play();
  }

  galleryHint() {
    this.hint = this.hintAudio[0];
    this.hintLocked = true;
    this.hint.play();
    this.prompt.style.display = "block";
    this.hint1.textContent = "Press ";
    this.hint2.textContent = "Number Key (1 to 4)  ";
    this.hint3.textContent = "to proceed to an museum object.";

    setTimeout(() => {
      if (!this.leaveGallery) {
        // let gallery = false;
        // if(this.gallerySound.sound.isPlaying){
        //     gallery = true;
        //     this.gallerySound.sound.pause();
        // }
        this.hint = this.hintAudio[1];
        this.hint.play();
        this.prompt.style.display = "block";
        this.hint1.textContent = "Or press ";
        this.hint2.textContent = "Shift + Number Key (1 to 4)  ";
        this.hint3.textContent = "to proceed to another gallery";

        // setTimeout(() => {
        //     if(gallery){
        //         this.gallerySound.sound.play();
        //     }
        // },17000)
      }
    }, 9000);

    //after finish
    setTimeout(() => {
      if (!this.leaveGallery && !this.hintStopped) {
        this.hintLocked = false;
        this.stopHint();
        this.setActivated(0);
      }
    }, 16500);
  }

  stopHint() {
    // if(this.hint && !this.hint.paused) {
    //     this.hint.pause();
    // }
    //if(!this.firstGalleryPlayed && !this.leaveGallery) this.setActivated(0);
    // this.hintStopped = true;
    this.prompt.style.display = "none";
  }

  objectHint() {
    if (!this.objectLeft) {
      this.hintLocked = true;
      this.hint = this.hintAudio[2];
      this.hint.play();
      this.prompt.style.display = "block";
      this.hint1.textContent = "Press  ";
      this.hint2.textContent = "Shift + Arrow Key  ";
      this.hint3.textContent = "to adjust viewing direction.";
    }

    setTimeout(() => {
      if (!this.objectLeft) {
        this.hint = this.hintAudio[3];
        this.prompt.style.display = "block";
        this.hint.play();
        this.hint1.textContent = "Or press ";
        this.hint2.textContent = "Left/Right ";
        this.hint3.textContent = "to orbit around the museum object.";
      }
    }, 12000);

    setTimeout(() => {
      this.hintLocked = false;
    }, 18000);
  }

  backHint() {
    let objPaused = false;
    let echoPaused = false;
    this.hintLocked = true;
    if (this.objDes && !this.objDes.paused) {
      objPaused = true;
      this.objDes.pause();
    }

    if (this.echoDes && !this.echoDes.paused) {
      echoPaused = true;
      this.echoDes.pause();
    }
    this.hint = this.hintAudio[4];
    this.hint.play();
    this.prompt.style.display = "block";
    this.hint1.textContent = "Press  ";
    this.hint2.textContent = "Shift 0 or backspace ";
    this.hint3.textContent = "to return to the center of the current gallery.";

    setTimeout(() => {
      if (objPaused) {
        this.objDes.play();
      }
      if (echoPaused) {
        this.echoDes.play();
      }
      this.hintLocked = false;
    }, 7000);
  }

  helpHint() {
    if (!this.keyControlPlaying) {
      this.hintLocked = true;
      this.hint = this.hintAudio[5];
      this.hint.currentTime = 0;
      this.hint.play();
      this.prompt.style.display = "block";
      this.hint1.textContent = "Press  ";
      this.hint2.textContent = "H or ? ";
      this.hint3.textContent = "to open Key Functionality Menu";
    }
    setTimeout(() => {
      this.hintLocked = false;
    }, 6000);
  }

  enterHint() {
    this.hint = this.hintAudio[6];
    this.hint.play();
  }

  isAudioPlaying() {
    if (this.echoSound || this.objDes || this.echoDes || this.stepSound || this.gallerySound || this.hint) {
      return this.checkPlaying(this.echoSound) || this.checkPlaying(this.objDes) || this.checkPlaying(this.echoDes) || this.checkPlaying(this.stepSound) || this.checkPlaying(this.hint) || (this.gallerySound && this.gallerySound.sound.isPlaying);
    } else {
      return false;
    }
  }

  checkPlaying(audio) {
    return audio && audio.currentTime > 0 && !audio.paused && !audio.ended;
  }
}

export const audioManager = new AudioManager();

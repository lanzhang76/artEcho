import { models } from "../data/models";
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

        for(let i = 1; i < 6; i++){
            this.onboardingAudio[i] = new Audio('../Onboarding/' + i + '.mp3');
        }
        for(let i = 1; i < 15; i++){
            let footPath = "../Footstep Sounds/" + i + ".mp3";
            this.stepAudio[i] = new Audio(footPath);
        }
        for(let i = 0; i < 6; i++){
            let hintPath = "../hints/" + i + ".mp3";
            this.hintAudio[i] = new Audio(hintPath);
        }

        this.onBoardingOn = false;

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
        this.chambersSound =[ models[0].soundsFiles, models[1].soundsFiles, models[2].soundsFiles, models[3].soundsFiles];
        this.prompt = document.querySelector('#prompt');
        this.hint1 = document.querySelector('#hint-1');
        this.hint2 = document.querySelector('#hint-2');
        this.hint3 = document.querySelector('#hint-3');
    }

    playOnboardingFromBeginning(stage){
        let audio = this.onboardingAudio[stage];
        if(stage === 5){
            this.playKeyControl();
        }else{
            audio.currentTime = 0;
            audio.play();
        }

    }

    toggleOnboarding(stage){
        this.onBoardingOn = !this.onBoardingOn;
        if(this.onBoardingOn){
            this.onboardingAudio[stage].pause();
        }else{
            this.onboardingAudio[stage].play();
        }
    }

    pauseAllOnboarding(){
        for(let i = 1; i < 6; i++){
            this.onboardingAudio[i].pause();
        }
        this.keyControlPlaying = false;
    }

    initializeSpaceSound(scene,listener){
        this.chambersSound.forEach((chamber) => {
            chamber.forEach((info) => {
                const sound = new THREE.PositionalAudio(listener);
                audioLoader.load(info.path, function (buffer) {
                    sound.setBuffer(buffer);
                    sound.setRefDistance(0.05);
                    if(info.name !== 'gallery') sound.setLoop(true);
                    sound.setDistanceModel("linear");
                    sound.setRolloffFactor(1);
                    sound.setDirectionalCone(180, 230, 0.1);
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
            })
        });
    }

    playStepSound(num){
        this.stepSound = this.stepAudio[num];
        this.stepSound.play();
    }

    playEchoSound(chamber,object,orbit,hor,ver){
        let echoPath = "../sounds/Chamber" + chamber +  "/Object" + object + "/" + orbit + "_" + hor + "_" + ver + ".mp3";
        this.echoSound = new Audio(echoPath);
        let targetSound = this.chambersSound[chamber - 1][object - 1];
        gsap.to(targetSound, {
            duration: 0.2,
            ease: "power1.out",
            volume: 0,
            onComplete: () => {
                this.echoSound.play();
                gsap.fromTo(
                    targetSound,
                    { volume: 0 },
                    {
                        delay: 1,
                        duration: 0.2,
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

        if(!this.objDes.paused || !this.echoDes.paused){
            let target = !this.objDes.paused ? this.objDes : this.echoDes;
            gsap.to(target,{
                duration: 0.2,
                ease: "power1.out",
                volume:0,
                onComplete: function (){
                    gsap.fromTo(
                        target,
                        { volume: 0 },
                        {
                            delay: 1,
                            duration: 0.2,
                            ease: "power1.out",
                            volume: 1,
                        }
                    );
                }
            })
        }
    }

    //E
    playEchoDes(chamber,object){
        if(!this.keyControlPlaying){
            if(!this.echoDes.paused){
                this.echoDes.pause();
            } else {
                let obj = "../echoDes/ThomasG" + chamber + 'O' + object + '.mp3';
                this.echoDes = new Audio(obj);
                //fade out first
                if(!this.objDes.paused){
                    let target = this.objDes;
                    gsap.to(target,{
                        duration: 0.2,
                        ease: "power1.out",
                        volume:0,
                        onComplete: function (){
                            target.pause();
                        }
                    })
                }
                this.echoDes.play();
            }
        }
    }
    //D
    playObjDes(chamber,object){
        if(!this.keyControlPlaying){
            if(!this.objDes.paused){
                this.objDes.pause();
            } else {
                let obj = "../objDes/G" + chamber + 'O' + object + '.mp3';
                this.objDes = new Audio(obj);
                if(!this.echoDes.paused){
                    let target = this.echoDes;
                    gsap.to(target,{
                        duration: 0.2,
                        ease: "power1.out",
                        volume:0,
                        onComplete: function (){
                            target.pause();
                        }
                    })
                }
                this.objDes.play();
            }
        }
    }

    leaveObject(){
        if(!this.objDes.paused) this.objDes.pause();
        if(!this.echoDes.paused) this.echoDes.pause();
    }

    setActivated(chamber){
        this.chambersSound[chamber].forEach((info) => {
            const sound = info.sound;
            if(info.name === 'gallery'){
                sound.offset = 0;
                sound.setVolume(1);
                sound.play();
                this.gallerySound = info;
            }
        });
    }

    zoomAudio(chamber, object){
        this.leaveGallery = true;
        this.hint.stop();
        let soundTL = gsap.timeline();
        if (this.bgmSound !== null) {
            let targetSound = this.bgmSound;
            soundTL.to(targetSound, {
                duration: 2,
                ease: "power1.out",
                volume: 0,
                onUpdate: () => {
                    targetSound.sound.setVolume(targetSound.volume);
                },
                onComplete:() => {
                    targetSound.sound.pause();
                }
            });
        }
        let targetSound = this.chambersSound[chamber - 1][object];
        targetSound.sound.play();
        soundTL.to(targetSound, {
            duration: 2,
            ease: "power1.out",
            volume: 1,
            onUpdate: () => {
                targetSound.sound.setVolume(targetSound.volume);
            }
        });
        this.bgmSound = targetSound;
    }

    fadeOutBGM(){
        let soundTL = gsap.timeline();
        let targetSound = this.bgmSound;
        if(targetSound){
            soundTL.to(targetSound, {
                duration: 2,
                ease: "power1.out",
                volume: 0,
                onUpdate: () => {
                    targetSound.sound.setVolume(targetSound.volume);
                },
                onComplete:() => {
                    targetSound.sound.pause();
                }
            });
        }
    }

    fadeInBGM(){
        let soundTL = gsap.timeline();
        let targetSound = this.bgmSound;
        targetSound.sound.play();
        if(targetSound){
            soundTL.to(targetSound, {
                duration: 2,
                ease: "power1.out",
                volume: 1,
                onUpdate: () => {
                    targetSound.sound.setVolume(targetSound.volume);
                }
            });
        }
    }

    restorePositionalSound(){
        let keyControl = this.onboardingAudio[5];
        keyControl.pause();
        this.keyControlPlaying = false;
        if(this.galleryInturrpted){
            this.gallerySound.sound.play();
            this.galleryInturrpted = false;
        }

        if(this.bgmInturrpted){
            this.fadeInBGM();
            this.bgmInturrpted = false;
        }
    }

    playKeyControl(){
        //pause all audio
        this.leaveObject();
        //pause positional sound
        if(this.gallerySound && this.gallerySound.sound.isPlaying){
            this.stopGallery();
            this.galleryInturrpted = true;
        }
        if(this.bgmSound && this.bgmSound.sound.isPlaying){
            this.fadeOutBGM();
            this.bgmInturrpted = true;
        }

        let keyControl = this.onboardingAudio[5];
        keyControl.currentTime = 0;
        keyControl.play();
        this.keyControlPlaying = true;
    }

    stopGallery(){
        if(this.gallerySound) this.gallerySound.sound.stop();
    }

    playGallery(chamber){
        if(this.gallerySound) this.stopGallery();
        let index = this.chambersSound[chamber - 1].length - 1;
        this.gallerySound = this.chambersSound[chamber - 1][index];
        this.gallerySound.sound.offset = 0;
        this.gallerySound.sound.play();
    }

    galleryHint(){
        this.hint = this.hintAudio[0];
        this.hint.play();
        this.prompt.style.display = 'block';
        this.hint1.textContent = "Press ";
        this.hint2.textContent = "Number Key (1 to 4)  ";
        this.hint3.textContent = "to proceed to an museum object.";

        setTimeout(() => {
            if(!this.leaveGallery){
                this.hint = this.hintAudio[1];
                this.hint.play();
                this.hint1.textContent = "Or press ";
                this.hint2.textContent = "Shift + Number Key (1 to 4)  ";
                this.hint3.textContent = "to proceed to another gallery";
            }
        },10000)

        //after finish
        setTimeout(() => {
            if(!this.leaveGallery){
                this.stopHint();
                this.setActivated(0);
            }
        },17000)
    }

    stopHint(){
        if(this.hint && !this.hint.paused) {
            this.hint.pause();
            //display none the dom
        }
        this.hintStopped = true;
        this.prompt.style.display = 'none';
    }

    objectHint(){
        this.prompt.style.display = 'block';
        this.hint1.textContent = "Press  ";
        this.hint2.textContent = "Shift + Arrow Key  ";
        this.hint3.textContent = "to adjust viewing direction.";
        this.hintStopped = false;
        this.hint = this.hintAudio[2];
        this.hint.play();

        setTimeout(() => {
            if(!this.hintStopped){
                this.hint = this.hintAudio[3];
                this.hint.play();
                this.hint1.textContent = "Or press ";
                this.hint2.textContent = "Left/Right ";
                this.hint3.textContent = "to orbit around the museum object.";
            }
        },13000)
    }

    backHint(){
        this.hint = this.hintAudio[4];
        this.hint.play();
        this.prompt.style.display = 'block';
        this.hint1.textContent = "Press  ";
        this.hint2.textContent = "Shift 0 or backspace ";
        this.hint3.textContent = "to return to the center of the current gallery.";
    }

    helpHint(){
        this.hint = this.hintAudio[5];
        this.hint.play();
        this.prompt.style.display = 'block';
        this.hint1.textContent = "Press  ";
        this.hint2.textContent = "H or ? ";
        this.hint3.textContent = "to open Key Functionality Menu";
    }

    isAudioPlaying(){
        if(this.echoSound && this.objDes && this.echoDes){
            return !this.echoSound.paused || !this.objDes.paused || !this.echoDes.paused;
        }else{
            return true;
        }

    }

}

export const audioManager = new AudioManager();

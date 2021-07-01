import "./style.scss";
import { Sketch } from "./js/sketch.js";

let canvas = new Sketch({
  dom: document.querySelector("#container"),
});

let onBoardingAudio = [];
for(let i = 1; i < 6; i++){
  onBoardingAudio[i] = new Audio('../Onboarding/' + i + '.mp3');
}

let stage = 0;
let activated = false;
let audioOn = false;
let keyMenuOpened = false;

let overlay = document.querySelector("#overlay");
let instruction = document.querySelector(".intro-detail");
let action = document.querySelector("#action");
let narrator = document.querySelector("#narrator");

window.addEventListener("keydown", (e) => {
  onKeyDown(e);
});

window.addEventListener("load", () => {
  createStage(0);
});

let onKeyDown = (event) => {
  switch (event.keyCode) {
    case 72 /*Help*/:
    case 191:
      if (activated) {
        keyMenuOpened = !keyMenuOpened;
        if(keyMenuOpened){
          createStage(10);
        }else{
          createStage(5);
        }
      }
      break;

    case 13:
      if (stage === 0) {
        stage++;
        createStage(stage);
      }

      break;
    case 27 /*Escape*/:
      break;
  }
};

let audioToggle = document.querySelector('#togBtn');
audioToggle.addEventListener('input',(e) => {
    audioOn = !audioOn;
    if(!audioOn){
      onBoardingAudio[stage].pause();
    }else{
      onBoardingAudio[stage].play();
    }
})


let yesButton = document.createElement("div");
yesButton.classList.add("instruction-button");
yesButton.setAttribute("role", "button");
yesButton.textContent = "YES";
yesButton.addEventListener("click", () => {
  stage++;
  createStage(stage);
});

let nextButton = document.createElement("div");
nextButton.classList.add("instruction-button");
nextButton.setAttribute("role", "button");
nextButton.textContent = "NEXT";
nextButton.addEventListener("click", () => {
  stage++;
  createStage(stage);
});
let backButton = document.createElement("div");
backButton.classList.add("instruction-button");
backButton.setAttribute("role", "button");
backButton.textContent = "BACK";
backButton.addEventListener("click", () => {
  stage--;
  createStage(stage);
});
let noButton = document.createElement("div");
noButton.classList.add("instruction-button");
noButton.setAttribute("role", "button");
noButton.addEventListener("click", () => {
  stage = 2;
  createStage(stage);
});
noButton.textContent = "NO";

let skipButton = document.querySelector("#skip");
skipButton.setAttribute("role", "button");
skipButton.addEventListener("click", () => {
  stage = 5;
  createStage(stage);
});

let startedButton = document.createElement("div");
startedButton.classList.add("instruction-button");
startedButton.setAttribute("role", "button");
startedButton.addEventListener("click", () => {
  stage = 5;
  createStage(stage);
});
startedButton.textContent = "Get Started";

let createStage = (stage) => {
  switch (stage) {
    case 1:
      removeAllChildNodes(action);
      pauseAllAudio();
      narrator.textContent = "Thomas Tajo:";
      instruction.textContent = " Hi, I am Thomas Tajo (tah-jo), I am your echolocation instructor today in ArtEcho.\n" + "                   Here is a question that will help us get started: Have you ever experienced echolocation?";
      action.appendChild(yesButton);
      action.appendChild(noButton);
      if(audioOn) onBoardingAudio[stage].play();
      break;
    case 2:
      removeAllChildNodes(action);
      pauseAllAudio();
      instruction.textContent = "Very Well! ArtEcho reproduces the echolocation experience to a virtual 3D environment. Anywhere within the virtual museum, you can press the Space key to trigger a virtual mouth click and then experience the sound reflections from the 3D objects in the museum.";
      action.appendChild(nextButton);
      action.appendChild(backButton);
      if(audioOn) onBoardingAudio[stage].play();
      break;
    case 3:
      removeAllChildNodes(action);
      pauseAllAudio();
      instruction.textContent =
        " Echolocation is a technique used by some blind individuals that can help improve their independence and mobility. An echolocation user can perceive the location, size, shape, and texture of their surrounding objects by emitting the mouth click and interpreting the strength, pitch, duration, and direction of the resulting sound reflections. Echolocation users are well-trained to perform high-pitch mouth clicks. \n" +
        "\n" +
        "In the ArtEcho experience, anywhere, you can press the Space key to trigger a virtual mouth click and then experience the acoustics attributes of the exhibited 3D assets";
      action.appendChild(nextButton);
      action.appendChild(backButton);
      if(audioOn) onBoardingAudio[stage].play();
      break;
    case 4:
      removeAllChildNodes(action);
      pauseAllAudio();
      narrator.textContent = "Nancy Roach:";
      instruction.textContent =
        " Hi there, welcome to ArtEcho Museum, I am your tour guide Nancy Roach.There are four virtual galleries in ArtEcho, Prehistoric Creatures, Ancient Chinese Artifacts, In Flight, and Space Exploration. In these galleries, you will move through periods of the history of this planet and some of the life forms who’ve inhabited it. In each gallery there are multiple ways to receive and experience the story.You can press D to hear my audio descriptions of the museum objects. And as you learned from Thomas, you can press the space bar for a virtual echolocation experience and press E for Thomas’s verbal interpretations of the sound reflections from museum objects.";
      action.appendChild(startedButton);
      action.appendChild(backButton);
      if(audioOn) onBoardingAudio[stage].play();
      break;
    case 5:
      pauseAllAudio();
      overlay.style.display = "none";
      canvas.setActivated(0);
      activated = true;
      document.querySelector("#selected").style.display = "block";
      break;

    case 10:
      skipButton.textContent = "Close Menu";
      pauseAllAudio();
      if(audioOn) {
        onBoardingAudio[5].currentTime = 0;
        onBoardingAudio[5].play();
      }
      instruction.style.display = "none";
      narrator.style.display = "none";
      action.style.display = "none";
      overlay.style.display = "";
      document.querySelector("#key-control").style.display = "flex";
      break;
  }
};

let pauseAllAudio = () => {
  for(let i = 1; i < 6; i++){
    onBoardingAudio[i].pause();
  }

}
let removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

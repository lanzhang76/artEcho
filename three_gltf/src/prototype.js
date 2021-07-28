import "./style.scss";
import { Sketch } from "./js/sketch.js";
import { audioManager } from "./js/audioManager";

let canvas = new Sketch({
  dom: document.querySelector("#container"),
});

let stage = 0;
let activated = false;
let keyMenuOpened = false;
let experienced = null;

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
      if (activated && !audioManager.hintLocked) {
        keyMenuOpened = !keyMenuOpened;
        if (keyMenuOpened) {
          createStage(10);
        } else {
          createStage(6);
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

let audioToggle = document.querySelector("#togBtn");
audioToggle.addEventListener("input", (e) => {
  audioManager.toggleOnboarding(stage);
});

let yesButton = document.createElement("div");
yesButton.classList.add("instruction-button");
yesButton.setAttribute("role", "button");
yesButton.textContent = "YES";
yesButton.addEventListener("click", () => {
  stage++;
  experienced = true;
  createStage(stage);
});

let nextButton = document.createElement("div");
nextButton.classList.add("instruction-button");
nextButton.setAttribute("role", "button");
nextButton.textContent = "NEXT";
nextButton.addEventListener("click", () => {
  stage = stage === 2 ? (stage = 4) : stage + 1;
  createStage(stage);
});
let backButton = document.createElement("div");
backButton.classList.add("instruction-button");
backButton.setAttribute("role", "button");
backButton.textContent = "BACK";
backButton.addEventListener("click", () => {
  if (stage === 3) {
    stage = 1;
  } else if (stage === 4) {
    stage = experienced ? 2 : 3;
  } else {
    stage--;
  }
  createStage(stage);
});
let noButton = document.createElement("div");
noButton.classList.add("instruction-button");
noButton.setAttribute("role", "button");
noButton.addEventListener("click", () => {
  experienced = false;
  stage = 3;
  createStage(stage);
});
noButton.textContent = "NO";

let skipButton = document.querySelector("#skip");
skipButton.setAttribute("role", "button");
skipButton.addEventListener("click", () => {
  stage = stage !== 10 ? 5 : 6;
  createStage(stage);
});
let startedButton = document.createElement("div");
startedButton.classList.add("instruction-button");
startedButton.setAttribute("role", "button");
startedButton.addEventListener("click", () => {
  stage = 5;
  createStage(stage);
});
startedButton.textContent = "NEXT";

let stopHint = document.querySelector("#hint-close");
stopHint.addEventListener("click", () => {
  audioManager.stopHint();
});

let enterButton = document.querySelector("#enter-button");
enterButton.addEventListener("click", () => {
  stage++;
  createStage(stage);
});

let createStage = (stage) => {
  switch (stage) {
    case 1:
      removeAllChildNodes(action);
      audioManager.pauseAllOnboarding();
      skipButton.style.display = "flex";
      narrator.textContent = "Thomas Tajo:";
      instruction.setAttribute("style", "white-space: pre-line; line-height: 1.5");
      instruction.textContent = " Hi, I am Thomas Tajo. I am your echolocation instructor today in ArtEcho. \n" + "Here is a question that will help us get started — Have you ever experienced echolocation?";
      action.appendChild(yesButton);
      action.appendChild(noButton);
      audioManager.playOnboardingFromBeginning(stage);
      break;
    case 2:
      removeAllChildNodes(action);
      audioManager.pauseAllOnboarding();
      narrator.textContent = "Thomas Tajo:";
      instruction.textContent =
        "Very Well! ArtEcho reproduces the echolocation experience to a 3D virtual environment. \n" +
        "\nAnywhere within the virtual museum, you can press the Space bar to trigger a virtual mouth click and then experience the sound reflections from 3D museum objects. You can also press E for my interpretation of sound reflections of museum objects.";
      action.appendChild(backButton);
      action.appendChild(nextButton);
      audioManager.playOnboardingFromBeginning(stage);
      break;
    case 3:
      removeAllChildNodes(action);
      audioManager.pauseAllOnboarding();
      narrator.textContent = "Thomas Tajo:";
      instruction.textContent =
        " Echolocation is a technique used by some blind individuals that can help improve their independence and mobility. An echolocation user can perceive the location, texture, shape and size of their surrounding objects by emitting mouth clicks and by interpreting the strength, pitch, duration, and direction of the resulting acoustic reflections. Echolocation users are trained to perform high-pitch mouth clicks. \n" +
        "\n In the ArtEcho experience, anywhere, you can press the Space bar to trigger a virtual mouth click and then experience the acoustic attributes of the exhibited 3D assets. You can also press E for my interpretation of sound reflections from 3D museum objects.";
      action.appendChild(backButton);
      action.appendChild(nextButton);
      audioManager.playOnboardingFromBeginning(stage);
      break;
    case 4:
      removeAllChildNodes(action);
      audioManager.pauseAllOnboarding();
      narrator.textContent = "Nancy Roach:";
      instruction.textContent =
        " Hi there, welcome to ArtEcho Museum, I am your tour guide Nancy Roach. There are four virtual galleries in ArtEcho, Prehistoric Creatures, Ancient Chinese Artifacts, In Flight, and Space Exploration. In these galleries, you will move through periods of the history of this planet and some of the life forms who’ve inhabited it. \n" +
        "\nIn each gallery there are multiple ways to receive and experience the story. You can press D to hear my audio descriptions of the museum objects. And as you learned from Thomas, you can press the space bar for a virtual echolocation experience and press E for Thomas’s verbal interpretations of the sound reflections from museum objects.";
      action.appendChild(startedButton);
      action.appendChild(backButton);
      audioManager.playOnboardingFromBeginning(stage);
      break;
    case 5:
      audioManager.pauseAllOnboarding();
      overlay.style.display = "none";
      audioManager.enterHint();
      setTimeout(() => {
        canvas.startHint();
      }, 5000);

      activated = true;
      document.querySelector("#selected").style.display = "block";
      break;
    case 6:
      audioManager.restorePositionalSound();
      overlay.style.display = "none";
      document.querySelector("#selected").style.display = "block";
      break;
    case 10:
      skipButton.textContent = "Close Menu";
      audioManager.pauseAllOnboarding();
      audioManager.onBoardingOn = true;
      audioToggle.checked = false;
      audioManager.playOnboardingFromBeginning(5);
      instruction.style.display = "none";
      narrator.style.display = "none";
      action.style.display = "none";
      overlay.style.display = "";
      document.querySelector("#key-control").style.display = "flex";
      break;
  }
};

let removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

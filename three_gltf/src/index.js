import "./style.scss";
import { Sketch } from "./js/sketch.js";

let canvas = new Sketch({
  dom: document.querySelector("#container"),
});

let stage = 0;

let overlay = document.querySelector("#overlay");
let instruction = document.querySelector("#instruction");
let action = document.querySelector("#action");

window.addEventListener("keydown", (e) => {
  onKeyDown(e);
});

let onKeyDown = (event) => {
  switch (event.keyCode) {
    case 13 /*Enter*/:
      if (stage === 0) {
        stage++;
        createStage(stage);
      }
      break;

    case 27 /*Escape*/:
      break;
  }
};

let yesButton = document.createElement("div");
yesButton.classList.add("instruction-button");
yesButton.setAttribute("role", "button");
yesButton.textContent = "YES";
yesButton.addEventListener("click", () => {
  stage++;
  createStage(stage);
});

let noButton = document.createElement("div");
noButton.classList.add("instruction-button");
noButton.setAttribute("role", "button");
noButton.textContent = "NO";

let skipButton = document.createElement("div");
skipButton.classList.add("instruction-button");
skipButton.textContent = "Skip Onboarding";
skipButton.setAttribute("role", "button");
skipButton.addEventListener("click", () => {
  stage = 4;
  createStage(stage);
});

let createStage = (stage) => {
  switch (stage) {
    case 1:
      instruction.textContent = "Are you a sighted audience?";
      action.appendChild(yesButton);
      action.appendChild(noButton);
      action.appendChild(skipButton);
      break;
    case 2:
      instruction.textContent = "Have you ever heard about human echolocation?";
      break;
    case 3:
      break;
    case 4:
      overlay.style.display = "none";
      canvas.setActivated();
      document.querySelector("#selected").style.display = "block";
  }
};

let removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

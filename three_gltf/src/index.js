import "./style.scss";
import gsap from "gsap";
window.addEventListener("DOMContentLoaded", (event) => {
  let tl = gsap.timeline();
  tl.from("#left-column", { y: -100, opacity: 0 }).from("#right-column", { y: -100, opacity: 0 });
});

// let canvasWrapper = document.querySelector(".content-wrapper");

// canvasWrapper.style.height = (canvasWrapper.clientWidth * 9) / 16 + "px";
// heightWarning();

// function autoSize() {
//   canvasWrapper.style.height = (canvasWrapper.clientWidth * 9) / 16 + "px";
//   heightWarning();
// }

// function heightWarning() {
//   let minimal = document.querySelector(".content-wrapper").clientHeight;
//   let warning = document.querySelector("#extend-window-warning");
//   window.innerHeight < minimal ? (warning.style.display = "flex") : (warning.style.display = "none");
// }

// window.onresize = autoSize;

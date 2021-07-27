import _ from "lodash";
import "./style.scss";
import gsap from "gsap";

if (navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1) {
  // using safari browser
  if (window.innerWidth > 800) {
    const hide = document.getElementsByClassName("safari-hide");
    for (let el of hide) {
      el.style.display = "none";
    }
    document.getElementById("desktop-ins").innerText = "💡 Please use Chrome or Firefox browser for the best experience.";
  }
} else {
  document.getElementById("desktop-ins").innerText = "💡 Please put on headphones for the best experience.";
}

if (process.env.NODE_ENV !== "production") {
  console.log("in DEV mode!");
}

window.addEventListener("DOMContentLoaded", (event) => {
  let tl = gsap.timeline();
  tl.from("#left-column", { y: -100, opacity: 0 }).from("#right-column", { y: -100, opacity: 0 });
});

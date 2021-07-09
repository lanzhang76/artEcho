import "./style.scss";
import gsap from "gsap";

if (process.env.NODE_ENV !== "production") {
  console.log("in DEV mode!");
}

window.addEventListener("DOMContentLoaded", (event) => {
  let tl = gsap.timeline();
  tl.from("#left-column", { y: -100, opacity: 0 }).from("#right-column", { y: -100, opacity: 0 });
});

const canvas = document.querySelector("#scene");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canv = new Canv(canvas);
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canv.rerender();
});
canv.rectangle({
  ref: "rect1",
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  fill: "#ccc"
});

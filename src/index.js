class Canv {
  constructor() {
    this.version = "0.1 indev";
  }

  square(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Vector {
  constructor(canvas, canvasContent, props = {}){
    this.canvas = canvas;
    this.canvasContent = canvasContent;
    this.ctx = canvas.getContext("2d");
    this.props = props;

    this.render();
    this.initProps();
  }
  initProps(){
    if(this.props.fill) {
      this.ctx.fillStyle = this.props.fill;
      this.ctx.fill();
    }
    if(this.props.lineWidth) this.ctx.lineWidth = this.props.lineWidth;
    if(this.props.stroke) {
      this.ctx.strokeStyle = this.props.stroke;
      this.ctx.stroke();
    }
  }
  rerender(){
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.render(); // навсякий перерисовываю этот вектор
    this.initProps();
  }
}

class Rectangle extends Vector {
  render(){
    this.ctx.beginPath();
    this.ctx.rect(this.props.x, this.props.y, this.props.width, this.props.height);
    this.ctx.closePath();
  }
}
class Circle extends Vector {
  render(){
    this.ctx.beginPath();
    this.ctx.arc(this.props.x, this.props.y, this.props.radius, this.props.startAngle, this.props.endAngle, this.props.acw);
    this.ctx.closePath();
  }
}

class Canv {
  constructor(canvas, props = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.props = props;
    this.content = [];
    this.refs = {};

    if(this.props.width) this.canvas.width = this.props.width;
    if(this.props.height) this.canvas.height = this.props.height;

    this.version = "0.1";
  }
  rerender(){
    // перерисовываю остальные векторы на холсте, ведь без этого forEach'а, элементы бы пропали
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.content.forEach((vector) => {
      vector.rerender();
    });
  }
  lerp(start, end, amt){
    return (1-amt) * start + amt * end
  }
  anim(ref, props = {}){
    const vector = this.refs[ref];
    let animProps = [];
    let isEnd = false;

    for(let prop in props){
      animProps.push(prop);
    }

    const anim = () => {
      animProps.forEach((prop) => {
        if(prop !== "duration") {
          props[prop] ? vector.props[prop] += this.lerp(vector.props[prop], props[prop], props.duration) : 0;

          if(vector.props[prop] >= props[prop]) {
            vector.props[prop] = props[prop];
            isEnd = true;
          }
        }
      });

      this.rerender();

      if(!isEnd) requestAnimationFrame(anim);
    }

    anim();
  }
  // фигуры
  rectangle(props) {
    const rect = new Rectangle(this.canvas, this.content, props);

    this.content.push(rect);

    if(rect.props.ref) this.refs[rect.props.ref] = rect;
  }
  circle(props){
    const circle = new Circle(this.canvas, this.content, props);

    this.content.push(circle);

    if(circle.props.ref) this.refs[circle.props.ref] = circle;
  }
}

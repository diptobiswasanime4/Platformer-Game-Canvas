const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 500;

const gravity = 0.3;

let frame = 0;

class Player {
  constructor(color = "green") {
    this.x = 100;
    this.y = 100;
    this.velX = 0;
    this.velY = 1;
    this.width = 0;
    this.height = 150;
    this.color = color;
    this.images = [];
    this.loadImages();
  }
  loadImages() {
    for (let i = 1; i <= 10; i++) {
      let image = new Image();
      image.src = `assets/Sprites/Adventure girl/Idle (${i}).png`;
      let aspectRatio = image.naturalWidth / image.naturalHeight;
      this.width = this.height * aspectRatio;
      this.images.push(image);
    }
  }
  draw() {
    ctx.drawImage(this.images[frame], this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.y + this.height - this.velY < canvas.height) {
      this.y += this.velY;
      this.velY += gravity;
    } else {
      this.velY = 0;
    }
    this.draw();
  }
}

const player = new Player();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  frame = (frame + 1) % player.images.length;
  requestAnimationFrame(animate);
}

animate();

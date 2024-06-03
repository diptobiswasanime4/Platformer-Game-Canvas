const GRAVITY = 0.98;

export class Player {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.velX = 0;
    this.velY = 0;
    this.width = 50;
    this.height = 50;
  }

  draw(ctx) {
    ctx.beginPath();
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.lineWidth = 2;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.closePath();
  }

  update(ctx) {
    ctx.clearRect(0, 0, 800, 400);
    this.draw(ctx);
    if (this.y + this.height + this.velY < 400) {
      this.y += this.velY;
      this.velY += GRAVITY;
    }
    // if (this.y < 400 - this.height - this.velY) {
    //   this.y += this.velY;
    //   this.velY += GRAVITY;
    // }
  }
}

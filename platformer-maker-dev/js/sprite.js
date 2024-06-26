import adventurer from "../assets/sprites/adventurer.png";

const GRAVITY = 0.98;

export class Sprite {
  constructor() {
    this.x = 100;
    this.y = 200;
    this.velX = 0;
    this.velY = 0;
    this.width = 50;
    this.height = 50;

    // this.image = createImage(adventurer);
    this.image = new Image();
    this.image.src = adventurer;
  }

  draw(ctx) {
    if (this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y);
    } else {
      this.image.onload = () => {
        ctx.drawImage(this.image, this.x, this.y);
      };
    }
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

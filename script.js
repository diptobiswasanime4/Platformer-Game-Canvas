const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 500;

const gravity = 0.3;

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
  up: {
    pressed: false,
  },
};

class Player {
  constructor(color = "green") {
    this.x = 100;
    this.y = 100;
    this.velX = 0;
    this.velY = 1;
    this.width = 30;
    this.height = 60;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    if (this.y + this.height + this.velY < canvas.height) {
      this.y += this.velY;
      this.velY += gravity;
    } else {
      this.velY = 0;
    }
    this.x += this.velX;
    this.draw();
  }
}

const player = new Player();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();
  if (keys.right.pressed) {
    player.velX = 5;
  } else if (keys.left.pressed) {
    player.velX = -5;
  } else {
    player.velX = 0;
  }
  if (keys.up.pressed && player.velY == 0) {
    player.velY = -10;
  }
  requestAnimationFrame(animate);
}

animate();

addEventListener("keydown", (e) => {
  console.log(keys.right.pressed);
  switch (e.key) {
    case "d":
      keys.right.pressed = true;
      break;
    case "a":
      keys.left.pressed = true;
      break;
    case "w":
      keys.up.pressed = true;
      break;
  }
});

addEventListener("keyup", (e) => {
  console.log(keys.right.pressed);
  switch (e.key) {
    case "d":
      keys.right.pressed = false;
      break;
    case "a":
      keys.left.pressed = false;
      break;
    case "w":
      keys.up.pressed = false;
      break;
  }
});

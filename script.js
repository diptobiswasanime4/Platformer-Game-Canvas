const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 400;
canvas.width = 500;

const gravity = 0.3;

let frame = 0;
let charFrame;
let pose;
let imagesCount;

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
  down: {
    pressed: false,
  },
};

class Player {
  constructor(color = "green", pose = "Idle", imagesCount = 8) {
    this.x = 100;
    this.y = 100;
    this.velX = 0;
    this.velY = 1;
    this.width;
    this.height = 150;
    this.color = color;
    this.images = [];
    this.pose = pose;
    this.imagesCount = imagesCount;
    this.loadImages(this.pose, this.imagesCount);
  }
  loadImages(pose, imagesCount) {
    for (let i = 1; i <= imagesCount; i++) {
      let image = new Image();
      image.src = `assets/Sprites/Adventure girl/${pose} (${i}).png`;
      let aspectRatio = image.naturalWidth / image.naturalHeight;
      this.width = this.height * aspectRatio;
      this.images.push(image);
    }
  }

  draw() {
    ctx.drawImage(this.images[frame], this.x, this.y, this.width, this.height);
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
  frame = (frame + 1) % player.images.length;
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
    keys.up.pressed = false;
  } else if (keys.down.pressed) {
    keys.down.pressed = false;
  }
  requestAnimationFrame(animate);
}

animate();

addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      keys.right.pressed = true;
      player.pose = "Run";
      player.images = [];
      player.imagesCount = 8;
      player.loadImages(player.pose, player.imagesCount);
      break;
    case "a":
      keys.left.pressed = true;
      player.pose = "Run";
      player.images = [];
      player.imagesCount = 8;
      player.loadImages(player.pose, player.imagesCount);
      break;
    case "w":
      player.pose = "Jump";
      player.images = [];
      player.imagesCount = 9;
      player.loadImages(player.pose, player.imagesCount);
      keys.up.pressed = true;
      break;
    case "s":
      player.pose = "Slide";
      player.images = [];
      player.imagesCount = 5;
      player.loadImages(player.pose, player.imagesCount);
      keys.down.pressed = true;
      break;
  }
});

addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      keys.right.pressed = false;
      player.pose = "Idle";
      player.images = [];
      player.imagesCount = 10;
      player.loadImages(player.pose, player.imagesCount);
      break;
    case "a":
      keys.left.pressed = false;
      player.pose = "Idle";
      player.images = [];
      player.imagesCount = 10;
      player.loadImages(player.pose, player.imagesCount);
      break;
  }
});

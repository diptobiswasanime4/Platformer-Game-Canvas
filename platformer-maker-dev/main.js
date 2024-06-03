import "./style.css";
import { createTerrain, hoverTerrain } from "./js/createTerrain.js";
import { Player } from "./js/player.js";
// import { Sprite } from "./js/sprite.js";
import adventurer from "./assets/sprites/adventurer.png";

let imageWidth = 1280 / 4;
let imageHeight = 1280 / 4;

let start;
let end;
let speed;
const adventurerImage = new Image();
adventurerImage.src = adventurer;

console.log(adventurer);

const TILE_SIZE = 40;
const GRAVITY = 0.98;
const TERRAIN_TYPES = ["grass", "sand", "water"];

let selector = "sprite-screen";
let reqId;

let keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

let mapMaker = document.getElementById("map-maker");
let ctx = mapMaker.getContext("2d");

let selectorElem = document.getElementById("selector");
let terrain;

let map;

selectorElem.addEventListener("click", (e) => {
  terrain = e.target.id;
  selector = e.target.id;
  ctx.clearRect(0, 0, mapMaker.width, mapMaker.height);
  cancelAnimationFrame(reqId);
  init();
});

function init() {
  if (selector == "main-screen") {
    let player_1 = new Player();
    player_1.draw(ctx);

    function animate() {
      player_1.update(ctx);
      requestAnimationFrame(animate);
      // console.log(1);
    }

    animate();

    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "W":
        case "w":
          player_1.velY -= 20;
          break;
        case "s":
        case "s":
          break;
        case "a":
        case "a":
          player_1.x -= 5;
          break;
        case "d":
        case "d":
          player_1.x += 5;
          break;
      }
    });

    addEventListener("keyup", (e) => {
      switch (e.key) {
        case "W":
        case "w":
          break;
        case "s":
        case "s":
          break;
        case "a":
        case "a":
          break;
        case "d":
        case "d":
          break;
      }
    });
  } else if (selector == "sprite-screen") {
    start = 0;
    end = 4;
    speed = 75;
    let sprite_1 = new Player();
    let sprite_image = new Image();
    sprite_image.src = "./assets/sprites/Character-Sprite-02.png";

    function animate() {
      start++;
      if (start == end * speed) {
        start = 0;
      }
      ctx.clearRect(0, 0, mapMaker.width, mapMaker.height);
      animateSprite(
        sprite_image,
        imageWidth,
        imageHeight,
        100,
        100,
        start,
        end,
        speed,
        ctx
      );
      // sprite_1.draw(ctx);
      // console.log(1);
      reqId = requestAnimationFrame(animate);
    }
    animate();
  }
}

init();

function randomMap() {
  let terrainRandom;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      terrainRandom = TERRAIN_TYPES[Math.floor(Math.random() * 3)];
      createTerrain(ctx, i * 40, j * 40, terrainRandom);
    }
  }
}

function clearMap() {
  console.log("Clear Map.");
  ctx.clearRect(0, 0, mapMaker.width, mapMaker.height);
}

document.getElementById("clear-map-fn").addEventListener("click", clearMap);

function exportMap() {}

// issue with hover functionality
addEventListener("mousemove", (e) => {
  let x = Math.floor(e.clientX / 40) * 40;
  let y = Math.floor(e.clientY / 40) * 40;
  // hoverTerrain(ctx, x, y);
  let OldX = x;
  let OldY = y;
});

addEventListener("click", (e) => {
  createTerrain(ctx, e.clientX, e.clientY, terrain);
});

document.getElementById("generate-map-fn").addEventListener("click", randomMap);

function animateSprite(
  spriteImage,
  imageWidth,
  imageHeight,
  px,
  py,
  start,
  end,
  speed,
  ctx
) {
  console.log("Start: ", start);
  ctx.drawImage(
    spriteImage,
    imageWidth * Math.floor(start / speed),
    0,
    imageWidth,
    imageHeight,
    px,
    py,
    mapMaker.width / 4,
    mapMaker.height / 2
  );
}

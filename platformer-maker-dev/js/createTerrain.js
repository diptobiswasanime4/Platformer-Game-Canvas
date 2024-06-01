export function hoverTerrain(ctx, x, y) {
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(terrainX, terrainY, 40, 40);
}

export function createTerrain(ctx, x, y, type) {
  let patchColor, fillStyleTop, fillStyleBottom;
  if (type == "grass") {
    fillStyleTop = "#84b913";
    fillStyleBottom = "#e6db77";
    ctx.fillStyle = "#9fd42b";
    patchColor = "Green";
  } else if (type == "sand") {
    ctx.fillStyle = "#e6db77";
    patchColor = "goldenrod";
  } else if (type == "water") {
    ctx.fillStyle = "#556ad9";
    patchColor = "blue";
  } else if (type == "hill") {
    ctx.fillStyle = "brown";
    patchColor = "burlywood";
  }

  let terrainX = Math.floor(x / 40) * 40;
  let terrainY = Math.floor(y / 40) * 40;

  ctx.fillStyle = fillStyleBottom;
  ctx.fillRect(terrainX, terrainY, 40, 40);
  ctx.fillStyle = fillStyleTop;
  ctx.fillRect(terrainX - 5, terrainY - 10, 50, 10);

  let patchesCount = 5;
  let patchWidth = 2;
  let patchHeight = 5;

  for (let i = 0; i < patchesCount; i++) {
    let patchX = Math.random() * (40 - patchWidth);
    let patchY = Math.random() * (40 - patchHeight);
    ctx.fillStyle = patchColor;
    ctx.fillRect(terrainX + patchX, terrainY + patchY, patchWidth, patchHeight);
  }
}

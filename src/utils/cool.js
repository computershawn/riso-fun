import { ht } from "@/constants";

const randIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const bump = (c, ctx, r, x, y, alp, outlines) => {
  ctx.fillStyle = `rgb(${c.rgb[0]}, ${c.rgb[1]}, ${c.rgb[2]}, ${alp})`;
  ctx.strokeStyle = `rgb(0, 0, 0, 0.5)`;
  ctx.beginPath();
  ctx.arc(x, y, r, Math.PI, 2 * Math.PI);
  ctx.fill();
  if (outlines) {
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.rect(x - r, y, 2 * r, ht - y);
  ctx.fill();

  if (outlines) {
    ctx.beginPath();
    ctx.moveTo(x - r, y);
    ctx.lineTo(x - r, ht);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + r, ht);
    ctx.stroke();
  }
};

const circo = (c, ctx, r, x, y, alp, outlines) => {
  ctx.fillStyle = `rgb(${c.rgb[0]}, ${c.rgb[1]}, ${c.rgb[2]}, ${alp})`;
  ctx.strokeStyle = `rgb(0, 0, 0, 0.5)`;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  if (outlines) {
    ctx.stroke();
  }
};

export { bump, circo, randIndex };

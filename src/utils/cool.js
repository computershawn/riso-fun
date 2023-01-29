import { ht } from "@/constants";

const randIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const bump = (c, ctx, r, x, y, alp, outlines) => {
  const co = lerpColorRGB(c.rgb, [255, 255, 255], alp);
  ctx.fillStyle = `rgb(${co.r}, ${co.g}, ${co.b}, ${alp})`;
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
  const co = lerpColorRGB(c.rgb, [255, 255, 255], alp);
  ctx.fillStyle = `rgb(${co.r}, ${co.g}, ${co.b}, ${alp})`;
  ctx.strokeStyle = `rgb(0, 0, 0, 0.5)`;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
  if (outlines) {
    ctx.stroke();
  }
};

const lerpColorRGB = (color0, color1, amount) => {
  const [r0, g0, b0] = color0;
  const [r1, g1, b1] = color1;
  const r = Math.round(r0 + amount * (r1 - r0));
  const g = Math.round(g0 + amount * (g1 - g0));
  const b = Math.round(b0 + amount * (b1 - b0));

  return { r, g, b };
}

const easeInCubic = (x) => {
  return x * x * x;
}

function easeOutCubic(x) {
  return 1.0 - Math.pow(1.0 - x, 3);
}

export { bump, circo, easeInCubic, easeOutCubic, randIndex };

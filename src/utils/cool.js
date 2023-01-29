import { wd, ht } from "@/constants";

const randIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

// const buildColorList = (colors) => {
//   const container = document.getElementById("container");
//   colors.forEach((co) => {
//     const dv = document.createElement("div");
//     dv.classList.add("row");
//     const swatch = document.createElement("div");
//     swatch.style.backgroundColor = co.hex;
//     swatch.classList.add("swatch");
//     dv.appendChild(swatch);

//     const selected = document.createElement("div");
//     selected.classList.add("selected");
//     dv.appendChild(selected);

//     // const sp = document.createElement("span");
//     // sp.innerText = co.name;
//     // dv.appendChild(sp);
//     container.appendChild(dv);
//   });
// };

// const ayo = (colorsArr) => {
//   const canvas = document.getElementById("canv");
//   const ctx = canvas.getContext("2d");
//   ctx.clearRect(0, 0, wd, ht);

//   ctx.globalCompositeOperation = "multiply";

//   const { c1, c2, c3 } = palette;

//   // Render background
//   if (Math.random() > 0.5) {
//     const alp = 0.25 + Math.random() * 0.75;
//     ctx.fillStyle = `rgb(${c3.rgb[0]}, ${c3.rgb[1]}, ${c3.rgb[2]}, ${alp})`;
//     ctx.fillRect(0, 0, wd, ht);
//   }

//   for (let i = 0; i < 12; i++) {
//     bump(c1);
//     bump(c2);
//   }

//   const indicators = document.querySelectorAll(".selected");
//   indicators.forEach((item, index) => {
//     if (index !== palette.c0 && index !== palette.c1 && index !== palette.c2) {
//       item.classList.remove("active");
//     } else {
//       item.classList.add("active");
//     }
//   });
// };

// const update = (e, colorsArray) => {
//   console.log(e.target.value);
//   const index = randIndex(colorsArray);
// };

// const main = async () => {
//   const colors = await getColors();
//   buildColorList(colors);

//   const i = randIndex(colors);
//   const j = randIndex(colors);
//   const k = randIndex(colors);
//   palette.c1 = colors[i];
//   palette.c2 = colors[j];
//   palette.c3 = colors[k];

//   const funBtn = document.getElementById("fun");
//   funBtn.addEventListener("click", () => {
//     const i = randIndex(colors);
//     const j = randIndex(colors);
//     const k = randIndex(colors);
//     palette.c1 = colors[i];
//     palette.c2 = colors[j];
//     palette.c3 = colors[k];
//   });

//   const sel = document.getElementById("color-select");
//   sel.addEventListener("change", (evt) => update(evt, colors));
// };

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

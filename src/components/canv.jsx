import React, { useEffect, useRef } from 'react';

import { bump, circo } from '@/utils/cool';
import { wd, ht } from '@/constants';

const Canv = ({ canvasColors }) => {
  const canvRef0 = useRef(null);
  const canvRef1 = useRef(null);
  const canvRef2 = useRef(null);

  useEffect(() => {
    const circles = [];
    const bumps = [];
    for (let i = 0; i < 24; i++) {
      const r = 8 + Math.round(Math.random() * 40);
      const x = Math.round(Math.random() * wd);
      const y = Math.round(Math.random() * ht);
      const alp = 0.4 + Math.random() * 0.56;
      const outlines = Math.random() > 0.5;
      const activeLayer = Math.round(Math.random() * 2);
      circles.push({
        r, x, y, alp, outlines, activeLayer
      });  
    }

    for (let i = 0; i < 8; i++) {
      const r = 16 + Math.round(Math.random() * 44);
      const x = Math.round(Math.random() * wd);
      const y = Math.round(Math.random() * ht);
      const alp = 0.4 + Math.random() * 0.56;
      const outlines = Math.random() > 0.5;
      const activeLayer = Math.round(Math.random() * 2);
      bumps.push({
        r, x, y, alp, outlines, activeLayer
      });
  
    }

    const renderShapes = () => {
      const c0 = canvasColors[0];
      const c1 = canvasColors[1];
      const c2 = canvasColors[2];
      // const c3 = canvasColors[3];
  
      const ctx0 = canvRef0.current.getContext('2d');
      ctx0.clearRect(0, 0, wd, ht);
      const ctx1 = canvRef0.current.getContext('2d');
      ctx1.clearRect(0, 0, wd, ht);
      const ctx2 = canvRef0.current.getContext('2d');
      ctx2.clearRect(0, 0, wd, ht);
  
      // Render background
      // ctx0.fillStyle = `rgb(${c0.rgb[0]}, ${c0.rgb[1]}, ${c0.rgb[2]})`;
      ctx0.fillStyle = 'rgb(255, 255, 255)';
      ctx0.fillRect(0, 0, wd, ht);

      // Render first layer (color) of geometry
      circles.forEach((c, i) => {
        if (c.activeLayer === 0 || c.activeLayer === 2) {
          circo(c1, ctx1, c.r, c.x, c.y, c.alp, false);
        }
      });

      bumps.forEach(b => {
        if (b.activeLayer === 0 || b.activeLayer === 2) {
          bump(c1, ctx1, b.r, b.x, b.y, b.alp, false);
        }
      });

      ctx0.globalCompositeOperation = 'multiply';
  
      // Render second layer (color) of geometry
      circles.forEach((c, i) => {
        const delta = Math.random() * 8;
        const dX = delta * (Math.random() > 0.5 ? 1 : -1);
        const dY = delta * (Math.random() > 0.5 ? 1 : -1);
        if (c.activeLayer === 1 || c.activeLayer === 2) {
          circo(c2, ctx2, c.r, c.x + dX, c.y + dY, c.alp, c.outlines);
        }
      });

      bumps.forEach(b => {
        const delta = Math.random() * 8;
        const dX = delta * (Math.random() > 0.5 ? 1 : -1);
        const dY = delta * (Math.random() > 0.5 ? 1 : -1);
        if (b.activeLayer === 1 || b.activeLayer === 2) {
          bump(c2, ctx2, b.r, b.x + dX, b.y + dY, b.alp, b.outlines);
        }
      });
    };

    if (canvRef0.current && canvasColors.length > 0) {
      renderShapes();
    }
  }, [canvasColors]);

  return (
    <>
      <canvas className="canv layer0" ref={canvRef0} width={wd} height={ht}></canvas>
      <canvas className="canv layer1" ref={canvRef1} width={wd} height={ht}></canvas>
      <canvas className="canv layer2" ref={canvRef2} width={wd} height={ht}></canvas>
    </>
  );
};

export default Canv;

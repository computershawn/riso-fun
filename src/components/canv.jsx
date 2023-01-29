import React, { useEffect, useRef } from 'react';

import {
  bump,
  circo,
  renderBackground,
  wobble
} from '@/utils/cool';
import { wd, ht } from '@/constants';

const Canv = ({ canvasColors, geoms, hasBackgroundColor, separated }) => {
  const canvRef0 = useRef(null);
  const canvRef1 = useRef(null);
  const canvRef2 = useRef(null);

  useEffect(() => {
    const renderShapes = () => {
      const c0 = canvasColors[0];
      const c1 = canvasColors[1];
      const c2 = canvasColors[2];
  
      const ctx0 = canvRef0.current.getContext('2d');
      ctx0.clearRect(0, 0, wd, ht);
      const ctx1 = canvRef1.current.getContext('2d');
      ctx1.clearRect(0, 0, wd, ht);
      const ctx2 = canvRef2.current.getContext('2d');
      ctx2.clearRect(0, 0, wd, ht);
  
      // Render background
      renderBackground(c0, ctx0, hasBackgroundColor);

      // Render first layer (color) of geometry
      geoms.circles.forEach(c => {
        if (c.activeLayer === 0 || c.activeLayer === 2) {
          circo(c0, ctx0, c.r, c.x, c.y, c.tint, false);
        }
      });

      geoms.bumps.forEach(b => {
        if (b.activeLayer === 0 || b.activeLayer === 2) {
          bump(c0, ctx0, b.r, b.x, b.y, b.tint, false);
        }
      });

      ctx0.globalCompositeOperation = 'multiply';
  
      // Render second layer (color) of geometry
      geoms.circles.forEach(c => {
        const dx = wobble(4);
        const dy = wobble(4);
        if (c.activeLayer === 1 || c.activeLayer === 2) {
          circo(c1, ctx1, c.r, c.x + dx, c.y + dy, c.tint, false);
        }
      });

      geoms.bumps.forEach(b => {
        const dx = wobble(4);
        const dy = wobble(4);
        if (b.activeLayer === 1 || b.activeLayer === 2) {
          bump(c1, ctx1, b.r, b.x + dx, b.y + dy, b.tint, false);
        }
      });

      // Render third layer (color) of geometry
      geoms.circles.forEach(c => {
        const dx = wobble(4);
        const dy = wobble(4);
        if (c.activeLayer === 1 || c.activeLayer === 2) {
          circo(c2, ctx2, c.r, c.x + dx, c.y + dy, c.tint, c.outlines);
        }
      });

      geoms.bumps.forEach(b => {
        const dx = wobble(4);
        const dy = wobble(4);
        if (b.activeLayer === 1 || b.activeLayer === 2) {
          bump(c2, ctx2, b.r, b.x + dx, b.y + dy, b.tint, b.outlines);
        }
      });
    };

    if (geoms && canvRef0.current) {
      renderShapes();
    }
  }, [canvasColors, geoms, hasBackgroundColor]);

  const layer0ClassName = `canv layer0${separated ? ' separated' : ''}`;
  const layer1ClassName = `canv layer1${separated ? ' separated' : ''}`;
  const layer2ClassName = `canv layer2${separated ? ' separated' : ''}`;

  return (
    <>
      <canvas className={layer0ClassName} ref={canvRef0} width={wd} height={ht}></canvas>
      <canvas className={layer1ClassName} ref={canvRef1} width={wd} height={ht}></canvas>
      <canvas className={layer2ClassName} ref={canvRef2} width={wd} height={ht}></canvas>
    </>
  );
};

export default Canv;

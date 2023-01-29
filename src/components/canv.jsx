import React, { useEffect, useRef } from 'react';

import { bump } from '@/utils/cool';

const Canv = (colors) => {
  const canvasRef = useRef(null);
  const wd = 720;
  const ht = 480;

  useEffect(() => {
    if (canvasRef.current) {
      const c2 = { rgb: [0, 255, 255] };
      const c3 = { rgb: [255, 0, 255] };

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, wd, ht);

      ctx.globalCompositeOperation = 'multiply';
    
      // Render background
      if (Math.random() > 0.5) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = 'rgb(255, 255, 255)';
        } else {
          const alp = 0.25 + Math.random() * 0.75;
          ctx.fillStyle = `rgb(${c3.rgb[0]}, ${c3.rgb[1]}, ${c3.rgb[2]}, ${alp})`;
        }
        ctx.fillRect(0, 0, wd, ht);
      }

      // Render some geometry
      for (let i = 0; i < 12; i++) {
        bump(c2, ctx);
        bump(c3, ctx);
      }
    }
  }, []);

  return (
    <canvas className="canv" ref={canvasRef} width="720" height="480"></canvas>
  );
};

export default Canv;



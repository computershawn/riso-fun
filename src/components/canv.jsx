import React, { useEffect, useRef } from 'react';

// const Canv = ({ ref }) => {
const Canv = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.fillStyle = '#fefefe';
      ctx?.fillRect(0, 0, 640, 360);
    }
  }, []);

  return (
    <canvas className="canv" ref={canvasRef} width="640" height="360"></canvas>
  );
};

export default Canv;



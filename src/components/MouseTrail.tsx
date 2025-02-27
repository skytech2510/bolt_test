import { useEffect, useRef } from 'react';

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Array<{ x: number; y: number; life: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1
      });
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current
        .map(point => ({
          ...point,
          life: point.life - 0.02
        }))
        .filter(point => point.life > 0);

      ctx.shadowBlur = 35;
      ctx.shadowColor = '#904AF2';
      ctx.fillStyle = '#904AF2';
      ctx.strokeStyle = '#904AF2';
      ctx.lineWidth = 2;

      pointsRef.current.forEach((point, i) => {
        const nextPoint = pointsRef.current[i + 1];
        
        if (nextPoint) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(nextPoint.x, nextPoint.y);
          ctx.globalAlpha = point.life * 0.1; // More transparent
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.globalAlpha = point.life * 0.2; // More transparent
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
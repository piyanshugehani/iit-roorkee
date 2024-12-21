import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  videoUrl: string;
  currentTime: number;
  duration: number;
}

export function WaveformVisualizer({ videoUrl, currentTime, duration }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw timeline
    ctx.fillStyle = '#e5e7eb';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw progress
    const progress = (currentTime / duration) * canvas.width;
    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(0, 0, progress, canvas.height);

    // Draw markers every second
    ctx.strokeStyle = '#9ca3af';
    for (let i = 0; i <= duration; i++) {
      const x = (i / duration) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, i % 5 === 0 ? canvas.height / 2 : canvas.height / 4);
      ctx.stroke();
    }
  }, [currentTime, duration]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-12 rounded-lg"
      width={1000}
      height={48}
    />
  );
}
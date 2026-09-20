import React, { useState, useEffect, useRef } from 'react';

interface LiquidDrop {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const LiquidCursorTrail: React.FC = () => {
  const [drops, setDrops] = useState<LiquidDrop[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });

  // Cleanup drops older than 3 seconds (3000ms)
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setDrops((prev) => prev.filter((d) => now - d.id < 3000));
    }, 400);
    return () => clearInterval(cleanupInterval);
  }, []);

  // Global cursor motion listener across all pages
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const now = Date.now();

      const dist = Math.hypot(x - lastSpawnRef.current.x, y - lastSpawnRef.current.y);

      // Spawn droplet when cursor moves at least 18px or slightly slower movement over 90ms
      if (dist > 18 || (now - lastSpawnRef.current.time > 90 && dist > 8)) {
        lastSpawnRef.current = { x, y, time: now };

        const newDrop: LiquidDrop = {
          id: now + Math.random(),
          x,
          y,
          size: Math.floor(38 + Math.random() * 32), // 38px to 70px natural organic droplet
        };

        setDrops((prev) => {
          // Keep all droplets alive for their full 3.0s duration
          const cleaned = prev.filter((d) => now - d.id < 3000);
          if (cleaned.length > 80) {
            return [...cleaned.slice(cleaned.length - 80), newDrop];
          }
          return [...cleaned, newDrop];
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="water-drop"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            width: `${drop.size}px`,
            height: `${drop.size}px`,
          }}
        />
      ))}
    </div>
  );
};

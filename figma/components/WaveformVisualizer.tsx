import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface WaveformVisualizerProps {
  isPlaying?: boolean;
  bars?: number;
  height?: number;
  compact?: boolean;
}

export function WaveformVisualizer({
  isPlaying = false,
  bars = 60,
  height = 60,
  compact = false,
}: WaveformVisualizerProps) {
  const [barHeights, setBarHeights] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial random heights
    const heights = Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
    setBarHeights(heights);
  }, [bars]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setBarHeights(prev => prev.map(h => Math.max(0.1, Math.min(1, h + (Math.random() - 0.5) * 0.3))));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="flex items-center gap-[2px] justify-between w-full" style={{ height: `${height}px` }}>
      {barHeights.map((h, i) => (
        <motion.div
          key={i}
          className={`
            ${compact ? 'w-[2px]' : 'flex-1'} rounded-full
            ${isPlaying ? 'bg-gradient-to-t from-[#6366F1] via-[#8B5CF6] to-[#EC4899]' : 'bg-[#404040]'}
          `}
          animate={{
            height: `${h * 100}%`,
            opacity: isPlaying ? 1 : 0.5,
          }}
          transition={{
            height: { duration: 0.1 },
            opacity: { duration: 0.3 },
          }}
        />
      ))}
    </div>
  );
}

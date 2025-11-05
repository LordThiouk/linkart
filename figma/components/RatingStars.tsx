import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  reviewCount?: number;
}

export function RatingStars({ rating, size = 'md', showNumber = false, reviewCount }: RatingStarsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= Math.floor(rating)
                ? 'fill-[#F59E0B] text-[#F59E0B]'
                : star - rating < 1 && star - rating > 0
                  ? 'fill-[#F59E0B]/50 text-[#F59E0B]'
                  : 'text-[#404040]'
            }`}
          />
        ))}
      </div>
      {showNumber && (
        <span className={`${textSizeClasses[size]} text-[#D4D4D4]`}>
          {rating.toFixed(1)}
          {reviewCount !== undefined && <span className="text-[#A3A3A3]"> ({reviewCount})</span>}
        </span>
      )}
    </div>
  );
}

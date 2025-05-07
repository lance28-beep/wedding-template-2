'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface PrenupVideoProps {
  onVideoPlay: () => void;
  onVideoPause: () => void;
}

export const PrenupVideo = ({ onVideoPlay, onVideoPause }: PrenupVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        onVideoPause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Error playing video:', error);
        });
        onVideoPlay();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-rose-200">
      {/* Video Container */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/audio/prenup/Jason Abalos and Vickie Rushton ｜ On Site Wedding Film by Nice Print Photography.mp4"
          poster="/background/background.png"
          onClick={togglePlay}
        />
        
        {/* Play/Pause Button Overlay - Only show when video is not playing */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors duration-300"
            aria-label="Play video"
          >
            <Play className="w-16 h-16 text-white" />
          </button>
        )}
      </div>

      {/* Video Details */}
      <div className="p-6">
        <h3 className="text-2xl font-serif text-rose-800 mb-2">
          Our Love Story in Motion
        </h3>
        <p className="text-gray-600 mb-4">
          Watch our prenup video, beautifully captured by Nice Print Photography. 
          A glimpse into our journey of love, laughter, and beautiful moments together.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Duration: 3:45</span>
          <span>•</span>
          <span>1080p HD</span>
        </div>
      </div>
    </div>
  );
}; 
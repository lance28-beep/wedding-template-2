'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

const SpotifyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize audio and user interaction listener
  useEffect(() => {
    if (!isClient) return;

    // Create audio element
    audioRef.current = new Audio('/audio/[MV] BSS(부석순)(SEVENTEEN) - The Reasons of My Smiles(자꾸만 웃게 돼).mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Handler for first user interaction
    const handleUserInteraction = () => {
      if (!hasScrolled && audioRef.current) {
        setHasScrolled(true);
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
        setIsPlaying(true);
        // Remove all listeners after first interaction
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isClient, hasScrolled]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Method to pause audio (called by video component)
  const pauseAudio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Method to resume audio (called by video component)
  const resumeAudio = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
    }
  };

  // Don't render anything on the server
  if (!isClient) return null;

  return (
    <div className="flex items-center gap-3 bg-black/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/10">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#1DB954] flex items-center justify-center">
          <SpotifyIcon />
        </div>
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">
            BSS (SEVENTEEN)
          </span>
          <span className="text-gray-400 text-xs">
            The Reasons of My Smiles
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
        <button
          onClick={togglePlay}
          className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

// Export methods for video component to use
export const audioPlayerMethods = {
  pauseAudio: () => {
    if (typeof window !== 'undefined') {
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.pause();
      }
    }
  },
  resumeAudio: () => {
    if (typeof window !== 'undefined') {
      const audioElement = document.querySelector('audio');
      if (audioElement) {
        audioElement.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
    }
  }
}; 
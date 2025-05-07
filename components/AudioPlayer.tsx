'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

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
  const [volume, setVolume] = useState(0.5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

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
    audioRef.current.volume = volume;

    // Handler for first user interaction
    const handleUserInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          toast.error('Unable to play audio. Please try again.');
        });
        setIsPlaying(true);
        // Remove all listeners after first interaction
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('keydown', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      }
    };

    // Add event listeners for user interaction
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    // Add event listeners for audio state changes
    const audio = audioRef.current;
    audio.addEventListener('play', () => setIsPlaying(true));
    audio.addEventListener('pause', () => setIsPlaying(false));
    audio.addEventListener('volumechange', () => {
      setIsMuted(audio.muted);
      setVolume(audio.volume);
    });

    return () => {
      // Cleanup event listeners
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      audio.removeEventListener('play', () => setIsPlaying(true));
      audio.removeEventListener('pause', () => setIsPlaying(false));
      audio.removeEventListener('volumechange', () => {
        setIsMuted(audio.muted);
        setVolume(audio.volume);
      });
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [isClient, hasInteracted, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        toast.error('Unable to play audio. Please try again.');
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    
    // Show volume toast
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    
    volumeTimeoutRef.current = setTimeout(() => {
      toast.info(`Volume: ${Math.round(newVolume * 100)}%`, {
        duration: 1000,
      });
    }, 100);
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
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-white/70 hover:text-white transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 accent-rose-500"
            aria-label="Volume control"
          />
        </div>
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
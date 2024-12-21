import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import type { SubtitleEntry, VideoState } from '../types';

interface VideoPlayerProps {
  videoUrl: string | null;
  currentSubtitle: SubtitleEntry | null;
  onTimeUpdate: (state: VideoState) => void;
}

export function VideoPlayer({ videoUrl, currentSubtitle, onTimeUpdate }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      onTimeUpdate({
        currentTime: video.currentTime,
        duration: video.duration,
        isPlaying: !video.paused,
      });
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handleTimeUpdate);
    video.addEventListener('pause', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handleTimeUpdate);
      video.removeEventListener('pause', handleTimeUpdate);
    };
  }, [onTimeUpdate]);

  const handlePlayPause = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime -= 5;
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime += 5;
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-lg"
        controls={false}
        src={videoUrl || undefined}
      />
      
      {currentSubtitle && (
        <div className="absolute bottom-16 left-0 right-0 text-center">
          <div className="inline-block bg-black/75 text-white px-4 py-2 rounded-lg text-lg">
            {currentSubtitle.text}
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/75 rounded-full px-6 py-2">
        <button
          onClick={skipBackward}
          className="text-white hover:text-blue-400 transition-colors"
        >
          <SkipBack size={24} />
        </button>
        
        <button
          onClick={handlePlayPause}
          className="text-white hover:text-blue-400 transition-colors"
        >
          {videoRef.current?.paused ? (
            <Play size={32} />
          ) : (
            <Pause size={32} />
          )}
        </button>
        
        <button
          onClick={skipForward}
          className="text-white hover:text-blue-400 transition-colors"
        >
          <SkipForward size={24} />
        </button>
      </div>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { IMAGES, SAMPLE_VIDEO_URL } from '../constants';

interface VideoPlayerProps {
  earnedTimeSeconds: number;
  onConsumeTime: () => void;
  onRequestMoreTime: () => void;
  onFeatureClick: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ earnedTimeSeconds, onConsumeTime, onRequestMoreTime, onFeatureClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [matchTime, setMatchTime] = useState(2052); // Starts at ~34:12
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeIntervalRef = useRef<number | null>(null);

  const hasTime = earnedTimeSeconds > 0;

  // Format seconds to MM:SS
  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (hasTime) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        // Trigger generic "Get more time" flow if they try to play with 0 time
        onRequestMoreTime();
      }
    }
  };

  // Logic loop when playing
  useEffect(() => {
    if (isPlaying && hasTime) {
      timeIntervalRef.current = window.setInterval(() => {
        // Increment match time for realism
        setMatchTime(prev => prev + 1);
        // Consume earned time
        onConsumeTime();
      }, 1000);
    } else if (!hasTime && isPlaying) {
      // Force pause if time runs out
      setIsPlaying(false);
      videoRef.current?.pause();
    }

    return () => {
      if (timeIntervalRef.current) {
        clearInterval(timeIntervalRef.current);
      }
    };
  }, [isPlaying, hasTime, onConsumeTime]);

  return (
    <div className="flex flex-col w-full rounded-2xl overflow-hidden shadow-xl bg-zinc-900 border border-zinc-800">
      {/* Video Display Area */}
      <div className="relative aspect-video bg-black group">
        
        <video
          ref={videoRef}
          src={SAMPLE_VIDEO_URL}
          className="w-full h-full object-cover"
          loop
          playsInline
          poster={IMAGES.SOCCER_MATCH}
        />
        
        {/* Overlay: Out of Time */}
        {!hasTime && (
          <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center backdrop-blur-sm">
            <h3 className="text-white text-3xl font-bold mb-4">Out of Time!</h3>
            <p className="text-zinc-400 mb-6 text-center max-w-md px-4">
              Your watch time has expired. Watch ads to continue streaming this match.
            </p>
            <button 
              onClick={onRequestMoreTime}
              className="bg-brand-green hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Get More Time
            </button>
          </div>
        )}

        {/* LIVE Badge */}
        <div className="absolute top-4 right-4 z-10 bg-brand-red/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-md backdrop-blur-sm animate-pulse">
          <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
          LIVE
        </div>

        {/* Play Overlay (Center) - Visible when paused and has time */}
        {!isPlaying && hasTime && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 hover:bg-black/70 hover:scale-110 transition-all cursor-pointer"
            >
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        {/* Video Controls Overlay (Bottom) */}
        <div className="absolute bottom-0 left-0 w-full z-10 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="text-white hover:text-brand-green focus:outline-none transition-colors"
          >
            {isPlaying ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          {/* Progress Bar (Visual Only) */}
          <div className="flex-grow h-1.5 bg-gray-600 rounded-full cursor-pointer overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-brand-red rounded-full"
              style={{ width: '38%' }}
            ></div>
            <div 
               className="absolute top-0 h-full w-3 bg-white rounded-full shadow -ml-1.5 hover:scale-125 transition-transform"
               style={{ left: '38%' }}
            ></div>
          </div>
          
          <div className="text-xs text-gray-300 font-mono">
            {formatTime(matchTime)} / 90:00
          </div>

          {/* Full Screen Icon - Functionality in Development */}
          <button 
            onClick={onFeatureClick}
            className="text-white hover:text-brand-green focus:outline-none transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Control Bar Below Video */}
      <div className="bg-zinc-900 p-4 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-800 gap-4">
        
        {/* Score Pill */}
        <div className="bg-zinc-800 rounded-full px-6 py-2 border border-zinc-700 shadow-inner flex items-center space-x-3">
          <span className="text-blue-400 font-bold text-lg">FCB</span>
          <span className="text-white font-mono text-xl font-black">3 - 2</span>
          <span className="text-white font-bold text-lg">RMA</span>
        </div>

        {/* CTA Button */}
        <button 
          onClick={onRequestMoreTime}
          className="bg-brand-green hover:bg-green-500 text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-green-900/20 transform hover:-translate-y-0.5 transition-all flex items-center"
        >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Watch Ads to Earn Time
        </button>

        {/* Earned Time Text */}
        <div className={`font-medium text-sm flex items-center transition-colors ${hasTime ? 'text-white' : 'text-red-500 animate-pulse'}`}>
          <span className="text-zinc-400 mr-2">Earned Time:</span>
          <span className="font-mono text-lg">{formatTime(earnedTimeSeconds)}</span>
        </div>

      </div>
    </div>
  );
};

export default VideoPlayer;
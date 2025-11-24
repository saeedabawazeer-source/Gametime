import React, { useState, useEffect } from 'react';
import { IMAGES } from '../constants';

interface AdOverlayProps {
  totalAds: number;
  onComplete: () => void;
}

const AD_DURATION = 5; // seconds per ad

// Mock ad content cycling
const AD_IMAGES = [IMAGES.AD_PRODUCT_1, IMAGES.AD_PRODUCT_2, IMAGES.AD_PRODUCT_3];
const AD_HEADLINES = [
  "Premium Headphones - Hear the Victory",
  "Luxury Timepieces - Time is Money",
  "Capture the Moment - Retro Cam",
  "Hydrate Like a Pro - Energy Drink",
  "Speed Demon Sneakers - Run Fast"
];

const AdOverlay: React.FC<AdOverlayProps> = ({ totalAds, onComplete }) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(1);
  const [timeLeft, setTimeLeft] = useState(AD_DURATION);
  const [currentAdImage, setCurrentAdImage] = useState(AD_IMAGES[0]);
  const [currentHeadline, setCurrentHeadline] = useState(AD_HEADLINES[0]);

  useEffect(() => {
    // Randomize content for the current ad
    setCurrentAdImage(AD_IMAGES[Math.floor(Math.random() * AD_IMAGES.length)]);
    setCurrentHeadline(AD_HEADLINES[Math.floor(Math.random() * AD_HEADLINES.length)]);
  }, [currentAdIndex]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Ad finished
      if (currentAdIndex < totalAds) {
        // Next Ad
        setCurrentAdIndex(currentAdIndex + 1);
        setTimeLeft(AD_DURATION);
      } else {
        // All Ads Finished
        onComplete();
      }
    }
  }, [timeLeft, currentAdIndex, totalAds, onComplete]);

  const progressPercent = ((AD_DURATION - timeLeft) / AD_DURATION) * 100;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
      {/* Background with blur */}
      <div className="absolute inset-0 opacity-30">
        <img src={currentAdImage} className="w-full h-full object-cover blur-xl" alt="Ad BG" />
      </div>

      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Top Bar Info */}
        <div className="flex justify-between items-center text-white mb-6">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 font-mono">
            Ad {currentAdIndex} of {totalAds}
          </div>
          <div className="text-zinc-400 text-sm font-medium uppercase tracking-widest">
            Advertisement
          </div>
        </div>

        {/* Main Ad Content */}
        <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 flex flex-col md:flex-row h-[50vh] min-h-[400px]">
          {/* Ad Image */}
          <div className="w-full md:w-1/2 bg-white relative">
             <img 
               src={currentAdImage} 
               alt="Ad" 
               className="w-full h-full object-cover"
             />
             <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 text-xs rounded">
                Sponsored
             </div>
          </div>

          {/* Ad Copy & Timer */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between items-center text-center">
            <div className="mt-8">
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{currentHeadline}</h2>
              <p className="text-zinc-400">Experience the difference today. Limited time offer for GameTime users.</p>
            </div>

            <div className="w-full mb-8">
               <div className="text-5xl font-mono font-black text-brand-green mb-2">
                 {timeLeft}s
               </div>
               <p className="text-zinc-500 text-sm uppercase mb-6">Until Next Ad</p>

               {/* Progress Bar */}
               <div className="h-2 bg-zinc-800 rounded-full overflow-hidden w-full">
                 <div 
                   className="h-full bg-brand-green transition-all duration-1000 linear"
                   style={{ width: `${progressPercent}%` }}
                 ></div>
               </div>
            </div>
            
            <button disabled className="text-zinc-600 text-sm cursor-not-allowed hover:text-zinc-500 transition-colors">
              Skip Ad in {timeLeft}s
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdOverlay;
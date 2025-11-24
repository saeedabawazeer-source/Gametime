import React, { useState } from 'react';
import Header from './components/Header';
import BannerAd from './components/BannerAd';
import VideoPlayer from './components/VideoPlayer';
import AdSidebar from './components/AdSidebar';
import AdOverlay from './components/AdOverlay';
import FeaturePopup from './components/FeaturePopup';
import { IMAGES } from './constants';

const App: React.FC = () => {
  // Global State
  const [earnedTime, setEarnedTime] = useState(45 * 60); // 45 minutes in seconds
  
  // Ad Session State
  const [isAdOverlayOpen, setIsAdOverlayOpen] = useState(false);
  const [adSessionData, setAdSessionData] = useState<{ totalAds: number, rewardMinutes: number }>({ totalAds: 0, rewardMinutes: 0 });
  
  // Feature Popup State
  const [showFeaturePopup, setShowFeaturePopup] = useState(false);

  const handleConsumeTime = () => {
    setEarnedTime((prev) => Math.max(0, prev - 1));
  };

  const handleStartAdSession = (adsCount: number, rewardMinutes: number) => {
    setAdSessionData({ totalAds: adsCount, rewardMinutes });
    setIsAdOverlayOpen(true);
  };

  const handleAdSessionComplete = () => {
    setIsAdOverlayOpen(false);
    // Add reward
    setEarnedTime((prev) => prev + (adSessionData.rewardMinutes * 60));
  };

  const handleExternalAdClick = () => {
    // Add 5 minutes (300 seconds) for clicking the external ad
    setEarnedTime((prev) => prev + (5 * 60));
  };

  const handleFeatureNotReady = () => {
    setShowFeaturePopup(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans pb-12 pt-20">
      
      {/* Feature In Development Popup */}
      {showFeaturePopup && (
        <FeaturePopup onClose={() => setShowFeaturePopup(false)} />
      )}

      {/* AdOverlay Modal */}
      {isAdOverlayOpen && (
        <AdOverlay 
          totalAds={adSessionData.totalAds} 
          onComplete={handleAdSessionComplete} 
        />
      )}

      <Header onFeatureClick={handleFeatureNotReady} />

      {/* Main Content Container */}
      <main className="w-full max-w-[1800px] mx-auto px-4 sm:px-6">
        
        {/* The Giant White Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-4 md:p-8 space-y-8">
            
            {/* Top Banner Ad */}
            <section>
              <BannerAd 
                position="top"
                headline="Shirts In A Can!"
                subHeadline="- Ad"
                imageUrl={IMAGES.SHIRT_IN_CAN}
                gradientClass="bg-gradient-to-r from-blue-600 to-indigo-500"
                ctaText="Click For 5 More Minutes Of Watch Time"
                ctaLink="https://cannedgoodsclothing.com/"
                onAdClick={handleExternalAdClick}
              />
            </section>

            {/* Middle Section: Video + Sidebar */}
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
              
              {/* Left Column: Video Player */}
              <div className="lg:col-span-3">
                <VideoPlayer 
                  earnedTimeSeconds={earnedTime}
                  onConsumeTime={handleConsumeTime}
                  onRequestMoreTime={() => handleStartAdSession(1, 5)} // Default 1 ad for 5 mins if clicked
                  onFeatureClick={handleFeatureNotReady}
                />
              </div>

              {/* Right Column: Ad Sidebar */}
              <div className="lg:col-span-1">
                 <AdSidebar onStartAdSession={handleStartAdSession} />
              </div>

            </section>

            {/* Bottom Banner Ad */}
            <section>
              <BannerAd 
                position="bottom"
                headline="RUN FASTER, JUMP HIGHER - Ad"
                imageUrl={IMAGES.SHOES}
                gradientClass="bg-gradient-to-r from-emerald-600 to-teal-500"
                onAdClick={handleFeatureNotReady} // Triggers popup as it has no specific action coded
              />
            </section>

          </div>
        </div>
      </main>

      <footer className="mt-12 text-center text-zinc-600 text-sm">
        <p>© 2024 GameTime Streaming. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
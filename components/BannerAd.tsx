
import React from 'react';

interface BannerAdProps {
  position: 'top' | 'bottom';
  headline: string;
  subHeadline?: string;
  imageUrl: string;
  gradientClass: string;
  ctaText?: string;
  ctaLink?: string;
  onAdClick?: () => void;
}

const BannerAd: React.FC<BannerAdProps> = ({ 
  position, 
  headline, 
  subHeadline, 
  imageUrl, 
  gradientClass, 
  ctaText = "Click For 5 More Minutes Watch Time",
  ctaLink,
  onAdClick
}) => {
  const isTop = position === 'top';

  const ButtonContent = () => (
    <>
      <span className="w-2 h-2 bg-brand-green rounded-full mr-2 animate-pulse"></span>
      {ctaText}
    </>
  );

  const buttonClasses = "bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-bold py-2 px-4 rounded-full transition-all flex items-center shadow-lg group";

  return (
    <div className={`relative w-full overflow-hidden rounded-xl md:rounded-2xl shadow-lg ${gradientClass} flex flex-col md:flex-row items-center justify-between px-6 py-4 md:px-12 md:py-8 min-h-[200px] md:min-h-[240px]`}>
      
      {/* Content Layout changes based on 'position' purely to match the description aesthetics */}
      {isTop ? (
        <>
          {/* Top Ad: Image Left, Text Right */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8 transform -rotate-12 transition-transform hover:rotate-0 duration-500">
            <img 
              src={imageUrl} 
              alt="Ad Product" 
              className="h-32 md:h-40 object-contain drop-shadow-2xl"
            />
          </div>
          <div className="flex-grow text-center md:text-right z-10 flex flex-col items-center md:items-end">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide uppercase italic drop-shadow-md">
              {headline}
            </h2>
            {subHeadline && (
              <p className="text-white/80 text-sm md:text-base font-medium mt-1 mb-4">
                {subHeadline}
              </p>
            )}
            
            {ctaLink ? (
              <a 
                href={ctaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={buttonClasses}
                onClick={onAdClick}
              >
                <ButtonContent />
              </a>
            ) : (
              <button className={buttonClasses} onClick={onAdClick}>
                <ButtonContent />
              </button>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Bottom Ad: Text Left, Image Right */}
          <div className="flex-grow text-center md:text-left z-10 mb-4 md:mb-0 flex flex-col items-center md:items-start">
             <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide uppercase italic drop-shadow-md">
              {headline}
            </h2>
            {subHeadline && (
              <p className="text-white/80 text-sm md:text-base font-medium mt-1 mb-4">
                {subHeadline}
              </p>
            )}
            
            {ctaLink ? (
              <a 
                href={ctaLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={buttonClasses}
                onClick={onAdClick}
              >
                <ButtonContent />
              </a>
            ) : (
              <button className={buttonClasses} onClick={onAdClick}>
                <ButtonContent />
              </button>
            )}
          </div>
          <div className="flex-shrink-0 md:ml-8 transform rotate-6 transition-transform hover:rotate-0 duration-500">
            <img 
              src={imageUrl} 
              alt="Ad Product" 
              className="h-32 md:h-40 object-contain drop-shadow-2xl"
            />
          </div>
        </>
      )}

      {/* Decorative background elements for that "sports energy" */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none mix-blend-overlay">
          <div className="absolute top-[-50%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[400px] h-[400px] rounded-full bg-black blur-3xl"></div>
      </div>
    </div>
  );
};

export default BannerAd;

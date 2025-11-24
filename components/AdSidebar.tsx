import React from 'react';
import { AD_BLOCKS_DATA } from '../constants';

interface AdSidebarProps {
  onStartAdSession: (adsCount: number, rewardMinutes: number) => void;
}

const AdSidebar: React.FC<AdSidebarProps> = ({ onStartAdSession }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-5 shadow-xl h-full flex flex-col border border-zinc-800">
      <h3 className="text-white text-xl font-bold mb-5 flex items-center">
        Ad Blocks
        <span className="ml-2 w-2 h-2 bg-brand-green rounded-full animate-pulse"></span>
      </h3>

      <div className="flex flex-col space-y-4 flex-grow">
        {AD_BLOCKS_DATA.map((block) => (
          <div 
            key={block.id} 
            className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 hover:border-zinc-600 transition-colors group"
          >
            <h4 className="text-white font-medium mb-3 text-sm md:text-base">
              {block.title}
            </h4>
            
            {/* Custom Progress Bar */}
            <div className="w-full h-3 bg-zinc-900 rounded-full mb-4 overflow-hidden shadow-inner border border-zinc-900/50">
              <div 
                className="h-full bg-brand-green rounded-full transition-all duration-1000 ease-out group-hover:brightness-110"
                style={{ width: `${block.progress}%` }}
              ></div>
            </div>

            <button 
              onClick={() => onStartAdSession(block.adsCount, block.rewardMinutes)}
              className="w-full bg-brand-green hover:bg-green-500 text-white font-semibold py-2 rounded-lg transition-all shadow-lg shadow-green-900/20 active:scale-95 text-sm uppercase tracking-wide"
            >
              {block.buttonText}
            </button>
          </div>
        ))}
      </div>
      
      {/* Decorative footer info */}
      <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
        <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Premium Access</p>
      </div>
    </div>
  );
};

export default AdSidebar;

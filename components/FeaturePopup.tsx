import React, { useState } from 'react';

interface FeaturePopupProps {
  onClose: () => void;
}

const FeaturePopup: React.FC<FeaturePopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the email here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transform scale-100 animate-in zoom-in-95 duration-200">
        
        <div className="bg-navy-900 p-6 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-50%] left-[-20%] w-40 h-40 bg-brand-green/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 bg-brand-red/20 rounded-full blur-xl"></div>
          
          <div className="relative z-10 mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">Feature In Development</h3>
          <p className="text-zinc-400 text-sm">We're building something awesome.</p>
        </div>

        <div className="p-6 md:p-8">
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            This feature is currently being built by our team. 
            <br/>
            <span className="font-semibold text-navy-800">Sign Up To Our News Letter To Stay Updated</span>
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 transition-all"
                required
              />
            </div>
            <button 
                type="submit"
                className="w-full bg-brand-green hover:bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/10 transform transition-transform active:scale-95"
            >
                Notify Me
            </button>
          </form>

          <button 
              onClick={onClose}
              className="w-full mt-4 text-gray-400 text-sm hover:text-navy-900 font-medium transition-colors"
          >
              No thanks, I'll wait
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturePopup;
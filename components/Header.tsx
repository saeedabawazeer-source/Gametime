import React, { useState } from 'react';
import { NavLink } from '../types';

interface HeaderProps {
  onFeatureClick: () => void;
}

const LINKS: NavLink[] = [
  { label: 'Home', href: '#', active: false },
  { label: 'Live', href: '#', active: true },
  { label: 'Sports', href: '#', active: false },
  { label: 'Schedule', href: '#', active: false },
  { label: 'Profile', href: '#', active: false },
];

const Header: React.FC<HeaderProps> = ({ onFeatureClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFeatureClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-navy-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Area */}
        <div className="flex-shrink-0 flex items-center">
          <a href="#" onClick={handleLinkClick} className="relative group">
            <span className="text-2xl font-bold tracking-tight font-sans">
              GameTime
            </span>
            {/* The Live Dot - positioned relative to the last 'e' roughly */}
            <span className="absolute top-0 -right-2.5 h-2.5 w-2.5 rounded-full bg-brand-red border border-navy-900 animate-pulse"></span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className={`text-sm font-medium transition-colors hover:text-brand-green ${
                link.active ? 'text-brand-green' : 'text-gray-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none p-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-navy-800 border-t border-navy-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleLinkClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  link.active ? 'text-brand-green bg-navy-900' : 'text-gray-300 hover:text-white hover:bg-navy-700'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
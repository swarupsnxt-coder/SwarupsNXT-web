import React, { useState, useEffect } from 'react';
import Logo from './Logo.tsx';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'Live Demo', href: '#demo' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Industries', href: '#industries' },
    { name: 'ROI', href: '#roi' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = targetId ? document.getElementById(targetId) : null;
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else if (href === '#' || !targetId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Enhanced Tooltip Class with better contrast, positioning, and animation
  const tooltipClass = "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1.5 bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-950 text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 transform translate-y-[-8px] group-hover:translate-y-0 group-focus-visible:translate-y-0 pointer-events-none whitespace-nowrap shadow-2xl z-[100] border border-white/10 dark:border-brand-900/10 before:content-[''] before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:border-b-brand-900 dark:before:border-b-accent-500";

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-light dark:glass-dark shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => handleScrollToSection(e, '#')}
          className="cursor-pointer flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-xl"
          aria-label="Swarups NXT Home"
        >
          <div className="h-8 md:h-10 lg:h-12 transition-all duration-500 transform group-hover:scale-110">
            <Logo className="h-full w-auto transition-all duration-500" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="font-bold text-gray-700 dark:text-gray-100 hover:text-accent-500 dark:hover:text-accent-400 transition-colors cursor-pointer text-sm tracking-tight focus:outline-none focus-visible:text-accent-500 rounded px-1"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="group relative p-2.5 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-brand-900 dark:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-describedby="theme-tooltip"
          >
            {isDarkMode ? <i className="fas fa-sun text-lg"></i> : <i className="fas fa-moon text-lg"></i>}
            <span id="theme-tooltip" role="tooltip" className={tooltipClass}>
              {isDarkMode ? "Activate Light UI" : "Activate Dark UI"}
            </span>
          </button>
          
          <a 
            href="https://wa.me/917550007208" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-950 px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-brand-900/10 dark:shadow-accent-500/20 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500"
            aria-describedby="whatsapp-tooltip"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            <span>Talk to Expert</span>
            <span id="whatsapp-tooltip" role="tooltip" className={tooltipClass}>
              Chat with our AI Strategists
            </span>
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="group relative p-2 rounded-full text-brand-900 dark:text-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <i className="fas fa-sun text-xl"></i> : <i className="fas fa-moon text-xl"></i>}
            <span role="tooltip" className={`${tooltipClass} md:hidden group-focus-visible:opacity-100`}>
               {isDarkMode ? "Light UI" : "Dark UI"}
            </span>
          </button>
          <button 
            className="text-brand-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 p-2 rounded-lg bg-gray-100 dark:bg-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-light dark:glass-dark border-t border-gray-200 dark:border-slate-700 shadow-2xl p-6 flex flex-col space-y-4 animate-fade-in-up">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-lg font-bold text-gray-800 dark:text-gray-50 p-3 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/917550007208" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full text-center bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-950 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-transform"
          >
            <i className="fab fa-whatsapp mr-2 text-lg"></i>
            Talk to Expert
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
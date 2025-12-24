import React from 'react';

const Hero: React.FC = () => {
  const handleScrollAndTrigger = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Dispatch event to trigger voice playback after a short delay for scrolling
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('nxt-trigger-voice'));
      }, 800);
    }
  };

  const handleHeroAction = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[85vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden">
      
      {/* Cinematic AI/Robot Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        
        {/* Pulsing Neural Fog Overlay */}
        <div className="absolute inset-0 z-10 animate-pulse-slow">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(255,255,255,0.4)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.6)_100%)]"></div>
        </div>

        {/* Base Contrast Layer */}
        <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/50 z-20 backdrop-blur-[1px] transition-colors duration-500"></div>
        
        {/* Mobile-Specific Gradient for Text Clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white dark:from-slate-950/90 dark:via-transparent dark:to-slate-900 z-30"></div>
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-80 sm:opacity-95 object-center scale-[1.05]"
        >
          <source src="https://videos.pexels.com/video-files/20400845/20400845-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-40 pt-16 sm:pt-20 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        <div className="space-y-6 sm:space-y-8">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-md text-brand-900 dark:text-blue-200 text-[10px] sm:text-xs font-black uppercase tracking-widest border border-white/40 dark:border-blue-700/30 mb-2 sm:mb-4 shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-accent-500"></span>
            </span>
            Neural Digital Workforce v2.5 Online
          </div>
          
          <h1 className="animate-fade-in-up delay-200 text-5xl sm:text-6xl md:text-8xl font-heading font-black text-brand-900 dark:text-white leading-[1.05] tracking-tight">
            Stop Chatting. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-600 via-blue-600 to-accent-600 bg-300% animate-gradient">
              Start Closing.
            </span>
          </h1>
          
          <p className="animate-fade-in-up delay-400 text-lg sm:text-xl md:text-2xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto leading-relaxed font-bold px-4">
            Deploy hyper-realistic AI Voice Agents that qualify leads, book meetings, and 
            <span className="text-accent-600 dark:text-accent-400 mx-1 underline decoration-accent-500/30">increase ROI by 4x</span> 
            instantly.
          </p>
          
          <div className="animate-fade-in-up delay-600 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center pt-8 sm:pt-10 px-4 w-full">
            <a 
              href="#chat-bot"
              onClick={(e) => handleHeroAction(e, 'chat-bot')}
              className="group relative px-8 sm:px-10 py-5 bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-950 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 pl-[0.5em]"
            >
              Meet Your AI Agent 
              <i className="fas fa-microchip group-hover:rotate-12 transition-transform"></i>
            </a>
            
            <a 
              href="#voice-studio"
              onClick={(e) => handleScrollAndTrigger(e, 'voice-studio')}
              className="group px-8 sm:px-10 py-5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md text-brand-900 dark:text-white rounded-2xl font-black uppercase tracking-widest text-sm border-2 border-gray-100 dark:border-slate-700 hover:border-accent-500 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 pl-[0.5em]"
            >
              <i className="fas fa-play-circle text-accent-500 text-xl group-hover:scale-110 transition-transform"></i>
              Live Audition
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 dark:from-slate-900 to-transparent z-40 pointer-events-none"></div>
    </div>
  );
};

export default Hero;
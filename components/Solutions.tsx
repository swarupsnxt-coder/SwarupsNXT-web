import React from 'react';

const solutions = [
  {
    icon: "fa-headset",
    title: "Voice Agents",
    desc: "Human-like AI that handles inbound support and outbound sales calls with sub-200ms latency.",
    img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-robot",
    title: "Smart Chatbots",
    desc: "Omnichannel reasoning bots that qualify leads and sync data instantly with your CRM matrix.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-hashtag",
    title: "Social Media Bots",
    desc: "Autonomous engagement on Instagram, Facebook, and LinkedIn. Handle DMs and comments to convert social traffic into leads.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-rocket",
    title: "Auto-Outbound",
    desc: "Proactive agents that reach out to cold leads, qualify interest, and book meetings 24/7.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-magnifying-glass-chart",
    title: "Sentiment QA",
    desc: "Automatically audit 100% of calls. Detect frustration, compliance risks, and closing signals.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-ticket-simple",
    title: "CRM & Ticketing",
    desc: "Automated helpdesk synergy. Instantly log interactions, update tickets, and nurture leads in your existing stack.",
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop"
  }
];

const Solutions: React.FC = () => {
  const handleDeployClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerOffset = 80;
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-950/30 text-accent-600 dark:text-accent-400 text-[10px] font-black uppercase tracking-widest border border-accent-200 dark:border-accent-900/40">
           <i className="fas fa-layer-group"></i> Ecosystem Overview
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-black text-brand-900 dark:text-white mb-4 tracking-tight">
          Complete <span className="text-accent-500">Intelligence Stack</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-bold">
          Everything you need to architect a fully autonomous enterprise, from reactive support to proactive growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solutions.map((item, index) => (
          <div 
            key={index}
            className="group relative bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-accent-500/50 overflow-hidden"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-700">
               <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale" loading="lazy" />
            </div>
            
            <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-accent-500 text-3xl mb-8 group-hover:bg-accent-500 group-hover:text-white transition-all duration-500 shadow-md group-hover:shadow-accent-500/30 group-hover:rotate-6">
                  <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-brand-900 dark:text-white mb-4 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-bold">
                  {item.desc}
                </p>
                
                <a 
                  href="#contact"
                  onClick={handleDeployClick}
                  className="mt-8 pt-8 border-t border-gray-50 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent-600 dark:text-accent-400 cursor-pointer"
                >
                  <span>Explore Solution</span>
                  <i className="fas fa-arrow-right-long animate-bounce-x"></i>
                </a>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-accent-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;
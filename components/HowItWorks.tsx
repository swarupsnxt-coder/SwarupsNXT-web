import React from 'react';

const steps = [
  {
    number: "01",
    icon: "fa-drafting-compass",
    title: "Architect",
    desc: "We define your AI's persona, knowledge base, and specific business logic for your industry.",
    color: "from-blue-600 to-indigo-600"
  },
  {
    number: "02",
    icon: "fa-plug-circle-bolt",
    title: "Integrate",
    desc: "Connect the AI to your existing CRM, calendars, and SOPs for seamless data synchronization.",
    color: "from-accent-500 to-cyan-600"
  },
  {
    number: "03",
    icon: "fa-rocket",
    title: "Deploy",
    desc: "Your Digital Employee goes live across voice lines, web chat, and WhatsApp in under 48 hours.",
    color: "from-indigo-600 to-purple-600"
  },
  {
    number: "04",
    icon: "fa-chart-line",
    title: "Scale",
    desc: "Handle unlimited concurrent calls and leads while our system optimizes performance in real-time.",
    color: "from-emerald-500 to-teal-600"
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-brand-50/30 dark:bg-slate-900/40 relative overflow-hidden scroll-mt-28">
      {/* Decorative connecting lines (Desktop only) */}
      <div className="absolute top-[55%] left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-gray-200 dark:border-slate-800 hidden lg:block z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-accent-600 dark:text-accent-400 text-[10px] font-black uppercase tracking-[0.2em] border border-gray-100 dark:border-slate-700 shadow-sm">
             <i className="fas fa-microchip"></i> The Implementation Protocol
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-brand-900 dark:text-white tracking-tight">
            How We <span className="text-accent-500">Scale You.</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-bold text-lg">
            From architecture to automation in four clinical phases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="group relative">
              {/* Card Container */}
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col items-center text-center relative z-10">
                
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 flex items-center justify-center font-black text-brand-900 dark:text-accent-500 shadow-md group-hover:scale-110 transition-transform">
                  {step.number}
                </div>

                {/* Icon Circle */}
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-3xl mb-8 shadow-xl shadow-indigo-500/10 group-hover:rotate-6 transition-all duration-500`}>
                  <i className={`fas ${step.icon}`}></i>
                </div>

                <h3 className="text-2xl font-black text-brand-900 dark:text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-bold">
                  {step.desc}
                </p>

                {/* Progress Dot (Bottom) */}
                <div className="mt-8 w-3 h-3 rounded-full bg-gray-200 dark:bg-slate-800 group-hover:bg-accent-500 group-hover:shadow-[0_0_10px_#2BB6C6] transition-all"></div>
              </div>

              {/* Hover Glow Path */}
              <div className="absolute inset-0 bg-accent-500/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-20 flex justify-center">
          <a 
            href="#contact" 
            className="group flex items-center gap-4 px-8 py-4 bg-brand-900 dark:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-accent-600 transition-all hover:scale-105 shadow-xl"
          >
            Start Your Architecture
            <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
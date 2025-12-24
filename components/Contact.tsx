import React, { useState, useEffect } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Sales Inquiry',
    message: '',
    website: '' // Honeypot field for bot prevention
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulated progress for perceived performance
  useEffect(() => {
    let interval: any;
    if (status === 'submitting') {
      setLoadingProgress(0);
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 15;
        });
      }, 150);
    } else {
      setLoadingProgress(0);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [status]);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true;
    return String(phone).match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
  };

  const performValidation = () => {
    const newErrors = {
      name: formData.name.trim().length < 3 ? 'Identity Profile must be at least 3 characters.' : '',
      email: !validateEmail(formData.email) ? 'Digital Uplink requires a valid email format.' : '',
      phone: !validatePhone(formData.phone) ? 'Voice Frequency format is invalid.' : '',
      message: formData.message.trim().length < 10 ? 'Project Parameters must be at least 10 characters.' : ''
    };
    setErrors(newErrors);
  };

  useEffect(() => {
    performValidation();
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setGeneralError(null);
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  };

  const isFormValid = !errors.name && !errors.email && !errors.phone && !errors.message && 
                    formData.name.trim().length >= 3 && 
                    validateEmail(formData.email) && 
                    formData.message.trim().length >= 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || status === 'submitting') return;

    if (formData.website !== '') {
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          subject: formData.subject,
          message: formData.message.trim()
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Uplink Interrupted.");
      }

      setLoadingProgress(100);
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', company: '', subject: 'Sales Inquiry', message: '', website: '' });
        setTouched({ name: false, email: false, phone: false, message: false });
      }, 500);
      
      setTimeout(() => setStatus('idle'), 6000);
      
    } catch (error: any) {
      console.error("Submission Failure:", error);
      setStatus('error');
      setGeneralError(error.message || "Neural Gateway Timeout.");
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const getInputClasses = (fieldName: keyof typeof errors | 'select') => {
    const base = "w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border-2 outline-none transition-all duration-300 ease-out placeholder-gray-400 text-gray-900 dark:text-white font-bold shadow-sm focus:shadow-xl hover:scale-[1.01] focus:scale-[1.015] transform-gpu";
    
    // For field names, check validation. For 'select' or other common UI, just use standard borders.
    const isError = fieldName !== 'select' && touched[fieldName as keyof typeof touched] && errors[fieldName as keyof typeof errors];
    const statusClass = isError
      ? "border-red-500/50 dark:border-red-500/30 bg-red-50/10" 
      : "border-gray-200 dark:border-slate-700 focus:border-accent-600 dark:focus:border-accent-400";
    
    const submittingClass = status === 'submitting' ? 'opacity-50 cursor-not-allowed' : '';
    return `${base} ${statusClass} ${submittingClass}`;
  };

  const ErrorLabel = ({ message, field }: { message: string, field: keyof typeof touched }) => {
    if (!touched[field] || !message) return null;
    return (
      <p className="mt-2 ml-2 text-[10px] font-black uppercase tracking-widest text-red-500 dark:text-red-400 flex items-center gap-2 animate-fade-in-up">
        <i className="fas fa-circle-exclamation"></i>
        {message}
      </p>
    );
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="lg:w-5/12 space-y-10">
          <div>
             <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent-100 dark:bg-accent-950/50 text-accent-700 dark:text-accent-400 text-xs font-black uppercase tracking-widest mb-6 border-2 border-accent-200 dark:border-accent-900/40">
                <i className={`fas ${status === 'submitting' ? 'fa-spinner fa-spin' : 'fa-satellite-dish'}`}></i> Uplink Terminal
             </div>
             <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-brand-900 dark:text-white mb-8 tracking-tighter">
                Scale Your <br/> <span className="text-accent-600 dark:text-accent-400">Intelligence.</span>
             </h2>
             <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-bold">
                Deploy your first AI employee in hours. Our engineers are standing by to architect your conversational workflow.
             </p>
          </div>

          <div className="space-y-6">
             {[
               { icon: "fa-paper-plane", label: "Signal Address", value: "hello@swarupsnxt.com", bg: "bg-blue-600" },
               { icon: "fa-phone-volume", label: "Voice Frequency", value: "+91 7550007208", bg: "bg-emerald-600" },
               { icon: "fa-map-location-dot", label: "Neural Base", value: "Chennai, TN, India", bg: "bg-indigo-600" }
             ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-800 hover:border-accent-500/30 transition-all shadow-sm">
                  <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center text-white shrink-0 shadow-lg`}>
                     <i className={`fas ${item.icon} text-lg`}></i>
                  </div>
                  <div>
                     <h4 className="font-black text-gray-400 dark:text-slate-500 text-[10px] uppercase tracking-[0.2em] mb-1">{item.label}</h4>
                     <p className="text-brand-900 dark:text-white font-black text-lg">{item.value}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:w-7/12 w-full">
           <div className="relative bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3.5rem] shadow-2xl border-4 border-gray-100 dark:border-slate-800 overflow-hidden group">
              
              {/* Submission Loading Bar */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gray-100 dark:bg-slate-800 z-50 transition-all duration-500 overflow-hidden ${status === 'submitting' ? 'opacity-100' : 'opacity-0'}`}>
                <div 
                  className="h-full bg-gradient-to-r from-accent-500 to-blue-600 transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>

              {status === 'success' && (
                 <div className="absolute inset-0 z-[60] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12 animate-fade-in-up">
                    <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mb-8 shadow-2xl shadow-green-500/40 animate-bounce">
                       <i className="fas fa-check-double"></i>
                    </div>
                    <h3 className="text-3xl font-black text-brand-900 dark:text-white mb-3 tracking-tighter">SIGNAL RECEIVED</h3>
                    <p className="text-gray-700 dark:text-gray-300 font-bold text-lg">Transmission successful. Our specialists will respond shortly.</p>
                 </div>
              )}

              <form onSubmit={handleSubmit} className={`space-y-8 relative z-10 transition-all duration-500 ${status === 'submitting' ? 'blur-[1px]' : ''}`}>
                 <div className="sr-only">
                    <label htmlFor="website">Internal Use Only</label>
                    <input 
                       type="text" id="website" name="website" tabIndex={-1} autoComplete="off" 
                       value={formData.website} onChange={handleChange} 
                    />
                 </div>

                 {generalError && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 rounded-2xl border-2 border-red-200 dark:border-red-900 text-sm font-black flex items-center gap-4 animate-shake">
                       <i className="fas fa-triangle-exclamation text-xl"></i>
                       {generalError}
                    </div>
                 )}

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label htmlFor="name" className="text-xs font-black text-gray-600 dark:text-slate-400 uppercase tracking-widest ml-1">Identity Profile (Name)*</label>
                       <input 
                          type="text" id="name" name="name" required value={formData.name} onChange={handleChange} onBlur={handleBlur}
                          placeholder="Full Name" className={getInputClasses('name')} disabled={status === 'submitting'}
                       />
                       <ErrorLabel message={errors.name} field="name" />
                    </div>
                    <div className="space-y-3">
                       <label htmlFor="email" className="text-xs font-black text-gray-600 dark:text-slate-400 uppercase tracking-widest ml-1">Digital Uplink (Email)*</label>
                       <input 
                          type="email" id="email" name="email" required value={formData.email} onChange={handleChange} onBlur={handleBlur}
                          placeholder="john@enterprise.ai" className={getInputClasses('email')} disabled={status === 'submitting'}
                       />
                       <ErrorLabel message={errors.email} field="email" />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label htmlFor="phone" className="text-xs font-black text-gray-600 dark:text-slate-400 uppercase tracking-widest ml-1">Voice Frequency (Phone)</label>
                       <input 
                          type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur}
                          placeholder="+1 555-000-0000" className={getInputClasses('phone')} disabled={status === 'submitting'}
                       />
                       <ErrorLabel message={errors.phone} field="phone" />
                    </div>
                    <div className="space-y-3">
                       <label htmlFor="subject" className="text-xs font-black text-gray-600 dark:text-slate-400 uppercase tracking-widest ml-1">Inquiry Protocol</label>
                       <div className="relative">
                          <select 
                             id="subject" name="subject" value={formData.subject} onChange={handleChange}
                             className={`${getInputClasses('select')} pr-12 cursor-pointer appearance-none`}
                             disabled={status === 'submitting'}
                          >
                             <option value="Sales Inquiry">Strategic Sales</option>
                             <option value="Voice Agent Demo">Neural Voice Demo</option>
                             <option value="Partnership">Alliance Request</option>
                             <option value="Support">System Support</option>
                          </select>
                          <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-accent-600 pointer-events-none text-xs"></i>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label htmlFor="message" className="text-xs font-black text-gray-600 dark:text-slate-400 uppercase tracking-widest ml-1">Project Parameters (Message)*</label>
                    <textarea 
                       id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} onBlur={handleBlur}
                       placeholder="Define your requirements (minimum 10 characters)..."
                       className={`${getInputClasses('message')} resize-none min-h-[140px]`}
                       disabled={status === 'submitting'}
                    ></textarea>
                    <ErrorLabel message={errors.message} field="message" />
                 </div>

                 <button 
                    type="submit" 
                    disabled={!isFormValid || status === 'submitting'}
                    className={`group w-full py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm text-white shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.03] active:scale-95 disabled:opacity-30 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed transform-gpu relative overflow-hidden
                    ${status === 'submitting' ? 'bg-slate-400' : 'bg-brand-900 dark:bg-accent-600 dark:text-brand-900 hover:shadow-accent-500/30'}`}
                 >
                    <span className={`flex items-center justify-center gap-3 transition-all duration-300 ${status === 'submitting' ? 'opacity-100' : ''}`}>
                      {status === 'submitting' ? (
                        <><i className="fas fa-circle-notch fa-spin"></i> SYNCING NEURAL UPLINK...</>
                      ) : status === 'error' ? (
                          <><i className="fas fa-rotate-right"></i> RETRY SIGNAL</>
                      ) : (
                         <>INITIATE CONNECTION <i className="fas fa-bolt group-hover:scale-125 transition-transform text-accent-400"></i></>
                      )}
                    </span>
                    
                    {/* Glossy overlay during hover */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
import React from 'react';

interface LogoProps {
  className?: string;
  noEffects?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10 w-auto", noEffects = false }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 400 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Swarups NXT Logo"
      role="img"
    >
      <defs>
        <style>{`
          /* Hardcoded Brand Colors for Fidelity */
          .logo-accent { 
            fill: #2BB6C6 !important; 
          }
          .logo-brand { 
            fill: #1e266e !important; 
          }
          
          /* Typography Configuration */
          .logo-text-main { 
            font-family: 'Outfit', sans-serif; 
            font-weight: 800; 
            font-size: 59.17px; 
            letter-spacing: -0.02em; 
          }
          .logo-text-sub { 
            font-family: 'Outfit', sans-serif; 
            font-weight: 700; 
            font-size: 36.41px; 
            letter-spacing: -0.02em; 
          }

          /* Default Light Mode Stroke */
          .logo-group .logo-accent, 
          .logo-group .logo-brand {
            stroke: none;
            transition: all 0.3s ease;
          }

          /* 
            DARK MODE OPTIMIZATION:
            To maintain color fidelity of the dark brand color (#1e266e) on dark backgrounds,
            we apply a very subtle white outer glow and a thin light stroke.
            This ensures the "SwarupS" text remains perfectly visible without changing its original hue.
          */
          .dark .logo-group .logo-brand {
            stroke: rgba(255, 255, 255, 0.2);
            stroke-width: 0.5px;
            paint-order: stroke fill;
            filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.3));
          }

          /* Hover interaction */
          .logo-group:hover .logo-accent {
            filter: brightness(1.1);
          }
        `}</style>
      </defs>
      
      <g className="logo-group">
        {/* Icon Graphic Group */}
        <g>
          <rect className="logo-accent" x="84.76" y="16.73" width="8.47" height="47.79" transform="rotate(180 89 40.6)" />
          <rect className="logo-accent" x="33.66" y="46.67" width="8.47" height="36.41" />
          <path className="logo-accent" d="M92.7 58.02h-8.4s-.02 11.69-.02 11.89c0 4.59-3.72 8.31-8.31 8.31s-8.31-3.72-8.31-8.31c0-.2-.04-.63-.02-.83V31.38c0-.2 0-.78 0-.98 0-9.24-7.49-16.73-16.73-16.73s-16.73 7.49-16.73 16.73c0 .2 0 .39.02.59h-.02v12.63h8.4v-12.61h.05c-.01-.2-.03-.4-.03-.6 0-4.59 3.72-8.31 8.31-8.31s 8.31 3.72 8.31 8.31c0 .2.04.78.02.98v37.7c0 .2 0 .63 0 .83 0 9.24 7.49 16.73 16.73 16.73s 16.73-7.49 16.73-16.73c0-.16 0-.31-.01-.46h.01v-11.43z" />
          <path className="logo-brand" d="M109.27 5.69h-60.68c-.07 0-.14 0-.21.01-13.3.23-24.01 11.07-24.01 24.43s10.94 24.44 24.44 24.44c3.44 0 26.42.62 26.74.62 8.19 0 14.83 6.64 14.83 14.83s-6.06 14.22-13.73 14.78c-.02 0-.05 0-.07 0H15.88c-2.62 0-4.75 2.13-4.75 4.75s2.13 4.75 4.75 4.75h60.68c.22 0 .43-.02.64-.05 12.81-.76 22.97-11.39 22.97-24.39s-10.94-24.44-24.44-24.44c-3.44 0-26.42-.62-26.74-.62-8.19 0-14.83-6.64-14.83-14.83s6.18-14.36,13.98-14.8c.15.01.29.02.44.02h60.68c2.62 0 4.75-2.13 4.75-4.75s-2.13-4.75-4.75-4.75z" />
          <rect className="logo-accent" x="59.25" y="42.47" width="8.4" height="14.33" />
        </g>

        {/* Text Elements */}
        <text className="logo-text-main logo-brand" x="123.66" y="56.8">SwarupS</text>
        <text className="logo-text-sub logo-accent" x="312.52" y="88.01">NXT</text>
      </g>
    </svg>
  );
};

export default Logo;
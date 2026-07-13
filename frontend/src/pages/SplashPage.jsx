import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING PROTOCOLS...");
  const [protocolId, setProtocolId] = useState("PID: 0x82A1-992F");
  const [isComplete, setIsComplete] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const protocols = [
    "SCANNING PERIPHERALS...",
    "LINKING NEURAL ENGINE...",
    "CALIBRATING WORKSPACES...",
    "AUTHENTICATING ARCHIVES...",
    "OPTIMIZING DATA STREAMS...",
    "FINALIZING HANDSHAKE..."
  ];

  useEffect(() => {
    let animationFrameId;
    let currentProgress = 0;

    const updateSplash = () => {
      if (currentProgress < 100) {
        // Random incremental jumps for realistic loading feel
        const increment = Math.random() * 2 + 0.5;
        currentProgress = Math.min(currentProgress + increment, 100);
        
        setProgress(currentProgress);

        // Shift status text based on progress brackets
        const protocolIndex = Math.min(
          Math.floor((currentProgress / 100) * protocols.length),
          protocols.length - 1
        );
        
        setStatusText((prev) => {
          if (prev !== protocols[protocolIndex]) {
            setProtocolId(`PID: 0x${Math.floor(Math.random()*16777215).toString(16).toUpperCase()}`);
            return protocols[protocolIndex];
          }
          return prev;
        });

        if (currentProgress < 100) {
          animationFrameId = requestAnimationFrame(updateSplash);
        } else {
          setIsComplete(true);
          setStatusText("READY");
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      }
    };

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(updateSplash);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Using inline styles for specific effects that aren't purely Tailwind
  const textShadowStyle = {
    textShadow: `${(mousePos.x - 0.5) * 10}px ${(mousePos.y - 0.5) * 10}px 20px rgba(255,255,255,0.1)`
  };

  const glitchStyle = `
    .glitch-text { position: relative; }
    .glitch-text::after {
      content: attr(data-text);
      position: absolute;
      left: 2px;
      text-shadow: -1px 0 #ffffff;
      top: 0;
      overflow: hidden;
      clip: rect(0, 900px, 0, 0);
      animation: noise-anim 2s infinite linear alternate-reverse;
    }
    @keyframes noise-anim {
      0% { clip: rect(51px, 9999px, 28px, 0); }
      5% { clip: rect(70px, 9999px, 11px, 0); }
      10% { clip: rect(92px, 9999px, 49px, 0); }
      15% { clip: rect(33px, 9999px, 64px, 0); }
      20% { clip: rect(2px, 9999px, 83px, 0); }
      25% { clip: rect(53px, 9999px, 26px, 0); }
      30% { clip: rect(15px, 9999px, 80px, 0); }
      35% { clip: rect(78px, 9999px, 5px, 0); }
      40% { clip: rect(41px, 9999px, 52px, 0); }
      45% { clip: rect(98px, 9999px, 12px, 0); }
      50% { clip: rect(22px, 9999px, 34px, 0); }
      55% { clip: rect(66px, 9999px, 92px, 0); }
      60% { clip: rect(11px, 9999px, 73px, 0); }
      65% { clip: rect(85px, 9999px, 45px, 0); }
      70% { clip: rect(4px, 9999px, 21px, 0); }
      75% { clip: rect(57px, 9999px, 88px, 0); }
      80% { clip: rect(29px, 9999px, 19px, 0); }
      85% { clip: rect(73px, 9999px, 60px, 0); }
      90% { clip: rect(14px, 9999px, 97px, 0); }
      95% { clip: rect(46px, 9999px, 3px, 0); }
      100% { clip: rect(81px, 9999px, 75px, 0); }
    }
    @keyframes scanline-anim {
      0% { bottom: 100%; }
      100% { bottom: -100px; }
    }
  `;

  return (
    <div className={`bg-black text-on-primary h-screen w-screen overflow-hidden flex flex-col font-body-md transition-opacity duration-700 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      <style>{glitchStyle}</style>
      
      {/* Background Texture */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-10" 
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}
      ></div>
      <div 
        className="absolute w-full h-[100px] z-5 opacity-10" 
        style={{ 
          background: 'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 50%, rgba(255,255,255,0) 100%)',
          animation: 'scanline-anim 8s linear infinite' 
        }}
      ></div>

      {/* Main Branding Canvas */}
      <main className="flex-grow flex flex-col items-center justify-center relative px-lg">
        {/* Center Focus Area */}
        <div className="flex flex-col items-center space-y-md z-20">
          <h1 
            className="font-headline-lg text-[80px] md:text-[120px] font-black tracking-tighter text-on-primary leading-none glitch-text" 
            data-text="MANDATE" 
            style={textShadowStyle}
          >
            MANDATE
          </h1>
          <div className="flex items-center space-y-0 space-x-md">
            <span className="font-label-caps text-label-caps text-on-primary-container tracking-[0.4em] opacity-40">
              INDUSTRIAL SYSTEMS CORE
            </span>
          </div>
        </div>
        
        {/* Atmospheric Visual Element */}
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
          <div className="w-[80vw] h-[819px] border border-on-primary-container/20 rounded-full animate-pulse"></div>
        </div>
      </main>

      {/* Footer Progress Section */}
      <footer className="w-full px-xl pb-xl flex flex-col gap-sm z-20">
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className={`font-label-caps text-label-caps ${isComplete ? 'text-primary-fixed opacity-100' : 'text-on-primary opacity-60'}`}>
              {statusText}
            </span>
            <span className="font-label-sm text-label-sm text-on-primary-container opacity-40 mt-1">
              {protocolId}
            </span>
          </div>
          <div className="flex items-center gap-xs font-label-caps text-label-caps text-on-primary">
            <span>{Math.floor(progress).toString().padStart(2, '0')}</span>
            <span className="opacity-40">%</span>
          </div>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-[2px] bg-on-primary-container/20 relative overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full transition-all duration-100 ease-linear ${isComplete ? 'bg-on-tertiary-container' : 'bg-on-primary'}`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* System Metadata */}
        <div className="flex justify-between mt-sm">
          <div className="flex gap-md opacity-30">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">terminal</span>
              <span className="font-label-caps text-[9px]">SHELL_V4.0</span>
            </div>
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[14px]">memory</span>
              <span className="font-label-caps text-[9px]">MEM_STABLE</span>
            </div>
          </div>
          <div className="font-label-caps text-[9px] opacity-20 tracking-widest">
            ESTABLISHED 2024
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SplashPage;

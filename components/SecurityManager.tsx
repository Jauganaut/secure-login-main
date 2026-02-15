
import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { isBotLikely } from '../SecurityUtils';
import { useTranslation } from './LanguageProvider';

interface SecurityContextType {
  isVerified: boolean;
  score: number;
  reportViolation: (type: string) => void;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) throw new Error('useSecurity must be used within SecurityProvider');
  return context;
};

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBot, setIsBot] = useState(false);
  const [violation, setViolation] = useState<string | null>(null);
  const { t } = useTranslation();
  const mouseMoved = useRef(false);

 /* useEffect(() => {
    if (isBotLikely()) {
      setIsBot(true);
      setViolation('Automated environment detected');
    }
*/
    const handleMouse = () => { mouseMoved.current = true; };
    window.addEventListener('mousemove', handleMouse, { once: true });

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList' && Array.from(mutation.removedNodes).some(n => (n as HTMLElement).id === 'root')) {
          setViolation('DOM Integrity Violation');
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      observer.disconnect();
    };
  }, []);

  const reportViolation = (type: string) => {
    console.error('Security Violation:', type);
    setViolation(type);
  };

  if (violation) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-center">
        <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-md">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{t.securityTitle}</h1>
          <p className="text-gray-600 mb-8">{t.securityMsg}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
          >
            {t.refresh}
          </button>
        </div>
      </div>
    );
  }

  return (
    <SecurityContext.Provider value={{ isVerified: !isBot, score: 1, reportViolation }}>
      {children}
    </SecurityContext.Provider>
  );
};

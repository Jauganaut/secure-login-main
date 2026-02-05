
import React from 'react';
import { useTranslation } from './LanguageProvider';

const Header: React.FC = () => {
  const { lang, setLang } = useTranslation();

  return (
    <header className="w-full px-6 py-4 flex flex-col md:flex-row items-center justify-between max-w-[1200px] mx-auto bg-white">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center">
             <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M20 20 L50 45 L80 20 L80 80 L20 80 Z" fill="#f54c3e" />
                <path d="M20 20 L50 45 L80 20" stroke="white" strokeWidth="4" fill="none" />
             </svg>
          </div>
          <div className="ml-2 flex flex-col leading-tight">
            <span className="text-[#333] font-bold text-xl tracking-tight">阿里邮箱</span>
            <span className="text-gray-400 text-xs">企业版</span>
          </div>
        </div>
      </div>

      {/* Top Nav Links */}
      <nav className="flex flex-wrap justify-center items-center text-[12px] text-gray-500 space-x-6">
        <a href="#" className="hover:text-[#f54c3e] transition-colors font-medium">DingTalk</a>
        <a href="#" className="hover:text-[#f54c3e] transition-colors font-medium">Alibaba Mail</a>
        <a href="#" className="hover:text-[#f54c3e] transition-colors font-medium">Aliyun Mail Login</a>
        <a href="#" className="hover:text-[#f54c3e] transition-colors font-medium">Client Apps</a>
        <a href="#" className="hover:text-[#f54c3e] transition-colors font-medium">Help</a>
        
        <select 
          value={lang === 'zh' ? '简体中文' : 'English'}
          onChange={(e) => setLang(e.target.value === '简体中文' ? 'zh' : 'en')}
          className="ml-2 border border-gray-200 rounded px-1 py-0.5 bg-transparent text-gray-500 focus:outline-none cursor-pointer"
        >
          <option>English</option>
          <option>简体中文</option>
        </select>
      </nav>
    </header>
  );
};

export default Header;

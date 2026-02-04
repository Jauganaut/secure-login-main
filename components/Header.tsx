
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full px-6 py-4 flex flex-col md:flex-row items-center justify-between max-w-[1200px] mx-auto">
      {/* Logo Section */}
      <div className="flex items-center space-x-2 mb-4 md:mb-0">
        <div className="flex items-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 6L12 13L2 6" stroke="#f5222d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 6V18H22V6" stroke="#f5222d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 13L22 6M12 13L2 6" fill="#f5222d" opacity="0.1"/>
          </svg>
          <div className="ml-2 flex flex-col leading-tight">
            <span className="text-[#333] font-bold text-xl tracking-tight">阿里邮箱</span>
            <span className="text-gray-400 text-xs">企业版</span>
          </div>
        </div>
      </div>

      {/* Top Nav Links */}
      <nav className="flex flex-wrap justify-center items-center text-[12px] text-gray-500 space-x-4">
        <a href="#" className="hover:text-red-500 transition-colors">DingTalk</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 transition-colors">Alibaba Mail</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 transition-colors">Aliyun Mail Login</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 transition-colors">Client Apps</a>
        <span className="text-gray-300">|</span>
        <a href="#" className="hover:text-red-500 transition-colors">Help</a>
        
        <select className="ml-2 border-none bg-transparent text-gray-500 focus:outline-none cursor-pointer">
          <option>English</option>
          <option>简体中文</option>
          <option>繁體中文</option>
        </select>
      </nav>
    </header>
  );
};

export default Header;


import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full pb-10 px-4 text-center">
      <div className="max-w-[1000px] mx-auto">
        <h3 className="text-[12px] font-serif font-bold mb-4 tracking-wider text-[#333]">About Us</h3>
        
        <div className="flex flex-wrap justify-center items-center text-[11px] text-gray-500 space-x-3 sm:space-x-4 mb-4 opacity-80">
          <a href="#" className="hover:text-red-500">Alibaba Cloud</a>
          <a href="#" className="hover:text-red-500">DingTalk</a>
          <a href="#" className="hover:text-red-500">Wanwang</a>
          <a href="#" className="hover:text-red-500">Alipay</a>
          <a href="#" className="hover:text-red-500">Alibaba Group</a>
          <a href="#" className="hover:text-red-500">Developer Community</a>
          <a href="#" className="hover:text-red-500">Help Center</a>
          <a href="#" className="hover:text-red-500">Alibaba Mail Personal Edition</a>
          <a href="#" className="hover:text-red-500">Mail Push</a>
          <a href="#" className="hover:text-red-500">DingStore</a>
        </div>

        <div className="text-[10px] text-gray-400">
          2009-2026 Aliyun.com Copyright reserved ICP: 浙B2-20080101
        </div>
      </div>
    </footer>
  );
};

export default Footer;

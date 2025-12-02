
import React from 'react';
import { Twitter, Instagram, Github, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#050507] border-t border-gray-200 dark:border-gray-800 pt-20 pb-10 transition-colors duration-300">
       <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-2 mb-6">
                      <div className="w-6 h-6 bg-gray-900 dark:bg-gray-200 rounded text-white dark:text-black flex items-center justify-center font-bold text-xs">CP</div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Camera Pro</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-500 text-sm leading-relaxed mb-4">
                      Điểm đến hàng đầu cho thiết bị nhiếp ảnh chuyên nghiệp. Đại lý ủy quyền của Sony, Canon, Nikon và Fujifilm.
                  </p>
                  <div className="text-gray-500 dark:text-gray-400 text-sm space-y-2">
                      <p><span className="text-gray-900 dark:text-white">Hotline:</span> xxx.xxx.xxxx</p>
                      <p><span className="text-gray-900 dark:text-white">Địa chỉ:</span> xxx.xxx.xxx.xxx</p>
                  </div>
              </div>
              
              <nav>
                  <h4 className="text-gray-900 dark:text-white font-medium mb-6">Cửa hàng</h4>
                  <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-500">
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Máy ảnh Mirrorless</a></li>
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Ống kính Chính hãng</a></li>
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Thiết bị Studio</a></li>
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Phụ kiện Vlog</a></li>
                  </ul>
              </nav>

              <nav>
                  <h4 className="text-gray-900 dark:text-white font-medium mb-6">Hỗ trợ</h4>
                  <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-500">
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Liên hệ tư vấn</a></li>
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Chính sách vận chuyển</a></li>
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Đổi trả & Bảo hành</a></li>
                      <li className="hover:text-red-600 dark:hover:text-orange-400 cursor-pointer transition-colors"><a href="#">Hướng dẫn mua trả góp</a></li>
                  </ul>
              </nav>

              <div>
                  <h4 className="text-gray-900 dark:text-white font-medium mb-6">Kết nối</h4>
                  <div className="flex gap-4 mb-6">
                      <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 hover:text-blue-400 dark:hover:text-white transition-all shadow-sm dark:shadow-none">
                          <Twitter className="w-4 h-4" />
                      </a>
                      <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 hover:text-pink-500 dark:hover:text-white transition-all shadow-sm dark:shadow-none">
                          <Instagram className="w-4 h-4" />
                      </a>
                      <a href="#" aria-label="Github" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all shadow-sm dark:shadow-none">
                          <Github className="w-4 h-4" />
                      </a>
                  </div>
                  <div className="relative">
                      <input type="email" placeholder="Đăng ký nhận tin" className="w-full bg-white dark:bg-white/5 border border-gray-300 dark:border-gray-800 rounded-full py-3 px-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-orange-500 transition-colors shadow-sm dark:shadow-none" />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-red-600 rounded-full text-white hover:bg-orange-500" aria-label="Subscribe">
                          <ChevronRight className="w-3 h-3" />
                      </button>
                  </div>
              </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-500 dark:text-gray-600">© 2025 Camera Pro Studio. All rights reserved.</p>
              <div className="flex gap-6 text-xs text-gray-500 dark:text-gray-600">
                  <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400">Chính sách bảo mật</a>
                  <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400">Điều khoản dịch vụ</a>
              </div>
          </div>
       </div>
    </footer>
  );
};

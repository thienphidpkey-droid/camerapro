
import React, { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown, X } from 'lucide-react';
import { NAV_CONFIG } from '../constants';
import { Brand, Category } from '../types';
import { View } from '../App';

interface HeaderProps {
  onSelectCategory: (category: Category, brand?: Brand) => void;
  onClearFilters: () => void;
  onNavigate: (view: View) => void;
  activeView: View;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  onNavigate,
  activeView,
  isDarkMode,
  toggleTheme
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 dark:bg-[#0A0A0F]/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 py-3 shadow-sm'
        : 'bg-transparent py-5'
        }`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <div
            className="flex items-center gap-3 z-50 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-blue-500 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
              <div className="absolute inset-0 bg-black dark:bg-white flex items-center justify-center rounded-xl border border-white/20">
                <span className="text-white dark:text-black font-bold text-sm">CP</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-orange-300 transition-colors">
              Camera Pro
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-white ${activeView === 'home' ? 'text-red-600 dark:text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => { onNavigate('catalogue'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-white ${activeView === 'catalogue' ? 'text-red-600 dark:text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              Sản phẩm
            </button>

            {NAV_CONFIG.map((item) => (
              <div key={item.label} className="relative group h-full">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-white transition-colors py-2"
                  onClick={() => { onSelectCategory(item.category); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  {item.label}
                  <ChevronDown className="w-3 h-3 transition-transform duration-300 group-hover:-rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 w-56">
                  <div className="bg-white dark:bg-[#15151A] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-xl p-2">
                    {item.brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCategory(item.category, brand);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="block w-full text-left px-4 py-2.5 text-sm rounded-xl text-gray-600 dark:text-gray-400 hover:text-red-700 dark:hover:text-white hover:bg-orange-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => { onNavigate('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-white ${activeView === 'news' ? 'text-red-600 dark:text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
            >
              Tin tức
            </button>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <button aria-label="Tìm kiếm" className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>

            <button
              className="md:hidden p-2 text-gray-900 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white dark:bg-[#0A0A0F] pt-24 px-6 transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-8 h-full overflow-y-auto pb-20">
          <button
            onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
            className="text-left font-bold text-2xl text-gray-900 dark:text-white"
          >
            Trang chủ
          </button>
          <button
            onClick={() => { onNavigate('catalogue'); setMobileMenuOpen(false); }}
            className="text-left font-bold text-2xl text-gray-900 dark:text-white"
          >
            Tất cả sản phẩm
          </button>

          {NAV_CONFIG.map((item) => (
            <div key={item.label}>
              <div className="font-bold text-red-600 dark:text-orange-400 mb-4 uppercase text-xs tracking-widest">{item.label}</div>
              <div className="grid grid-cols-2 gap-4">
                {item.brands.map(brand => (
                  <button
                    key={brand}
                    className="text-left p-3 rounded-lg bg-gray-50 dark:bg-white/5 text-sm font-medium text-gray-700 dark:text-gray-300 active:bg-orange-100 dark:active:bg-red-900/40"
                    onClick={() => {
                      onSelectCategory(item.category, brand);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => { onNavigate('news'); setMobileMenuOpen(false); }}
            className="text-left font-bold text-2xl text-gray-900 dark:text-white"
          >
            Tin tức Công nghệ
          </button>
        </div>
      </div>
    </>
  );
};

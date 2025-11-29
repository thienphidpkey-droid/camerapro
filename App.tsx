
import React, { useState, useEffect } from 'react';
import { Product, Brand, Category, FilterState } from './types';
import { ProductModal } from './components/ProductModal';
import { GeminiChat } from './components/GeminiChat';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogueSection } from './components/CatalogueSection';
import { NewsSection } from './components/NewsSection';
import { Footer } from './components/Footer';
import { ComparisonModal } from './components/ComparisonModal';
import { ArrowRightLeft } from 'lucide-react';

export type View = 'home' | 'catalogue' | 'news';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Default to light mode (isDarkMode = false)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Comparison State
  const [comparisonList, setComparisonList] = useState<Product[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    brand: null,
    category: null,
    minPrice: 0,
    maxPrice: 200000000
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Toggle comparison Logic
  const toggleComparison = (product: Product) => {
    setComparisonList(prev => {
        const exists = prev.find(p => p.id === product.id);
        if (exists) {
            return prev.filter(p => p.id !== product.id);
        } else {
            if (prev.length >= 3) {
                alert("Bạn chỉ có thể so sánh tối đa 3 sản phẩm.");
                return prev;
            }
            return [...prev, product];
        }
    });
  };

  const removeFromComparison = (id: string) => {
      setComparisonList(prev => prev.filter(p => p.id !== id));
  };

  // SEO & Scroll handling
  useEffect(() => {
    const titles = {
      home: 'Camera Pro Studio | Máy ảnh, Ống kính & Phụ kiện Cao cấp',
      catalogue: 'Danh mục Sản phẩm | Camera Pro Studio',
      news: 'Tin tức Công nghệ Nhiếp ảnh | Camera Pro Studio'
    };
    document.title = titles[currentView] || 'Camera Pro Studio';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleSelectCategory = (category: Category, brand?: Brand) => {
    setCurrentView('catalogue');
    setFilters({
      brand: brand || null,
      category: category,
      minPrice: 0,
      maxPrice: 200000000
    });
  };

  const handleClearFilters = () => {
    setFilters({ brand: null, category: null, minPrice: 0, maxPrice: 200000000 });
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
    if (view === 'home') {
        handleClearFilters();
    }
  };

  return (
    <div className="min-h-screen font-sans overflow-x-hidden flex flex-col relative selection:bg-purple-500/30 selection:text-black dark:selection:text-white transition-colors duration-500">
      
      {/* Dynamic Background Layer */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        {/* Dark Mode Background */}
        <div 
          className={`absolute inset-0 bg-[#0A0A0F] transition-opacity duration-1000 ease-in-out ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}
        >
             <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-40 mix-blend-overlay"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2564&auto=format&fit=crop')" }}
             />
             <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F]/90 to-[#121217]" />
        </div>
        
        {/* Light Mode Background - ABSTRACT WAVY LINES */}
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}
        >
             {/* Soft gradient background */}
             <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20" />
             
             {/* Abstract wavy lines SVG pattern */}
             <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" style={{ stopColor: '#E0E7FF', stopOpacity: 0.6 }} />
                   <stop offset="100%" style={{ stopColor: '#F3E8FF', stopOpacity: 0.3 }} />
                 </linearGradient>
               </defs>
               
               {/* Flowing wave lines */}
               <path d="M0,100 Q250,50 500,100 T1000,100 T1500,100 T2000,100" 
                     stroke="url(#grad1)" strokeWidth="1" fill="none" opacity="0.5"/>
               <path d="M0,150 Q300,100 600,150 T1200,150 T1800,150 T2400,150" 
                     stroke="url(#grad1)" strokeWidth="1.5" fill="none" opacity="0.6"/>
               <path d="M0,200 Q350,150 700,200 T1400,200 T2100,200 T2800,200" 
                     stroke="url(#grad1)" strokeWidth="1" fill="none" opacity="0.4"/>
               <path d="M0,300 Q400,250 800,300 T1600,300 T2400,300 T3200,300" 
                     stroke="url(#grad1)" strokeWidth="2" fill="none" opacity="0.7"/>
               <path d="M0,400 Q450,350 900,400 T1800,400 T2700,400 T3600,400" 
                     stroke="url(#grad1)" strokeWidth="1.5" fill="none" opacity="0.5"/>
               
               {/* Reverse direction waves for depth */}
               <path d="M2000,500 Q1750,450 1500,500 T1000,500 T500,500 T0,500" 
                     stroke="#E0E7FF" strokeWidth="1" fill="none" opacity="0.3"/>
               <path d="M2000,600 Q1700,550 1400,600 T800,600 T200,600 T-400,600" 
                     stroke="#DDD6FE" strokeWidth="1.5" fill="none" opacity="0.4"/>
             </svg>
             
             {/* Soft overlay for blending */}
             <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/20" />
        </div>
      </div>

      <Header 
        onSelectCategory={handleSelectCategory}
        onClearFilters={handleClearFilters}
        onNavigate={handleNavigate}
        activeView={currentView}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow z-10">
          {currentView === 'home' && (
            <Hero onNavigate={handleNavigate} />
          )}
          
          {currentView === 'catalogue' && (
            <CatalogueSection 
                filters={filters} 
                setFilters={setFilters} 
                onProductSelect={setSelectedProduct}
                comparisonList={comparisonList}
                toggleComparison={toggleComparison}
            />
          )}

          {currentView === 'news' && (
            <NewsSection />
          )}
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            toggleComparison={toggleComparison}
            isSelectedForCompare={comparisonList.some(p => p.id === selectedProduct.id)}
            onSelectRelated={(p) => {
                setSelectedProduct(p);
                // Scroll to top of modal or just reset view
            }}
        />
      )}
      
      {/* Comparison Floating Bar */}
      {comparisonList.length > 0 && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-white dark:bg-[#15151A] rounded-full shadow-2xl border border-gray-200 dark:border-gray-700 p-2 pl-6 flex items-center gap-4 animate-fade-in-up">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Đang chọn so sánh: <span className="font-bold text-purple-600">{comparisonList.length}/3</span>
              </span>
              <button 
                onClick={() => setIsComparisonOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-bold transition-colors flex items-center gap-2"
              >
                  <ArrowRightLeft className="w-4 h-4" /> So sánh ngay
              </button>
          </div>
      )}

      {isComparisonOpen && (
          <ComparisonModal 
             products={comparisonList} 
             onClose={() => setIsComparisonOpen(false)}
             onRemove={removeFromComparison}
          />
      )}

      <GeminiChat />

      <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>

    </div>
  );
};

export default App;

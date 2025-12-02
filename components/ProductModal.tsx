
import React, { useState, useMemo } from 'react';
import { X, Check, Aperture, Layers, ZoomIn, Play, ArrowRightLeft } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from './ProductCard';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  toggleComparison: (product: Product) => void;
  isSelectedForCompare: boolean;
  onSelectRelated: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
    product, 
    onClose, 
    toggleComparison, 
    isSelectedForCompare,
    onSelectRelated
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Filter related products: same category, different ID
  const relatedProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  }, [product]);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md transition-opacity" 
          onClick={onClose}
        />

        {/* Modal Content - Scrollable on mobile, Fixed on desktop */}
        <article className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-[#0F0F13] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl border border-gray-100 dark:border-gray-800 animate-fade-in-up">
          
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 dark:hover:bg-white/10 rounded-full text-white transition-colors backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Image & Video (50% Width) */}
          <div className="w-full md:w-1/2 h-2/5 md:h-full relative bg-gray-100 dark:bg-[#15151A] flex flex-col group">
              {/* Radial Gradient Background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-100 to-gray-200 dark:from-gray-800/30 dark:via-[#15151A] dark:to-[#15151A]" />
              
              <div className="relative z-10 w-full flex-1 flex items-center justify-center p-8">
                  <div className="relative cursor-zoom-in" onClick={() => setIsZoomed(true)}>
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-w-full max-h-[40vh] md:max-h-[50vh] object-contain drop-shadow-xl dark:drop-shadow-2xl transition-transform duration-500 hover:scale-105 mix-blend-multiply dark:mix-blend-normal"
                    />
                  </div>
                  
                  {/* Action Buttons Overlay */}
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 px-4">
                      {product.videoUrl && (
                          <button 
                            onClick={() => setIsVideoOpen(true)}
                            className="flex items-center gap-2 bg-white/90 dark:bg-black/60 text-gray-900 dark:text-white px-4 py-2 rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transition-all text-sm font-medium"
                          >
                              <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center">
                                  <Play className="w-3 h-3 ml-0.5" />
                              </div>
                              Xem Video Demo
                          </button>
                      )}
                      <button 
                         onClick={() => toggleComparison(product)}
                         className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm hover:scale-105 transition-all text-sm font-medium ${
                             isSelectedForCompare 
                                ? 'bg-red-600 text-white' 
                                : 'bg-white/90 dark:bg-black/60 text-gray-900 dark:text-white'
                         }`}
                      >
                         {isSelectedForCompare ? <Check className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
                         {isSelectedForCompare ? 'Đã thêm so sánh' : 'So sánh'}
                      </button>
                  </div>
              </div>
          </div>

          {/* Right: Details (50% Width) - Scrollable */}
          <div className="w-full md:w-1/2 h-3/5 md:h-full overflow-y-auto bg-white dark:bg-[#0A0A0F] border-l border-gray-100 dark:border-gray-800 scrollbar-thin">
              <div className="p-8 md:p-10 flex flex-col min-h-full">
                  
                  {/* Header */}
                  <div className="mb-6">
                      <span className="text-red-600 dark:text-orange-400 text-sm font-bold tracking-widest uppercase mb-2 block">{product.brand}</span>
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 leading-tight">{product.name}</h1>
                      <div className="flex items-center gap-4 mt-2">
                          <p className="text-2xl text-gray-900 dark:text-white font-light">
                              {product.price.toLocaleString('vi-VN')} ₫
                          </p>
                          {product.isNew && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 text-[10px] font-bold uppercase rounded border border-blue-200 dark:border-blue-500/30">
                                  Mới
                              </span>
                          )}
                      </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 font-light border-b border-gray-100 dark:border-gray-800 pb-8">
                      {product.description}
                  </p>

                  {/* Specs Table */}
                  <div className="mb-8">
                      <h3 className="text-gray-900 dark:text-white font-medium mb-4 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-red-600 dark:text-orange-400" /> Thông số kỹ thuật
                      </h3>
                      <div className="bg-gray-50 dark:bg-[#15151A] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden text-sm">
                          <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                              <span className="text-gray-500">Năm sản xuất</span>
                              <span className="text-gray-900 dark:text-white font-medium text-right">{product.releaseYear || 'N/A'}</span>
                          </div>
                          <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                              <span className="text-gray-500">Cảm biến</span>
                              <span className="text-gray-900 dark:text-white font-medium text-right">{product.sensor}</span>
                          </div>
                          <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                              <span className="text-gray-500">Độ phân giải</span>
                              <span className="text-gray-900 dark:text-white font-medium text-right">{product.resolution || 'N/A'}</span>
                          </div>
                          {product.specs ? (
                              <>
                                  <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                                      <span className="text-gray-500">ISO</span>
                                      <span className="text-gray-900 dark:text-white text-right">{product.specs.iso || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                                      <span className="text-gray-500">Tốc độ màn trập</span>
                                      <span className="text-gray-900 dark:text-white text-right">{product.specs.shutterSpeed || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                                      <span className="text-gray-500">Quay video</span>
                                      <span className="text-gray-900 dark:text-white text-right">{product.specs.videoRes || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                                      <span className="text-gray-500">Ngàm ống kính</span>
                                      <span className="text-gray-900 dark:text-white text-right">{product.specs.mount || 'N/A'}</span>
                                  </div>
                                  <div className="grid grid-cols-2 p-3 border-b border-gray-200 dark:border-gray-800/50 hover:bg-gray-100 dark:hover:bg-white/5">
                                      <span className="text-gray-500">Trọng lượng</span>
                                      <span className="text-gray-900 dark:text-white text-right">{product.specs.weight || 'N/A'}</span>
                                  </div>
                              </>
                          ) : (
                             <div className="p-3 text-center text-gray-500 italic">Đang cập nhật chi tiết...</div>
                          )}
                      </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-10">
                      <h3 className="text-gray-900 dark:text-white font-medium mb-2 flex items-center gap-2">
                          <Aperture className="w-4 h-4 text-blue-500 dark:text-blue-400" /> Tính năng nổi bật
                      </h3>
                      {product.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                              <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                          </div>
                      ))}
                  </div>

                  {/* Related Products */}
                  {relatedProducts.length > 0 && (
                      <div className="mb-10 pt-8 border-t border-gray-100 dark:border-gray-800">
                          <h3 className="text-gray-900 dark:text-white font-bold mb-4">Sản phẩm liên quan</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                              {relatedProducts.map(relProduct => (
                                  <div key={relProduct.id} onClick={() => onSelectRelated(relProduct)} className="cursor-pointer group">
                                      <div className="bg-gray-50 dark:bg-[#15151A] rounded-lg p-3 flex flex-col items-center border border-gray-100 dark:border-gray-800 hover:border-orange-500 transition-colors">
                                          <img src={relProduct.image} alt={relProduct.name} className="h-24 object-contain mb-2 mix-blend-multiply dark:mix-blend-normal" />
                                          <h4 className="text-xs font-semibold text-center line-clamp-2 text-gray-800 dark:text-white group-hover:text-red-600">{relProduct.name}</h4>
                                          <span className="text-xs text-gray-500 mt-1">{relProduct.price.toLocaleString('vi-VN')} ₫</span>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* Actions */}
                  <div className="mt-auto space-y-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                      <Button variant="primary" className="w-full py-4 text-base shadow-lg shadow-orange-500/20 dark:shadow-red-900/20">
                          Thêm vào giỏ hàng
                      </Button>
                      <Button variant="outline" className="w-full">
                          Liên hệ tư vấn (09xx.xxx.xxx)
                      </Button>
                  </div>
              </div>
          </div>
        </article>
      </div>

      {/* Lightbox Zoom */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[60] bg-white/95 dark:bg-black flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsZoomed(false)}
        >
            <button className="absolute top-6 right-6 p-3 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 rounded-full text-black dark:text-white transition-colors">
                <X className="w-6 h-6" />
            </button>
            <img 
                src={product.image} 
                alt={product.name}
                className="max-w-full max-h-full object-contain scale-100 cursor-zoom-out"
            />
        </div>
      )}

      {/* Video Modal */}
      {isVideoOpen && product.videoUrl && (
          <div className="fixed inset-0 z-[65] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
              <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                  <button 
                    onClick={() => setIsVideoOpen(false)}
                    className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-red-600 rounded-full text-white transition-colors"
                  >
                      <X className="w-5 h-5" />
                  </button>
                  <iframe 
                      src={product.videoUrl} 
                      title="Product Demo"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                  />
              </div>
          </div>
      )}
    </>
  );
};

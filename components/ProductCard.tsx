
import React from 'react';
import { Product } from '../types';
import { Plus, ArrowRightLeft, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  onCompareToggle?: (product: Product) => void;
  isSelectedForCompare?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onCompareToggle, isSelectedForCompare }) => {
  return (
    <div 
      className="group relative flex flex-col bg-white dark:bg-[#15151A] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 border border-gray-100 dark:border-gray-800"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.isNew && (
            <span className="px-2 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md shadow-sm">
                New
            </span>
        )}
        {product.isBestSeller && (
            <span className="px-2 py-1 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-md shadow-sm">
                Best Seller
            </span>
        )}
      </div>

      {/* Compare Checkbox */}
      {onCompareToggle && (
        <div className="absolute top-4 right-4 z-30">
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onCompareToggle(product);
                }}
                className={`p-2 rounded-full transition-all duration-300 ${
                    isSelectedForCompare 
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                        : 'bg-white/80 dark:bg-black/40 text-gray-500 hover:text-purple-600 hover:bg-white backdrop-blur-sm'
                }`}
                title="So sánh"
            >
                {isSelectedForCompare ? <Check className="w-4 h-4" /> : <ArrowRightLeft className="w-4 h-4" />}
            </button>
        </div>
      )}

      {/* Image Area - Trigger Modal onClick */}
      <div 
        onClick={() => onClick(product)}
        className="relative aspect-[4/3] bg-gray-50 dark:bg-[#0A0A0F] flex items-center justify-center p-8 overflow-hidden"
      >
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100 dark:from-gray-800/20 dark:via-[#0A0A0F] dark:to-[#0A0A0F] opacity-100" />
         
         <img 
            src={product.image} 
            alt={product.name} 
            loading="lazy"
            className="w-full h-full object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-xl dark:drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] mix-blend-multiply dark:mix-blend-normal"
         />
      </div>

      {/* Info Area */}
      <div 
        onClick={() => onClick(product)}
        className="p-5 flex flex-col flex-1 relative z-20 bg-white dark:bg-[#15151A]"
      >
         <div className="mb-1">
             <span className="text-xs text-purple-600 dark:text-purple-400 font-bold tracking-widest uppercase">{product.brand}</span>
         </div>
         
         <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {product.name}
         </h3>

         <div className="mt-auto flex items-end justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
             <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Giá chính hãng</span>
                <span className="text-lg text-gray-900 dark:text-white font-bold">
                    {product.price.toLocaleString('vi-VN')} ₫
                </span>
             </div>
             
             <button className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-600 dark:text-white group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <Plus className="w-5 h-5" />
             </button>
         </div>
      </div>
    </div>
  );
};

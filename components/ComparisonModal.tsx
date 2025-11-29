
import React from 'react';
import { X, Check } from 'lucide-react';
import { Product } from '../types';

interface ComparisonModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (productId: string) => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ products, onClose, onRemove }) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-[#0F0F13] w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">So sánh sản phẩm</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-auto p-6">
            <div className="min-w-[800px]">
                {/* Product Images & Names */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    <div className="col-span-1 flex items-center font-bold text-gray-500 dark:text-gray-400">
                        Thông số kỹ thuật
                    </div>
                    {products.map(product => (
                        <div key={product.id} className="col-span-1 relative flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-gray-800">
                            <button 
                                onClick={() => onRemove(product.id)}
                                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <img src={product.image} alt={product.name} className="h-32 object-contain mb-4 mix-blend-multiply dark:mix-blend-normal" />
                            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2">{product.name}</h3>
                            <span className="text-purple-600 dark:text-purple-400 font-bold">{product.price.toLocaleString('vi-VN')} ₫</span>
                        </div>
                    ))}
                    {/* Placeholder for empty slots */}
                    {[...Array(3 - products.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="col-span-1 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm">
                            Thêm sản phẩm
                        </div>
                    ))}
                </div>

                {/* Specs Rows */}
                <div className="space-y-4">
                    {[
                        { label: 'Thương hiệu', key: 'brand' },
                        { label: 'Năm sản xuất', key: 'releaseYear' },
                        { label: 'Loại', key: 'category' },
                        { label: 'Cảm biến', key: 'sensor' },
                        { label: 'Độ phân giải', key: 'resolution' },
                        { label: 'ISO', specKey: 'iso' },
                        { label: 'Tốc độ màn trập', specKey: 'shutterSpeed' },
                        { label: 'Quay video', specKey: 'videoRes' },
                        { label: 'Trọng lượng', specKey: 'weight' },
                        { label: 'Pin', specKey: 'battery' }
                    ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 dark:border-gray-800 text-sm">
                            <div className="col-span-1 font-medium text-gray-500 dark:text-gray-400">{row.label}</div>
                            {products.map(product => (
                                <div key={product.id} className="col-span-1 text-gray-900 dark:text-gray-200 font-medium text-center">
                                    {row.specKey 
                                        ? (product.specs as any)?.[row.specKey] || '-' 
                                        : (product as any)[row.key] || '-'}
                                </div>
                            ))}
                            {[...Array(3 - products.length)].map((_, i) => (
                                <div key={`empty-cell-${i}`} className="col-span-1" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

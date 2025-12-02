
import React, { useMemo } from 'react';
import { SlidersHorizontal, Check, X } from 'lucide-react';
import { Product, Brand, Category, FilterState } from '../types';
import { ProductCard } from './ProductCard';
import { MOCK_PRODUCTS } from '../constants';

interface CatalogueSectionProps {
    filters: FilterState;
    setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
    onProductSelect: (product: Product) => void;
    comparisonList: Product[];
    toggleComparison: (product: Product) => void;
}

export const CatalogueSection: React.FC<CatalogueSectionProps> = ({
    filters,
    setFilters,
    onProductSelect,
    comparisonList,
    toggleComparison
}) => {

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(p => {
            if (filters.brand && p.brand !== filters.brand) return false;
            if (filters.category && p.category !== filters.category) return false;
            if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
            return true;
        });
    }, [filters]);

    const toggleBrand = (brand: Brand) => {
        setFilters(prev => ({ ...prev, brand: prev.brand === brand ? null : brand }));
    };

    const toggleCategory = (cat: Category) => {
        setFilters(prev => ({ ...prev, category: prev.category === cat ? null : cat }));
    };

    const hasFilters = filters.brand || filters.category;

    return (
        <section className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-8 lg:gap-12">

                {/* Sidebar Filter */}
                <aside className="w-full lg:w-1/4">
                    <div className="lg:sticky lg:top-24 space-y-8">
                        <div className="bg-white dark:bg-[#15151A] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Bộ lọc</h3>
                                </div>
                                {hasFilters && (
                                    <button
                                        onClick={() => setFilters({ brand: null, category: null, minPrice: 0, maxPrice: 200000000 })}
                                        className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                                    >
                                        <X className="w-3 h-3" /> Xóa lọc
                                    </button>
                                )}
                            </div>

                            <div className="space-y-8">
                                {/* Categories */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Danh mục</h4>
                                    <div className="space-y-1">
                                        {Object.values(Category).map(cat => (
                                            <div
                                                key={cat}
                                                onClick={() => toggleCategory(cat)}
                                                className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${filters.category === cat
                                                        ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 font-medium'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                                    }`}
                                            >
                                                <span>{cat}</span>
                                                {filters.category === cat && <Check className="w-4 h-4 text-purple-600" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Brands */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Thương hiệu</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.values(Brand).map(brand => (
                                            <button
                                                key={brand}
                                                onClick={() => toggleBrand(brand)}
                                                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${filters.brand === brand
                                                        ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black dark:border-white shadow-md'
                                                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-purple-400 dark:hover:border-gray-500 bg-white dark:bg-transparent'
                                                    }`}
                                            >
                                                {brand}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Product Grid */}
                <div className="w-full lg:w-3/4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800 gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {filters.category ? filters.category : 'Tất cả sản phẩm'}
                            </h2>
                            {filters.brand && <span className="text-purple-600 dark:text-purple-400 text-sm mt-1 block">Thương hiệu: {filters.brand}</span>}
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full self-start sm:self-auto">
                            {filteredProducts.length} kết quả
                        </span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onClick={onProductSelect}
                                    onCompareToggle={toggleComparison}
                                    isSelectedForCompare={comparisonList.some(p => p.id === product.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-24 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-gray-50/50 dark:bg-[#15151A]/50">
                            <div className="mb-4 text-gray-300 dark:text-gray-600">
                                <SlidersHorizontal className="w-12 h-12 mx-auto" />
                            </div>
                            <p className="text-gray-900 dark:text-white font-medium mb-2">Không tìm thấy sản phẩm nào</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Thử thay đổi bộ lọc hoặc tìm kiếm từ khóa khác.</p>
                            <button
                                onClick={() => setFilters({ brand: null, category: null, minPrice: 0, maxPrice: 200000000 })}
                                className="text-purple-600 dark:text-purple-400 hover:underline text-sm font-medium"
                            >
                                Xóa tất cả bộ lọc
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

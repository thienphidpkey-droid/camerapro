
import React from 'react';
import { Button } from './Button';
import { Brand } from '../types';
import { View } from '../App';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    onNavigate: (view: View) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
    const brands = [
        Brand.SONY, Brand.CANON, Brand.NIKON,
        Brand.FUJIFILM, Brand.LEICA, Brand.SIGMA
    ];

    return (
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-transparent">

            <div className="container relative z-20 px-6 md:px-12 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">

                {/* Left Column: Content */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-10 lg:pt-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300/50 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm mb-6 animate-fade-in-up shadow-sm dark:shadow-none">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs uppercase tracking-widest text-gray-600 dark:text-gray-300">Bộ sưu tập 2025</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6 animate-fade-in-up delay-100">
                        Nắm bắt <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 dark:from-orange-400 dark:via-blue-400 dark:to-white">Sự hoàn hảo.</span>
                    </h1>

                    <p className="max-w-xl text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed font-light animate-fade-in-up delay-200">
                        Trải nghiệm nhiếp ảnh đỉnh cao với bộ sưu tập máy ảnh và ống kính cao cấp được tuyển chọn. Sony, Canon, Nikon chính hãng.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up delay-300 w-full md:w-auto">
                        <Button size="lg" className="md:w-auto w-full" onClick={() => onNavigate('catalogue')}>
                            Xem Catalogue
                        </Button>
                        <Button variant="outline" size="lg" className="md:w-auto w-full" onClick={() => onNavigate('news')}>
                            Khám phá Tin tức
                        </Button>
                    </div>
                </div>

                {/* Right Column: Brand List */}
                <div className="lg:col-span-5 flex flex-col justify-center animate-fade-in-up delay-300">
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
                            Thương hiệu Hàng đầu
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {brands.map((brand) => (
                                <div
                                    key={brand}
                                    className="group relative h-14 bg-black/40 hover:bg-white/10 border border-white/5 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer overflow-hidden"
                                    onClick={() => onNavigate('catalogue')}
                                >
                                    <span className="text-gray-300 font-medium group-hover:text-white tracking-wide z-10 relative group-hover:scale-110 transition-transform">
                                        {brand}
                                    </span>
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 dark:from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            ))}
                        </div>
                        <div
                            className="mt-6 flex items-center justify-between text-gray-400 text-sm hover:text-white cursor-pointer transition-colors group"
                            onClick={() => onNavigate('catalogue')}
                        >
                            <span>Xem tất cả thiết bị</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

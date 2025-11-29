
import React, { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { MOCK_NEWS } from '../constants';
import { NewsItem } from '../types';
import { NewsModal } from './NewsModal';

export const NewsSection: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <section className="pt-32 pb-24 bg-transparent min-h-screen">
       <div className="container mx-auto px-6 md:px-12">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-200 dark:border-gray-800 pb-8 bg-white/60 dark:bg-black/40 p-6 rounded-2xl backdrop-blur-sm shadow-sm dark:shadow-none">
               <div>
                   <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Tin tức Công nghệ</h2>
                   <p className="text-gray-600 dark:text-gray-400 max-w-2xl text-lg">Cập nhật xu hướng nhiếp ảnh mới nhất, bài đánh giá chuyên sâu và thông tin ra mắt sản phẩm từ các thương hiệu hàng đầu.</p>
               </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
               {MOCK_NEWS.map((news) => (
                   <article 
                        key={news.id} 
                        onClick={() => setSelectedNews(news)}
                        className="group cursor-pointer flex flex-col h-full bg-white dark:bg-[#1A1A23]/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 hover:border-purple-300 dark:hover:border-purple-500/30 transition-all shadow-md hover:shadow-xl dark:shadow-none dark:hover:shadow-purple-900/10"
                        itemScope 
                        itemType="https://schema.org/NewsArticle"
                   >
                       <div className="relative aspect-[16/9] overflow-hidden">
                           <img 
                               src={news.image} 
                               alt={news.title}
                               className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                               loading="lazy"
                               itemProp="image"
                           />
                           <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md text-xs text-gray-900 dark:text-white rounded-lg font-medium border border-gray-200 dark:border-white/10 shadow-sm">
                               {news.category}
                           </div>
                       </div>
                       <div className="p-6 flex flex-col flex-1">
                           <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                               <Clock className="w-3 h-3" />
                               <time dateTime={news.date.split('/').reverse().join('-')} itemProp="datePublished">{news.date}</time>
                           </div>
                           <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-3" itemProp="headline">
                               {news.title}
                           </h3>
                           <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6" itemProp="description">
                               {news.excerpt}
                           </p>
                           <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:text-purple-500 dark:group-hover:text-purple-300">
                               Đọc thêm <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                           </div>
                       </div>
                       <meta itemProp="author" content="Camera Pro Studio" />
                   </article>
               ))}
           </div>
       </div>

       {selectedNews && (
           <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
       )}
    </section>
  );
};

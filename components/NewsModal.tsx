
import React from 'react';
import { X, Calendar, Share2 } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsModalProps {
  news: NewsItem;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ news, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      <article className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0F0F13] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-gray-100 dark:border-gray-800 animate-fade-in-up">
         
         {/* Header Image */}
         <div className="relative w-full h-64 md:h-80 shrink-0">
             <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0F0F13] via-transparent to-transparent z-10" />
             <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover"
             />
             <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all"
             >
                <X className="w-5 h-5" />
             </button>
             <div className="absolute bottom-4 left-6 z-20">
                 <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold uppercase rounded-md mb-3 inline-block shadow-sm">
                     {news.category}
                 </span>
                 <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight max-w-2xl drop-shadow-lg [text-shadow:_0_1px_10px_rgb(0_0_0_/_60%)]">
                     {news.title}
                 </h2>
             </div>
         </div>

         {/* Content Scrollable */}
         <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-white dark:bg-[#0F0F13]">
             <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-4 text-sm text-gray-500 dark:text-gray-400">
                 <div className="flex items-center gap-2">
                     <Calendar className="w-4 h-4" />
                     <span>{news.date}</span>
                 </div>
                 <button className="flex items-center gap-2 hover:text-purple-600 dark:hover:text-white transition-colors">
                     <Share2 className="w-4 h-4" />
                     Chia sẻ
                 </button>
             </div>

             <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300">
                 {news.content ? (
                     news.content.map((paragraph, idx) => (
                         <p key={idx} className="mb-6 leading-relaxed text-base md:text-lg font-light text-justify">
                             {paragraph}
                         </p>
                     ))
                 ) : (
                     <p className="text-gray-500 italic">Nội dung chi tiết đang được cập nhật...</p>
                 )}
                 <p className="text-gray-600 dark:text-gray-400 mt-8 italic text-sm border-l-4 border-purple-500 pl-4">{news.excerpt}</p>
             </div>
         </div>
      </article>
    </div>
  );
};

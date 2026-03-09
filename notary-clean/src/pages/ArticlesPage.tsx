import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { articles, categories } from '@/data/articles';
import Footer from '@/components/Footer';

const ArticlesPage = () => {
  const [currentCat, setCurrentCat] = useState('همه');
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  const filtered = articles.filter(a => {
    const matchCat = currentCat === 'همه' || a.cat === currentCat;
    const matchSearch = !search || a.title.includes(search) || a.summary.includes(search);
    return matchCat && matchSearch;
  });

  if (selectedArticle) {
    return (
      <div className="min-h-screen pt-[100px] md:pt-[120px] bg-background">
        <div className="bg-secondary px-6 md:px-12 py-10 border-b border-white/10">
          <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] text-white font-bold">مقالات حقوقی</h2>
        </div>
        <div className="p-6 md:px-12 max-w-[800px] mx-auto">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-2 bg-transparent border border-border text-muted-foreground text-[0.75rem] px-4 py-2 rounded-sm cursor-pointer mb-7 hover:border-primary hover:text-primary transition-colors"
          >
            → بازگشت به لیست
          </button>
          <div className="text-[0.7rem] text-primary font-bold tracking-wider mb-3">{selectedArticle.cat}</div>
          <h1 className="text-[clamp(1.4rem,2.8vw,2rem)] text-foreground font-bold mb-4 leading-snug">{selectedArticle.title}</h1>
          <div className="flex gap-4 mb-7 pb-5 border-b border-border flex-wrap text-[0.72rem] text-muted-foreground">
            <span>📅 {selectedArticle.date}</span>
            {selectedArticle.author && <span>✍️ {selectedArticle.author}</span>}
            
          </div>
          <div
            className="text-sm text-foreground/80 leading-[2] font-light [&_h4]:font-bold [&_h4]:text-foreground [&_h4]:text-base [&_h4]:my-6 [&_h4]:pr-3 [&_h4]:border-r-[3px] [&_h4]:border-primary [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: selectedArticle.body }}
          />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[100px] md:pt-[120px] bg-background">
      {/* Header */}
      <div className="bg-secondary relative overflow-hidden px-6 md:px-12 py-10 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(255,255,255,0.03),transparent_60%)]" />
        <h2 className="text-[clamp(1.7rem,3vw,2.4rem)] text-white mb-2 font-bold relative">مقالات حقوقی</h2>
        <p className="text-white/35 text-sm relative max-w-[460px]">تحلیل‌ها و مقالات تخصصی در حوزه حقوق اسناد رسمی</p>

        {/* Search */}
        <div className="flex gap-0 mt-6 max-w-[500px] relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="جستجو در مقالات..."
            className="flex-1 bg-white/[0.07] border border-white/15 border-l-0 rounded-r-sm px-4 py-3 text-white text-sm outline-none focus:border-white/40 placeholder:text-white/20 text-right"
          />
          <button className="bg-white border-none px-4 text-secondary rounded-l-sm hover:bg-white/90 transition-colors">
            <Search size={16} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 mt-4 flex-wrap relative">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCurrentCat(cat)}
              className={`border text-[0.72rem] px-3 py-1 rounded-full transition-colors ${
                currentCat === cat
                  ? 'bg-white border-white text-secondary'
                  : 'border-white/15 text-white/40 hover:bg-white hover:border-white hover:text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-14 text-muted-foreground">
            <div className="text-4xl mb-3 opacity-30">🔍</div>
            <p>مقاله‌ای یافت نشد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedArticle(article)}
                className="bg-card border border-border rounded overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-elegant transition-all flex flex-col"
              >
                <div className="h-[140px] bg-secondary/10 flex items-center justify-center text-4xl relative">
                  {article.emoji}
                </div>
                <div className="p-5 flex-1 flex flex-col gap-2">
                  <div className="text-[0.65rem] text-primary font-bold tracking-wider">{article.cat}</div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{article.title}</h3>
                  <p className="text-[0.78rem] text-muted-foreground leading-relaxed flex-1 font-light">{article.summary}</p>
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-border">
                    <span className="text-[0.68rem] text-muted-foreground">📅 {article.date}</span>
                    <span className="text-[0.7rem] text-primary font-semibold">ادامه مطلب ←</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ArticlesPage;

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { serviceTabs } from '@/data/services';
import { articles, categories } from '@/data/articles';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

type ViewMode = 'laws' | 'articles';

const ArticlesGridWrapper = ({ externalSelected, onClearExternal }: {
  externalSelected?: typeof articles[0] | null;
  onClearExternal?: () => void;
}) => {
  const [currentCat, setCurrentCat] = useState('همه');
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);

  useEffect(() => {
    if (externalSelected) {
      setSelectedArticle(externalSelected);
      onClearExternal?.();
    }
  }, [externalSelected]);

  const filtered = articles.filter(a => {
    const matchCat = currentCat === 'همه' || a.cat === currentCat;
    const matchSearch = !search || a.title.includes(search) || a.summary.includes(search);
    return matchCat && matchSearch;
  });

  if (selectedArticle) {
    return (
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
    );
  }

  return (
    <div>
      {/* Categories */}
      <div className="px-6 md:px-12 py-6 bg-card border-b border-border">
        <div className="flex gap-1.5 mt-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCurrentCat(cat)}
              className={`border text-[0.72rem] px-3 py-1 rounded-full transition-colors ${
                currentCat === cat
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-12 py-8">
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
                <div className="h-[120px] bg-secondary/10 flex items-center justify-center text-4xl">
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
    </div>
  );
};

const LawCardDetail = ({ item, onBack }: { item: { tag?: string; title: string; desc: string; body?: string }; onBack: () => void }) => {
  return (
    <div className="p-6 md:px-12 max-w-[800px] mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 bg-transparent border border-border text-muted-foreground text-[0.75rem] px-4 py-2 rounded-sm cursor-pointer mb-7 hover:border-primary hover:text-primary transition-colors"
      >
        → بازگشت
      </button>
      {item.tag && <div className="text-[0.7rem] text-primary font-bold tracking-wider mb-3">{item.tag}</div>}
      <h1 className="text-[clamp(1.4rem,2.8vw,2rem)] text-foreground font-bold mb-4 leading-snug">{item.title}</h1>
      <p className="text-muted-foreground text-sm mb-7 pb-5 border-b border-border">{item.desc}</p>
      {item.body && (
        <div
          className="text-sm text-foreground/80 leading-[2] font-light [&_h4]:font-bold [&_h4]:text-foreground [&_h4]:text-base [&_h4]:my-6 [&_h4]:pr-3 [&_h4]:border-r-[3px] [&_h4]:border-primary [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-foreground"
          dangerouslySetInnerHTML={{ __html: item.body }}
        />
      )}
    </div>
  );
};

const LawsContent = ({ externalSelectedItem, onClearExternal }: {
  externalSelectedItem?: { tag?: string; title: string; desc: string; body?: string } | null;
  onClearExternal?: () => void;
}) => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedItem, setSelectedItem] = useState<{ tag?: string; title: string; desc: string; body?: string } | null>(null);

  useEffect(() => {
    if (externalSelectedItem) {
      setSelectedItem(externalSelectedItem);
      onClearExternal?.();
    }
  }, [externalSelectedItem]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab !== null) setActiveTab(parseInt(tab));
  }, [searchParams]);

  const current = serviceTabs[activeTab];

  if (selectedItem) {
    return <LawCardDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
  }

  // Display order: laws first (after الزام), then non-law items
  const tabDisplayOrder = [
    0,  // قانون الزام به ثبت رسمی
    9,  // قانون ثبت اسناد و املاک
    10, // قانون دفاتر اسناد رسمی
    7,  // قانون تسهیل تنظیم اسناد
    8,  // قانون مدنی (اسناد)
    14, // قانون مدنی — عقود
    11, // قانون روابط موجر و مستأجر
    12, // قانون پیش‌فروش ساختمان
    13, // قانون امور حسبی
    5,  // قانون کاداستر (حدنگار)
    15, // قانون ثبت احوال
    16, // قانون ثبت شرکت‌ها
    17, // قانون ثبت علائم و اختراعات
    18, // قانون ثبت اختراعات و طرح‌های صنعتی
    19, // قانون ثبت ارقام گیاهی
    20, // قانون حمایت از مالکیت صنعتی
    21, // قانون تجارت الکترونیکی
    22, // قانون تعیین تکلیف وضعیت ثبتی
    23, // قانون افراز و فروش املاک مشاع
    24, // آیین‌نامه اجرای اسناد لازم‌الاجرا
    25, // قانون تملک آپارتمان‌ها
    1,  // اسناد رسمی غیرحضوری
    2,  // آیین‌نامه دفاتر اسناد رسمی
    3,  // ثبت معاملات ملکی
    4,  // آرای وحدت رویه
    6,  // نحوه تنظیم و ثبت اسناد
  ];

  return (
    <div>
      {/* Law Tabs */}
      <div className="flex gap-0 border-b border-border bg-card overflow-x-auto px-6 md:px-12">
        {tabDisplayOrder.map((tabIdx) => (
          <button
            key={tabIdx}
            onClick={() => setActiveTab(tabIdx)}
            className={`px-5 py-3.5 text-[0.78rem] whitespace-nowrap border-b-2 transition-colors relative top-px ${
              activeTab === tabIdx
                ? 'text-primary border-primary font-semibold'
                : 'text-muted-foreground border-transparent hover:text-primary'
            }`}
          >
            {serviceTabs[tabIdx]?.title}
          </button>
        ))}
      </div>

      {/* Panel */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <div className="hidden lg:block bg-secondary border-l border-white/10 p-6 sticky top-[120px] h-fit">
            <h4 className="text-[0.72rem] text-white/60 font-bold tracking-wider mb-4">{current.sidebarTitle}</h4>
            <ul className="flex flex-col gap-1">
              {current.sidebarLinks.map((link, i) => (
                <li key={i}>
                  <span
                    onClick={() => setSelectedItem({ title: link.title, desc: '', body: link.body })}
                    className="flex items-center gap-2 text-white/35 text-[0.78rem] hover:text-white hover:bg-white/5 transition-colors py-2 px-2 rounded-sm cursor-pointer"
                  >
                    <span className="text-white/20 text-sm">›</span>
                    {link.title}
                  </span>
                </li>
              ))}
            </ul>
            <div className="h-px bg-white/10 my-4" />
            <div className="border border-white/10 rounded-sm p-4 mt-4">
              <p className="text-white/25 text-[0.72rem] leading-relaxed">سوال دارید؟</p>
              <Link to="/contact" className="text-white/70 text-[0.78rem] font-semibold hover:text-white">تماس با ما ←</Link>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            <div className="text-[0.68rem] text-primary font-bold tracking-wider mb-2">{current.tag}</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">{current.heading}</h3>
            <p className="text-muted-foreground text-sm leading-[1.9] mb-8 font-light max-w-[680px] border-b border-border pb-6">
              {current.intro}
            </p>

            {current.content.map((section, si) => (
              <div key={si} className="mb-8">
                <h4 className="text-sm font-bold text-foreground tracking-wide mb-3 pb-2 border-b border-border">
                  {section.sectionTitle}
                </h4>
                {section.type === 'law-cards' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.items.map((item, ii) => (
                      <div
                        key={ii}
                        onClick={() => item.body ? setSelectedItem(item) : undefined}
                        className="bg-card border border-border rounded p-5 hover:border-primary/30 hover:shadow-elegant hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        {item.tag && <div className="text-[0.65rem] text-primary font-bold tracking-wider mb-2">{item.tag}</div>}
                        <h4 className="text-sm font-bold text-foreground mb-1 leading-snug">{item.title}</h4>
                        <p className="text-[0.78rem] text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                        {item.body && <div className="mt-3"><span className="text-[0.7rem] text-primary font-semibold">مطالعه بیشتر ←</span></div>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {section.items.map((item, ii) => (
                      <div
                        key={ii}
                        onClick={() => item.body ? setSelectedItem(item) : undefined}
                        className="group flex items-center gap-3 text-sm text-foreground/80 px-3 py-2.5 bg-card border border-border rounded-sm hover:border-primary/30 hover:bg-primary/[0.03] transition-colors cursor-pointer"
                      >
                         <span className="shrink-0 mt-0.5">📄</span>
                        <span className="flex-1">{item.title}</span>
                        <span className="text-[0.7rem] text-muted-foreground whitespace-nowrap">{item.desc}</span>
                        {item.body && <span className="text-primary text-sm shrink-0 transition-transform group-hover:translate-x-[-4px]">←</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}



          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Global search result type
type SearchResult = {
  type: 'article' | 'law';
  title: string;
  desc: string;
  emoji?: string;
  tabIndex?: number;
  article?: typeof articles[0];
  lawItem?: { tag?: string; title: string; desc: string; body?: string };
};

const GlobalSearch = ({ onSelectArticle, onSelectLaw }: {
  onSelectArticle: (a: typeof articles[0]) => void;
  onSelectLaw: (item: { tag?: string; title: string; desc: string; body?: string }) => void;
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo<SearchResult[]>(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    const res: SearchResult[] = [];

    // Search articles
    articles.forEach(a => {
      if (a.title.includes(q) || a.summary.includes(q) || a.body.includes(q)) {
        res.push({ type: 'article', title: a.title, desc: a.summary.slice(0, 80) + '...', emoji: a.emoji, article: a });
      }
    });

    // Search law tabs content
    serviceTabs.forEach((tab, ti) => {
      // Search tab intro
      if (tab.heading.includes(q) || tab.intro.includes(q)) {
        res.push({ type: 'law', title: tab.heading, desc: tab.intro.slice(0, 80) + '...', tabIndex: ti });
      }
      // Search sidebar links
      tab.sidebarLinks.forEach(link => {
        if (link.title.includes(q) || (link.body && link.body.includes(q))) {
          res.push({ type: 'law', title: link.title, desc: tab.heading, tabIndex: ti, lawItem: { title: link.title, desc: '', body: link.body } });
        }
      });
      // Search content items
      tab.content.forEach(section => {
        section.items.forEach(item => {
          if (item.title.includes(q) || item.desc.includes(q) || (item.body && item.body.includes(q))) {
            if (!res.find(r => r.title === item.title)) {
              res.push({ type: 'law', title: item.title, desc: item.desc.slice(0, 80), tabIndex: ti, lawItem: item });
            }
          }
        });
      });
    });

    return res.slice(0, 12);
  }, [query]);

  const showDropdown = isFocused && query.length >= 2;

  return (
    <div className="relative mt-6 max-w-[560px]">
      <div className="flex items-center gap-0 bg-white/10 rounded-lg border border-white/15 focus-within:border-white/30 transition-colors">
        <Search size={16} className="text-white/40 mr-3" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="جستجو در قوانین و مقالات..."
          className="flex-1 bg-transparent text-white text-sm py-3 px-1 outline-none placeholder:text-white/30"
        />
        {query && (
          <button onClick={() => setQuery('')} className="p-2 text-white/40 hover:text-white/70 transition-colors">
            <X size={14} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl z-50 max-h-[360px] overflow-y-auto"
          >
            {results.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground text-sm">
                <span className="text-2xl block mb-2 opacity-30">🔍</span>
                نتیجه‌ای یافت نشد
              </div>
            ) : (
              results.map((r, i) => (
                <button
                  key={i}
                  onMouseDown={() => {
                    if (r.type === 'article' && r.article) onSelectArticle(r.article);
                    else if (r.lawItem) onSelectLaw(r.lawItem);
                    setQuery('');
                  }}
                  className="w-full text-right flex items-start gap-3 px-4 py-3 hover:bg-primary/5 transition-colors border-b border-border/50 last:border-b-0"
                >
                  <span className="text-lg mt-0.5">{r.emoji || (r.type === 'law' ? '⚖️' : '📰')}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-foreground truncate">{r.title}</div>
                    <div className="text-[0.72rem] text-muted-foreground truncate">{r.desc}</div>
                  </div>
                  <span className={`text-[0.6rem] px-2 py-0.5 rounded-full shrink-0 mt-1 ${
                    r.type === 'article' ? 'bg-primary/10 text-primary' : 'bg-accent/20 text-accent-foreground'
                  }`}>
                    {r.type === 'article' ? 'مقاله' : 'قانون'}
                  </span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContentPage = () => {
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode');
  const [viewMode, setViewMode] = useState<ViewMode>(modeParam === 'articles' ? 'articles' : 'laws');
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [selectedLaw, setSelectedLaw] = useState<{ tag?: string; title: string; desc: string; body?: string } | null>(null);

  // Sync viewMode with URL param
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'articles') setViewMode('articles');
    else if (mode === 'laws') setViewMode('laws');
  }, [searchParams]);

  const handleSearchArticle = (a: typeof articles[0]) => {
    setViewMode('articles');
    setSelectedArticle(a);
  };

  const handleSearchLaw = (item: { tag?: string; title: string; desc: string; body?: string }) => {
    setViewMode('laws');
    setSelectedLaw(item);
  };

  return (
    <div className="min-h-screen pt-[100px] md:pt-[120px] bg-background">
      <SEOHead
        title="قوانین ثبتی و مقالات حقوقی | دفتر اسناد رسمی ۲۳ لواسان"
        description="مجموعه کامل قوانین ثبت اسناد و املاک، آیین‌نامه دفاتر اسناد رسمی، قانون الزام ثبت، بخشنامه‌ها و مقالات تخصصی حقوقی. دفترخانه ۲۳ لواسان — سردفتر دکتر هدی جعفری."
        canonical="https://notary23.lovable.app/content"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "قوانین ثبتی و مقالات حقوقی — دفترخانه ۲۳ لواسان",
          "description": "مجموعه قوانین ثبت اسناد، آیین‌نامه‌ها، بخشنامه‌ها و مقالات حقوقی",
          "isPartOf": { "@type": "WebSite", "name": "دفتر اسناد رسمی ۲۳ لواسان", "url": "https://notary23.lovable.app" }
        }}
      />
      {/* Header */}
      <div className="bg-secondary px-6 md:px-12 py-10 border-b border-white/10">
        <div className="text-[0.68rem] tracking-[0.14em] text-white/60 font-semibold mb-2">▸ قوانین، مقررات و مقالات</div>
        <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] text-white mb-1 font-bold">پایگاه حقوقی دفترخانه ۲۳ لواسان</h2>
        <p className="text-white/35 text-sm max-w-[520px]">مجموعه قوانین، بخشنامه‌ها، مقررات و مقالات تخصصی حقوقی</p>

        <GlobalSearch onSelectArticle={handleSearchArticle} onSelectLaw={handleSearchLaw} />

        {/* Toggle */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setViewMode('laws')}
            className={`px-5 py-2.5 text-[0.8rem] rounded-lg font-semibold transition-all ${
              viewMode === 'laws'
                ? 'bg-white text-secondary shadow-lg'
                : 'bg-white/10 text-white/50 hover:bg-white/15 hover:text-white'
            }`}
          >
            ⚖️ قوانین و مقررات
          </button>
          <button
            onClick={() => setViewMode('articles')}
            className={`px-5 py-2.5 text-[0.8rem] rounded-lg font-semibold transition-all ${
              viewMode === 'articles'
                ? 'bg-white text-secondary shadow-lg'
                : 'bg-white/10 text-white/50 hover:bg-white/15 hover:text-white'
            }`}
          >
            📰 مقالات حقوقی
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'laws' ? (
        <LawsContent externalSelectedItem={selectedLaw} onClearExternal={() => setSelectedLaw(null)} />
      ) : (
        <ArticlesGridWrapper externalSelected={selectedArticle} onClearExternal={() => setSelectedArticle(null)} />
      )}

      <Footer />
    </div>
  );
};

export default ContentPage;

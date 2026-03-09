import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronDown, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import notaryEmblem from '@/assets/notary-emblem.png';
import { serviceTabs } from '@/data/services';

// Menu structure: categories with sub-items
const menuCategories = [
  {
    label: 'قوانین',
    hasSubmenu: true,
    items: [
      { label: 'قانون الزام به ثبت رسمی', tabIndex: 0 },
      { label: 'قانون ثبت اسناد و املاک', tabIndex: 9 },
      { label: 'قانون دفاتر اسناد رسمی', tabIndex: 10 },
      { label: 'قانون تسهیل تنظیم اسناد', tabIndex: 7 },
      { label: 'قانون مدنی (اسناد)', tabIndex: 8 },
      { label: 'قانون مدنی — عقود', tabIndex: 14 },
      { label: 'قانون روابط موجر و مستأجر', tabIndex: 11 },
      { label: 'قانون پیش‌فروش ساختمان', tabIndex: 12 },
      { label: 'قانون امور حسبی', tabIndex: 13 },
      { label: 'قانون کاداستر (حدنگار)', tabIndex: 5 },
      { label: 'قانون ثبت احوال', tabIndex: 15 },
      { label: 'قانون ثبت شرکت‌ها', tabIndex: 16 },
      { label: 'قانون ثبت علائم و اختراعات', tabIndex: 17 },
      { label: 'قانون ثبت اختراعات و طرح‌های صنعتی', tabIndex: 18 },
      { label: 'قانون ثبت ارقام گیاهی', tabIndex: 19 },
      { label: 'قانون حمایت از مالکیت صنعتی', tabIndex: 20 },
      { label: 'قانون تجارت الکترونیکی', tabIndex: 21 },
      { label: 'قانون تعیین تکلیف وضعیت ثبتی', tabIndex: 22 },
      { label: 'قانون افراز و فروش املاک مشاع', tabIndex: 23 },
      { label: 'قانون تملک آپارتمان‌ها', tabIndex: 25 },
    ],
  },
  { label: 'اسناد رسمی غیرحضوری', tabIndex: 1 },
  { label: 'آیین‌نامه دفاتر اسناد رسمی', tabIndex: 2 },
  { label: 'ثبت معاملات ملکی', tabIndex: 3 },
  { label: 'آرای وحدت رویه', tabIndex: 4 },
  { label: 'آیین‌نامه اجرای اسناد لازم‌الاجرا', tabIndex: 24 },
  { label: 'نحوه تنظیم و ثبت اسناد', tabIndex: 6 },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const [lawsDropdownOpen, setLawsDropdownOpen] = useState(false);
  const [mobileLawsOpen, setMobileLawsOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileLawsSubmenu, setMobileLawsSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const submenuTimeout = useRef<ReturnType<typeof setTimeout>>();

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLawsDropdownOpen(false);
        setHoveredCategory(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLawTabClick = (tabIndex: number) => {
    navigate(`/content?mode=laws&tab=${tabIndex}`);
    setLawsDropdownOpen(false);
    setHoveredCategory(null);
    setIsOpen(false);
    setMobileLawsOpen(false);
    setMobileLawsSubmenu(null);
  };

  const handleMouseEnter = () => {
    clearTimeout(dropdownTimeout.current);
    setLawsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setLawsDropdownOpen(false);
      setHoveredCategory(null);
    }, 150);
  };

  const handleCategoryEnter = (label: string) => {
    clearTimeout(submenuTimeout.current);
    setHoveredCategory(label);
  };

  const handleCategoryLeave = () => {
    submenuTimeout.current = setTimeout(() => setHoveredCategory(null), 100);
  };

  const isLawsActive = location.pathname === '/content' && (!location.search || location.search.includes('mode=laws'));
  const isArticlesActive = location.pathname === '/content' && location.search.includes('mode=articles');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar - desktop */}
      <div className="bg-background text-foreground/70 text-[0.68rem] py-1.5 px-4 md:px-12 hidden md:block border-b border-border">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
          <div className="flex items-center gap-5">
            <span>📞 ۰۲۱-۲۶۵۶۹۶۵۹ | ۰۹۲۰۴۳۲۳۰۲۳</span>
            <span>📧 daftar23.lavasan@gmail.com</span>
          </div>
          <div className="flex items-center gap-5">
            <span>🕐 شنبه تا چهارشنبه: ۸:۳۰ — ۱۴:۰۰</span>
            <span>📍 لواسان، بلوار امام خمینی، شورکاب</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-secondary backdrop-blur-md border-b border-white/10 shadow-sm">
        <div className="flex justify-between items-center px-4 md:px-12 py-2 max-w-[1400px] mx-auto">
          {/* Logo with emblem */}
          <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <img src={notaryEmblem} alt="آرم دفترخانه" className="w-12 h-12 object-contain brightness-0 invert" />
            <div>
              <div className="text-white text-sm font-bold leading-tight">دفتر اسناد رسمی ۲۳ لواسان</div>
              <span className="text-white/50 text-[0.62rem] font-light">سردفتر: دکتر هدی جعفری</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-0">
            {/* Home */}
            <li>
              <Link
                to="/"
                className={`px-4 py-2 text-[0.8rem] transition-colors relative ${
                  location.pathname === '/' ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                صفحه اصلی
                {location.pathname === '/' && (
                  <span className="absolute bottom-0 right-[10%] left-[10%] h-[2px] bg-white rounded-full" />
                )}
              </Link>
            </li>

            {/* Laws dropdown */}
            <li className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button
                className={`px-4 py-2 text-[0.8rem] transition-colors relative flex items-center gap-1 ${
                  isLawsActive ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
                onClick={() => navigate('/content?mode=laws')}
              >
                قوانین و آیین‌نامه‌ها
                <ChevronDown size={13} className={`transition-transform ${lawsDropdownOpen ? 'rotate-180' : ''}`} />
                {isLawsActive && (
                  <span className="absolute bottom-0 right-[10%] left-[10%] h-[2px] bg-white rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {lawsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full right-0 mt-1 min-w-[220px] bg-card border border-border rounded-lg shadow-xl z-50"
                  >
                    <div className="py-1.5">
                      {menuCategories.map((cat, i) => (
                        'hasSubmenu' in cat && cat.hasSubmenu ? (
                          <div
                            key={i}
                            className="relative"
                            onMouseEnter={() => handleCategoryEnter(cat.label)}
                            onMouseLeave={handleCategoryLeave}
                          >
                            <button
                              className="w-full text-right px-4 py-2.5 text-[0.78rem] text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between gap-2"
                            >
                              <span className="flex items-center gap-2">
                                <span className="text-primary/40 text-xs">›</span>
                                {cat.label}
                              </span>
                              <ChevronLeft size={12} className="text-muted-foreground" />
                            </button>

                            <AnimatePresence>
                              {hoveredCategory === cat.label && (
                                <motion.div
                                  initial={{ opacity: 0, x: 8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 8 }}
                                  transition={{ duration: 0.15 }}
                                  className="absolute top-0 left-full mr-0 ml-1 min-w-[230px] bg-card border border-border rounded-lg shadow-xl z-50"
                                  onMouseEnter={() => handleCategoryEnter(cat.label)}
                                  onMouseLeave={handleCategoryLeave}
                                >
                                  <div className="py-1.5 max-h-[360px] overflow-y-auto">
                                    {cat.items.map((item, j) => (
                                      <button
                                        key={j}
                                        onClick={() => handleLawTabClick(item.tabIndex)}
                                        className="w-full text-right px-4 py-2.5 text-[0.78rem] text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
                                      >
                                        <span className="text-primary/40 text-xs">›</span>
                                        {item.label}
                                      </button>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ) : (
                          <button
                            key={i}
                            onClick={() => handleLawTabClick((cat as any).tabIndex)}
                            className="w-full text-right px-4 py-2.5 text-[0.78rem] text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <span className="text-primary/40 text-xs">›</span>
                            {cat.label}
                          </button>
                        )
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Articles */}
            <li>
              <Link
                to="/content?mode=articles"
                className={`px-4 py-2 text-[0.8rem] transition-colors relative ${
                  isArticlesActive ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                مقالات حقوقی
                {isArticlesActive && (
                  <span className="absolute bottom-0 right-[10%] left-[10%] h-[2px] bg-white rounded-full" />
                )}
              </Link>
            </li>

            {/* Contact */}
            <li>
              <Link
                to="/contact"
                className={`px-4 py-2 text-[0.8rem] transition-colors relative ${
                  location.pathname === '/contact' ? 'text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                تماس با ما
                {location.pathname === '/contact' && (
                  <span className="absolute bottom-0 right-[10%] left-[10%] h-[2px] bg-white rounded-full" />
                )}
              </Link>
            </li>

            <li>
              <button onClick={toggleDark} className="p-2 text-white/60 hover:text-white transition-colors" title="تغییر تم">
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button onClick={toggleDark} className="text-white/60 hover:text-white p-2 transition-colors" title="تغییر تم">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="text-white p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="منو"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-card border-b border-border shadow-lg"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className={`py-3 px-2 text-sm border-b border-border/50 transition-colors ${
                  location.pathname === '/' ? 'text-primary font-bold' : 'text-foreground/50 hover:text-primary'
                }`}
              >
                صفحه اصلی
              </Link>

              {/* Mobile laws accordion */}
              <div className="border-b border-border/50">
                <button
                  onClick={() => setMobileLawsOpen(!mobileLawsOpen)}
                  className={`w-full flex items-center justify-between py-3 px-2 text-sm transition-colors ${
                    isLawsActive ? 'text-primary font-bold' : 'text-foreground/50 hover:text-primary'
                  }`}
                >
                  قوانین و آیین‌نامه‌ها
                  <ChevronDown size={15} className={`transition-transform ${mobileLawsOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileLawsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-0.5 pb-3 pr-4 max-h-[400px] overflow-y-auto">
                        {menuCategories.map((cat, i) => (
                          'hasSubmenu' in cat && cat.hasSubmenu ? (
                            <div key={i}>
                              <button
                                onClick={() => setMobileLawsSubmenu(mobileLawsSubmenu === cat.label ? null : cat.label)}
                                className="w-full text-right flex items-center justify-between py-2 px-3 text-[0.78rem] text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                              >
                                {cat.label}
                                <ChevronDown size={13} className={`transition-transform ${mobileLawsSubmenu === cat.label ? 'rotate-180' : ''}`} />
                              </button>
                              <AnimatePresence>
                                {mobileLawsSubmenu === cat.label && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="flex flex-col gap-0.5 pr-4 pb-1">
                                      {cat.items.map((item, j) => (
                                        <button
                                          key={j}
                                          onClick={() => handleLawTabClick(item.tabIndex)}
                                          className="text-right py-2 px-3 text-[0.75rem] text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                                        >
                                          {item.label}
                                        </button>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ) : (
                            <button
                              key={i}
                              onClick={() => handleLawTabClick((cat as any).tabIndex)}
                              className="text-right py-2 px-3 text-[0.78rem] text-muted-foreground hover:text-primary hover:bg-primary/5 rounded transition-colors"
                            >
                              {cat.label}
                            </button>
                          )
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/content?mode=articles"
                onClick={() => setIsOpen(false)}
                className={`py-3 px-2 text-sm border-b border-border/50 transition-colors ${
                  isArticlesActive ? 'text-primary font-bold' : 'text-foreground/50 hover:text-primary'
                }`}
              >
                مقالات حقوقی
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={`py-3 px-2 text-sm border-b border-border/50 transition-colors ${
                  location.pathname === '/contact' ? 'text-primary font-bold' : 'text-foreground/50 hover:text-primary'
                }`}
              >
                تماس با ما
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

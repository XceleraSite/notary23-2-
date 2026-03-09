import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { serviceTabs } from '@/data/services';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab !== null) setActiveTab(parseInt(tab));
  }, [searchParams]);

  const current = serviceTabs[activeTab];

  return (
    <div className="min-h-screen pt-[100px] md:pt-[120px] bg-background">
      {/* Header */}
      <div className="bg-secondary px-6 md:px-12 py-10 border-b border-white/10">
        <div className="text-[0.68rem] tracking-[0.14em] text-white/60 font-semibold mb-2">▸ قوانین و مقررات</div>
        <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] text-white mb-1 font-bold">پایگاه قوانین حقوقی ایران</h2>
        <p className="text-white/35 text-sm max-w-[520px]">مجموعه تخصصی قوانین، بخشنامه‌ها و مقررات مرتبط با دفاتر اسناد رسمی و ثبت اسناد</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border bg-accent overflow-x-auto px-6 md:px-12">
        {serviceTabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-5 py-3.5 text-[0.78rem] whitespace-nowrap border-b-2 transition-colors relative top-px ${
              activeTab === i
                ? 'text-white border-white font-semibold'
                : 'text-white/40 border-transparent hover:text-white/70'
            }`}
          >
            {tab.title}
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
          {/* Sidebar - desktop only */}
          <div className="hidden lg:block bg-secondary border-l border-white/10 p-6 sticky top-[120px] h-fit">
            <h4 className="text-[0.72rem] text-white/60 font-bold tracking-wider mb-4">{current.sidebarTitle}</h4>
            <ul className="flex flex-col gap-1">
              {current.sidebarLinks.map((link, i) => (
                <li key={i}>
                  <span className="flex items-center gap-2 text-white/35 text-[0.78rem] hover:text-white hover:bg-white/5 transition-colors py-2 px-2 rounded-sm cursor-pointer">
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
                      <div key={ii} className="bg-card border border-border rounded p-5 hover:border-primary/30 hover:shadow-elegant hover:-translate-y-0.5 transition-all cursor-pointer">
                        {item.tag && <div className="text-[0.65rem] text-primary font-bold tracking-wider mb-2">{item.tag}</div>}
                        <h4 className="text-sm font-bold text-foreground mb-1 leading-snug">{item.title}</h4>
                        <p className="text-[0.78rem] text-muted-foreground leading-relaxed font-light">{item.desc}</p>
                        <div className="mt-3"><span className="text-[0.7rem] text-primary font-semibold">مطالعه بیشتر ←</span></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {section.items.map((item, ii) => (
                      <div key={ii} className="flex items-start gap-3 text-sm text-foreground/80 px-3 py-2.5 bg-card border border-border rounded-sm hover:border-primary/30 hover:bg-primary/[0.03] transition-colors cursor-pointer">
                        <span className="shrink-0 mt-0.5">📄</span>
                        <span className="flex-1">{item.title}</span>
                        <span className="text-[0.7rem] text-muted-foreground whitespace-nowrap">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <ContactForm
              title={current.formTitle}
              emoji={current.formEmoji}
              selectField={{ name: 'type', label: 'نوع درخواست', options: ['مشاوره', 'استعلام', 'سایر'] }}
            />
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ServicesPage;

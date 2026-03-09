import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, FileText, Scale, Stamp, BookOpen, Users, Phone, ExternalLink } from 'lucide-react';
import RevealSection from '@/components/RevealSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import { quickCategories } from '@/data/services';
import heroBg from '@/assets/hero-bg.jpg';
import notaryEmblem from '@/assets/notary-emblem.png';

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-background border border-border rounded cursor-pointer overflow-hidden"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center px-5 py-4">
        <span className="text-sm font-semibold text-foreground" itemProp="name">{question}</span>
        <ChevronDown className={`text-primary shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} size={18} />
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
          <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed font-light" itemProp="text">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

const usefulLinks = [
  { title: 'سازمان ثبت اسناد و املاک کشور', url: 'https://www.ssaa.ir', icon: '🏛' },
  { title: 'استعلام تصدیق و اصالت اوراق', url: 'https://portal.ssaa.ir/estelam/tasdigh', icon: '📋' },
  { title: 'وضعیت استعلام الکترونیک ملک', url: 'https://portal.ssaa.ir/estelam/melk', icon: '🏠' },
  { title: 'تصدیق اصالت سند ملک', url: 'https://portal.ssaa.ir/estelam/sanad', icon: '✅' },
  { title: 'استعلام شناسه ملی اشخاص حقوقی', url: 'https://ilenc.ssaa.ir', icon: '🔍' },
  { title: 'استعلام صحت وکالت سفارت (میخک)', url: 'https://mikhak.ssaa.ir', icon: '🌸' },
  { title: 'رهگیری مرسولات پستی', url: 'https://tracking.post.ir', icon: '📦' },
  { title: 'سامانه ثبت الکترونیک اسناد', url: 'https://sabt.ssaa.ir', icon: '💻' },
];

const services = [
  { icon: <FileText size={24} />, title: 'تنظیم اسناد رسمی', desc: 'تنظیم انواع اسناد قطعی، رهنی، صلح و اجاره' },
  { icon: <Scale size={24} />, title: 'گواهی امضا', desc: 'تصدیق و گواهی امضای اسناد عادی و رسمی' },
  { icon: <Stamp size={24} />, title: 'وکالت‌نامه', desc: 'تنظیم انواع وکالت‌نامه‌های کاری، فروش و...' },
  { icon: <BookOpen size={24} />, title: 'مشاوره حقوقی', desc: 'مشاوره تخصصی در امور ثبتی و حقوقی' },
  { icon: <Users size={24} />, title: 'قراردادها', desc: 'تنظیم قراردادهای تجاری، مشارکت و پیمان‌کاری' },
  { icon: <Phone size={24} />, title: 'تماس با ما', desc: 'ارتباط مستقیم با دفترخانه' },
];

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="دفتر اسناد رسمی ۲۳ لواسان | دفترخانه، ثبت سند، گواهی امضا، وکالتنامه"
        description="دفتر اسناد رسمی شماره ۲۳ لواسان — سردفتر دکتر هدی جعفری. تنظیم سند رسمی، ثبت اسناد، گواهی امضا، وکالت‌نامه، سند ملک، سند خودرو، اجاره‌نامه رسمی، صلح‌نامه، رهن، فک رهن، قولنامه، مشاوره حقوقی و ثبت الکترونیک اسناد در لواسان و شمیرانات."
        canonical="https://notary23.lovable.app/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Notary",
          "name": "دفتر اسناد رسمی ۲۳ لواسان",
          "alternateName": "Notary Public No.23 Lavasan",
          "description": "دفتر اسناد رسمی شماره ۲۳ لواسان — تنظیم سند رسمی، ثبت اسناد، گواهی امضا، وکالت‌نامه، سند ملک، اجاره‌نامه، صلح‌نامه، رهن، مشاوره حقوقی",
          "url": "https://notary23.lovable.app",
          "telephone": "+982126569659",
          "email": "daftar23.lavasan@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "بلوار امام خمینی، شورکاب، کوچه میراث، پلاک ۷، طبقه یک",
            "addressLocality": "لواسان",
            "addressRegion": "تهران",
            "addressCountry": "IR"
          },
          "geo": { "@type": "GeoCoordinates", "latitude": "35.8167", "longitude": "51.6333" },
          "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
            "opens": "08:30",
            "closes": "14:00"
          }],
          "employee": { "@type": "Person", "name": "دکتر هدی جعفری", "jobTitle": "سردفتر" },
          "priceRange": "$$",
          "areaServed": { "@type": "City", "name": "لواسان" }
        }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-[110px] md:pt-[130px] pb-16 bg-secondary" aria-label="معرفی دفترخانه ۲۳ لواسان">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary/95 to-secondary/80" />
        </div>

        <div className="relative z-10 px-6 md:px-12 max-w-[1200px] mx-auto">
          {/* Official header with emblem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <img src={notaryEmblem} alt="آرم قوه قضاییه" className="w-28 h-28 mx-auto mb-4 drop-shadow-lg brightness-0 invert" />
            <div className="text-white/40 text-[0.7rem] tracking-[0.2em] mb-2">جمهوری اسلامی ایران · سازمان ثبت اسناد و املاک کشور</div>
            <h1 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-black text-white leading-tight mb-2">
              دفتر اسناد رسمی ۲۳
            </h1>
            <div className="text-white/60 text-lg mb-1">لواسان</div>
            <div className="text-white/40 text-sm">سردفتر: دکتر هدی جعفری</div>
          </motion.div>

          {/* Quick action cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-3 gap-3 max-w-[600px] mx-auto"
          >
            {[
              { label: 'قوانین و آیین‌نامه‌ها', icon: '⚖️', path: '/content?mode=laws' },
              { label: 'مقالات حقوقی', icon: '📝', path: '/content?mode=articles' },
              { label: 'تماس با ما', icon: '📞', path: '/contact' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.path}
                className="flex flex-col items-center gap-2 py-5 px-3 rounded-lg border transition-all hover:-translate-y-1 bg-white/[0.08] text-white border-white/10 hover:bg-white/15 hover:border-white/20"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[0.78rem]">{item.label}</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 px-6 md:px-12 bg-background" aria-label="خدمات دفتر اسناد رسمی ۲۳ لواسان">
        <RevealSection className="text-center mb-10">
          <span className="text-[0.7rem] tracking-[0.14em] text-primary font-semibold">▸ خدمات دفترخانه</span>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] mt-2 text-foreground font-bold">خدمات قابل ارائه</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-[500px] mx-auto">دفترخانه ۲۳ لواسان آماده ارائه کلیه خدمات ثبتی و حقوقی به شما عزیزان است</p>
        </RevealSection>
        <RevealSection delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[960px] mx-auto">
            {services.map((srv, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6 hover:shadow-elegant hover:-translate-y-0.5 transition-all group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {srv.icon}
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{srv.title}</h3>
                <p className="text-[0.78rem] text-muted-foreground leading-relaxed font-light">{srv.desc}</p>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Quick Categories */}
      <section className="py-14 px-6 md:px-12 bg-card" aria-label="حوزه‌های تخصصی قوانین و مقررات ثبتی">
        <RevealSection className="text-center mb-10">
          <span className="text-[0.7rem] tracking-[0.14em] text-primary font-semibold">▸ حوزه‌های تخصصی</span>
          <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] mt-2 text-foreground font-bold">دسترسی سریع به مطالب</h2>
        </RevealSection>
        <RevealSection delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border max-w-[960px] mx-auto rounded-lg overflow-hidden">
            {quickCategories.map((cat, i) => (
              <Link
                key={i}
                to={`/content?tab=${cat.tabIndex}`}
                className="bg-background p-7 hover:bg-primary/[0.03] transition-colors group"
              >
                <div className="text-2xl mb-3">{cat.emoji}</div>
                <h3 className="text-[0.88rem] font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="text-[0.76rem] text-muted-foreground leading-relaxed font-light">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* Useful Links + About side by side */}
      <section className="py-14 px-6 md:px-12 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 max-w-[1100px] mx-auto">
          {/* Useful Links */}
          <RevealSection>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-base font-bold text-foreground mb-5 pb-3 border-b border-border flex items-center gap-2">
                🔗 پیوندهای مفید
              </h3>
              <div className="flex flex-col gap-1">
                {usefulLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      window.open(link.url, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-3 text-[0.82rem] text-foreground/70 hover:text-primary py-2.5 px-2 rounded hover:bg-primary/[0.04] transition-colors border-b border-border/50 last:border-b-0 cursor-pointer"
                  >
                    <span>{link.icon}</span>
                    <span className="flex-1">{link.title}</span>
                    <ExternalLink size={12} className="opacity-30" />
                  </a>
                ))}
              </div>
            </div>
          </RevealSection>

          {/* About the notary */}
          <RevealSection delay={0.15}>
            <div className="bg-secondary text-white rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <img src={notaryEmblem} alt="" className="w-14 h-14" />
                <div>
                  <h3 className="text-lg font-bold">درباره دفترخانه</h3>
                  <span className="text-white/40 text-[0.72rem]">دفتر اسناد رسمی شماره ۲۳ لواسان</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-[2] mb-6">
                دفتر اسناد رسمی ۲۳ لواسان با مدیریت سردفتر دکتر هدی جعفری، در زمینه تنظیم اسناد رسمی، گواهی امضا، وکالت‌نامه و سایر خدمات ثبتی، آماده ارائه خدمات حرفه‌ای به شما عزیزان است.
                این دفترخانه تحت نظارت سازمان ثبت اسناد و املاک کشور و کانون سردفتران و دفتریاران فعالیت می‌نماید.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'آدرس', value: 'لواسان، بلوار امام خمینی، شورکاب، کوچه میراث، پلاک ۷، طبقه یک' },
                  { label: 'تلفن ثابت', value: '۰۲۱-۲۶۵۶۹۶۵۹' },
                  { label: 'همراه', value: '۰۹۲۰۴۳۲۳۰۲۳' },
                  { label: 'ایمیل', value: 'daftar23.lavasan@gmail.com' },
                ].map((info, i) => (
                  <div key={i} className="bg-white/[0.06] rounded p-3">
                    <div className="text-white/40 text-[0.65rem] font-semibold mb-0.5">{info.label}</div>
                    <div className="text-white/80 text-[0.78rem]">{info.value}</div>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-block mt-5 bg-white dark:bg-foreground text-primary dark:text-background px-5 py-2.5 rounded text-[0.8rem] font-bold hover:bg-white/90 dark:hover:bg-foreground/90 transition-colors">
                تماس با دفترخانه ←
              </Link>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FAQ with FAQPage Schema */}
      <section className="py-14 px-6 md:px-12 bg-card" aria-label="سوالات متداول دفترخانه">
        <RevealSection className="text-center mb-10">
          <span className="text-[0.7rem] tracking-[0.14em] text-primary font-semibold">▸ سوالات متداول</span>
          <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] mt-2 text-foreground font-bold">پاسخ به پرسش‌های شما</h2>
        </RevealSection>
        <RevealSection delay={0.1}>
          <div className="max-w-[700px] mx-auto flex flex-col gap-3" itemScope itemType="https://schema.org/FAQPage">
            {[
              { q: 'آیا برای ثبت قولنامه باید ابتدا به بنگاه مراجعه کرد؟', a: 'خیر. طبق ماده ۳ قانون الزام، مردم می‌توانند مستقیماً به دفترخانه مراجعه و سند خود را ثبت کنند. البته اگر بنگاه طرفین را معرفی کرده باشد دریافت حق‌الزحمه طبیعی است.' },
              { q: 'آیا ثبت رسمی قولنامه الزامی است؟', a: 'لزوم تنظیم قولنامه رسمی فعلاً ناظر بر اسنادی است که پس از سوم تیرماه ۱۴۰۳ صادر شده‌اند. دفاتر طبق ماده ۲ قانون الزام مکلف‌اند نسبت به ثبت رسمی قولنامه اقدام کنند.' },
              { q: 'آیا بدون شناسنامه فنی ساختمان می‌توان قرارداد پیش‌خرید تنظیم کرد؟', a: 'بله. طبق ماده ۱۵ قانون الزام، ارائه شناسنامه فنی و ملکی الزامی نیست و تنظیم سند پیش‌فروش در دفاتر تسهیل شده است. اما در تنظیم سند بیع ارائه پایان کار یا گواهی عدم خلاف ضروری است.' },
              { q: 'آیا امکان تنظیم سند غیرحضوری وجود دارد؟', a: 'بله، بر اساس شیوه‌نامه ۱۴۰۳ از طریق سکوی الکترونیکی کاتب و با امضای دیجیتال، تنظیم سند غیرحضوری امکان‌پذیر است.' },
              { q: 'ساعات کاری دفترخانه چگونه است؟', a: 'شنبه تا چهارشنبه ۸:۳۰ تا ۱۴:۰۰. پنج‌شنبه و جمعه تعطیل است.' },
              { q: 'چرا نباید املاک دارای سند سبز رنگ را با معامله عادی انتقال داد؟', a: 'اسناد مالکیت حدنگار سبز رنگ پس از قانون الزام صادر شده‌اند و معاملات این املاک باید به صورت رسمی در سامانه ثبت الکترونیک ثبت گردد. معاملات عادی این املاک تبعات قانونی جدی دارد.' },
            ].map((item, i) => (
              <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <FAQItem question={item.q} answer={item.a} />
              </div>
            ))}
          </div>
        </RevealSection>
      </section>




      <Footer />
    </div>
  );
};

export default HomePage;

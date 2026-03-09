import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import RevealSection from '@/components/RevealSection';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const ContactPage = () => {
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value.replace(/\n/g, '، '));
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen pt-[100px] md:pt-[120px] bg-background">
      <SEOHead
        title="تماس با دفتر اسناد رسمی ۲۳ لواسان | آدرس، تلفن، ساعت کاری دفترخانه"
        description="آدرس و شماره تلفن دفتر اسناد رسمی ۲۳ لواسان. تلفن: ۰۲۱-۲۶۵۶۹۶۵۹. آدرس: لواسان، بلوار امام خمینی، شورکاب، کوچه میراث. ساعات کاری: شنبه تا چهارشنبه ۸:۳۰ تا ۱۴:۰۰. سردفتر: دکتر هدی جعفری."
        canonical="https://notary23.lovable.app/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "تماس با دفتر اسناد رسمی ۲۳ لواسان",
          "description": "اطلاعات تماس دفترخانه ۲۳ لواسان — آدرس، تلفن، ایمیل و ساعات کاری",
          "mainEntity": {
            "@type": "Notary",
            "name": "دفتر اسناد رسمی ۲۳ لواسان",
            "telephone": "+982126569659",
            "email": "daftar23.lavasan@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "بلوار امام خمینی، شورکاب، کوچه میراث، پلاک ۷، طبقه یک",
              "addressLocality": "لواسان",
              "addressRegion": "تهران",
              "addressCountry": "IR"
            }
          }
        }}
      />
      {/* Header */}
      <div className="bg-secondary px-6 md:px-12 py-10 border-b border-white/10">
        <div className="text-[0.68rem] tracking-[0.14em] text-white/60 font-semibold mb-2">▸ ارتباط با ما</div>
        <h2 className="text-[clamp(1.5rem,2.8vw,2.2rem)] text-white mb-1 font-bold">تماس با دفترخانه</h2>
        <p className="text-white/35 text-sm max-w-[520px]">برای ارتباط با دفتر اسناد رسمی ۲۳ لواسان از اطلاعات زیر استفاده کنید</p>
      </div>

      <div className="p-6 md:px-12 md:py-10 max-w-[900px] mx-auto">
        <RevealSection className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: '📍', label: 'آدرس', value: 'لواسان، بلوار امام خمینی، شورکاب\nکوچه میراث، پلاک ۷، طبقه یک' },
            { icon: '📞', label: 'تلفن ثابت', value: '۰۲۱-۲۶۵۶۹۶۵۹' },
            { icon: '📱', label: 'تلفن همراه', value: '۰۹۲۰۴۳۲۳۰۲۳' },
            { icon: '🕐', label: 'ساعات کاری', value: 'شنبه تا چهارشنبه: ۸:۳۰ — ۱۴:۰۰\nپنج‌شنبه و جمعه: تعطیل' },
            { icon: '📧', label: 'ایمیل', value: 'daftar23.lavasan@gmail.com' },
          ].map((info, i) => (
            <div key={i} className="flex gap-3 items-start bg-card border border-border rounded-lg p-5 hover:border-primary/30 hover:-translate-x-0.5 transition-all relative group">
              <div className="w-10 h-10 border border-primary/20 flex items-center justify-center text-primary shrink-0 rounded-lg text-lg">{info.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.68rem] text-primary font-bold tracking-wider">{info.label}</div>
                <div className="text-sm text-foreground mt-1 whitespace-pre-line leading-relaxed">{info.value}</div>
              </div>
              <button
                onClick={() => handleCopy(info.value, i)}
                className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors opacity-50 group-hover:opacity-100"
                title="کپی"
              >
                {copied === i ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </RevealSection>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;

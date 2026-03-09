import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-secondary px-6 md:px-12 py-8 border-t border-white/10" role="contentinfo">
    <div className="max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
        <div>
          <div className="text-white font-bold text-lg">دفترخانه ۲۳ لواسان</div>
          <span className="text-white/25 text-[0.62rem] tracking-widest">NOTARY PUBLIC NO.23 · LAVASAN</span>
          <p className="text-white/40 text-xs mt-2 max-w-[300px] leading-relaxed">
            دفتر اسناد رسمی شماره ۲۳ لواسان — ارائه خدمات تنظیم سند رسمی، ثبت اسناد، گواهی امضا، وکالت‌نامه و مشاوره حقوقی
          </p>
        </div>
        <nav aria-label="لینک‌های فوتر">
          <h3 className="text-white/50 text-xs font-bold mb-2">دسترسی سریع</h3>
          <div className="flex flex-col gap-1.5">
            <Link to="/" className="text-xs text-white/30 hover:text-white transition-colors">صفحه اصلی</Link>
            <Link to="/content?mode=laws" className="text-xs text-white/30 hover:text-white transition-colors">قوانین ثبتی</Link>
            <Link to="/content?mode=articles" className="text-xs text-white/30 hover:text-white transition-colors">مقالات حقوقی</Link>
            <Link to="/contact" className="text-xs text-white/30 hover:text-white transition-colors">تماس با دفترخانه</Link>
          </div>
        </nav>
        <div>
          <h3 className="text-white/50 text-xs font-bold mb-2">خدمات دفترخانه</h3>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs text-white/30">تنظیم سند رسمی</span>
            <span className="text-xs text-white/30">گواهی امضا</span>
            <span className="text-xs text-white/30">وکالت‌نامه</span>
            <span className="text-xs text-white/30">مشاوره حقوقی</span>
            <span className="text-xs text-white/30">ثبت الکترونیک اسناد</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-white/20 text-xs">© ۱۴۰۴ دفتر اسناد رسمی ۲۳ لواسان — تمامی حقوق محفوظ است</p>
        <p className="text-white/15 text-[0.6rem]">سردفتر: دکتر هدی جعفری | لواسان، شمیرانات، تهران</p>
      </div>
    </div>
  </footer>
);

export default Footer;

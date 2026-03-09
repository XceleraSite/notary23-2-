import { Phone, Mail, Clock, MapPin } from 'lucide-react';

const TopInfoBar = () => (
  <div className="bg-primary text-primary-foreground text-[0.68rem] py-1.5 px-4 md:px-12 hidden md:block">
    <div className="flex justify-between items-center max-w-[1400px] mx-auto">
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1.5">
          <Phone size={11} />
          ۰۲۱-۲۶۵۶۹۶۵۹ | ۰۹۲۰۴۳۲۳۰۲۳
        </span>
        <span className="flex items-center gap-1.5">
          <Mail size={11} />
          daftar23.lavasan@gmail.com
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="flex items-center gap-1.5">
          <Clock size={11} />
          شنبه تا چهارشنبه: ۸:۳۰ — ۱۴:۰۰
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin size={11} />
          لواسان، بلوار امام خمینی، شورکاب
        </span>
      </div>
    </div>
  </div>
);

export default TopInfoBar;

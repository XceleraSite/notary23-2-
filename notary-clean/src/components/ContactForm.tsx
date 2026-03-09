import { useState, FormEvent } from 'react';

interface Props {
  title: string;
  emoji: string;
  fields?: { name: string; label: string; type: string; placeholder: string; required?: boolean }[];
  selectField?: { name: string; label: string; options: string[] };
}

const ContactForm = ({ title, emoji, fields, selectField }: Props) => {
  const [submitted, setSubmitted] = useState(false);

  const defaultFields = fields || [
    { name: 'name', label: 'نام و نام‌خانوادگی', type: 'text', placeholder: 'نام شما', required: true },
    { name: 'phone', label: 'شماره تماس', type: 'tel', placeholder: '۰۹۱۲-...', required: true },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-6">
        <div className="text-3xl mb-3">✅</div>
        <h4 className="font-bold text-foreground mb-1">درخواست ثبت شد!</h4>
        <p className="text-sm text-muted-foreground">ظرف ۲۴ ساعت با شما تماس گرفته می‌شود.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded p-6 mt-4">
      <h4 className="text-sm font-bold text-foreground mb-5 pb-3 border-b border-border">
        {emoji} {title}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {defaultFields.map(f => (
            <div key={f.name} className="flex flex-col gap-1">
              <label className="text-[0.7rem] font-semibold text-foreground tracking-wide">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                required={f.required}
                className="bg-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:bg-card transition-colors text-right"
              />
            </div>
          ))}
        </div>
        {selectField && (
          <div className="flex flex-col gap-1 mb-3">
            <label className="text-[0.7rem] font-semibold text-foreground tracking-wide">{selectField.label}</label>
            <select className="bg-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:bg-card transition-colors text-right">
              {selectField.options.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        )}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-[0.7rem] font-semibold text-foreground tracking-wide">توضیحات</label>
          <textarea
            placeholder="شرح درخواست..."
            className="bg-background border border-border rounded-sm px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:bg-card transition-colors text-right resize-y min-h-[85px]"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-primary-foreground border-none py-3 px-6 text-sm font-bold cursor-pointer rounded-sm hover:opacity-90 transition-opacity tracking-wide"
        >
          ارسال درخواست ←
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

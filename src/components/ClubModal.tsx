import React, { useState } from 'react';

interface ClubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClubModal: React.FC<ClubModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  if (!isOpen) return null;

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 10) {
      setIsJoined(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[420px] bg-[#FFF8F1] rounded-[32px] p-5 sm:p-6 shadow-2xl flex flex-col relative border border-[#EEE7DE] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA]"
          type="button"
          aria-label="بستن"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Club Card Visual */}
        <div className="w-full bg-gradient-to-br from-[#0B6E4F] via-[#056C4D] to-[#003625] text-white rounded-2xl p-5 shadow-clay-card relative overflow-hidden mb-5">
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full blur-xl" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white text-[#0B6E4F] flex items-center justify-center font-bold font-headline text-lg">
                ،
              </div>
              <span className="font-bold text-[14px]">کارت وفاداری کاما</span>
            </div>
            <span className="bg-[#98EDC6]/20 text-[#98EDC6] text-[10px] font-bold px-2 py-0.5 rounded-full">
              سطح طلایی
            </span>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <span className="text-[11px] text-[#98EDC6]">موجودی امتیاز شما</span>
              <div className="text-[26px] font-extrabold leading-none mt-1">
                ۲۴۰ <span className="text-[14px] font-normal">امتیاز</span>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[10px] text-[#98EDC6] block">۶۰ امتیاز تا قهوه رایگان</span>
              <div className="w-24 h-2 bg-white/20 rounded-full overflow-hidden mt-1">
                <div className="w-[80%] h-full bg-[#98EDC6] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {!isJoined ? (
          <form onSubmit={handleJoin} className="flex flex-col gap-3">
            <div className="text-right">
              <h4 className="text-[16px] font-bold text-[#5D4335] mb-1">
                عضویت در باشگاه مشتریان کاما
              </h4>
              <p className="text-[12px] text-[#6F7A73] leading-relaxed">
                با هر سفارش در کافه ۱۰٪ امتیاز نقدی دریافت کنید و از تخفیف‌های تولد و پیشنهادات اختصاصی باریستا بهره‌مند شوید.
              </p>
            </div>

            <div className="flex flex-col gap-1 text-right mt-1">
              <label className="text-[12px] font-bold text-[#5D4335]">
                شماره همراه:
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full bg-white rounded-xl px-4 py-2.5 text-[14px] text-center tracking-widest text-[#1E1B16] border border-[#EEE7DE] focus:outline-none focus:ring-2 focus:ring-[#0B6E4F]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#0B6E4F] text-white py-3 px-4 rounded-full font-bold text-[13px] shadow-clay-button hover:bg-[#00543B] active:scale-95 transition-all mt-2"
            >
              فعال‌سازی آنی کارت باشگاه
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-12 h-12 rounded-full bg-[#0B6E4F]/10 text-[#0B6E4F] flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <h4 className="text-[16px] font-bold text-[#0B6E4F]">
              خوش آمدید! عضویت شما فعال است
            </h4>
            <p className="text-[12px] text-[#6F7A73]">
              شماره شما ({phoneNumber}) در باشگاه کاما ثبت شد. امتیاز سفارش‌های امروز به حسابتان اضافه می‌شود.
            </p>
            <div className="w-full bg-white rounded-2xl p-3 border border-[#EEE7DE] text-right flex flex-col gap-2">
              <span className="text-[12px] font-bold text-[#5D4335]">جوایز آماده دریافت شما:</span>
              <div className="flex items-center justify-between text-[11px] p-2 bg-[#FAF3EA] rounded-xl">
                <span>☕ ارتقای رایگان به دبل‌شات</span>
                <span className="text-[#0B6E4F] font-bold">فعال</span>
              </div>
              <div className="flex items-center justify-between text-[11px] p-2 bg-[#FAF3EA] rounded-xl">
                <span>🥐 کروسان هدیه با سفارش ۲ قهوه</span>
                <span className="text-[#0B6E4F] font-bold">فعال</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

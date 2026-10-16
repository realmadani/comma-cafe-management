import React, { useState } from 'react';

interface WaiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaiterModal: React.FC<WaiterModalProps> = ({ isOpen, onClose }) => {
  const [selectedTable, setSelectedTable] = useState('میز ۴');
  const [requestSent, setRequestSent] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequest = (title: string) => {
    setRequestSent(title);
    setTimeout(() => {
      setRequestSent(null);
      onClose();
    }, 2000);
  };

  const requests = [
    { title: 'درخواست حضور ویتر سر میز', icon: 'room_service', color: 'text-[#0B6E4F]' },
    { title: 'درخواست صورت‌حساب و دستگاه پوز', icon: 'point_of_sale', color: 'text-[#974724]' },
    { title: 'آب خنک یا یخ اضافی', icon: 'water_drop', color: 'text-blue-600' },
    { title: 'دستمال کاغذی و قاشق چنگال', icon: 'flatware', color: 'text-[#5D4335]' },
    { title: 'رمز وای‌فای کافه (Comma_Guest)', icon: 'wifi', color: 'text-emerald-700' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] bg-[#FFF8F1] rounded-[32px] p-5 sm:p-6 shadow-2xl flex flex-col relative border border-[#EEE7DE] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#EEE7DE] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0B6E4F] text-[24px]">
              notifications_active
            </span>
            <h3 className="text-[17px] font-bold text-[#5D4335]">
              درخواست از ویتر
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA]"
            type="button"
            aria-label="بستن"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {requestSent ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#0B6E4F]/10 text-[#0B6E4F] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="text-[16px] font-bold text-[#0B6E4F] mb-1">
              درخواست شما ثبت شد!
            </h4>
            <p className="text-[12px] text-[#6F7A73]">
              پیام "{requestSent}" برای {selectedTable} ارسال گردید. همکاران ما تا لحظاتی دیگر نزد شما خواهند آمد.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Table Selection */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#EEE7DE]">
              <span className="text-[12px] font-bold text-[#5D4335]">شماره میز:</span>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="bg-[#FAF3EA] border-none text-[12px] font-bold text-[#0B6E4F] rounded-lg py-1 px-2.5 focus:ring-0"
              >
                {['میز ۱', 'میز ۲', 'میز ۳', 'میز ۴', 'میز ۵', 'میز ۶', 'فضای باز'].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col gap-2">
              {requests.map((req, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRequest(req.title)}
                  type="button"
                  className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#EEE7DE] hover:bg-[#FAF3EA] active:scale-98 transition-all text-right shadow-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`material-symbols-outlined text-[20px] ${req.color}`}>
                      {req.icon}
                    </span>
                    <span className="text-[12.5px] font-bold text-[#5D4335] group-hover:text-[#0B6E4F] transition-colors">
                      {req.title}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#6F7A73] text-[18px]">
                    chevron_left
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

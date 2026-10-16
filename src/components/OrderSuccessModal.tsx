import React from 'react';

interface OrderSuccessModalProps {
  orderInfo: {
    orderId: string;
    table: string;
    total: number;
    itemCount: number;
  } | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  orderInfo,
  onClose,
}) => {
  if (!orderInfo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] bg-[#FFF8F1] rounded-[32px] p-6 shadow-2xl flex flex-col items-center text-center relative border border-[#EEE7DE] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-16 h-16 rounded-full bg-[#0B6E4F]/10 text-[#0B6E4F] flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-[36px]">
            check_circle
          </span>
        </div>

        <span className="text-[11px] font-bold bg-[#FAF3EA] text-[#0B6E4F] px-3 py-0.5 rounded-full mb-1">
          سفارش به بار کافه ارسال شد
        </span>

        <h3 className="font-headline text-[20px] font-black text-[#5D4335] mb-1">
          سفارش شما با موفقیت ثبت شد!
        </h3>
        <p className="text-[12px] text-[#6F7A73] mb-4">
          باریستای کافه کاما در حال آماده‌سازی سفارش برای {orderInfo.table} است.
        </p>

        {/* Receipt Box */}
        <div className="w-full bg-white rounded-2xl p-4 border border-[#EEE7DE] shadow-sm flex flex-col gap-2 text-right mb-5 text-[12px]">
          <div className="flex justify-between items-center text-[#6F7A73]">
            <span>شناسه پیگیری سفارش:</span>
            <span className="font-mono font-bold text-[#1E1B16] dir-ltr">
              {orderInfo.orderId}
            </span>
          </div>
          <div className="flex justify-between items-center text-[#6F7A73]">
            <span>محل تحویل / میز:</span>
            <span className="font-bold text-[#5D4335]">{orderInfo.table}</span>
          </div>
          <div className="flex justify-between items-center text-[#6F7A73]">
            <span>تعداد اقلام:</span>
            <span className="font-bold text-[#5D4335]">
              {orderInfo.itemCount.toLocaleString('fa-IR')} قلم
            </span>
          </div>
          <div className="flex justify-between items-center text-[#1E1B16] font-extrabold pt-2 border-t border-[#EEE7DE]">
            <span>مبلغ نهایی:</span>
            <span className="text-[#0B6E4F]">
              {orderInfo.total.toLocaleString('fa-IR')} تومان
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#974724] bg-[#FAF3EA] p-2 rounded-xl mt-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            <span>زمان تخمینی آماده‌سازی: ۸ الی ۱۲ دقیقه</span>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-full bg-[#0B6E4F] text-white py-3 px-4 rounded-full font-bold text-[13px] shadow-clay-button hover:bg-[#00543B] active:scale-95 transition-all"
        >
          بازگشت به منو
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (
    item: MenuItem,
    quantity: number,
    options: {
      milk?: string;
      sugar?: string;
      extraShot?: boolean;
      notes?: string;
    }
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  onClose,
  onAddToCartWithOptions,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedMilk, setSelectedMilk] = useState('شیر تازه کامل');
  const [selectedSugar, setSelectedSugar] = useState('شیرینی استاندارد');
  const [hasExtraShot, setHasExtraShot] = useState(false);
  const [notes, setNotes] = useState('');

  // calculate price additions
  const extraShotPrice = hasExtraShot ? 25000 : 0;
  const milkExtraPrice = selectedMilk.includes('بادام') || selectedMilk.includes('جو دوسر') ? 15000 : 0;
  const unitPrice = item.price + extraShotPrice + milkExtraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCartWithOptions(item, quantity, {
      milk: item.options?.milk ? selectedMilk : undefined,
      sugar: item.options?.sugar ? selectedSugar : undefined,
      extraShot: hasExtraShot,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] max-h-[90vh] bg-[#FFF8F1] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-y-auto no-scrollbar flex flex-col relative border border-[#EEE7DE] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#1E1B16] flex items-center justify-center shadow-clay-card hover:bg-white active:scale-95 transition-all"
          type="button"
          aria-label="بستن"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Product Image */}
        <div className="relative w-full h-56 sm:h-64 bg-[#FAF3EA] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFF8F1] via-transparent to-black/20" />
          {item.badge && (
            <span
              className={`absolute top-4 right-4 text-[11px] px-3 py-1 rounded-full font-bold shadow-sm ${
                item.badgeColor || 'bg-[#974724] text-white'
              }`}
            >
              {item.badge}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 -mt-4 relative bg-[#FFF8F1] rounded-t-[28px]">
          <div>
            <h3 className="font-headline text-[20px] font-black text-[#5D4335] mb-1">
              {item.name}
            </h3>
            <p className="text-[13px] text-[#6F7A73] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 py-2 border-y border-[#EEE7DE]/80 text-[12px] text-[#5D4335]">
            {item.prepTime && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#0B6E4F]">
                  schedule
                </span>
                <span>آماده‌سازی: {item.prepTime}</span>
              </div>
            )}
            {item.calories && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#974724]">
                  local_fire_department
                </span>
                <span>{item.calories} کیلوکالری</span>
              </div>
            )}
            {item.isVegetarian && (
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#0B6E4F]">
                  eco
                </span>
                <span>مناسب گیاه‌خواران</span>
              </div>
            )}
          </div>

          {/* Options: Milk */}
          {item.options?.milk && (
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#5D4335]">
                انتخاب نوع شیر:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'شیر تازه کامل', extra: 0 },
                  { label: 'شیر کم‌چرب', extra: 0 },
                  { label: 'شیر بادام گیاهی', extra: 15000 },
                  { label: 'شیر جو دوسر (Oat)', extra: 15000 },
                ].map((milk) => (
                  <button
                    key={milk.label}
                    type="button"
                    onClick={() => setSelectedMilk(milk.label)}
                    className={`p-2.5 rounded-xl text-[12px] text-right flex flex-col justify-between border transition-all ${
                      selectedMilk === milk.label
                        ? 'bg-[#0B6E4F]/10 border-[#0B6E4F] text-[#00543B] font-bold shadow-sm'
                        : 'bg-white border-[#EEE7DE] text-[#5D4335] hover:bg-[#FAF3EA]'
                    }`}
                  >
                    <span>{milk.label}</span>
                    {milk.extra > 0 && (
                      <span className="text-[10px] text-[#6F7A73] font-normal">
                        +{milk.extra.toLocaleString('fa-IR')} تومان
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Options: Sugar */}
          {item.options?.sugar && (
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-[#5D4335]">
                میزان شیرینی:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['بدون شکر', 'کم‌شیرین', 'شیرینی استاندارد'].map((sugar) => (
                  <button
                    key={sugar}
                    type="button"
                    onClick={() => setSelectedSugar(sugar)}
                    className={`py-2 px-2 text-center rounded-xl text-[12px] border transition-all ${
                      selectedSugar === sugar
                        ? 'bg-[#0B6E4F]/10 border-[#0B6E4F] text-[#00543B] font-bold'
                        : 'bg-white border-[#EEE7DE] text-[#5D4335] hover:bg-[#FAF3EA]'
                    }`}
                  >
                    {sugar}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra shot toggle */}
          {item.options?.shot && (
            <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#EEE7DE]">
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#5D4335]">
                  افزودن یک شات اسپرسو تخصصی
                </span>
                <span className="text-[11px] text-[#6F7A73]">
                  +۲۵,۰۰۰ تومان
                </span>
              </div>
              <button
                type="button"
                onClick={() => setHasExtraShot(!hasExtraShot)}
                className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                  hasExtraShot ? 'bg-[#0B6E4F] text-white' : 'border-2 border-[#BEC9C1]'
                }`}
              >
                {hasExtraShot && <span className="material-symbols-outlined text-[18px]">check</span>}
              </button>
            </div>
          )}

          {/* Notes for barista */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-bold text-[#5D4335]">
              یادداشت برای باریستا (اختیاری):
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مثلا: خیلی داغ سرو شود، یخ کمتر..."
              className="w-full bg-white rounded-xl px-3 py-2 text-[12px] text-[#1E1B16] border border-[#EEE7DE] focus:ring-1 focus:ring-[#0B6E4F] focus:outline-none"
            />
          </div>

          {/* Footer Action & Quantity */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#EEE7DE] mt-2">
            {/* Quantity */}
            <div className="flex items-center bg-white rounded-full border border-[#EEE7DE] p-1 shadow-sm shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full hover:bg-[#FAF3EA] flex items-center justify-center text-[#5D4335] font-bold"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-8 text-center text-[14px] font-bold text-[#1E1B16]">
                {quantity.toLocaleString('fa-IR')}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full hover:bg-[#FAF3EA] flex items-center justify-center text-[#5D4335] font-bold"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              type="button"
              className="flex-1 bg-[#0B6E4F] text-white py-3 px-4 rounded-full font-bold text-[13px] sm:text-[14px] shadow-clay-button hover:bg-[#00543B] active:scale-95 transition-all flex items-center justify-between"
            >
              <span>افزودن به سبد</span>
              <span>{totalPrice.toLocaleString('fa-IR')} تومان</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

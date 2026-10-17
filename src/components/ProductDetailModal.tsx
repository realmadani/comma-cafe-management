import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';

interface ProductDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCartWithOptions: (
    item: MenuItem,
    quantity: number,
    options?: {
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
  const totalPrice = item.price * quantity;

  const handleAdd = () => {
    onAddToCartWithOptions(item, quantity);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] max-h-[85vh] bg-[#FFF8F1] rounded-t-[32px] sm:rounded-[32px] shadow-2xl overflow-y-auto no-scrollbar flex flex-col relative border border-[#EEE7DE] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#1E1B16] flex items-center justify-center shadow-clay-card hover:bg-white active:scale-95 transition-all cursor-pointer"
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

        {/* Content Body: Only Item Details */}
        <div className="p-5 sm:p-6 flex flex-col gap-4 -mt-4 relative bg-[#FFF8F1] rounded-t-[28px] text-right">
          <div>
            <h3 className="font-headline text-[21px] font-black text-[#5D4335] mb-2 leading-tight">
              {item.name}
            </h3>
            <p className="text-[13px] text-[#3F4943] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 py-2.5 border-y border-[#EEE7DE]/80 text-[12px] text-[#5D4335]">
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

          {/* Footer Action & Quantity */}
          <div className="flex items-center gap-3 pt-2 mt-1">
            {/* Quantity */}
            <div className="flex items-center bg-white rounded-full border border-[#EEE7DE] p-1 shadow-sm shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full hover:bg-[#FAF3EA] flex items-center justify-center text-[#5D4335] font-bold cursor-pointer"
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
                className="w-8 h-8 rounded-full hover:bg-[#FAF3EA] flex items-center justify-center text-[#5D4335] font-bold cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAdd}
              type="button"
              className="flex-1 bg-[#0B6E4F] text-white py-3 px-4 rounded-full font-bold text-[13px] sm:text-[14px] shadow-clay-button hover:bg-[#00543B] active:scale-95 transition-all flex items-center justify-between cursor-pointer"
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

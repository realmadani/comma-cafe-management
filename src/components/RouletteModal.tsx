import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface RouletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const RouletteModal: React.FC<RouletteModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  if (!isOpen) return null;

  const handleSpin = () => {
    setIsSpinning(true);
    let counter = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * MENU_ITEMS.length);
      setSelectedItem(MENU_ITEMS[randomIndex]);
      counter++;
      if (counter >= 16) {
        clearInterval(interval);
        setIsSpinning(false);
        setSpinCount((prev) => prev + 1);
      }
    }, 90);
  };

  // initial spin if null
  if (!selectedItem && !isSpinning) {
    const randomIndex = Math.floor(Math.random() * MENU_ITEMS.length);
    setSelectedItem(MENU_ITEMS[randomIndex]);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[400px] bg-[#FFF8F1] rounded-[32px] p-6 shadow-2xl flex flex-col items-center text-center relative border border-[#EEE7DE] animate-in zoom-in-95 duration-200"
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

        <div className="w-14 h-14 rounded-2xl bg-[#0B6E4F]/10 text-[#0B6E4F] flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-[32px]">casino</span>
        </div>

        <h3 className="font-headline text-[19px] font-black text-[#5D4335] mb-1">
          شانس باریستا / چی بنوشم؟
        </h3>
        <p className="text-[12px] text-[#6F7A73] mb-4">
          نمی‌دونی امروز چی انتخاب کنی؟ بگذار گردونه باریستای کاما برات تصمیم بگیره!
        </p>

        {selectedItem && (
          <div
            className={`w-full bg-white rounded-2xl p-4 border border-[#EEE7DE] shadow-clay-card flex flex-col items-center mb-5 transition-all duration-200 ${
              isSpinning ? 'scale-95 opacity-80 blur-[0.5px]' : 'scale-100 opacity-100'
            }`}
          >
            <div className="w-28 h-28 rounded-full overflow-hidden mb-3 border-2 border-[#0B6E4F] p-0.5 shadow-md">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="text-[11px] bg-[#FAF3EA] text-[#0B6E4F] font-bold px-2.5 py-0.5 rounded-full mb-1">
              پیشنهاد شانسی باریستا
            </span>
            <h4 className="text-[16px] font-extrabold text-[#5D4335] mb-1">
              {selectedItem.name}
            </h4>
            <p className="text-[12px] text-[#6F7A73] line-clamp-2 mb-2">
              {selectedItem.subDescription}
            </p>
            <span className="text-[15px] font-black text-[#1E1B16]">
              {selectedItem.price.toLocaleString('fa-IR')} تومان
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 w-full">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="flex-1 bg-[#5D4335] text-white py-2.5 px-4 rounded-full font-bold text-[13px] hover:bg-[#3E2D23] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">cached</span>
            <span>{isSpinning ? 'در حال چرخش...' : 'دوباره بچرخون'}</span>
          </button>

          {selectedItem && (
            <button
              onClick={() => {
                onAddToCart(selectedItem);
                onClose();
              }}
              disabled={isSpinning}
              className="flex-1 bg-[#0B6E4F] text-white py-2.5 px-4 rounded-full font-bold text-[13px] hover:bg-[#00543B] active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              <span>سفارش این آیتم</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

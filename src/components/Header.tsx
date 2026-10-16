import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenRoulette: () => void;
  onOpenGallery: () => void;
  onOpenLogin: () => void;
  onOpenClub?: () => void;
  onOpenWaiter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenRoulette,
  onOpenGallery,
  onOpenLogin,
  onOpenClub,
  onOpenWaiter,
}) => {
  return (
    <header className="w-full px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between z-40 bg-[#FFF8F1]/95 backdrop-blur-md sticky top-0 border-b border-[#EEE7DE]/60">
      {/* Brand Title & Typography Anchor */}
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full bg-[#0B6E4F] flex items-center justify-center text-white shadow-clay-button transition-transform hover:scale-105">
          <span className="font-headline text-[26px] font-bold leading-none select-none -translate-y-0.5">،</span>
        </div>
        <div className="flex flex-col">
          <h1 className="font-headline text-[22px] text-[#5D4335] font-black tracking-tight leading-none">
            Comma
          </h1>
          <span className="text-[10px] text-[#6F7A73] font-medium leading-tight">کافه منوی تخصصی</span>
        </div>
      </div>

      {/* 4 Tactile Circular Action Icons */}
      <div className="flex items-center gap-2">
        {/* 1. Random / Barista Pick Roulette */}
        <button
          onClick={onOpenRoulette}
          className="w-10 h-10 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA] active:scale-95 transition-all border border-[#EEE7DE]/80"
          title="پیشنهاد تصادفی باریستا"
          type="button"
          aria-label="پیشنهاد تصادفی باریستا"
        >
          <span className="material-symbols-outlined text-[20px]">casino</span>
        </button>

        {/* 2. Media Gallery */}
        <button
          onClick={onOpenGallery}
          className="w-10 h-10 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA] active:scale-95 transition-all border border-[#EEE7DE]/80"
          title="گالری تصاویر کافه"
          type="button"
          aria-label="گالری تصاویر کافه"
        >
          <span className="material-symbols-outlined text-[20px]">photo_library</span>
        </button>

        {/* 3. Cart with Badge */}
        <button
          onClick={onOpenCart}
          className="relative w-10 h-10 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA] active:scale-95 transition-all border border-[#EEE7DE]/80"
          title="سبد سفارش"
          type="button"
          aria-label="سبد سفارش"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#974724] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-pulse">
              {cartCount.toLocaleString('fa-IR')}
            </span>
          )}
        </button>

        {/* 4. Profile / Manager Login */}
        <button
          onClick={onOpenLogin}
          className="w-10 h-10 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA] active:scale-95 transition-all border border-[#EEE7DE]/80"
          title="ورود به پنل مدیریت کافه"
          type="button"
          aria-label="ورود به پنل مدیریت کافه"
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
        </button>
      </div>
    </header>
  );
};

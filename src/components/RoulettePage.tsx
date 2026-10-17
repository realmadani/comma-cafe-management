import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';

interface RoulettePageProps {
  items?: MenuItem[];
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
  onAddToCart: (item: MenuItem) => void;
}

interface Particle {
  id: number;
  size: number;
  color: string;
  tx: number;
  ty: number;
}

export const RoulettePage: React.FC<RoulettePageProps> = ({
  items = MENU_ITEMS,
  cartCount,
  onBack,
  onOpenCart,
  onAddToCart,
}) => {
  // Use products from the cafe's synchronized items list
  const wheelItems = items && items.length > 0 ? items : MENU_ITEMS;

  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.floor(Math.random() * (wheelItems.length || 1));
  });
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDegree, setCurrentDegree] = useState(0);
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  // Safe selection of active item directly from cafe items
  const activeItem: MenuItem | undefined =
    wheelItems[currentIndex % (wheelItems.length || 1)] || wheelItems[0];

  // Calculate dynamic 15% lucky discount for the selected item
  const originalPrice = activeItem ? activeItem.price : 0;
  const discountedPrice = Math.round((originalPrice * 0.85) / 1000) * 1000;
  const discountLabel = '۱۵٪ تخفیف شانس';

  // Dynamic tags / chips for the selected item
  const chips = activeItem?.tags && activeItem.tags.length > 0
    ? activeItem.tags.slice(0, 3).map((tag, idx) => ({
        label: tag,
        dotColor: idx === 0 ? 'bg-[#00543B]' : idx === 1 ? 'bg-[#974724]' : 'bg-[#056C4D]',
      }))
    : [
        { label: 'دست‌ساز کافه کاما', dotColor: 'bg-[#00543B]' },
        { label: 'مواد اولیه تازه', dotColor: 'bg-[#974724]' },
        { label: 'طعم ویژه باریستا', dotColor: 'bg-[#056C4D]' },
      ];

  const launchConfetti = () => {
    const colors = ['#00543b', '#974724', '#ff996f', '#0b6e4f', '#9ff4cc', '#e4bfad'];
    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 120 + 60;
      particles.push({
        id: Math.random() + i,
        size: Math.random() * 6 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
      });
    }
    setConfetti(particles);
    setTimeout(() => {
      setConfetti([]);
    }, 1100);
  };

  const spinWheel = () => {
    if (isSpinning || wheelItems.length === 0) return;
    setIsSpinning(true);

    let nextIndex = Math.floor(Math.random() * wheelItems.length);
    while (nextIndex === currentIndex && wheelItems.length > 1) {
      nextIndex = Math.floor(Math.random() * wheelItems.length);
    }

    const spins = 4;
    const extraAngle = nextIndex * (360 / wheelItems.length);
    const nextDeg = currentDegree + spins * 360 + extraAngle + Math.floor(Math.random() * 30 - 15);
    setCurrentDegree(nextDeg);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsSpinning(false);
      launchConfetti();
    }, 2800);
  };

  const handleAddToCart = () => {
    if (!activeItem) return;

    // Create item with lucky wheel discount applied
    const discountedItem: MenuItem = {
      ...activeItem,
      id: `${activeItem.id}-lucky`,
      price: discountedPrice,
      subDescription: `${discountLabel} • ${activeItem.subDescription || activeItem.name}`,
      badge: 'برگزیده گردونه',
      badgeColor: 'bg-[#974724] text-white',
    };

    onAddToCart(discountedItem);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  if (!activeItem) {
    return (
      <main className="w-full max-w-[460px] bg-[#FFF8F1] min-h-screen rounded-[36px] sm:rounded-[44px] shadow-clay-float border border-[#EEE7DE] flex flex-col items-center justify-center p-6 text-center">
        <p className="text-[14px] text-[#5D4335] font-bold mb-3">محصولی در منوی کافه یافت نشد.</p>
        <button
          onClick={onBack}
          className="bg-[#0B6E4F] text-white px-5 py-2.5 rounded-full text-[13px] font-bold"
        >
          بازگشت به منو
        </button>
      </main>
    );
  }

  return (
    <main className="w-full max-w-[460px] bg-[#FFF8F1] min-h-screen rounded-[36px] sm:rounded-[44px] shadow-clay-float border border-[#EEE7DE] flex flex-col justify-between relative overflow-hidden transition-all pb-4">
      {/* Ambient Lighting Orbs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FFB598]/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-64 h-64 rounded-full bg-[#9FF4CC]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-[#FFDBCA]/35 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full px-4 sm:px-5 py-3 flex items-center justify-between bg-[#FFF8F1]/95 backdrop-blur-md z-40 border-b border-[#EEE7DE]/60">
        {/* Back Button (arrow_forward in RTL points right = back to home) */}
        <button
          onClick={onBack}
          aria-label="بازگشت به صفحه اصلی"
          className="w-10 h-10 bg-white text-[#5D4335] rounded-full flex items-center justify-center hover:bg-[#FAF3EA] transition-all active:scale-95 shadow-clay-card border border-[#EEE7DE] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        {/* Headline */}
        <div className="flex flex-col items-center">
          <h1 className="text-[20px] font-headline text-[#00543B] font-extrabold tracking-tight">
            سفارش تصادفی
          </h1>
          <span className="text-[11px] text-[#5D4335]/80 font-medium mt-0.5">
            گردونه شانس کافه کاما
          </span>
        </div>

        {/* Trailing: Cart with Badge */}
        <button
          onClick={onOpenCart}
          aria-label="سبد خرید"
          className="relative w-10 h-10 bg-white text-[#5D4335] rounded-full flex items-center justify-center hover:bg-[#FAF3EA] transition-all active:scale-95 shadow-clay-card border border-[#EEE7DE] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#974724] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {cartCount.toLocaleString('fa-IR')}
            </span>
          )}
        </button>
      </header>

      {/* Main Content Canvas */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-5 py-1 z-10 w-full">
        {/* Lucky Draw Status Pill */}
        <div className="w-full text-center mb-1">
          <div
            className={`inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 bg-[#F4EDE4] rounded-full shadow-inner border border-[#E8E2D9] transition-transform duration-200 ${
              isSpinning ? 'scale-105 border-[#974724]' : ''
            }`}
          >
            <span
              className={`material-symbols-outlined text-[#974724] text-[15px] ${
                isSpinning ? 'animate-spin' : ''
              }`}
            >
              auto_awesome
            </span>
            <span className="text-[11.5px] font-semibold text-[#974724]">
              {isSpinning ? 'در حال چرخش گردونه شانس...' : 'آیتم خوش‌شانسی امروز شما'}
            </span>
          </div>
        </div>

        {/* 2. Central Spotlight Stage & Item Showcase */}
        <div className="relative w-full flex flex-col items-center justify-center my-1 sm:my-2">
          {/* Confetti Burst Container */}
          <div className="absolute inset-0 pointer-events-none z-30 overflow-visible flex items-center justify-center">
            {confetti.map((particle) => (
              <div
                key={particle.id}
                className="absolute rounded-full pointer-events-none transition-all duration-1000 ease-out"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  backgroundColor: particle.color,
                  transform: `translate(${particle.tx}px, ${particle.ty}px) scale(0.3)`,
                  opacity: 0,
                  transition: 'transform 0.9s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.9s ease-out',
                }}
              />
            ))}
          </div>

          {/* Dynamic Lucky Orbit Wheel Ring */}
          <div
            className="absolute w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-dashed border-[#974724]/40 pointer-events-none flex items-center justify-center z-0 transition-transform duration-[2800ms] cubic-bezier(0.12, 0.8, 0.22, 1)"
            style={{
              transform: `rotate(${currentDegree}deg)`,
            }}
          >
            <div className="absolute -top-2 w-3.5 h-3.5 rounded-full bg-[#00543B] shadow-sm ring-2 ring-[#FFF8F1]" />
            <div className="absolute -bottom-2 w-3.5 h-3.5 rounded-full bg-[#974724] shadow-sm ring-2 ring-[#FFF8F1]" />
            <div className="absolute -right-2 w-2.5 h-2.5 rounded-full bg-[#FF996F] ring-1 ring-[#FFF8F1]" />
            <div className="absolute -left-2 w-2.5 h-2.5 rounded-full bg-[#83D7B1] ring-1 ring-[#FFF8F1]" />
            <div className="absolute top-1/4 right-2 w-2 h-2 rounded-full bg-[#056C4D] opacity-70" />
            <div className="absolute bottom-1/4 left-2 w-2 h-2 rounded-full bg-[#775A4B] opacity-70" />
          </div>

          {/* Glowing Radial Stage */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-white to-[#F4EDE4] shadow-clay-float flex items-center justify-center p-2.5 border-4 border-[#FAF3EA] z-10">
            {/* Inner Recessed Depth */}
            <div className="w-full h-full rounded-full bg-[#FFF8F1] shadow-inner flex items-center justify-center overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#9FF4CC]/20 via-transparent to-transparent" />
              <img
                src={activeItem.image}
                alt={activeItem.name}
                className={`w-36 h-36 sm:w-42 sm:h-42 object-cover rounded-full z-10 transition-all duration-500 drop-shadow-xl ${
                  isSpinning ? 'scale-90 opacity-60 blur-[1px]' : 'scale-100 opacity-100 hover:scale-105'
                }`}
              />
            </div>

            {/* Sparkle Badge Floating on Rim */}
            <div className="absolute -top-2 right-3 sm:right-4 bg-[#00543B] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-clay-button flex items-center gap-1 z-20">
              <span className="material-symbols-outlined text-[13px] sm:text-[14px]">star</span>
              <span className="text-[9.5px] sm:text-[10px] font-bold">
                {activeItem.badge || 'پیشنهاد برگزیده گردونه'}
              </span>
            </div>

            {/* Badge on Left Rim */}
            <div className="absolute -bottom-2 left-4 sm:left-6 bg-[#974724] text-white px-2 py-0.5 sm:px-2.5 rounded-full shadow-sm flex items-center gap-1 z-20">
              <span className="material-symbols-outlined text-[12px] sm:text-[13px]">local_fire_department</span>
              <span className="text-[9.5px] sm:text-[10px] font-bold">
                {activeItem.isBestSeller ? 'پرفروش' : activeItem.isSpecial ? 'ویژه باریستا' : 'محبوب کافه'}
              </span>
            </div>
          </div>

          {/* Product Information Card (Squircle Pillow) */}
          <div className="w-full bg-white rounded-3xl p-3.5 sm:p-4 mt-2.5 shadow-clay-card text-center border border-[#EEE7DE] flex flex-col items-center z-20">
            {/* Product Title */}
            <h2 className="text-[17px] sm:text-[19px] font-headline text-[#1E1B16] font-extrabold mb-0.5">
              {activeItem.name}
            </h2>

            {/* Price Tag Badge */}
            <div className="flex items-center gap-1.5 my-1">
              <span className="text-[18px] sm:text-[20px] font-headline text-[#00543B] font-black tracking-tight">
                {discountedPrice.toLocaleString('fa-IR')}
              </span>
              <span className="text-[11.5px] text-[#5D4335]">تومان</span>
              <span className="text-[11.5px] text-[#6F7A73] line-through mr-2 opacity-60">
                {originalPrice.toLocaleString('fa-IR')}
              </span>
              <span className="bg-[#FFDBCE] text-[#370E00] text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full mr-1">
                {discountLabel}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] sm:text-[11.5px] text-[#3F4943] leading-relaxed max-w-xs mt-0.5">
              {activeItem.description || activeItem.subDescription}
            </p>

            {/* Flavor Attributes Chips */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 pt-2 border-t border-[#EEE7DE] w-full flex-wrap">
              {chips.map((chip, idx) => (
                <span
                  key={idx}
                  className="text-[10px] text-[#5D4335] bg-[#FAF3EA] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 border border-[#EEE7DE]/60"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${chip.dotColor}`} />
                  {chip.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Sticky Action Area */}
      <div className="w-full bg-white/95 backdrop-blur-md px-4 sm:px-5 py-3 border-t border-[#EEE7DE] rounded-t-3xl shadow-clay-float z-30 mt-auto">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Primary Action: Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-11 sm:h-12 text-white font-bold text-[13.5px] sm:text-[14px] rounded-full flex items-center justify-center gap-2 shadow-clay-button active:scale-95 transition-all duration-150 cursor-pointer ${
              isAddedRecently ? 'bg-[#00543B] scale-98' : 'bg-[#0B6E4F] hover:bg-[#00543B]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[19px] sm:text-[20px]">
              {isAddedRecently ? 'check' : 'add_shopping_cart'}
            </span>
            <span>{isAddedRecently ? 'به سبد اضافه شد!' : 'افزودن به سبد سفارش'}</span>
          </button>

          {/* Secondary Action: Respin */}
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="h-11 sm:h-12 px-3.5 sm:px-4 bg-[#FAF3EA] text-[#5D4335] border border-[#EEE7DE] rounded-full flex items-center justify-center gap-1.5 shadow-clay-card hover:bg-[#F4EDE4] active:scale-95 transition-all duration-150 cursor-pointer disabled:opacity-50"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[#974724] text-[18px] sm:text-[19px] ${
                isSpinning ? 'animate-spin' : ''
              }`}
            >
              casino
            </span>
            <span className="text-[12px] sm:text-[13px] font-bold whitespace-nowrap">گردونه دوباره</span>
          </button>
        </div>
      </div>
    </main>
  );
};

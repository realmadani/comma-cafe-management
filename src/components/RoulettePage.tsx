import React, { useState, useRef } from 'react';
import { MenuItem } from '../data/menuData';

export interface RouletteItem {
  id: string;
  title: string;
  badgeTitle: string;
  badgeTag: string;
  price: number;
  oldPrice: number;
  discount: string;
  desc: string;
  imgSrc: string;
  imgAlt: string;
  chips: { label: string; dotColor: string }[];
  category: 'cold-drinks' | 'cakes-desserts' | 'hot-coffee';
}

export const WHEEL_ITEMS: RouletteItem[] = [
  {
    id: 'roulette-pistachio',
    title: 'آیس پیستاشیو لاته ویژه',
    badgeTitle: 'پیشنهاد برگزیده گردونه',
    badgeTag: 'پرطرفدار',
    price: 98000,
    oldPrice: 115000,
    discount: '۱۵٪ تخفیف شانس',
    desc: 'اسپرسو دابل شات ۱۰۰٪ عربیکا، سس پسته ارگانیک دست‌ساز کاما با بافت مخملی، فوم سرد خامه و خلال پسته تست شده تازه.',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMqf0eNrQ-22V9knoHxMGjnzAWyqhLXnnImWkWn1viunPoWVOhk3XDGiYYgdxagXYDRwtCJyDvdNkdexLlvBByPDESY-wjh6nf8T6sH3OUMq9TIGe7VHUod9NPFJsJEXE1yCL3PEXkhO6Fejf6-EesGLWDBlIRbVMJuz2_X-qXRFEFsjGlC8nvsoXE2My57p_Gpk4c0NYIcuWmvuYp-xIW59V7g5TyO2w0LiRogru6J3PgvNPu8soP',
    imgAlt: 'آیس پیستاشیو لاته ویژه کافه کاما',
    category: 'cold-drinks',
    chips: [
      { label: 'طعم آجیلی ملایم', dotColor: 'bg-[#00543B]' },
      { label: 'شیرینی کنترل‌شده', dotColor: 'bg-[#974724]' },
      { label: 'سرد و نشاط‌آور', dotColor: 'bg-[#056C4D]' },
    ],
  },
  {
    id: 'roulette-croffle',
    title: 'کرافل لوتوس کاراملی',
    badgeTitle: 'پیشنهاد شیرین روز',
    badgeTag: 'داغ و برشته',
    price: 82000,
    oldPrice: 96000,
    discount: '۱۵٪ تخفیف شانس',
    desc: 'کرافل کره‌ای تازه پرس‌شده با روکش کرم بیسکویت لوتوس بلژیکی، پودر بیسکویت ترد و بستنی وانیلی دست‌ساز.',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4Rz74QahIEPhtrUQzJS4uFD0CeA4SI4wOC08ny37yGe1G8oVuRHE8AEi8CildDX39uTscSc7-cy7jBi08gmYDhnKjIXjF2N2Oins3Lh-_QR-nztYQpa8obBBCWZfc_uIO6OKxvrR2iYWa4e9g0_4ialc_TRSVmslvDeg93THy8iuyx8u2PagDaIl0ODBHhYQ024a_jBxHHuDXcaB6VUDzcD9wo_FULyCgori1nbmousrbKQavM6t_',
    imgAlt: 'کرافل لوتوس کاراملی',
    category: 'cakes-desserts',
    chips: [
      { label: 'بافت کرانچی', dotColor: 'bg-[#974724]' },
      { label: 'طعم اصیل لوتوس', dotColor: 'bg-[#00543B]' },
      { label: 'سرو گرم با بستنی', dotColor: 'bg-[#FF996F]' },
    ],
  },
  {
    id: 'roulette-basque',
    title: 'چیزکیک باسک کاراملیزه',
    badgeTitle: 'شاهکار قنادی کاما',
    badgeTag: 'بافت خامه‌ای',
    price: 105000,
    oldPrice: 125000,
    discount: '۱۶٪ تخفیف شانس',
    desc: 'چیزکیک سنتی سن‌سباستین با پوسته سوخته کاراملی عمیق، مغز ابریشمی بسیار لطیف و سس کارامل نمکی خانگی.',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhL4orAMLe0cyQTJutMiLix8sm41wJt4JtOUBnDooc8z5E6SfwJ0tjTCVdxkJiWby1sR8O2iqPUjMvRTF-2iq011-LOFrgPP2lC3PiAZ4qBXWvqkBcK6aD8CrFYKdc-WNSjKVGpzt8pksHAfbHdpggNQaVsHd_M9GhwjqiTzfsNsRpBRJL7_cnwx-vcyohre2Bp7v8zl9tvytBlcGrAWvbkapazdHEfAFu9rxdD5cdGaSDFMSNXzFH',
    imgAlt: 'چیزکیک باسک کاراملیزه',
    category: 'cakes-desserts',
    chips: [
      { label: 'پنیر ماسکارپونه اصل', dotColor: 'bg-[#00543B]' },
      { label: 'شیرینی متعادل', dotColor: 'bg-[#974724]' },
      { label: 'دست‌پخت روز', dotColor: 'bg-[#056C4D]' },
    ],
  },
  {
    id: 'roulette-berry',
    title: 'بری کولر تابستانی خنک',
    badgeTitle: 'انرژی‌بخش طبیعی',
    badgeTag: '۱۰۰٪ طبیعی',
    price: 75000,
    oldPrice: 89000,
    discount: '۱۵٪ تخفیف شانس',
    desc: 'ترکیب شاداب‌کننده پوره تمشک و بلوبری وحشی با آب گازدار دست‌ساز، نعنای تازه باغچه و عسل طبیعی.',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-dlONzYxhd9acdNbK5WfiVgzAQgnlj114LE7qMe7E3U37L5YI24oFM9ZcHfn1EyauOnNgYmlAjG3LCATNEEufd_pmfpLw_zSSPghBpcQPF6WACg0NjRTFCaHIsg6CUNGKKUqB1n5i70ZKk_fb-aH6Uw685kNQ5w8KEmKvwBECRTh5Pjdg_8xhK-hIl24-ydToWGZ1Z62qjPWdEmSpgAM9H8lX8VFuN-SS8yMFwgHt2p9r50Rw7OLj',
    imgAlt: 'بری کولر تابستانی خنک',
    category: 'cold-drinks',
    chips: [
      { label: 'سرشار از ویتامین C', dotColor: 'bg-[#974724]' },
      { label: 'بدون شکر افزوده', dotColor: 'bg-[#00543B]' },
      { label: 'یخی و گوارا', dotColor: 'bg-[#056C4D]' },
    ],
  },
  {
    id: 'roulette-espresso',
    title: 'دوبل اسپرسو کلمبیا ارگانیک',
    badgeTitle: 'انتخاب قهوه‌نوشان',
    badgeTag: 'تک‌خاستگاه',
    price: 58000,
    oldPrice: 69000,
    discount: '۱۶٪ تخفیف شانس',
    desc: 'عصاره‌گیری دقیق از دانه‌های ارگانیک منطقه هویلا با کرمای متراکم طلایی و یادداشت‌های عسل و شکلات تلخ.',
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDl92scUDrXn8TVpkauKLcMuy5OfEygV278Z2tLTp12Fun3QlzpoR8tfSxDSHZvVObiE9kNnD-6c-SZuc_xZlpMXisSGNNHp_WUgk0GRnr05b5iKfszJ_WuMakrEf0TfQVdkYQaJjnzYlZkh2DOnTBQzjli-iE3M-G5_WeYdoPazDd8aTbtXmbYd94N21Jjc09bGg1aZ8yewQawREqo2LZXQlyrtE2O7_oNtQ3z9zbI0ernaz7XS-kX',
    imgAlt: 'دوبل اسپرسو کلمبیا ارگانیک',
    category: 'hot-coffee',
    chips: [
      { label: '۱۰۰٪ عربیکا تک‌خاستگاه', dotColor: 'bg-[#00543B]' },
      { label: 'کافئین بالا', dotColor: 'bg-[#974724]' },
      { label: 'کرمای غلیظ', dotColor: 'bg-[#775A4B]' },
    ],
  },
];

interface RoulettePageProps {
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
  cartCount,
  onBack,
  onOpenCart,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentDegree, setCurrentDegree] = useState(0);
  const [confetti, setConfetti] = useState<Particle[]>([]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const currentItem = WHEEL_ITEMS[currentIndex];

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

  const spinWheel = (targetIndex: number | null = null) => {
    if (isSpinning) return;
    setIsSpinning(true);

    let nextIndex: number;
    if (targetIndex !== null && targetIndex >= 0 && targetIndex < WHEEL_ITEMS.length) {
      nextIndex = targetIndex;
    } else {
      nextIndex = Math.floor(Math.random() * WHEEL_ITEMS.length);
      while (nextIndex === currentIndex && WHEEL_ITEMS.length > 1) {
        nextIndex = Math.floor(Math.random() * WHEEL_ITEMS.length);
      }
    }

    const spins = 4;
    const extraAngle = nextIndex * 72;
    const nextDeg = currentDegree + spins * 360 + extraAngle + Math.floor(Math.random() * 40 - 20);
    setCurrentDegree(nextDeg);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsSpinning(false);
      launchConfetti();
    }, 2800);
  };

  const handleAddToCart = () => {
    // map to standard MenuItem
    const menuItem: MenuItem = {
      id: currentItem.id,
      name: currentItem.title,
      category: currentItem.category,
      price: currentItem.price,
      description: currentItem.desc,
      subDescription: `${currentItem.discount} - ${currentItem.badgeTitle}`,
      image: currentItem.imgSrc,
      badge: currentItem.badgeTag,
      badgeColor: 'bg-[#974724] text-white',
    };

    onAddToCart(menuItem);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

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
          className="w-10 h-10 bg-white text-[#5D4335] rounded-full flex items-center justify-center hover:bg-[#FAF3EA] transition-all active:scale-95 shadow-clay-card border border-[#EEE7DE]"
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
          className="relative w-10 h-10 bg-white text-[#5D4335] rounded-full flex items-center justify-center hover:bg-[#FAF3EA] transition-all active:scale-95 shadow-clay-card border border-[#EEE7DE]"
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
                src={currentItem.imgSrc}
                alt={currentItem.imgAlt}
                className={`w-36 h-36 sm:w-42 sm:h-42 object-contain z-10 transition-all duration-500 drop-shadow-xl ${
                  isSpinning ? 'scale-90 opacity-60 blur-[1px]' : 'scale-100 opacity-100 hover:scale-105'
                }`}
              />
            </div>

            {/* Sparkle Badge Floating on Rim */}
            <div className="absolute -top-2 right-3 sm:right-4 bg-[#00543B] text-white px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-clay-button flex items-center gap-1 z-20">
              <span className="material-symbols-outlined text-[13px] sm:text-[14px]">star</span>
              <span className="text-[9.5px] sm:text-[10px] font-bold">{currentItem.badgeTitle}</span>
            </div>

            {/* Badge on Left Rim */}
            <div className="absolute -bottom-2 left-4 sm:left-6 bg-[#974724] text-white px-2 py-0.5 sm:px-2.5 rounded-full shadow-sm flex items-center gap-1 z-20">
              <span className="material-symbols-outlined text-[12px] sm:text-[13px]">local_fire_department</span>
              <span className="text-[9.5px] sm:text-[10px] font-bold">{currentItem.badgeTag}</span>
            </div>
          </div>

          {/* Product Information Card (Squircle Pillow) */}
          <div className="w-full bg-white rounded-3xl p-3.5 sm:p-4 mt-2.5 shadow-clay-card text-center border border-[#EEE7DE] flex flex-col items-center z-20">
            {/* Product Title */}
            <h2 className="text-[17px] sm:text-[19px] font-headline text-[#1E1B16] font-extrabold mb-0.5">
              {currentItem.title}
            </h2>

            {/* Price Tag Badge */}
            <div className="flex items-center gap-1.5 my-1">
              <span className="text-[18px] sm:text-[20px] font-headline text-[#00543B] font-black tracking-tight">
                {currentItem.price.toLocaleString('fa-IR')}
              </span>
              <span className="text-[11.5px] text-[#5D4335]">تومان</span>
              <span className="text-[11.5px] text-[#6F7A73] line-through mr-2 opacity-60">
                {currentItem.oldPrice.toLocaleString('fa-IR')}
              </span>
              <span className="bg-[#FFDBCE] text-[#370E00] text-[9.5px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full mr-1">
                {currentItem.discount}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] sm:text-[11.5px] text-[#3F4943] leading-relaxed max-w-xs mt-0.5">
              {currentItem.desc}
            </p>

            {/* Flavor Attributes Chips */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-2 pt-2 border-t border-[#EEE7DE] w-full flex-wrap">
              {currentItem.chips.map((chip, idx) => (
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
            onClick={() => spinWheel()}
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

import React, { useState, useMemo } from 'react';

interface Story {
  id: string;
  title: string;
  image: string;
  caption: string;
  hasActiveRing?: boolean;
}

interface MediaCard {
  id: string;
  type: 'video' | 'photo';
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  duration?: string;
  tag: string;
  tagColor: string;
  initialLikes: number;
  commentsCount?: number;
  category: 'all' | 'video' | 'interior' | 'coffee' | 'pastry';
}

const STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'روست قهوه',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQlZrHvtXUD8huBpwfYCCyxA8rbO37R2BXrYQCju6RSIG0u1hwZB52odTZc0iBw19uDRTQAiSm2bu-jhwVQKzWVtC_BkQqbCdDgjbuv3aMJjCtNucZ1FqPU3bj_PtuyYq1LlwQhf46hVQspt4mXVAFMT1F2Rlljz75Xa5ZUzhsDp71IB1BaXrTP8zVR0MWPy1YaXn4Qn412xMUjnB1j02Lwl4Y4UEUozCTl5cn7Bd-W7626DAW_ZQo',
    caption: 'دانه‌های تازه برشته‌شده عربیکا کلمبیا - روستر اختصاصی کاما',
    hasActiveRing: true,
  },
  {
    id: 'story-2',
    title: 'فضای حیاط',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxhZW8L55RYb2VsZJfGRuVIOOAWAdmR8ZfxK9upKzjzOg8N0kA10qW6U3jS9vHyD2rSvb8JeqI4TZBViR9_GCTmMvoXwMRWOvmKMCbna8iR1Yb10QwyTltAAa-qAYSXeCI5GUE7nuI8pCAaGh2ZI76ZEaY5wiwXCMi_WsJ57kFk9Up5_pW2jw7f8GTf_sBoHJYKda7LU-0C6hlpBp5n4hq1KBkItVA2UNOsNSTeQYl4Dx6ShYQisL0',
    caption: 'حیاط دنج و سنتی با حوض فیروزه‌ای و نسیم خنک پاییزی',
  },
  {
    id: 'story-3',
    title: 'مراسم لاته آرت',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUvca4LwJuNvUNwwlqLCX-PwIXWdFclZzXGhDzZPRwVQIXzqo0BxIvxU-G7YYh89O3YLUWAXV2eU8vgoU4cjOoPq0UcR3T8QBFD2BTVYEF150C4Rzd3PKrxTZkxd29PNKgMaMilKESFkpcZhaT7K87VsG6uGz5Uf85YLUEbJbwwgc9TQRP8OJBoRESXWLmZiePU31cDVe59_8Cpim3Le_CPCXPGNvBlPKUKkZ5S65zLPEiUeZ_fvFv',
    caption: 'ریزش پترن قو با شیر بخاردیده توسط باریستای ارشد کاما',
  },
  {
    id: 'story-4',
    title: 'صبحانه‌ها',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv2e_tpNUPwenLsJAwHtqn_kEFdzcDBRD_Ph8L8M1sHMf0h_AP-I87Z2XU38SzkCbIYikzNBJtroA2pxrvdN5nM5E9AWHmzQ2WZmvcuwJRMWxeDKkF-TEZ44iepgGrhQhmku4Am1VY3aWJ35D0fQQn6mibooZovkwG0hsFrXs3AYt8MePgXCycdEybqYlyv8CpH3gSXtAibOJsVW5qoIYjUuq9ZcdasYd_pDV5TBkhulGnJfVDVPvq',
    caption: 'صبحانه‌های ارگانیک با تخم‌مرغ محلی و نان ساوردو گرم',
  },
  {
    id: 'story-5',
    title: 'موزیک زنده',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS4tP49sdriABLL2WR7UPxBmsxA9WOViSZMXnHt6fyGHNrfOiLcbrlLk5gSswiDBbq_4ywJDLWTz4_EBekCLt6ScArFSvmcuvCkryszhBGAvCUweMuE7jfwPtRv9eOR3G2_CT19_m7gAY81bflw7Q0SZ2MaOqF_34hd7bTt45LGuLV8t2_66JCGJH40T7SW8IdnRkRobrNxEUl4PN8l8Dhrqm-8Gjg278alpYrXk5-bPCO_1gaI_Yd',
    caption: 'شب‌های جاز و اجرای زنده گیتار آکوستیک در فضای کافه',
  },
];

const MEDIA_CARDS: MediaCard[] = [
  {
    id: 'media-1',
    type: 'video',
    title: 'ریزش لاته آرت قو',
    subtitle: 'هنر باریستای ارشد کاما',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDME-w56jp0Ijxx-jxIBHFpl9k-vz_LF_qE7BetoD22hUhCWi1mIk9M9r-SPR4tw0RK5VkBj3kpzAHwcpfF4kGBpQb-rkVa3PK_87hHGGvm3mc8_8tWFnneapmVHA7wb1TXK35bZb9aFx6Yg52GeUJk9EtMMu0FmsGjxfbywZ3U9BPaonOai_tjdbs5HAWI_97acx5qHOAk5YbYsQWfCXARVEw1NlkNdjrSMYcxXBkR15iCRgPQxCa0',
    duration: '۲.۴K',
    tag: '#هنر_قهوه',
    tagColor: 'text-[#00543B]',
    initialLikes: 1420,
    commentsCount: 38,
    category: 'video',
  },
  {
    id: 'media-2',
    type: 'photo',
    title: 'گوشه دنج کتاب‌خوانی',
    subtitle: 'میز شماره ۴ در نور بعدازظهر',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4jyc2A6qIElJ4K3sE4i6oMWtUcr7EDYXFkZlb3iB3Vcz3WVwOlD_PABgOVpgp7m2e4niypV6ty8OHN2oA33abSHHPB2m_piNbWK74XgQBs_m4cXtoU9G0HdumOgbv-kN7KyzKRpxH4PxCSKq9BfSpS127b4GVu0F9NTA_R7JNcKN8k-T0sffr27PtPGuLpx-AcxAsb6jRKlChLXK9mGetQLOjzBvb-TKgXs9Sl8nYd0EPRHndoxB',
    badge: 'عکاسی مهمان',
    badgeColor: 'bg-black/40 text-white',
    tag: '#فضای_کاما',
    tagColor: 'text-[#974724]',
    initialLikes: 154,
    category: 'interior',
  },
  {
    id: 'media-3',
    type: 'photo',
    title: 'چیزکیک باسک و کرافِل',
    subtitle: 'تازه از فر قنادی کاما',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgdkss8es9xmAPkG_G0Y-bGSCHKG4KNrILzgpmllnSpKLOziGQnKDvEMe4u6nKX_3IN_9iVfXzjSvzjFYRBBcvn0MMCCsHjp6ulvuxrectf7P9qoFVrc-49KlaJMT26LSD2D2kPV7Ds4s5rG55TcLCrM9XFmIerNIAWc_bez738db8MIuuNkzNFbROSrLt_Yg-eecFABW_6Zz23228JkAjzJVqdiSfZiiM-rBhrpNjTqddGjz_Gnur',
    badge: 'پخت روز',
    badgeColor: 'bg-[#FF996F] text-[#772F0D]',
    tag: '#دسرهای_کاما',
    tagColor: 'text-[#974724]',
    initialLikes: 219,
    category: 'pastry',
  },
  {
    id: 'media-4',
    type: 'video',
    title: 'فرآیند برشته‌کاری',
    subtitle: 'دانه‌های تک خاستگاه کلمبیا',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs7612RHpsHmpvUdkp8yytJkNnU3ofRJhzJEJ4I7vl-ZVZZPSw2ZvrvtjqnYrEJhlSsWRhmvSBoiQ9qD8iT4_p03op1UKg7m2Kn3iQne4gjzbBLk_ddCCB1Ts4IcIk6JaofNFRtNbXK7I86GjlG05N-jnnsdyGSJ7nlXUYgJ6ovjfAYv8DOZr8FoPi0AiiRLzQRLUDZ6VndTIgzle5Ji-f5xhCTFSNkxePzHfJWXqLchT8JRA8oWxb',
    duration: '0:30',
    tag: '#روست_کاما',
    tagColor: 'text-[#00543B]',
    initialLikes: 390,
    commentsCount: 19,
    category: 'coffee',
  },
  {
    id: 'media-5',
    type: 'photo',
    title: 'سبزی و طراوت کافه',
    subtitle: 'فضای داخلی با گیاهان زنده',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKnEgueB1XcyKdXEPkAMqbOA6e9ln3NSDOBVdLPhxJBN10dQugBZBl8PurJZfT_ic_ceVJoXZcc3fMFHhwHwAVKlNS5LG_aRIZRmp27eYKM31xjQ-HZmyqBTCmhl6TkRid-o84Yle2-vNhOyCklg7rU8z3TxCyOLJ7f3HvaEfX3P_2Rb4mtLtsVBghFUQa_-Whw3Vu6z1gKuLy3Ldxqx6-kj5MmX8INLt_FnHZYqydWniagQY2e6K7',
    tag: '#دکور_سبز',
    tagColor: 'text-[#00543B]',
    initialLikes: 312,
    category: 'interior',
  },
  {
    id: 'media-6',
    type: 'photo',
    title: 'نوشیدنی‌های خنک تابستانی',
    subtitle: 'نیترو کلدبرو و کوکتل توت',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiHxo-c7XDVIUWz8JOXH3pvzd7ielI7Hk90uh3qovZqSe8qYlcPQJGfy7Q0FrDaOr4Smt4touBVyZNr2Jx2jcLS2yTbe-9Hw5vplHi-RuKJhJ0XbbET9rDNeMGcU4xMrJ5KYweLIpJmXLmI7Oh6Abplu4pOt392Jtm12cd2YIu6rVR0ayAxNYF5OfIqccquNqOfR5dSflYN7mJBy0Sl6p-4074SjX_OGU_eAr8kcJEAANznP5uNqH3',
    tag: '#بار_سرد',
    tagColor: 'text-[#974724]',
    initialLikes: 187,
    category: 'coffee',
  },
];

interface GalleryPageProps {
  cartCount: number;
  onBack: () => void;
  onOpenCart: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  cartCount,
  onBack,
  onOpenCart,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'interior' | 'coffee' | 'pastry'>('all');
  const [likedCardIds, setLikedCardIds] = useState<Record<string, boolean>>({
    'media-1': true,
  });
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [lightboxMedia, setLightboxMedia] = useState<MediaCard | null>(null);
  const [heroVideoLiked, setHeroVideoLiked] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const mediaCards = useMemo<MediaCard[]>(() => {
    try {
      const saved = localStorage.getItem('comma_gallery_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            id: item.id,
            type: item.type || 'photo',
            title: item.title,
            subtitle: item.subtitle,
            image: item.image,
            tag:
              item.category === 'interior'
                ? '#فضای_کاما'
                : item.category === 'coffee'
                ? '#قهوه_کاما'
                : '#شیرینی_کاما',
            tagColor: 'text-[#974724]',
            initialLikes: 120,
            category: item.category || 'interior',
          }));
        }
      }
    } catch {}
    return MEDIA_CARDS;
  }, []);

  const toggleLike = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCardIds((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const filteredMedia = mediaCards.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="w-full max-w-[460px] min-h-screen bg-[#FFF8F1] rounded-[36px] sm:rounded-[44px] shadow-clay-float border border-[#EEE7DE] flex flex-col relative overflow-hidden pb-12 transition-all">
      {/* TopAppBar */}
      <header className="w-full px-4 sm:px-5 py-3 flex items-center justify-between bg-[#FFF8F1]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#EEE7DE]/60">
        {/* Back Button */}
        <button
          onClick={onBack}
          aria-label="بازگشت به منو"
          className="w-10 h-10 bg-white text-[#5D4335] rounded-full flex items-center justify-center hover:bg-[#FAF3EA] active:scale-95 transition-all shadow-clay-card border border-[#EEE7DE]"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        {/* Center Title */}
        <div className="text-center flex-1 px-2">
          <h1 className="text-[17px] font-bold text-[#5D4335] tracking-tight">
            گالری کافه کاما
          </h1>
          <p className="text-[11px] text-[#6F7A73] font-medium mt-0.5">
            لحظات، فضا و هنر باریستایی کاما
          </p>
        </div>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          aria-label="سبد سفارش"
          className="relative w-10 h-10 bg-white text-[#5D4335] rounded-full flex items-center justify-center hover:bg-[#FAF3EA] active:scale-95 transition-all shadow-clay-card border border-[#EEE7DE]"
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

      {/* Main Content Stream */}
      <main className="flex-1 px-4 sm:px-5 space-y-6 pt-3">
        {/* 1. Story Highlights Carousel */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[13px] text-[#5D4335] flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[#974724] text-[18px]">
                auto_awesome
              </span>
              داستان‌های برگزیده کافه
            </span>
            <span className="text-[11px] text-[#6F7A73]">بروزرسانی امروز</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-0.5 -mx-1">
            {STORIES.map((story) => (
              <button
                key={story.id}
                onClick={() => setActiveStory(story)}
                className="flex flex-col items-center gap-1.5 flex-shrink-0 group focus:outline-none cursor-pointer"
                type="button"
              >
                <div
                  className={`w-[66px] h-[66px] rounded-full p-[2px] transition-transform group-hover:scale-105 active:scale-95 shadow-sm ${
                    story.hasActiveRing
                      ? 'bg-gradient-to-tr from-[#0B6E4F] via-[#FF996F] to-[#974724] p-[2.5px]'
                      : 'bg-[#BEC9C1]'
                  }`}
                >
                  <div className="w-full h-full rounded-full p-[2px] bg-white overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <span className="text-[11.5px] text-[#5D4335] font-medium leading-tight">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 2. Featured Video Spotlight Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-[#5D4335] text-white shadow-clay-card group">
          <div className="relative h-60 sm:h-64 w-full">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyuZ2omJ9GW9Fif2TBoevIKE8hqx-kcwhAluFQvVRrYYUmYoyc_-08HnDJOwBpRZKRhCM6tSwPw_45G_sXRgW670m1JVwo0PJkEOwh3cN4xwAxTDatBPlnWw3t9kl63DarZxEHA9ZsJM12eBwXbesPF9z5LRp6MgYCuK4Yatic1GkS35XGVtTSZX1TfC8c1-QrKpV7pTV3GzjijZsvXc2Uu0uhCHeIZJLTpyTwpCHFL2YEHA5ue8NW"
              alt="هنر عصاره‌گیری و پروفایل طعمی قهوه تخصصی کاما"
              className="w-full h-full object-cover brightness-[0.78] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            {/* Top Pill Tags */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[#1E1B16] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[11px] font-bold">ریلز برگزیده هفته</span>
            </div>

            <div
              className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[11px] font-medium flex items-center gap-1"
              dir="ltr"
            >
              <span className="material-symbols-outlined text-[13px]">schedule</span>
              <span>0:45</span>
            </div>

            {/* Tactile Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setShowVideoModal(true)}
                aria-label="پخش ریلز"
                className="w-14 h-14 bg-[#0B6E4F] text-white rounded-full flex items-center justify-center shadow-clay-button transition-transform duration-200 group-hover:scale-110 active:scale-95 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[32px] translate-x-0.5">
                  play_arrow
                </span>
              </button>
            </div>

            {/* Banner Bottom Caption */}
            <div className="absolute bottom-4 inset-x-4 flex items-end justify-between">
              <div className="space-y-1 text-right max-w-[78%]">
                <span className="text-[10px] text-[#FFDBCA] bg-[#974724]/90 backdrop-blur-sm px-2 py-0.5 rounded-md inline-block font-bold">
                  تکنیک عصاره‌گیری
                </span>
                <h2 className="text-[14.5px] sm:text-[15px] font-bold text-white drop-shadow-sm leading-tight">
                  هنر عصاره‌گیری و پروفایل طعمی قهوه تخصصی کاما
                </h2>
              </div>

              <button
                onClick={() => setHeroVideoLiked(!heroVideoLiked)}
                className={`flex items-center gap-1 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                  heroVideoLiked ? 'bg-red-600 text-white' : 'bg-white/20 text-white/90 hover:bg-white/30'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[14px]">favorite</span>
                <span>{heroVideoLiked ? '۱.۹K' : '۱.۸K'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. Media Filter Category Pills */}
        <section className="overflow-x-auto no-scrollbar flex items-center gap-2 py-1 -mx-4 px-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 flex-shrink-0 transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0B6E4F] text-white shadow-clay-button'
                : 'bg-white text-[#5D4335] border border-[#EEE7DE] hover:bg-[#FAF3EA]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">grid_view</span>
            <span>همه تصاویر و ویدیوها</span>
          </button>

          <button
            onClick={() => setActiveFilter('video')}
            className={`text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 flex-shrink-0 transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'video'
                ? 'bg-[#0B6E4F] text-white shadow-clay-button'
                : 'bg-white text-[#5D4335] border border-[#EEE7DE] hover:bg-[#FAF3EA]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#974724]">movie</span>
            <span>ویدیوها و ریلزها</span>
          </button>

          <button
            onClick={() => setActiveFilter('interior')}
            className={`text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 flex-shrink-0 transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'interior'
                ? 'bg-[#0B6E4F] text-white shadow-clay-button'
                : 'bg-white text-[#5D4335] border border-[#EEE7DE] hover:bg-[#FAF3EA]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#775A4B]">chair</span>
            <span>فضای کافه و دکور</span>
          </button>

          <button
            onClick={() => setActiveFilter('coffee')}
            className={`text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 flex-shrink-0 transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'coffee'
                ? 'bg-[#0B6E4F] text-white shadow-clay-button'
                : 'bg-white text-[#5D4335] border border-[#EEE7DE] hover:bg-[#FAF3EA]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#00543B]">local_cafe</span>
            <span>فرهنگ قهوه و باریستا</span>
          </button>

          <button
            onClick={() => setActiveFilter('pastry')}
            className={`text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 flex-shrink-0 transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'pastry'
                ? 'bg-[#0B6E4F] text-white shadow-clay-button'
                : 'bg-white text-[#5D4335] border border-[#EEE7DE] hover:bg-[#FAF3EA]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px] text-[#974724]">bakery_dining</span>
            <span>کیک‌ها و دسرها</span>
          </button>
        </section>

        {/* 4. Visual Gallery Grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B6E4F]" />
              <h3 className="text-[17px] font-bold text-[#5D4335]">
                آلبوم زنده تجربیات
              </h3>
            </div>
            <span className="text-[11px] text-[#6F7A73]">
              {filteredMedia.length.toLocaleString('fa-IR')} رسانه منتخب
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {filteredMedia.map((card) => {
              const isLiked = !!likedCardIds[card.id];
              const likesCount = card.initialLikes + (isLiked ? 1 : 0);
              const isVideo = card.type === 'video';

              return (
                <div
                  key={card.id}
                  onClick={() => setLightboxMedia(card)}
                  className="bg-white rounded-2xl overflow-hidden flex flex-col group transition-all duration-200 hover:-translate-y-1 shadow-clay-card border border-[#EEE7DE] cursor-pointer"
                >
                  <div
                    className={`relative w-full overflow-hidden bg-[#FAF3EA] ${
                      isVideo ? 'h-52 sm:h-56' : 'h-40 sm:h-44'
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Video Duration / Count Badge */}
                    {isVideo && (
                      <div
                        className="absolute top-2.5 right-2.5 bg-black/55 backdrop-blur-md rounded-full px-2 py-0.5 flex items-center gap-1 text-white text-[10px] font-medium"
                        dir="ltr"
                      >
                        <span className="material-symbols-outlined text-[13px] text-[#FFB598]">
                          videocam
                        </span>
                        <span>{card.duration}</span>
                      </div>
                    )}

                    {/* Photo Badge */}
                    {card.badge && (
                      <span
                        className={`absolute bottom-2.5 right-2.5 text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm ${card.badgeColor}`}
                      >
                        {card.badge}
                      </span>
                    )}

                    {/* Center Play Icon for videos */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="w-9 h-9 rounded-full bg-[#00543B]/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                        </span>
                      </div>
                    )}

                    {/* Like Button */}
                    <button
                      onClick={(e) => toggleLike(card.id, e)}
                      aria-label="پسندیدن"
                      className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 ${
                        isLiked
                          ? 'bg-red-50 text-red-600 shadow-sm'
                          : 'bg-white/80 text-[#6F7A73] hover:text-red-500'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">favorite</span>
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="p-3 bg-white flex flex-col justify-between flex-1 text-right">
                    <div>
                      <h4 className="text-[13px] font-bold text-[#5D4335] line-clamp-1">
                        {card.title}
                      </h4>
                      <p className="text-[10.5px] text-[#6F7A73] mt-0.5 line-clamp-1">
                        {card.subtitle}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#EEE7DE] flex items-center justify-between text-[#6F7A73] text-[11px]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {card.commentsCount ? 'chat_bubble_outline' : 'thumb_up'}
                        </span>
                        <span>
                          {(card.commentsCount || likesCount).toLocaleString('fa-IR')}
                        </span>
                      </span>
                      <span className={`font-medium text-[11px] ${card.tagColor}`}>
                        {card.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Instagram Community Invitation Card */}
        <section className="rounded-3xl bg-[#FAF3EA] border border-[#EEE7DE] p-5 shadow-clay-card relative overflow-hidden text-right">
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#FFB598]/40 blur-2xl pointer-events-none" />
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#974724] text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[24px]">photo_camera</span>
            </div>
            <div className="space-y-1.5 flex-1">
              <h3 className="text-[16px] font-bold text-[#5D4335]">
                ثبت لحظه‌ها با کاما
              </h3>
              <p className="text-[12px] text-[#3F4943] leading-relaxed">
                عکس‌ها و ویدیوهای خود از حضور در کافه را با هشتگ{' '}
                <span className="text-[#974724] font-bold inline-block" dir="ltr">
                  #CommaCafe
                </span>{' '}
                در اینستاگرام منتشر کنید تا در منوی رسمی و آلبوم هفتگی کافه نمایش داده شوید.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#EEE7DE] flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[#5D4335] font-semibold text-[13px]" dir="ltr">
              <span className="material-symbols-outlined text-[#974724] text-[17px]">
                alternate_email
              </span>
              <span>comma.cafe</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard?.writeText('https://instagram.com/comma.cafe');
                alert('آدرس اینستاگرام کافه کاما کپی شد: @comma.cafe');
              }}
              className="bg-[#0B6E4F] text-white text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-clay-button hover:bg-[#00543B] transition-all active:scale-95 cursor-pointer"
              type="button"
            >
              <span>دنبال کردن صفحه</span>
              <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            </button>
          </div>
        </section>

        {/* 6. Footer Brand Note */}
        <footer className="text-center py-4 space-y-1">
          <p className="text-[11px] text-[#6F7A73]">کافه کاما • فضای آرام و طعم دست‌ساز</p>
          <p className="text-[10px] text-[#BEC9C1]" dir="ltr">
            Comma Artisan Cafe © 2024
          </p>
        </footer>
      </main>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-200"
          onClick={() => setActiveStory(null)}
        >
          <div
            className="w-full max-w-[380px] h-[75vh] bg-[#1E1B16] rounded-3xl overflow-hidden relative flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Story Top Progress Line */}
            <div className="p-3 w-full z-20 flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full animate-[progress_5s_linear_infinite]" />
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center"
                type="button"
              >
                ✕
              </button>
            </div>

            {/* Story Image */}
            <div className="absolute inset-0">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
            </div>

            {/* Caption */}
            <div className="relative z-20 p-5 text-right text-white">
              <span className="text-[10px] bg-[#0B6E4F] px-2 py-0.5 rounded-full font-bold mb-1.5 inline-block">
                استوری ویژه کافه
              </span>
              <h3 className="text-[17px] font-bold mb-1">{activeStory.title}</h3>
              <p className="text-[12px] text-white/80 leading-relaxed">
                {activeStory.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Video / Lightbox Modal */}
      {(showVideoModal || lightboxMedia) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 animate-in fade-in duration-200"
          onClick={() => {
            setShowVideoModal(false);
            setLightboxMedia(null);
          }}
        >
          <div
            className="w-full max-w-[420px] bg-[#FFF8F1] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-72 w-full bg-black flex items-center justify-center">
              <img
                src={lightboxMedia ? lightboxMedia.image : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyuZ2omJ9GW9Fif2TBoevIKE8hqx-kcwhAluFQvVRrYYUmYoyc_-08HnDJOwBpRZKRhCM6tSwPw_45G_sXRgW670m1JVwo0PJkEOwh3cN4xwAxTDatBPlnWw3t9kl63DarZxEHA9ZsJM12eBwXbesPF9z5LRp6MgYCuK4Yatic1GkS35XGVtTSZX1TfC8c1-QrKpV7pTV3GzjijZsvXc2Uu0uhCHeIZJLTpyTwpCHFL2YEHA5ue8NW'}
                alt="پخش مدیا"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <span className="w-14 h-14 rounded-full bg-[#0B6E4F] text-white flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-[36px]">play_arrow</span>
                </span>
              </div>
              <button
                onClick={() => {
                  setShowVideoModal(false);
                  setLightboxMedia(null);
                }}
                className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center"
                type="button"
              >
                ✕
              </button>
            </div>

            <div className="p-4 text-right">
              <h4 className="text-[16px] font-bold text-[#5D4335] mb-1">
                {lightboxMedia ? lightboxMedia.title : 'هنر عصاره‌گیری و پروفایل طعمی قهوه تخصصی کاما'}
              </h4>
              <p className="text-[12px] text-[#6F7A73] leading-relaxed">
                {lightboxMedia
                  ? `${lightboxMedia.subtitle} • با احترام و عشق برای همراهان کافه کاما`
                  : 'پاییز امسال با دانه‌های عربیکا سینگل اوریجین همراه شماییم.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

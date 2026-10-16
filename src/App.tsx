/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { SearchFilterBar } from './components/SearchFilterBar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryCarousel } from './components/CategoryCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { RouletteModal } from './components/RouletteModal';
import { GalleryModal } from './components/GalleryModal';
import { ClubModal } from './components/ClubModal';
import { FilterModal, FilterState } from './components/FilterModal';
import { WaiterModal } from './components/WaiterModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { RoulettePage } from './components/RoulettePage';
import { GalleryPage } from './components/GalleryPage';
import { LoginPage } from './components/LoginPage';
import { MENU_ITEMS, MenuItem, CartItem } from './data/menuData';

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<'home' | 'roulette' | 'gallery' | 'login'>('home');

  // Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isClubOpen, setIsClubOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isWaiterOpen, setIsWaiterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    table: string;
    total: number;
    itemCount: number;
  } | null>(null);

  // Cart State (initialized with 2 items to match screenshot badge "۲")
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'init-1',
      item: MENU_ITEMS[0], // اسپرسو دوبل
      quantity: 1,
      options: { extraShot: false },
    },
    {
      id: 'init-2',
      item: MENU_ITEMS[1], // چیزکیک لوتوس
      quantity: 1,
    },
  ]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Search & Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('hot-coffee');
  const [showAllPicks, setShowAllPicks] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    onlyVegetarian: false,
    onlySpecials: false,
    maxPrice: 150000,
  });

  // Calculate total cart badge
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.onlyVegetarian) count++;
    if (filters.onlySpecials) count++;
    if (filters.maxPrice < 150000) count++;
    return count;
  }, [filters]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategoryId !== 'all' && item.category !== selectedCategoryId && !showAllPicks) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.trim().toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSub = item.subDescription.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesSub && !matchesTags) {
          return false;
        }
      }
      // Custom filters
      if (filters.onlyVegetarian && !item.isVegetarian) return false;
      if (filters.onlySpecials && !item.isSpecial && !item.isBestSeller) return false;
      if (item.price > filters.maxPrice) return false;

      return true;
    });
  }, [selectedCategoryId, searchTerm, filters, showAllPicks]);

  // Cart operations
  const handleQuickAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id && !ci.options?.extraShot && !ci.options?.notes);
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [
        ...prev,
        {
          id: `${item.id}-${Date.now()}`,
          item,
          quantity: 1,
        },
      ];
    });
    showToast(`«${item.name}» به سبد اضافه شد`);
  };

  const handleAddToCartWithOptions = (
    item: MenuItem,
    quantity: number,
    options: {
      milk?: string;
      sugar?: string;
      extraShot?: boolean;
      notes?: string;
    }
  ) => {
    setCartItems((prev) => [
      ...prev,
      {
        id: `${item.id}-${Date.now()}`,
        item,
        quantity,
        options,
      },
    ]);
    showToast(`${quantity.toLocaleString('fa-IR')} عدد «${item.name}» به سبد افزوده شد`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="bg-[#FAF3EA] text-[#1E1B16] min-h-screen py-2 sm:py-8 px-2 sm:px-4 flex justify-center selection:bg-[#0B6E4F] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 z-50 bg-[#0B6E4F] text-white px-4 py-2.5 rounded-full shadow-clay-float text-[13px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Router */}
      {currentPage === 'roulette' ? (
        <RoulettePage
          cartCount={totalCartCount}
          onBack={() => setCurrentPage('home')}
          onOpenCart={() => setIsCartOpen(true)}
          onAddToCart={handleQuickAddToCart}
        />
      ) : currentPage === 'gallery' ? (
        <GalleryPage
          cartCount={totalCartCount}
          onBack={() => setCurrentPage('home')}
          onOpenCart={() => setIsCartOpen(true)}
        />
      ) : currentPage === 'login' ? (
        <LoginPage
          onBack={() => setCurrentPage('home')}
          onLoginSuccess={() => showToast('خوش آمدید، میلاد خضری! ورود به پنل مدیریت موفق')}
        />
      ) : (
        /* Main Mobile Screen Viewport Container */
        <main className="w-full max-w-[460px] bg-[#FFF8F1] rounded-[36px] sm:rounded-[44px] shadow-clay-float border border-[#EEE7DE] overflow-hidden pb-8 flex flex-col relative transition-all">
          {/* 1. Top App Header */}
          <Header
            cartCount={totalCartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenRoulette={() => setCurrentPage('roulette')}
            onOpenGallery={() => setCurrentPage('gallery')}
            onOpenLogin={() => setCurrentPage('login')}
            onOpenClub={() => setIsClubOpen(true)}
            onOpenWaiter={() => setIsWaiterOpen(true)}
          />

          {/* Scrollable Body Content */}
          <div className="flex flex-col gap-5 px-4 sm:px-5 mt-2">
            {/* 2. Search Pill Bar */}
            <SearchFilterBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onOpenFilter={() => setIsFilterOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            {/* 3. Hero Banner Card */}
            <HeroBanner
              onCtaClick={() => {
                setSelectedCategoryId('all');
                setShowAllPicks(true);
                showToast('نمایش پیشنهادات ویژه باریستا');
              }}
            />

            {/* 4. Menu Categories Carousel */}
            <CategoryCarousel
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={(id) => {
                setSelectedCategoryId(id);
                setShowAllPicks(false);
              }}
            />

            {/* 5. Popular Picks (منتخب‌های کافه کاما) */}
            <section className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-[17px] text-[#5D4335] font-bold">
                    {searchTerm
                      ? `نتایج جستجو (${filteredItems.length.toLocaleString('fa-IR')})`
                      : showAllPicks
                      ? 'همه منوی کافه کاما'
                      : 'منتخب‌های کافه کاما'}
                  </h3>
                  <span className="material-symbols-outlined text-[#974724] text-[20px] fill-icon">
                    local_fire_department
                  </span>
                </div>

                <button
                  onClick={() => {
                    setShowAllPicks(!showAllPicks);
                    if (!showAllPicks) setSelectedCategoryId('all');
                  }}
                  className="text-[12px] text-[#974724] hover:text-[#772F0D] inline-flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                  type="button"
                >
                  <span>{showAllPicks ? 'فقط برگزیده‌ها' : 'مشاهده همه'}</span>
                  <span className="material-symbols-outlined text-[15px]">
                    {showAllPicks ? 'expand_less' : 'arrow_back'}
                  </span>
                </button>
              </div>

              {/* Product Cards Grid */}
              {filteredItems.length === 0 ? (
                <div className="w-full bg-white rounded-2xl p-6 text-center border border-[#EEE7DE]">
                  <span className="material-symbols-outlined text-[#6F7A73] text-[36px] mb-2">
                    search_off
                  </span>
                  <h4 className="text-[14px] font-bold text-[#5D4335] mb-1">
                    موردی با این مشخصات یافت نشد
                  </h4>
                  <p className="text-[11px] text-[#6F7A73] mb-3">
                    می‌توانید کلمه جستجو یا فیلترهای انتخابی را تغییر دهید.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategoryId('hot-coffee');
                      setShowAllPicks(false);
                      setFilters({
                        onlyVegetarian: false,
                        onlySpecials: false,
                        maxPrice: 150000,
                      });
                    }}
                    className="bg-[#FAF3EA] text-[#5D4335] text-[11px] font-bold px-3 py-1.5 rounded-full hover:bg-[#EEE7DE]"
                    type="button"
                  >
                    بازنشانی فیلترها
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                  {filteredItems.map((item) => (
                    <ProductCard
                      key={item.id}
                      item={item}
                      onAddToCart={handleQuickAddToCart}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* 6. Comma Club Rewards Banner */}
            <section className="w-full bg-white rounded-[26px] p-4 shadow-clay-card border border-[#EEE7DE] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFDBCA] text-[#5D4335] flex items-center justify-center shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[26px] text-[#974724] fill-icon">
                    workspace_premium
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <h4 className="text-[15px] font-bold text-[#5D4335]">
                    باشگاه مشتریان کاما
                  </h4>
                  <p className="text-[11.5px] text-[#6F7A73] leading-tight">
                    با هر سفارش امتیاز بگیرید و رایگان قهوه بنوشید
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsClubOpen(true)}
                className="bg-[#0B6E4F] text-white text-[12.5px] font-bold px-4 py-2.5 rounded-full shadow-clay-button hover:bg-[#00543B] active:scale-95 transition-all shrink-0 cursor-pointer"
                type="button"
              >
                عضویت
              </button>
            </section>

            {/* Quick Table Service Action Card */}
            <div className="flex items-center justify-between bg-[#F4EDE4] rounded-2xl px-4 py-2.5 border border-[#EEE7DE]">
              <div className="flex items-center gap-2 text-[12px] text-[#5D4335] font-medium">
                <span className="material-symbols-outlined text-[#0B6E4F] text-[18px]">
                  support_agent
                </span>
                <span>نیاز به کمک یا تماس با ویتر دارید؟</span>
              </div>
              <button
                onClick={() => setIsWaiterOpen(true)}
                className="text-[11px] font-bold bg-white text-[#0B6E4F] px-3 py-1 rounded-full shadow-sm hover:bg-[#FAF3EA] transition-all cursor-pointer"
                type="button"
              >
                فراخوانی ویتر
              </button>
            </div>

            {/* 7. Cozy Minimal Cafe Details Footer */}
            <footer className="pt-2 pb-4 text-center flex flex-col items-center gap-1.5 opacity-80">
              <div className="flex items-center gap-2 text-[#6F7A73] text-[11px] font-medium">
                <span>ساعت کاری: ۸:۰۰ الی ۲۳:۳۰</span>
                <span>•</span>
                <button
                  onClick={() => setIsWaiterOpen(true)}
                  className="hover:text-[#0B6E4F] underline decoration-dotted transition-colors cursor-pointer"
                >
                  وای‌فای رایگان کافه
                </button>
              </div>
              <p className="text-[11px] text-[#6F7A73]">
                طراحی شده برای تجربه‌ای آرام و لذت‌بخش در کافه کاما
              </p>
            </footer>
          </div>
        </main>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCartWithOptions={handleAddToCartWithOptions}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(info) => setCompletedOrder(info)}
      />

      {/* Cafe Gallery Modal */}
      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* Comma Club Modal */}
      <ClubModal
        isOpen={isClubOpen}
        onClose={() => setIsClubOpen(false)}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onUpdateFilters={setFilters}
        onResetFilters={() => {
          setFilters({
            onlyVegetarian: false,
            onlySpecials: false,
            maxPrice: 150000,
          });
          setIsFilterOpen(false);
        }}
      />

      {/* Waiter Assistance Modal */}
      <WaiterModal
        isOpen={isWaiterOpen}
        onClose={() => setIsWaiterOpen(false)}
      />

      {/* Order Success Receipt Modal */}
      <OrderSuccessModal
        orderInfo={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </div>
  );
}

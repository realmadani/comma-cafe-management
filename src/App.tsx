/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchFilterBar } from './components/SearchFilterBar';
import { LiveDateTime } from './components/LiveDateTime';
import { HeroBanner } from './components/HeroBanner';
import { CategoryCarousel } from './components/CategoryCarousel';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { RouletteModal } from './components/RouletteModal';
import { GalleryModal } from './components/GalleryModal';
import { FilterModal, FilterState } from './components/FilterModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { RoulettePage } from './components/RoulettePage';
import { GalleryPage } from './components/GalleryPage';
import { LoginPage } from './components/LoginPage';
import { MENU_ITEMS, MenuItem, CartItem, CATEGORIES, Category } from './data/menuData';

export default function App() {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState<'home' | 'roulette' | 'gallery' | 'login'>('home');

  // Manager Authentication State (Persists across page navigation)
  const [isManagerLoggedIn, setIsManagerLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('comma_manager_auth') === 'true';
    } catch {
      return false;
    }
  });

  const handleManagerLoginSuccess = () => {
    setIsManagerLoggedIn(true);
    try {
      localStorage.setItem('comma_manager_auth', 'true');
    } catch {
      // ignore
    }
    showToast('خوش آمدید، میلاد خضری عزیز! دسترسی مدیریت فعال شد');
  };

  const handleManagerLogout = () => {
    setIsManagerLoggedIn(false);
    try {
      localStorage.removeItem('comma_manager_auth');
    } catch {
      // ignore
    }
    showToast('از حساب مدیریت خارج شدید');
  };

  // Synchronized Menu Items & Categories (Single Source of Truth across Menu, Lucky Wheel & Management)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('comma_cafe_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return MENU_ITEMS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('comma_cafe_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return CATEGORIES;
  });

  // Persist items & categories to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('comma_cafe_items', JSON.stringify(menuItems));
    } catch {}
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem('comma_cafe_categories', JSON.stringify(categories));
    } catch {}
  }, [categories]);

  // Compute live item counts for categories dynamically based on current menuItems
  const categoriesWithDynamicCounts = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      count: menuItems.filter((item) => item.category === cat.id).length,
    }));
  }, [categories, menuItems]);

  // Modals State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
      item: menuItems[0] || MENU_ITEMS[0], // اسپرسو دوبل
      quantity: 1,
      options: { extraShot: false },
    },
    {
      id: 'init-2',
      item: menuItems[1] || MENU_ITEMS[1], // چیزکیک لوتوس
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

  // Ensure selectedCategoryId remains valid if categories are deleted/modified
  useEffect(() => {
    if (
      selectedCategoryId !== 'all' &&
      categories.length > 0 &&
      !categories.some((c) => c.id === selectedCategoryId)
    ) {
      setSelectedCategoryId(categories[0]?.id || 'all');
    }
  }, [categories, selectedCategoryId]);

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

  // Filtered menu items from dynamic synchronized menuItems list
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
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
  }, [menuItems, selectedCategoryId, searchTerm, filters, showAllPicks]);

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
    options?: {
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
          items={menuItems}
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
          isLoggedIn={isManagerLoggedIn}
          totalItemsCount={menuItems.length}
          totalCategoriesCount={categories.length}
          onBack={() => setCurrentPage('home')}
          onLoginSuccess={handleManagerLoginSuccess}
          onLogout={handleManagerLogout}
          categories={categories}
          items={menuItems}
          onSaveCategories={(newCats) => {
            setCategories(newCats);
            showToast('دسته‌بندی‌ها با موفقیت ذخیره و در تمام بخش‌ها اعمال شدند');
          }}
          onSaveItems={(newItems) => {
            setMenuItems(newItems);
            showToast('آیتم‌های منو و گردونه شانس با موفقیت به‌روزرسانی شدند');
          }}
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
            isManagerLoggedIn={isManagerLoggedIn}
          />

          {/* Scrollable Body Content */}
          <div className="flex flex-col gap-5 px-4 sm:px-5 mt-2">
            {/* Search Section with Live Persian Date & Time */}
            <div className="flex flex-col gap-1.5">
              <LiveDateTime />
              <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onOpenFilter={() => setIsFilterOpen(true)}
                activeFilterCount={activeFilterCount}
              />
            </div>

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
              categories={categoriesWithDynamicCounts}
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

            {/* 6. Minimal Brand Footer with Madenzo Credit */}
            <footer className="pt-3 pb-2 text-center flex flex-col items-center justify-center">
              <p className="text-[12.5px] text-[#6F7A73] font-medium flex items-center justify-center gap-1.5 flex-wrap">
                <span>طراحی و توسعه توسط</span>
                <a
                  href="https://www.instagram.com/madenzo.x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#974724] hover:text-[#772F0D] font-bold underline decoration-dotted underline-offset-4 hover:decoration-solid transition-colors inline-flex items-center gap-1"
                  dir="ltr"
                >
                  <svg className="w-3.5 h-3.5 inline-block text-[#974724]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Madenzo</span>
                </a>
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

      {/* Order Success Receipt Modal */}
      <OrderSuccessModal
        orderInfo={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />
    </div>
  );
}

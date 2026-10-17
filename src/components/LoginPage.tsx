import React, { useState } from 'react';
import { Category, MenuItem } from '../data/menuData';
import { EditCategoriesModal } from './EditCategoriesModal';
import { EditItemsModal } from './EditItemsModal';
import { EditGalleryModal } from './EditGalleryModal';

interface LoginPageProps {
  isLoggedIn: boolean;
  totalItemsCount?: number;
  totalCategoriesCount?: number;
  onBack: () => void;
  onLoginSuccess: () => void;
  onLogout: () => void;
  categories?: Category[];
  items?: MenuItem[];
  onSaveCategories?: (newCategories: Category[]) => void;
  onSaveItems?: (newItems: MenuItem[]) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  isLoggedIn,
  totalItemsCount = 0,
  totalCategoriesCount = 0,
  onBack,
  onLoginSuccess,
  onLogout,
  categories = [],
  items = [],
  onSaveCategories = () => {},
  onSaveItems = () => {},
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Modals State
  const [isEditCategoriesOpen, setIsEditCategoriesOpen] = useState(false);
  const [isEditItemsOpen, setIsEditItemsOpen] = useState(false);
  const [isEditGalleryOpen, setIsEditGalleryOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Valid credentials according to user specification
      if (username.trim() === 'miladkhezri' && password === '1q2w3e4r5t6y') {
        onLoginSuccess();
      } else {
        setErrorMessage('نام کاربری یا کلمه عبور وارد شده نادرست است.');
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-[460px] min-h-screen bg-[#FFF8F1] rounded-[36px] sm:rounded-[44px] shadow-clay-float border border-[#EEE7DE] flex flex-col justify-between relative overflow-hidden transition-all pb-6">
      {/* Top Decorative Ambient Blur Orbs */}
      <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#83D7B1]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-44 -left-20 w-60 h-60 bg-[#FFB598]/25 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Top App Bar */}
      <header className="w-full relative z-10 pt-3 pb-3 px-4 sm:px-5">
        <div className="flex justify-between items-center w-full">
          {/* Back Action to Public Cafe / Previous Screen */}
          <button
            onClick={onBack}
            aria-label="بازگشت به منو"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1E1B16] shadow-clay-card hover:bg-[#FAF3EA] transition-all duration-200 active:scale-95 border border-[#EEE7DE]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          {/* Brand Title / Center Label */}
          <div className="flex flex-col items-center">
            <span className="font-headline text-[19px] font-bold text-[#00543B] tracking-tight">
              کافه کاما
            </span>
            <span className="text-[10.5px] text-[#3F4943]/80 -mt-0.5 font-medium">
              ورود به پنل مدیریت
            </span>
          </div>

          {/* Header Spacer to balance title centering */}
          <div className="w-10 h-10" />
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="w-full flex-1 flex flex-col justify-center relative z-10 px-4 sm:px-5 py-2">
        {!isLoggedIn ? (
          <>
            {/* 2. Security Shield Badge & Hero Greetings */}
            <section className="flex flex-col items-center text-center mb-5">
              <div className="relative mb-3 group">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-clay-card flex items-center justify-center border border-[#EEE7DE]/60 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B6E4F]/10 flex items-center justify-center text-[#00543B]">
                    <span className="material-symbols-outlined text-[#00543B] text-[32px]">
                      shield
                    </span>
                  </div>
                </div>
                {/* Tiny Status Lock Badge */}
                <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-[#0B6E4F] text-white border-2 border-[#FAF3EA] flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[13px]">lock</span>
                </div>
              </div>

              <h1 className="font-headline text-[22px] font-bold text-[#00543B] tracking-normal mb-1">
                ورود مدیران و همکاران
              </h1>
              <p className="text-[12px] text-[#3F4943] max-w-[310px] leading-relaxed">
                جهت دسترسی به داشبورد سفارشات، کنترل منو و مدیریت کافه وارد حساب کاری خود شوید.
              </p>
            </section>

            {/* 3. Form Card: Soft Claymorphic Rounded Container */}
            <section className="bg-white rounded-3xl p-5 shadow-clay-card border border-[#EEE7DE]/80 backdrop-blur-sm">
              <form onSubmit={handleSubmit} autoComplete="off" className="space-y-3.5">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-[11.5px] rounded-2xl text-right flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">error</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Field 1: Username / Staff ID */}
                <div className="space-y-1.5 text-right">
                  <label
                    className="block text-[12px] text-[#1E1B16] font-semibold pr-1"
                    htmlFor="username"
                  >
                    نام کاربری یا شناسه پرسنلی
                  </label>
                  <div className="relative rounded-2xl bg-[#FAF3EA] shadow-inner transition-all focus-within:ring-2 focus-within:ring-[#00543B] focus-within:bg-white border border-[#EEE7DE]/40">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#3F4943]">
                      <span className="material-symbols-outlined text-[19px]">person_outline</span>
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      dir="ltr"
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="w-full bg-transparent border-0 rounded-2xl pr-11 pl-4 py-2.5 sm:py-3 text-[#1E1B16] text-[13px] text-right focus:ring-0 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Field 2: Password with Toggle Visibility */}
                <div className="space-y-1.5 text-right">
                  <label
                    className="block text-[12px] text-[#1E1B16] font-semibold pr-1"
                    htmlFor="password"
                  >
                    رمز عبور
                  </label>
                  <div className="relative rounded-2xl bg-[#FAF3EA] shadow-inner transition-all focus-within:ring-2 focus-within:ring-[#00543B] focus-within:bg-white border border-[#EEE7DE]/40">
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#3F4943]">
                      <span className="material-symbols-outlined text-[19px]">lock_outline</span>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      dir="ltr"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-transparent border-0 rounded-2xl pr-11 pl-11 py-2.5 sm:py-3 text-[#1E1B16] text-[13px] tracking-wider text-right focus:ring-0 focus:outline-none"
                    />
                    {/* Eye Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="نمایش یا پنهان کردن رمز عبور"
                      className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#6F7A73] hover:text-[#1E1B16] transition-colors active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[19px]">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Form Helper Row: Remember Me */}
                <div className="flex items-center justify-between pt-0.5 pb-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#0B6E4F] bg-[#FAF3EA] border-[#BEC9C1] focus:ring-[#0B6E4F] transition-colors cursor-pointer"
                    />
                    <span className="text-[11px] text-[#3F4943] font-medium">مرا به خاطر بسپار</span>
                  </label>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#0B6E4F] hover:bg-[#00543B] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-clay-button active:scale-[0.98] transition-all duration-200 mt-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <span>در حال بررسی مشخصات...</span>
                  ) : (
                    <>
                      <span>ورود به پنل مدیریت</span>
                      <span className="material-symbols-outlined text-[20px] transition-transform duration-200">
                        login
                      </span>
                    </>
                  )}
                </button>
              </form>
            </section>

            {/* 4. Security Note & Public Link Footer */}
            <section className="mt-5 flex flex-col items-center gap-2.5">
              {/* Encrypted Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF3EA] border border-[#EEE7DE] text-[#3F4943] shadow-inner text-[10.5px]">
                <span className="material-symbols-outlined text-[15px] text-[#00543B]">security</span>
                <span className="font-medium">ورود با نظارت امنیتی رمزنگاری‌شده انجام می‌شود</span>
              </div>

              {/* Switch to Customer Flow */}
              <div className="pt-1">
                <button
                  onClick={onBack}
                  className="group inline-flex items-center gap-1.5 text-[12px] font-bold text-[#3F4943] hover:text-[#00543B] transition-colors cursor-pointer"
                  type="button"
                >
                  <span>مشتری کافه هستید؟</span>
                  <span className="text-[#00543B] underline decoration-[#00543B]/40 underline-offset-4 group-hover:decoration-[#00543B]">
                    مشاهده منو و ثبت سفارش
                  </span>
                  <span className="material-symbols-outlined text-[15px] transition-transform group-hover:-translate-x-0.5">
                    arrow_back
                  </span>
                </button>
              </div>
            </section>
          </>
        ) : (
          /* Logged In Dashboard Placeholder Ready for Next Step */
          <div className="bg-white rounded-3xl p-6 shadow-clay-card border border-[#EEE7DE] text-center flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#0B6E4F]/10 text-[#00543B] flex items-center justify-center mb-3">
              <span className="material-symbols-outlined text-[36px]">verified_user</span>
            </div>
            <span className="text-[11px] font-bold bg-[#FAF3EA] text-[#0B6E4F] px-3 py-0.5 rounded-full mb-1.5">
              مدیر ارشد کافه
            </span>
            <h2 className="text-[20px] font-bold text-[#00543B] mb-1">
              خوش آمدید، میلاد خضری عزیز!
            </h2>
            <p className="text-[12px] text-[#6F7A73] mb-5 leading-relaxed max-w-xs">
              شما با موفقیت به پنل مدیریت کافه کاما وارد شدید. دسترسی کامل به منو، سفارشات فعال و حسابداری فعال است.
            </p>

            {/* Quick Status Stats Preview */}
            <div className="grid grid-cols-2 gap-2.5 w-full mb-3 text-right">
              <div className="bg-[#FAF3EA] p-3 rounded-2xl border border-[#EEE7DE]">
                <span className="text-[10px] text-[#6F7A73] block">محصولات منو و گردونه:</span>
                <span className="text-[17px] font-black text-[#00543B]">
                  {totalItemsCount.toLocaleString('fa-IR')} محصول
                </span>
              </div>
              <div className="bg-[#FAF3EA] p-3 rounded-2xl border border-[#EEE7DE]">
                <span className="text-[10px] text-[#6F7A73] block">دسته‌بندی‌های فعال:</span>
                <span className="text-[17px] font-black text-[#974724]">
                  {totalCategoriesCount.toLocaleString('fa-IR')} دسته
                </span>
              </div>
            </div>

            {/* Sync Status Banner */}
            <div className="w-full bg-[#0B6E4F]/10 border border-[#0B6E4F]/20 rounded-2xl p-2.5 mb-4 text-right flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00543B] text-[18px] shrink-0">
                sync
              </span>
              <span className="text-[11px] text-[#00543B] font-medium leading-relaxed">
                محصولات گردونه شانس و منو کاملاً هماهنگ هستند و با ویرایش آیتم‌ها به صورت خودکار بروزرسانی می‌شوند.
              </span>
            </div>

            <div className="flex flex-col gap-2.5 w-full">
              {/* 1. ویرایش گالری (Above Edit Items) */}
              <button
                onClick={() => setIsEditGalleryOpen(true)}
                className="w-full bg-white hover:bg-[#FAF3EA] text-[#5D4335] py-2.5 px-4 rounded-2xl font-bold text-[13px] border border-[#EEE7DE] shadow-clay-card flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer group"
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#974724]/10 text-[#974724] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">photo_library</span>
                  </div>
                  <span>ویرایش گالری</span>
                </div>
                <span className="material-symbols-outlined text-[#6F7A73] text-[18px] group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
              </button>

              {/* 2. ویرایش آیتم‌ها (Above Edit Categories) */}
              <button
                onClick={() => setIsEditItemsOpen(true)}
                className="w-full bg-white hover:bg-[#FAF3EA] text-[#5D4335] py-2.5 px-4 rounded-2xl font-bold text-[13px] border border-[#EEE7DE] shadow-clay-card flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer group"
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#0B6E4F]/10 text-[#0B6E4F] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">restaurant_menu</span>
                  </div>
                  <span>ویرایش آیتم‌ها</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#0B6E4F] font-bold bg-[#FAF3EA] px-2 py-0.5 rounded-full">
                    {totalItemsCount.toLocaleString('fa-IR')} آیتم
                  </span>
                  <span className="material-symbols-outlined text-[#6F7A73] text-[18px] group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                </div>
              </button>

              {/* 3. ویرایش دسته‌بندی‌ها (Directly above View Public Menu) */}
              <button
                onClick={() => setIsEditCategoriesOpen(true)}
                className="w-full bg-white hover:bg-[#FAF3EA] text-[#5D4335] py-2.5 px-4 rounded-2xl font-bold text-[13px] border border-[#EEE7DE] shadow-clay-card flex items-center justify-between transition-all active:scale-[0.99] cursor-pointer group"
                type="button"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#5D4335]/10 text-[#5D4335] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[19px]">category</span>
                  </div>
                  <span>ویرایش دسته‌بندی‌ها</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#5D4335] font-bold bg-[#FAF3EA] px-2 py-0.5 rounded-full">
                    {totalCategoriesCount.toLocaleString('fa-IR')} دسته
                  </span>
                  <span className="material-symbols-outlined text-[#6F7A73] text-[18px] group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                </div>
              </button>

              {/* 4. مشاهده منوی عمومی کافه */}
              <button
                onClick={onBack}
                className="w-full bg-[#0B6E4F] text-white py-3 rounded-full font-bold text-[13px] shadow-clay-button hover:bg-[#00543B] transition-all mt-1 cursor-pointer"
                type="button"
              >
                مشاهده منوی عمومی کافه
              </button>

              {/* 5. خروج از حساب مدیریت */}
              <button
                onClick={() => {
                  onLogout();
                  setPassword('');
                  setUsername('');
                }}
                className="w-full bg-[#FAF3EA] text-[#5D4335] py-2.5 rounded-full font-bold text-[12px] hover:bg-[#EEE7DE] transition-all cursor-pointer"
                type="button"
              >
                خروج از حساب مدیریت
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Admin Modals */}
      <EditCategoriesModal
        isOpen={isEditCategoriesOpen}
        onClose={() => setIsEditCategoriesOpen(false)}
        categories={categories}
        onSaveCategories={onSaveCategories}
        items={items}
      />

      <EditItemsModal
        isOpen={isEditItemsOpen}
        onClose={() => setIsEditItemsOpen(false)}
        items={items}
        categories={categories}
        onSaveItems={onSaveItems}
      />

      <EditGalleryModal
        isOpen={isEditGalleryOpen}
        onClose={() => setIsEditGalleryOpen(false)}
      />

      {/* Institutional Branding Footer */}
      <footer className="w-full py-2 text-center relative z-10 border-t border-[#EEE7DE]/60 mt-auto">
        <div className="flex items-center justify-center gap-2 text-[#3F4943]/70 text-[10.5px]">
          <span className="font-bold tracking-wider">Comma Cafe</span>
          <span>•</span>
          <span>سامانه یکپارچه سفارش‌گیری و باریستا v2.4</span>
        </div>
      </footer>
    </div>
  );
};

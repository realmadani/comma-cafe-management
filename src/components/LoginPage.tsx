import React, { useState } from 'react';

interface LoginPageProps {
  onBack: () => void;
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onBack, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Valid credentials according to user specification
      if (username.trim() === 'miladkhezri' && password === '1q2w3e4r5t6y') {
        setIsLoggedIn(true);
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        setErrorMessage('نام کاربری یا کلمه عبور وارد شده نادرست است.');
      }
    }, 600);
  };

  const fillDemoCredentials = () => {
    setUsername('miladkhezri');
    setPassword('1q2w3e4r5t6y');
    setErrorMessage('');
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

          {/* Help / Support Icon Button */}
          <button
            onClick={() => setShowHelpModal(true)}
            aria-label="راهنما و پشتیبانی"
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#3F4943] shadow-clay-card hover:bg-[#FAF3EA] transition-all duration-200 active:scale-95 border border-[#EEE7DE]"
            type="button"
          >
            <span className="material-symbols-outlined text-[19px]">help_outline</span>
          </button>
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
              <form onSubmit={handleSubmit} className="space-y-3.5">
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
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="مثال: admin یا barista_01"
                      required
                      className="w-full bg-transparent border-0 rounded-2xl pr-11 pl-4 py-2.5 sm:py-3 text-[#1E1B16] placeholder:text-[#BEC9C1] text-[13px] text-right focus:ring-0 focus:outline-none"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-transparent border-0 rounded-2xl pr-11 pl-11 py-2.5 sm:py-3 text-[#1E1B16] placeholder:text-[#BEC9C1] text-[13px] tracking-wider text-right focus:ring-0 focus:outline-none"
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

                {/* Form Helper Row: Remember Me & Forgot Password */}
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
                  <button
                    type="button"
                    onClick={() =>
                      alert('جهت بازیابی کلمه عبور با سرپرست فناوری یا مدیریت کافه کاما تماس حاصل فرمایید.')
                    }
                    className="text-[11px] font-semibold text-[#974724] hover:text-[#772F0D] transition-colors"
                  >
                    فراموشی رمز عبور؟
                  </button>
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

              {/* Quick Fill Helper for User Convenience */}
              <div className="mt-3 pt-3 border-t border-[#EEE7DE]/60 text-center">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-[11px] text-[#0B6E4F] hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span className="material-symbols-outlined text-[14px]">key</span>
                  <span>تکمیل خودکار اطلاعات ورود مدیر (miladkhezri)</span>
                </button>
              </div>
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
            <div className="grid grid-cols-2 gap-2.5 w-full mb-5 text-right">
              <div className="bg-[#FAF3EA] p-3 rounded-2xl border border-[#EEE7DE]">
                <span className="text-[10px] text-[#6F7A73] block">سفارشات در صف بار:</span>
                <span className="text-[18px] font-black text-[#00543B]">۴ سفارش</span>
              </div>
              <div className="bg-[#FAF3EA] p-3 rounded-2xl border border-[#EEE7DE]">
                <span className="text-[10px] text-[#6F7A73] block">میزهای پذیرش‌شده:</span>
                <span className="text-[18px] font-black text-[#974724]">۸ از ۱۲</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={onBack}
                className="w-full bg-[#0B6E4F] text-white py-3 rounded-full font-bold text-[13px] shadow-clay-button hover:bg-[#00543B] transition-all"
                type="button"
              >
                مشاهده منوی عمومی کافه
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setPassword('');
                }}
                className="w-full bg-[#FAF3EA] text-[#5D4335] py-2.5 rounded-full font-bold text-[12px] hover:bg-[#EEE7DE] transition-all"
                type="button"
              >
                خروج از حساب مدیریت
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Institutional Branding Footer */}
      <footer className="w-full py-2 text-center relative z-10 border-t border-[#EEE7DE]/60 mt-auto">
        <div className="flex items-center justify-center gap-2 text-[#3F4943]/70 text-[10.5px]">
          <span className="font-bold tracking-wider">Comma Cafe</span>
          <span>•</span>
          <span>سامانه یکپارچه سفارش‌گیری و باریستا v2.4</span>
        </div>
      </footer>

      {/* Help Modal */}
      {showHelpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="w-full max-w-[360px] bg-[#FFF8F1] rounded-3xl p-5 shadow-2xl border border-[#EEE7DE] text-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#EEE7DE] mb-3">
              <h4 className="text-[15px] font-bold text-[#5D4335]">راهنمای ورود همکاران</h4>
              <button
                onClick={() => setShowHelpModal(false)}
                className="w-7 h-7 rounded-full bg-white text-[#5D4335] flex items-center justify-center"
                type="button"
              >
                ✕
              </button>
            </div>
            <p className="text-[12px] text-[#3F4943] leading-relaxed mb-3">
              این بخش صرفاً برای پرسنل و مدیریت کافه کاما جهت دسترسی به تنظیمات قیمت‌گذاری و سفارشات تعریف شده است.
            </p>
            <div className="bg-white p-3 rounded-2xl border border-[#EEE7DE] text-[11px] text-[#5D4335] space-y-1">
              <div><strong>نام کاربری مدیر:</strong> miladkhezri</div>
              <div><strong>رمز عبور:</strong> 1q2w3e4r5t6y</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

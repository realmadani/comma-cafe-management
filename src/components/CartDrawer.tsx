import React, { useState } from 'react';
import { CartItem } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (orderInfo: {
    orderId: string;
    table: string;
    total: number;
    itemCount: number;
  }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [selectedTable, setSelectedTable] = useState('میز ۴');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number | null>(null);
  const [discountError, setDiscountError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = items.reduce((acc, current) => {
    let unit = current.item.price;
    if (current.options?.extraShot) unit += 25000;
    if (current.options?.milk?.includes('بادام') || current.options?.milk?.includes('جو دوسر')) {
      unit += 15000;
    }
    return acc + unit * current.quantity;
  }, 0);

  const discountAmount = appliedDiscount ? Math.round((subtotal * appliedDiscount) / 100) : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'COMMA') {
      setAppliedDiscount(15);
      setDiscountError('');
    } else if (discountCode.trim()) {
      setDiscountError('کد تخفیف معتبر نیست (کد تست: COMMA)');
      setAppliedDiscount(null);
    }
  };

  const handleSubmitOrder = () => {
    if (items.length === 0) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const randomOrderId = `#CMA-${Math.floor(100 + Math.random() * 900)}`;
      onOrderSuccess({
        orderId: randomOrderId,
        table: selectedTable,
        total: finalTotal,
        itemCount: items.reduce((sum, it) => sum + it.quantity, 0),
      });
      setIsSubmitting(false);
      onClearCart();
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] h-full bg-[#FFF8F1] shadow-2xl flex flex-col relative animate-in slide-in-from-left duration-300 border-r border-[#EEE7DE]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EEE7DE] flex items-center justify-between bg-white/70">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0B6E4F] text-[24px]">
              shopping_bag
            </span>
            <h3 className="text-[17px] font-bold text-[#5D4335]">
              سبد سفارش شما
            </h3>
            <span className="text-[12px] bg-[#FAF3EA] text-[#6F7A73] px-2 py-0.5 rounded-full font-medium">
              {items.reduce((s, i) => s + i.quantity, 0).toLocaleString('fa-IR')} آیتم
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#FAF3EA] text-[#5D4335] hover:bg-[#EEE7DE] flex items-center justify-center transition-colors"
            type="button"
            aria-label="بستن سبد"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF3EA] text-[#6F7A73] flex items-center justify-center mb-3">
                <span className="material-symbols-outlined text-[32px]">
                  remove_shopping_cart
                </span>
              </div>
              <h4 className="text-[15px] font-bold text-[#5D4335] mb-1">
                سبد سفارش شما خالی است
              </h4>
              <p className="text-[12px] text-[#6F7A73] max-w-xs mb-4">
                از بخش منو می‌توانید آیتم‌های دلخواهتان را با یک کلیک به سبد اضافه کنید.
              </p>
              <button
                onClick={onClose}
                className="bg-[#0B6E4F] text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-clay-button"
                type="button"
              >
                مشاهده منوی کافه
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex flex-col gap-2.5">
                {items.map((cartItem) => {
                  let itemPrice = cartItem.item.price;
                  if (cartItem.options?.extraShot) itemPrice += 25000;
                  if (cartItem.options?.milk?.includes('بادام') || cartItem.options?.milk?.includes('جو دوسر')) {
                    itemPrice += 15000;
                  }

                  return (
                    <div
                      key={cartItem.id}
                      className="bg-white rounded-2xl p-3 border border-[#EEE7DE] shadow-sm flex items-center gap-3"
                    >
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="text-[13px] font-bold text-[#5D4335] truncate">
                            {cartItem.item.name}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(cartItem.id)}
                            className="text-[#6F7A73] hover:text-red-600 transition-colors shrink-0"
                            title="حذف"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              delete
                            </span>
                          </button>
                        </div>

                        {/* Options summary */}
                        <div className="text-[10.5px] text-[#6F7A73] flex flex-wrap gap-1 my-0.5">
                          {cartItem.options?.milk && (
                            <span className="bg-[#FAF3EA] px-1.5 py-0.2 rounded">
                              {cartItem.options.milk}
                            </span>
                          )}
                          {cartItem.options?.sugar && (
                            <span className="bg-[#FAF3EA] px-1.5 py-0.2 rounded">
                              {cartItem.options.sugar}
                            </span>
                          )}
                          {cartItem.options?.extraShot && (
                            <span className="bg-[#FAF3EA] text-[#0B6E4F] px-1.5 py-0.2 rounded font-medium">
                              +شات اضافه
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[12.5px] font-bold text-[#1E1B16]">
                            {(itemPrice * cartItem.quantity).toLocaleString('fa-IR')} تومان
                          </span>

                          {/* Stepper */}
                          <div className="flex items-center bg-[#FAF3EA] rounded-lg p-0.5 border border-[#EEE7DE]">
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#5D4335] font-bold text-xs hover:bg-white"
                              type="button"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[12px] font-bold text-[#1E1B16]">
                              {cartItem.quantity.toLocaleString('fa-IR')}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(cartItem.id, cartItem.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-[#5D4335] font-bold text-xs hover:bg-white"
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Table Selector */}
              <div className="bg-white rounded-2xl p-3 border border-[#EEE7DE] flex flex-col gap-2 mt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#5D4335]">
                    محل سرو / شماره میز:
                  </span>
                  <span className="text-[11px] text-[#0B6E4F] font-bold">
                    {selectedTable}
                  </span>
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {['میز ۱', 'میز ۲', 'میز ۳', 'میز ۴', 'میز ۵', 'میز ۶', 'فضای باز', 'بیرون‌بر'].map(
                    (tbl) => (
                      <button
                        key={tbl}
                        type="button"
                        onClick={() => setSelectedTable(tbl)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] whitespace-nowrap shrink-0 border transition-all ${
                          selectedTable === tbl
                            ? 'bg-[#0B6E4F] text-white border-[#0B6E4F] font-bold shadow-sm'
                            : 'bg-[#FAF3EA] text-[#5D4335] border-[#EEE7DE] hover:bg-white'
                        }`}
                      >
                        {tbl}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Promo code */}
              <div className="bg-white rounded-2xl p-3 border border-[#EEE7DE] flex flex-col gap-1.5">
                <span className="text-[12px] font-bold text-[#5D4335]">
                  کد تخفیف کافه:
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="کد تخفیف (مثلا COMMA)"
                    className="flex-1 bg-[#FAF3EA] rounded-xl px-3 py-1.5 text-[12px] uppercase tracking-wider text-[#1E1B16] border border-[#EEE7DE] focus:outline-none focus:ring-1 focus:ring-[#0B6E4F]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyDiscount}
                    className="bg-[#5D4335] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl hover:bg-[#3D2C23] transition-colors"
                  >
                    اعمال
                  </button>
                </div>
                {appliedDiscount && (
                  <span className="text-[11px] text-[#0B6E4F] font-medium">
                    ✓ کد تخفیف {appliedDiscount}٪ با موفقیت اعمال شد!
                  </span>
                )}
                {discountError && (
                  <span className="text-[11px] text-red-600 font-medium">
                    {discountError}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Payment Summary */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#EEE7DE] flex flex-col gap-3 shadow-lg">
            <div className="flex flex-col gap-1.5 text-[12px]">
              <div className="flex items-center justify-between text-[#6F7A73]">
                <span>جمع کل اقلام:</span>
                <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {appliedDiscount && (
                <div className="flex items-center justify-between text-[#0B6E4F] font-medium">
                  <span>تخفیف ({appliedDiscount}٪):</span>
                  <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex items-center justify-between text-[#6F7A73]">
                <span>حق سرویس و مالیات:</span>
                <span className="text-[#0B6E4F] font-bold">رایگان (۰ تومان)</span>
              </div>
              <div className="flex items-center justify-between text-[#1E1B16] text-[15px] font-black pt-2 border-t border-[#EEE7DE]">
                <span>مبلغ قابل پرداخت:</span>
                <span>{finalTotal.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full bg-[#0B6E4F] text-white py-3 px-4 rounded-full font-bold text-[14px] shadow-clay-button hover:bg-[#00543B] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              type="button"
            >
              {isSubmitting ? (
                <span>در حال ارسال سفارش به باریستا...</span>
              ) : (
                <>
                  <span>ثبت نهایی سفارش ({selectedTable})</span>
                  <span className="material-symbols-outlined text-[18px]">
                    check_circle
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

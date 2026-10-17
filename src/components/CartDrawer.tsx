import React from 'react';
import { CartItem } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart?: () => void;
  onOrderSuccess?: (orderInfo: {
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
}) => {
  if (!isOpen) return null;

  // Calculate pricing
  const totalPayable = items.reduce((acc, current) => {
    let unit = current.item.price;
    if (current.options?.extraShot) unit += 25000;
    if (current.options?.milk?.includes('بادام') || current.options?.milk?.includes('جو دوسر')) {
      unit += 15000;
    }
    return acc + unit * current.quantity;
  }, 0);

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

            </>
          )}
        </div>

        {/* Footer Payment Summary & Barista Notification */}
        {items.length > 0 && (
          <div className="p-4 bg-white border-t border-[#EEE7DE] flex flex-col gap-3 shadow-lg">
            <div className="flex flex-col gap-2 text-[12px]">
              <div className="flex items-center justify-between text-[#6F7A73]">
                <span>جمع کل اقلام:</span>
                <span>{totalPayable.toLocaleString('fa-IR')} تومان</span>
              </div>
              <div className="flex items-center justify-between text-[#1E1B16] text-[15px] font-black pt-2 border-t border-[#EEE7DE]">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-[#0B6E4F] text-[16px] font-black">
                  {totalPayable.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Notification message instead of submit button */}
            <div className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-2xl py-3 px-4 flex items-center justify-center gap-2 text-[#5D4335] text-center shadow-sm">
              <span className="material-symbols-outlined text-[20px] text-[#0B6E4F] shrink-0">
                local_cafe
              </span>
              <span className="font-bold text-[13px] sm:text-[13.5px]">
                لطفا سفارشتون رو به باریستا اطلاع بدید
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

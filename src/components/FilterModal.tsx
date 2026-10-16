import React from 'react';

export interface FilterState {
  onlyVegetarian: boolean;
  onlySpecials: boolean;
  maxPrice: number;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onUpdateFilters: (filters: FilterState) => void;
  onResetFilters: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] bg-[#FFF8F1] rounded-[32px] p-5 sm:p-6 shadow-2xl flex flex-col relative border border-[#EEE7DE] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#EEE7DE] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0B6E4F] text-[22px]">
              tune
            </span>
            <h3 className="text-[17px] font-bold text-[#5D4335]">
              فیلترهای منو
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#5D4335] shadow-clay-card flex items-center justify-center hover:bg-[#FAF3EA]"
            type="button"
            aria-label="بستن"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 text-right">
          {/* Vegetarian toggle */}
          <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#EEE7DE]">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#5D4335]">
                منوی گیاه‌خواری و وگان 🌱
              </span>
              <span className="text-[11px] text-[#6F7A73]">
                نمایش اقلام بدون گوشت و مشتقات حیوانی
              </span>
            </div>
            <input
              type="checkbox"
              checked={filters.onlyVegetarian}
              onChange={(e) =>
                onUpdateFilters({ ...filters, onlyVegetarian: e.target.checked })
              }
              className="w-5 h-5 accent-[#0B6E4F] rounded cursor-pointer"
            />
          </div>

          {/* Special barista picks toggle */}
          <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-[#EEE7DE]">
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#5D4335]">
                فقط ویژه‌های باریستا و پرفروش‌ها ⭐
              </span>
              <span className="text-[11px] text-[#6F7A73]">
                محبوب‌ترین طعم‌های انتخاب شده
              </span>
            </div>
            <input
              type="checkbox"
              checked={filters.onlySpecials}
              onChange={(e) =>
                onUpdateFilters({ ...filters, onlySpecials: e.target.checked })
              }
              className="w-5 h-5 accent-[#0B6E4F] rounded cursor-pointer"
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2 p-3 bg-white rounded-2xl border border-[#EEE7DE]">
            <div className="flex justify-between items-center text-[12px] font-bold text-[#5D4335]">
              <span>حداکثر قیمت:</span>
              <span className="text-[#0B6E4F]">
                {filters.maxPrice.toLocaleString('fa-IR')} تومان
              </span>
            </div>
            <input
              type="range"
              min={60000}
              max={150000}
              step={5000}
              value={filters.maxPrice}
              onChange={(e) =>
                onUpdateFilters({ ...filters, maxPrice: Number(e.target.value) })
              }
              className="w-full accent-[#0B6E4F] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#6F7A73]">
              <span>۶۰,۰۰۰ تومان</span>
              <span>۱۵۰,۰۰۰ تومان</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-5">
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2.5 rounded-full border border-[#EEE7DE] text-[12px] font-bold text-[#5D4335] hover:bg-[#FAF3EA]"
          >
            پاک کردن همه
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#0B6E4F] text-white py-2.5 px-4 rounded-full font-bold text-[13px] shadow-clay-button hover:bg-[#00543B]"
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </div>
  );
};

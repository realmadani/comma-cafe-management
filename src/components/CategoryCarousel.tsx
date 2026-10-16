import React from 'react';
import { CATEGORIES, Category } from '../data/menuData';

interface CategoryCarouselProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-[17px] text-[#5D4335] font-bold">دسته‌بندی‌های منو</h3>
        <span className="text-[11px] text-[#6F7A73] font-medium">۵ گروه اصلی</span>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-0.5 -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isActive ? 'all' : cat.id)}
              className="flex flex-col items-center gap-2 min-w-[76px] group focus:outline-none cursor-pointer"
              type="button"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-white shadow-clay-card flex items-center justify-center p-2 relative transition-all duration-200 group-active:scale-95 ${
                  isActive
                    ? 'border-2 border-[#0B6E4F] shadow-md'
                    : 'border border-[#EEE7DE] hover:border-[#83D7B1]'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-11 h-11 object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                />
                {isActive && (
                  <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#0B6E4F]" />
                )}
              </div>
              <span
                className={`text-[12px] text-center leading-tight transition-colors ${
                  isActive ? 'text-[#00543B] font-bold' : 'text-[#5D4335] font-medium'
                }`}
              >
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

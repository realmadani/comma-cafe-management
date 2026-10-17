import React from 'react';
import { CATEGORIES, Category } from '../data/menuData';
import {
  SteamingCoffeeCupIcon,
  IcedDrinkWithCubesIcon,
  TriangleCakeSliceIcon,
  PlantLeafTeaIcon,
} from './CategoryIcons';

interface CategoryCarouselProps {
  categories?: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  categories = CATEGORIES,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const displayCategories = categories && categories.length > 0 ? categories : CATEGORIES;

  const renderCategoryIcon = (cat: Category, isActive: boolean) => {
    const iconKey = cat.icon || cat.id;

    switch (iconKey) {
      case 'hot-coffee':
      case 'coffee':
        return <SteamingCoffeeCupIcon isActive={isActive} className="w-5.5 h-5.5 sm:w-6 sm:h-6" />;
      case 'cold-drinks':
        return <IcedDrinkWithCubesIcon isActive={isActive} className="w-5.5 h-5.5 sm:w-6 sm:h-6" />;
      case 'cakes-desserts':
      case 'cakes':
        return <TriangleCakeSliceIcon isActive={isActive} className="w-5.5 h-5.5 sm:w-6 sm:h-6" />;
      case 'herbal-tea':
      case 'tea':
        return <PlantLeafTeaIcon isActive={isActive} className="w-5.5 h-5.5 sm:w-6 sm:h-6" />;
      case 'bakery':
        return (
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              isActive ? 'text-[#00543B]' : 'text-[#5D4335]'
            }`}
          >
            bakery_dining
          </span>
        );
      case 'food':
        return (
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              isActive ? 'text-[#00543B]' : 'text-[#5D4335]'
            }`}
          >
            restaurant
          </span>
        );
      case 'special':
        return (
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              isActive ? 'text-[#00543B]' : 'text-[#5D4335]'
            }`}
          >
            stars
          </span>
        );
      case 'icecream':
        return (
          <span
            className={`material-symbols-outlined text-[22px] sm:text-[24px] ${
              isActive ? 'text-[#00543B]' : 'text-[#5D4335]'
            }`}
          >
            icecream
          </span>
        );
      default:
        return <SteamingCoffeeCupIcon isActive={isActive} className="w-5.5 h-5.5 sm:w-6 sm:h-6" />;
    }
  };

  const isFourColumns = displayCategories.length === 4;

  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-[17px] text-[#5D4335] font-bold">دسته‌بندی‌های منو</h3>
        <span className="text-[11px] text-[#6F7A73] font-medium">
          {displayCategories.length.toLocaleString('fa-IR')} گروه اصلی
        </span>
      </div>

      {/* Dynamic Grid / Scrollable layout with guaranteed 1-line text */}
      <div
        className={
          isFourColumns
            ? 'grid grid-cols-4 gap-2 py-1 px-0.5'
            : 'flex gap-2.5 overflow-x-auto pb-1.5 no-scrollbar py-1 px-0.5'
        }
      >
        {displayCategories.map((cat) => {
          const isActive = selectedCategoryId === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isActive ? 'all' : cat.id)}
              className={`flex flex-col items-center gap-1.5 group focus:outline-none cursor-pointer ${
                isFourColumns ? 'min-w-0' : 'shrink-0 min-w-[72px] sm:min-w-[80px]'
              }`}
              type="button"
            >
              <div
                className={`w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-white shadow-clay-card flex items-center justify-center p-2 relative transition-all duration-200 group-active:scale-95 ${
                  isActive
                    ? 'border-2 border-[#0B6E4F] shadow-md bg-[#0B6E4F]/5'
                    : 'border border-[#EEE7DE] hover:border-[#83D7B1] hover:bg-[#FAF3EA]/40'
                }`}
              >
                {renderCategoryIcon(cat, isActive)}
                {isActive && (
                  <span className="absolute -bottom-1 w-2 h-2 rounded-full bg-[#0B6E4F]" />
                )}
              </div>
              <span
                className={`text-[11px] sm:text-[11.5px] text-center whitespace-nowrap leading-tight transition-colors ${
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

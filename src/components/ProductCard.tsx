import React, { useState } from 'react';
import { MenuItem } from '../data/menuData';

interface ProductCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onSelectProduct: (item: MenuItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onAddToCart,
  onSelectProduct,
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(item);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <article
      onClick={() => onSelectProduct(item)}
      className="bg-white rounded-[24px] p-3 shadow-clay-card border border-[#EEE7DE]/80 flex flex-col justify-between hover:shadow-clay-float transition-all duration-300 group cursor-pointer"
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#FAF3EA] mb-2.5">
        {item.badge && (
          <span
            className={`absolute top-2 right-2 z-10 text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm ${
              item.badgeColor || 'bg-[#974724] text-white'
            }`}
          >
            {item.badge}
          </span>
        )}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="flex-1">
        <h4 className="text-[14.5px] sm:text-[15px] font-bold text-[#5D4335] line-clamp-1 mb-0.5 group-hover:text-[#00543B] transition-colors">
          {item.name}
        </h4>
        <p className="text-[11px] text-[#6F7A73] line-clamp-1 mb-2 leading-relaxed">
          {item.subDescription}
        </p>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[#EEE7DE]/70 mt-1">
        <div className="flex flex-col text-right">
          <span className="text-[14.5px] sm:text-[15px] font-extrabold text-[#1E1B16] leading-none">
            {item.price.toLocaleString('fa-IR')}
          </span>
          <span className="text-[10px] text-[#6F7A73] mt-0.5">تومان</span>
        </div>

        <button
          onClick={handleAddClick}
          className={`w-9 h-9 rounded-full bg-[#0B6E4F] text-white shadow-clay-button flex items-center justify-center hover:bg-[#00543B] active:scale-90 transition-all cursor-pointer ${
            isAdding ? 'scale-110 bg-[#00543B]' : ''
          }`}
          title="افزودن به سفارش"
          type="button"
          aria-label={`افزودن ${item.name} به سفارش`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isAdding ? 'check' : 'add'}
          </span>
        </button>
      </div>
    </article>
  );
};

import React from 'react';

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onOpenFilter: () => void;
  activeFilterCount: number;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  onOpenFilter,
  activeFilterCount,
}) => {
  return (
    <section className="w-full">
      <div className="relative w-full flex items-center bg-white rounded-full px-4 py-2.5 sm:py-3 shadow-clay-card border border-[#EEE7DE] transition-all focus-within:ring-2 focus-within:ring-[#0B6E4F] focus-within:border-transparent">
        <span className="material-symbols-outlined text-[#5D4335]/70 text-[22px] ml-2 shrink-0">
          search
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="جستجوی نوشیدنی، دسر، قهوه تازه..."
          className="w-full bg-transparent border-none p-0 text-[#1E1B16] placeholder:text-[#6F7A73]/80 text-[13px] sm:text-[14px] font-medium focus:ring-0 focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="w-6 h-6 rounded-full bg-[#FAF3EA] text-[#6F7A73] hover:text-[#1E1B16] flex items-center justify-center mr-1 text-xs"
            type="button"
            title="پاک کردن جستجو"
          >
            ✕
          </button>
        )}
        <button
          onClick={onOpenFilter}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all mr-1 shrink-0 ${
            activeFilterCount > 0
              ? 'bg-[#0B6E4F] text-white shadow-sm'
              : 'bg-[#F4EDE4] text-[#6F7A73] hover:text-[#5D4335]'
          }`}
          type="button"
          title="فیلترهای منو"
          aria-label="فیلترهای منو"
        >
          <span className="material-symbols-outlined text-[17px]">tune</span>
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#974724] text-[9px] text-white font-bold flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>
    </section>
  );
};

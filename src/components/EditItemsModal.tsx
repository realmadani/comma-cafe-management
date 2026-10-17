import React, { useState } from 'react';
import { MenuItem, Category } from '../data/menuData';

interface EditItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  categories: Category[];
  onSaveItems: (newItems: MenuItem[]) => void;
}

// Preset popular cafe photos for quick picking
const PRESET_ITEM_IMAGES = [
  {
    name: 'اسپرسو و آمریکانو',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'لاته و کاپوچینو',
    url: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'آیس لاته و نوشیدنی سرد',
    url: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'ماکتیل و اسموتی ترش/خنک',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'کیک و دسر',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'چای و دمنوش گیاهی',
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80',
  },
  {
    name: 'کروسان و صبحانه',
    url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80',
  },
];

export const EditItemsModal: React.FC<EditItemsModalProps> = ({
  isOpen,
  onClose,
  items,
  categories,
  onSaveItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Deletion Confirmation state (replaces window.confirm)
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // Status feedback banner
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.id || 'hot-coffee',
    price: '',
    description: '',
    image: PRESET_ITEM_IMAGES[0].url,
  });

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCatFilter === 'all' || item.category === selectedCatFilter;
    return matchesSearch && matchesCategory;
  });

  const handleStartAdd = () => {
    setEditingItem(null);
    setItemToDelete(null);
    setFormData({
      name: '',
      category: categories[0]?.id || 'hot-coffee',
      price: '',
      description: '',
      image: PRESET_ITEM_IMAGES[0].url,
    });
    setIsAdding(true);
  };

  const handleStartEdit = (item: MenuItem) => {
    setIsAdding(false);
    setItemToDelete(null);
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: String(item.price),
      description: item.description,
      image: item.image,
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) return;

    const numPrice = Number(formData.price) || 0;

    if (editingItem) {
      // Edit existing
      const updated = items.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              name: formData.name.trim(),
              category: formData.category,
              price: numPrice,
              description: formData.description.trim() || it.description,
              image: formData.image.trim() || it.image,
            }
          : it
      );
      onSaveItems(updated);
      showFeedback(`آیتم «${formData.name.trim()}» با موفقیت ویرایش شد`);
      setEditingItem(null);
    } else {
      // Add new
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: formData.name.trim(),
        category: formData.category,
        price: numPrice,
        description: formData.description.trim() || 'تهیه‌شده از تازه‌ترین مواد اولیه کافه کاما',
        subDescription: 'سفارش تازه و فوری',
        image:
          formData.image.trim() || PRESET_ITEM_IMAGES[0].url,
        tags: ['منوی کاما'],
      };
      onSaveItems([newItem, ...items]);
      showFeedback(`آیتم جدید «${newItem.name}» با موفقیت به منو اضافه شد`);
      setIsAdding(false);
    }
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const { id, name } = itemToDelete;
    const updated = items.filter((it) => it.id !== id);
    onSaveItems(updated);
    setItemToDelete(null);
    showFeedback(`آیتم «${name}» با موفقیت از منو حذف شد`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFF8F1] w-full max-w-lg rounded-3xl p-5 shadow-clay-float border border-[#EEE7DE] flex flex-col max-h-[92vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEE7DE]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#0B6E4F]/10 text-[#0B6E4F] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            </div>
            <div>
              <h2 className="text-[15px] sm:text-[16px] font-bold text-[#5D4335]">
                مدیریت و ویرایش آیتم‌های منو
              </h2>
              <span className="text-[11px] text-[#6F7A73]">
                افزودن، ویرایش قیمت و مشخصات و حذف محصولات (هماهنگ با گردونه شانس)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6F7A73] hover:text-[#1E1B16] border border-[#EEE7DE] shadow-sm hover:scale-105 transition-all cursor-pointer"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Feedback message banner */}
        {feedbackMessage && (
          <div className="mt-3 py-2 px-3 bg-[#0B6E4F]/10 border border-[#0B6E4F]/30 rounded-xl text-[#00543B] text-[12px] font-bold flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Custom In-Modal Delete Confirmation (No window.confirm!) */}
        {itemToDelete && (
          <div className="my-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-right animate-in zoom-in-95 space-y-2.5">
            <div className="flex items-center gap-2 text-red-600 font-bold text-[13px]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <span>تأیید حذف آیتم</span>
            </div>
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-red-100">
              <img
                src={itemToDelete.image}
                alt={itemToDelete.name}
                className="w-11 h-11 rounded-lg object-cover"
              />
              <div>
                <span className="text-[13px] font-bold text-[#1E1B16] block">
                  {itemToDelete.name}
                </span>
                <span className="text-[11px] text-[#6F7A73]">
                  {itemToDelete.price.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>
            <p className="text-[12px] text-red-700">
              آیا از حذف دائم این آیتم از منو و گردونه شانس اطمینان دارید؟
            </p>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl text-[12px] font-bold hover:bg-red-700 shadow-sm transition-all"
              >
                بله، این آیتم حذف شود
              </button>
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
                className="px-4 bg-white border border-[#EEE7DE] text-[#6F7A73] py-2 rounded-xl text-[12px] font-medium hover:bg-[#FAF3EA] transition-all"
              >
                انصراف
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 no-scrollbar">
          {/* Add or Edit Form */}
          {(isAdding || editingItem) ? (
            <form
              onSubmit={handleSaveForm}
              className="bg-white p-4 rounded-2xl border-2 border-[#0B6E4F]/30 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between pb-1 border-b border-[#EEE7DE]">
                <h3 className="text-[13px] font-bold text-[#00543B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">
                    {editingItem ? 'edit' : 'add_circle'}
                  </span>
                  <span>{editingItem ? `ویرایش «${editingItem.name}»` : 'افزودن آیتم جدید به منو'}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingItem(null);
                  }}
                  className="text-[11px] text-[#6F7A73] hover:text-red-500"
                >
                  انصراف
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                    نام محصول
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="مثال: لاته فندقی کاراملی"
                    className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                    قیمت (تومان)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="مثال: 95000"
                    className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                    دسته‌بندی
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                    لینک تصویر دلخواه (اختیاری)
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
                  />
                </div>
              </div>

              {/* Quick image picker presets */}
              <div>
                <label className="block text-[11px] font-bold text-[#5D4335] mb-1.5">
                  یا انتخاب سریع عکس باکیفیت:
                </label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {PRESET_ITEM_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`flex items-center gap-1.5 p-1 rounded-xl border text-[10.5px] shrink-0 transition-all ${
                        formData.image === preset.url
                          ? 'border-[#0B6E4F] bg-[#0B6E4F]/10 text-[#00543B] font-bold shadow-sm'
                          : 'border-[#EEE7DE] bg-[#FAF3EA]/40 text-[#6F7A73] hover:border-[#83D7B1]'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.name}
                        className="w-6 h-6 rounded-lg object-cover"
                      />
                      <span>{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                  توضیحات آیتم
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  placeholder="ترکیبات، میزان غلظت و ویژگی‌های خاص محصول..."
                  className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#0B6E4F] text-white py-2 rounded-xl font-bold text-[12.5px] shadow-sm hover:bg-[#00543B] transition-all cursor-pointer"
                >
                  {editingItem ? 'ذخیره تغییرات آیتم' : 'افزودن به منوی کافه'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setEditingItem(null);
                  }}
                  className="bg-[#FAF3EA] text-[#6F7A73] px-4 py-2 rounded-xl text-[12px] hover:bg-[#EEE7DE]"
                >
                  انصراف
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={handleStartAdd}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#0B6E4F]/10 text-[#00543B] font-bold text-[12.5px] flex items-center justify-center gap-1.5 hover:bg-[#0B6E4F]/15 transition-all border border-[#0B6E4F]/20 cursor-pointer shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">add_circle</span>
              <span>افزودن آیتم جدید به منو</span>
            </button>
          )}

          {/* Search & Category Filter Bar */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجو بر اساس نام یا توضیحات آیتم..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#EEE7DE] rounded-xl pr-9 pl-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
              />
              <span className="material-symbols-outlined absolute right-2.5 top-2.5 text-[#6F7A73] text-[18px]">
                search
              </span>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              <button
                type="button"
                onClick={() => setSelectedCatFilter('all')}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-all ${
                  selectedCatFilter === 'all'
                    ? 'bg-[#0B6E4F] text-white shadow-sm'
                    : 'bg-white text-[#6F7A73] border border-[#EEE7DE]'
                }`}
              >
                همه ({items.length.toLocaleString('fa-IR')})
              </button>
              {categories.map((c) => {
                const count = items.filter((it) => it.category === c.id).length;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCatFilter(c.id)}
                    className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-all ${
                      selectedCatFilter === c.id
                        ? 'bg-[#0B6E4F] text-white shadow-sm'
                        : 'bg-white text-[#6F7A73] border border-[#EEE7DE]'
                    }`}
                  >
                    {c.name} ({count.toLocaleString('fa-IR')})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-2">
            {filteredItems.length === 0 ? (
              <div className="text-center py-6 text-[#6F7A73] text-[12.5px] bg-white rounded-2xl border border-dashed border-[#EEE7DE]">
                آیتمی با این مشخصات یافت نشد
              </div>
            ) : (
              filteredItems.map((item) => {
                const catObj = categories.find((c) => c.id === item.category);
                return (
                  <div
                    key={item.id}
                    className="bg-white p-2.5 rounded-2xl border border-[#EEE7DE] shadow-clay-card flex items-center justify-between gap-2.5 transition-all hover:border-[#83D7B1]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#EEE7DE] shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[13px] font-bold text-[#1E1B16] block truncate">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[11.5px] font-black text-[#0B6E4F]">
                            {item.price.toLocaleString('fa-IR')} تومان
                          </span>
                          <span className="text-[10px] bg-[#FAF3EA] text-[#6F7A73] px-2 py-0.5 rounded-full truncate">
                            {catObj?.name || item.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="w-8 h-8 rounded-xl bg-[#FAF3EA] text-[#5D4335] hover:bg-[#0B6E4F] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                        type="button"
                        title="ویرایش آیتم"
                      >
                        <span className="material-symbols-outlined text-[17px]">edit</span>
                      </button>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="w-8 h-8 rounded-xl bg-[#FAF3EA] text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                        type="button"
                        title="حذف آیتم"
                      >
                        <span className="material-symbols-outlined text-[17px]">delete</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#EEE7DE] flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#6F7A73]">
            تغییرات به صورت خودکار روی منو و گردونه شانس اعمال می‌شود
          </span>
          <button
            onClick={onClose}
            className="bg-[#5D4335] hover:bg-[#443025] text-white px-5 py-2.5 rounded-xl font-bold text-[13px] shadow-sm transition-all cursor-pointer"
            type="button"
          >
            تکمیل و بستن
          </button>
        </div>
      </div>
    </div>
  );
};

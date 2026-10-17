import React, { useState } from 'react';
import { Category, MenuItem } from '../data/menuData';

interface EditCategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSaveCategories: (newCategories: Category[]) => void;
  items: MenuItem[];
}

export const CATEGORY_ICON_PRESETS = [
  { id: 'coffee', label: 'فنجان قهوه', icon: 'local_cafe' },
  { id: 'cold-drinks', label: 'نوشیدنی خنک', icon: 'local_bar' },
  { id: 'cakes', label: 'کیک و دسر', icon: 'cake' },
  { id: 'tea', label: 'دمنوش و گیاهی', icon: 'spa' },
  { id: 'bakery', label: 'شیرینی و نان', icon: 'bakery_dining' },
  { id: 'food', label: 'میان‌وعده و غذا', icon: 'restaurant' },
  { id: 'special', label: 'ویژه باریستا', icon: 'stars' },
  { id: 'icecream', label: 'بستنی و شیک', icon: 'icecream' },
];

export const EditCategoriesModal: React.FC<EditCategoriesModalProps> = ({
  isOpen,
  onClose,
  categories,
  onSaveCategories,
  items,
}) => {
  // Editing state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('coffee');

  // Adding state
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('coffee');

  // Deletion Confirmation state (replaces window.confirm)
  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
    itemCount: number;
  } | null>(null);

  // Status message
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleStartEdit = (cat: Category) => {
    setEditingCategory(cat);
    setEditName(cat.name);
    setEditIcon(cat.icon || 'coffee');
    setIsAdding(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editName.trim()) return;

    const updated = categories.map((c) =>
      c.id === editingCategory.id
        ? { ...c, name: editName.trim(), icon: editIcon }
        : c
    );
    onSaveCategories(updated);
    setEditingCategory(null);
    setEditName('');
    showFeedback(`دسته‌بندی «${editName.trim()}» با موفقیت بروزرسانی شد`);
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newId = `cat-${Date.now()}`;
    const newCat: Category = {
      id: newId,
      name: newCatName.trim(),
      count: 0,
      image: '',
      icon: newCatIcon,
    };

    onSaveCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatIcon('coffee');
    setIsAdding(false);
    showFeedback(`دسته‌بندی جدید «${newCat.name}» با موفقیت افزوده شد`);
  };

  const handleConfirmDelete = () => {
    if (!categoryToDelete) return;
    const { id, name } = categoryToDelete;
    const updated = categories.filter((c) => c.id !== id);
    onSaveCategories(updated);
    setCategoryToDelete(null);
    showFeedback(`دسته‌بندی «${name}» با موفقیت حذف شد`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFF8F1] w-full max-w-lg rounded-3xl p-5 shadow-clay-float border border-[#EEE7DE] flex flex-col max-h-[90vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEE7DE]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#5D4335]/10 text-[#5D4335] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">category</span>
            </div>
            <div>
              <h2 className="text-[15px] sm:text-[16px] font-bold text-[#5D4335]">
                مدیریت و ویرایش دسته‌بندی‌ها
              </h2>
              <span className="text-[11px] text-[#6F7A73]">
                امکان افزودن، ویرایش نام و آیکون و حذف دسته‌ها
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

        {/* In-Modal Delete Confirmation Dialog (No window.confirm!) */}
        {categoryToDelete && (
          <div className="my-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-right animate-in zoom-in-95 space-y-2.5">
            <div className="flex items-center gap-2 text-red-600 font-bold text-[13px]">
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <span>تأیید حذف دسته‌بندی «{categoryToDelete.name}»</span>
            </div>
            {categoryToDelete.itemCount > 0 ? (
              <p className="text-[12px] text-red-700 leading-relaxed">
                این دسته‌بندی در حال حاضر دارای{' '}
                <strong className="underline">
                  {categoryToDelete.itemCount.toLocaleString('fa-IR')} محصول
                </strong>{' '}
                است. با حذف آن، محصولات از منو پنهان نمی‌شوند اما دسته‌بندی آن‌ها حذف خواهد شد.
              </p>
            ) : (
              <p className="text-[12px] text-red-700">
                آیا از حذف این دسته‌بندی اطمینان دارید؟
              </p>
            )}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-xl text-[12px] font-bold hover:bg-red-700 shadow-sm transition-all"
              >
                بله، دسته‌بندی حذف شود
              </button>
              <button
                type="button"
                onClick={() => setCategoryToDelete(null)}
                className="px-4 bg-white border border-[#EEE7DE] text-[#6F7A73] py-2 rounded-xl text-[12px] font-medium hover:bg-[#FAF3EA] transition-all"
              >
                انصراف
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3 no-scrollbar">
          {/* Add Category Form/Button */}
          {isAdding ? (
            <form
              onSubmit={handleAddCategory}
              className="bg-white p-4 rounded-2xl border-2 border-[#0B6E4F]/30 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#00543B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">add_circle</span>
                  <span>افزودن دسته‌بندی جدید</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-[11px] text-[#6F7A73] hover:text-red-500"
                >
                  انصراف
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                  نام دسته‌بندی
                </label>
                <input
                  type="text"
                  placeholder="مثال: شیک و اسموتی، صبحانه، برانچ..."
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  autoFocus
                  required
                  className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[13px] text-[#1E1B16] focus:ring-2 focus:ring-[#0B6E4F] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                  انتخاب آیکون دسته‌بندی
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {CATEGORY_ICON_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setNewCatIcon(preset.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[10.5px] transition-all ${
                        newCatIcon === preset.id
                          ? 'border-[#0B6E4F] bg-[#0B6E4F]/10 text-[#00543B] font-bold shadow-sm'
                          : 'border-[#EEE7DE] bg-[#FAF3EA]/40 text-[#6F7A73] hover:border-[#83D7B1]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {preset.icon}
                      </span>
                      <span className="truncate w-full text-center">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#0B6E4F] hover:bg-[#00543B] text-white py-2 rounded-xl font-bold text-[12.5px] shadow-sm transition-all"
                >
                  ذخیره و ایجاد دسته‌بندی
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAdding(false);
                    setNewCatName('');
                  }}
                  className="bg-[#FAF3EA] text-[#6F7A73] px-3.5 py-2 rounded-xl text-[12px] hover:bg-[#EEE7DE]"
                >
                  انصراف
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => {
                setIsAdding(true);
                setEditingCategory(null);
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#0B6E4F]/10 text-[#00543B] font-bold text-[12.5px] flex items-center justify-center gap-1.5 hover:bg-[#0B6E4F]/15 transition-all border border-[#0B6E4F]/20 cursor-pointer shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[19px]">add_circle</span>
              <span>افزودن دسته‌بندی جدید به منو</span>
            </button>
          )}

          {/* Edit Form */}
          {editingCategory && (
            <form
              onSubmit={handleSaveEdit}
              className="bg-white p-4 rounded-2xl border-2 border-[#974724]/40 shadow-sm space-y-3 animate-in fade-in"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#974724] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[17px]">edit</span>
                  <span>ویرایش دسته‌بندی «{editingCategory.name}»</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="text-[11px] text-[#6F7A73] hover:text-red-500"
                >
                  انصراف
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                  نام دسته‌بندی
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  autoFocus
                  required
                  className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[13px] text-[#1E1B16] focus:ring-2 focus:ring-[#974724] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#5D4335] mb-1">
                  آیکون دسته‌بندی
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {CATEGORY_ICON_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setEditIcon(preset.id)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[10.5px] transition-all ${
                        editIcon === preset.id
                          ? 'border-[#974724] bg-[#974724]/10 text-[#974724] font-bold shadow-sm'
                          : 'border-[#EEE7DE] bg-[#FAF3EA]/40 text-[#6F7A73] hover:border-[#974724]/40'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {preset.icon}
                      </span>
                      <span className="truncate w-full text-center">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#974724] hover:bg-[#7F3819] text-white py-2 rounded-xl font-bold text-[12px] shadow-sm transition-all"
                >
                  ذخیره تغییرات دسته‌بندی
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="bg-[#FAF3EA] text-[#6F7A73] px-3.5 py-2 rounded-xl text-[12px]"
                >
                  انصراف
                </button>
              </div>
            </form>
          )}

          {/* Categories List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-[12px] font-bold text-[#5D4335]">
                لیست دسته‌بندی‌های فعال ({categories.length.toLocaleString('fa-IR')})
              </span>
              <span className="text-[11px] text-[#6F7A73]">
                {items.length.toLocaleString('fa-IR')} محصول کل
              </span>
            </div>

            {categories.map((cat) => {
              const itemCount = items.filter((item) => item.category === cat.id).length;
              const matchingPreset = CATEGORY_ICON_PRESETS.find(
                (p) => p.id === (cat.icon || cat.id)
              );

              return (
                <div
                  key={cat.id}
                  className="bg-white p-3 rounded-2xl border border-[#EEE7DE] shadow-clay-card flex items-center justify-between gap-2.5 transition-all hover:border-[#83D7B1]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF3EA] text-[#5D4335] flex items-center justify-center font-bold border border-[#EEE7DE]">
                      <span className="material-symbols-outlined text-[19px]">
                        {matchingPreset?.icon || 'category'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[13.5px] font-bold text-[#1E1B16] block">
                        {cat.name}
                      </span>
                      <span className="text-[11px] text-[#0B6E4F] font-bold">
                        {itemCount.toLocaleString('fa-IR')} محصول ثبت‌شده
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleStartEdit(cat)}
                      className="w-8 h-8 rounded-xl bg-[#FAF3EA] text-[#5D4335] hover:bg-[#0B6E4F] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      type="button"
                      title="ویرایش دسته‌بندی"
                    >
                      <span className="material-symbols-outlined text-[17px]">edit</span>
                    </button>
                    <button
                      onClick={() =>
                        setCategoryToDelete({
                          id: cat.id,
                          name: cat.name,
                          itemCount,
                        })
                      }
                      className="w-8 h-8 rounded-xl bg-[#FAF3EA] text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                      type="button"
                      title="حذف دسته‌بندی"
                    >
                      <span className="material-symbols-outlined text-[17px]">delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#EEE7DE] flex items-center justify-between gap-3">
          <span className="text-[11px] text-[#6F7A73]">
            تغییرات فوراً در صفحه اصلی منو اعمال می‌شود
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

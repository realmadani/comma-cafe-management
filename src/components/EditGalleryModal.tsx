import React, { useState } from 'react';

export interface GalleryMediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  subtitle: string;
  image: string;
  category: 'interior' | 'coffee' | 'pastry' | 'video';
}

const DEFAULT_GALLERY_ITEMS: GalleryMediaItem[] = [
  {
    id: 'media-1',
    type: 'video',
    title: 'ریزش لاته آرت قو',
    subtitle: 'هنر باریستای ارشد کاما',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDME-w56jp0Ijxx-jxIBHFpl9k-vz_LF_qE7BetoD22hUhCWi1mIk9M9r-SPR4tw0RK5VkBj3kpzAHwcpfF4kGBpQb-rkVa3PK_87hHGGvm3mc8_8tWFnneapmVHA7wb1TXK35bZb9aFx6Yg52GeUJk9EtMMu0FmsGjxfbywZ3U9BPaonOai_tjdbs5HAWI_97acx5qHOAk5YbYsQWfCXARVEw1NlkNdjrSMYcxXBkR15iCRgPQxCa0',
    category: 'video',
  },
  {
    id: 'media-2',
    type: 'photo',
    title: 'گوشه دنج کتاب‌خوانی',
    subtitle: 'میز شماره ۴ در نور بعدازظهر',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAu4jyc2A6qIElJ4K3sE4i6oMWtUcr7EDYXFkZlb3iB3Vcz3WVwOlD_PABgOVpgp7m2e4niypV6ty8OHN2oA33abSHHPB2m_piNbWK74XgQBs_m4cXtoU9G0HdumOgbv-kN7KyzKRpxH4PxCSKq9BfSpS127b4GVu0F9NTA_R7JNcKN8k-T0sffr27PtPGuLpx-AcxAsb6jRKlChLXK9mGetQLOjzBvb-TKgXs9Sl8nYd0EPRHndoxB',
    category: 'interior',
  },
  {
    id: 'media-3',
    type: 'photo',
    title: 'چیزکیک باسک و کرافِل',
    subtitle: 'تازه از فر قنادی کاما',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDgdkss8es9xmAPkG_G0Y-bGSCHKG4KNrILzgpmllnSpKLOziGQnKDvEMe4u6nKX_3IN_9iVfXzjSvzjFYRBBcvn0MMCCsHjp6ulvuxrectf7P9qoFVrc-49KlaJMT26LSD2D2kPV7Ds4s5rG55TcLCrM9XFmIerNIAWc_bez738db8MIuuNkzNFbROSrLt_Yg-eecFABW_6Zz23228JkAjzJVqdiSfZiiM-rBhrpNjTqddGjz_Gnur',
    category: 'pastry',
  },
  {
    id: 'media-4',
    type: 'video',
    title: 'فرآیند برشته‌کاری',
    subtitle: 'دانه‌های تک خاستگاه کلمبیا',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDs7612RHpsHmpvUdkp8yytJkNnU3ofRJhzJEJ4I7vl-ZVZZPSw2ZvrvtjqnYrEJhlSsWRhmvSBoiQ9qD8iT4_p03op1UKg7m2Kn3iQne4gjzbBLk_ddCCB1Ts4IcIk6JaofNFRtNbXK7I86GjlG05N-jnnsdyGSJ7nlXUYgJ6ovjfAYv8DOZr8FoPi0AiiRLzQRLUDZ6VndTIgzle5Ji-f5xhCTFSNkxePzHfJWXqLchT8JRA8oWxb',
    category: 'coffee',
  },
];

interface EditGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditGalleryModal: React.FC<EditGalleryModalProps> = ({ isOpen, onClose }) => {
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('comma_gallery_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return DEFAULT_GALLERY_ITEMS;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: '',
    type: 'photo' as 'photo' | 'video',
    category: 'interior' as 'interior' | 'coffee' | 'pastry' | 'video',
  });

  if (!isOpen) return null;

  const saveToStorage = (items: GalleryMediaItem[]) => {
    setGalleryItems(items);
    try {
      localStorage.setItem('comma_gallery_items', JSON.stringify(items));
    } catch {}
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) return;

    const newItem: GalleryMediaItem = {
      id: `media-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim() || 'عکس ارسالی کافه کاما',
      image: formData.image.trim(),
      type: formData.type,
      category: formData.category,
    };

    saveToStorage([newItem, ...galleryItems]);
    setFormData({
      title: '',
      subtitle: '',
      image: '',
      type: 'photo',
      category: 'interior',
    });
    setIsAdding(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`آیا از حذف عکس «${title}» از گالری اطمینان دارید؟`)) return;
    const updated = galleryItems.filter((item) => item.id !== id);
    saveToStorage(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FFF8F1] w-full max-w-md rounded-3xl p-5 shadow-clay-float border border-[#EEE7DE] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EEE7DE]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#974724]/10 text-[#974724] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">photo_library</span>
            </div>
            <h2 className="text-[16px] font-bold text-[#5D4335]">مدیریت و ویرایش گالری</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6F7A73] hover:text-[#1E1B16] border border-[#EEE7DE] shadow-sm"
            type="button"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-3">
          {/* Add media form */}
          {isAdding ? (
            <form
              onSubmit={handleAddMedia}
              className="bg-white p-3.5 rounded-2xl border border-[#974724]/30 shadow-sm space-y-2.5"
            >
              <h3 className="text-[12.5px] font-bold text-[#974724]">افزودن تصویر یا ویدیوی جدید</h3>
              <input
                type="text"
                placeholder="عنوان (مثال: گوشه دنج بعدازظهر)"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#974724] focus:outline-none"
              />
              <input
                type="text"
                placeholder="توضیح کوتاه یا زیرنویس"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#974724] focus:outline-none"
              />
              <input
                type="url"
                placeholder="آدرس اینترنتی تصویر (URL)"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                className="w-full bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12.5px] text-[#1E1B16] focus:ring-2 focus:ring-[#974724] focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12px] text-[#1E1B16]"
                >
                  <option value="interior">فضای داخلی</option>
                  <option value="coffee">قهوه و باریستا</option>
                  <option value="pastry">شیرینی و دسر</option>
                  <option value="video">ویدیو و لایو</option>
                </select>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="bg-[#FAF3EA] border border-[#EEE7DE] rounded-xl px-3 py-2 text-[12px] text-[#1E1B16]"
                >
                  <option value="photo">عکس</option>
                  <option value="video">ویدیو</option>
                </select>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 bg-[#974724] text-white py-1.5 rounded-xl font-bold text-[12px] shadow-sm"
                >
                  ثبت در گالری
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="bg-[#FAF3EA] text-[#6F7A73] px-3 py-1.5 rounded-xl text-[12px]"
                >
                  انصراف
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full py-2.5 px-3 rounded-2xl bg-[#974724]/10 text-[#974724] font-bold text-[12.5px] flex items-center justify-center gap-1.5 hover:bg-[#974724]/15 transition-all border border-[#974724]/20 cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
              <span>افزودن عکس یا ویدیو به گالری</span>
            </button>
          )}

          {/* List */}
          <div className="space-y-2">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-2.5 rounded-2xl border border-[#EEE7DE] shadow-clay-card flex items-center justify-between gap-2.5"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-xl object-cover border border-[#EEE7DE] shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[12.5px] font-bold text-[#1E1B16] block truncate">
                      {item.title}
                    </span>
                    <span className="text-[11px] text-[#6F7A73] block truncate">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="w-8 h-8 rounded-xl bg-[#FAF3EA] text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all shrink-0"
                  type="button"
                  title="حذف از گالری"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#EEE7DE]">
          <button
            onClick={onClose}
            className="w-full bg-[#5D4335] text-white py-2.5 rounded-xl font-bold text-[13px] shadow-sm"
            type="button"
          >
            بستن و ذخیره
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GALLERY_PHOTOS = [
  {
    title: 'دستگاه اسپرسو لامارزوکو و بار تخصصی',
    caption: 'عصاره‌گیری دقیق با دانه‌های برشته‌کاری اختصاصی کافه کاما',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsimcCmW1Nib9ZO8CJ0i4LkRNRUYRvsazkOdI81YJj97W7vVgcuFIXh-xv86fc-nnbD8_Lam56Sck6WSzElaWhBt4soFGcMrb3e-qYwMHz-20_LsYuVohrn8BeTvX_60Hqb5O9EcvjLB1qHMY1rGEFz9HgfOWFk9CE1zvRvyDtoaYbYn5HhUEeP3TRvXBF27YOcbsCNRLZa1F2PXHwITNd0vxbBmHx0_8jeSH45GhT082WwYcVx5fE',
  },
  {
    title: 'فضای آرامش‌بخش و نشیمن دنج',
    caption: 'نور طبیعی صبحگاهی و گوشه‌ای دنج برای مطالعه و گفتگو',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_nnuDeHfiedMatqh_hvYbPkiJslET-oCkZo5L50r4atbWvFES-OuLjiZpYov3CL0yfb706D8vYM6gXwDyrw6J5Xlk8L2x5CQaig3NvBaDodMCXSncu7U4qa3i6YVBocE_PH-8kF4mYIIGLBuoPMQGdHM0OblvnmPQKa1q51Euqbi9ggyauHN0M15TSuJ7Zm_-auDlc1OsRd54U3lNx2tW8uqRbFat1xMQ5EbxuZEke2O8_Anv9vMm',
  },
  {
    title: 'بار ماچا و نوشیدنی‌های ارگانیک',
    caption: 'تهیه ماچای سنتی کیوتو با وسک بامبو',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo4b1lfnrmnNLtsOKOXma3uiQ260zAAwX8n8TeA7JZJrHVisHtQfku41QUeKVpAgIjEJoFTjUjPcoG08s7Syjfqhgc_o3LjvdYE2lSyNlp5s5QXJaouwqwDPqh2CyoksqWNsVoJ8p7ayaFvoMnixjD9RI9Yl5IKqrVsSyuDBMxGvGfdExsEqYZDi8A-Hj4YGQ8M1YXKlD0nQDCsajHW1fIqd3_x-ajnZuWH7Ojqm4jtS1GzeGoWhQ-',
  },
  {
    title: 'شیرینی‌پزی و دسرهای روزانه',
    caption: 'پخت تازه کروسان‌های فرانسوی و چیزکیک‌های لوتوس',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yZgEcSYXmIepb54S2o3wQKe49btvgAFz9buHMdN2FyW_i4r4jpwQvVct0gNi4ypSw_S7j5Zubai5LPZIxe7Yf5K25toyjgAie6juwHB0drnZtQtmCzxaxalNkg_8rKHkjb3kh6sVri_LEGqcepNTtTwKI8yR9IBbjdP_NGQQj1MmcNOv84FtUgChuTN_7-tl8HJPpV37w3hvCG9ind9XEAGbU9wCApqaKOXKJVy4D8JY5EcmCQMH',
  },
];

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] max-h-[85vh] bg-[#FFF8F1] rounded-[32px] p-5 sm:p-6 shadow-2xl flex flex-col relative border border-[#EEE7DE] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#EEE7DE] mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0B6E4F] text-[22px]">
              photo_camera
            </span>
            <h3 className="text-[17px] font-bold text-[#5D4335]">
              گالری و فضای کافه کاما
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

        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-4">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-[#EEE7DE] shadow-sm group"
            >
              <div className="w-full h-48 overflow-hidden bg-[#FAF3EA]">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-right">
                <h4 className="text-[14px] font-bold text-[#5D4335] mb-1">
                  {photo.title}
                </h4>
                <p className="text-[11px] text-[#6F7A73]">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

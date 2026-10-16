export interface MenuItem {
  id: string;
  name: string;
  category: 'hot-coffee' | 'cold-drinks' | 'cakes-desserts' | 'herbal-tea' | 'breakfast-snacks';
  price: number;
  description: string;
  subDescription: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  prepTime?: string;
  calories?: number;
  isVegetarian?: boolean;
  isSpecial?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  options?: {
    milk?: boolean;
    sugar?: boolean;
    shot?: boolean;
    ice?: boolean;
  };
}

export interface Category {
  id: 'all' | 'hot-coffee' | 'cold-drinks' | 'cakes-desserts' | 'herbal-tea' | 'breakfast-snacks';
  name: string;
  count: number;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'hot-coffee',
    name: 'اسپرسو و گرم',
    count: 14,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKxeQR_VZH0IFfOJVMP0Wm8GKuL9icfmpr9o6jb3WKcoxy9bJ3JT0FeqN_pdVWqGhGBqSDdELStp1vhSj2GZT4mrFlRL9510CdzQ5RpYHFndt76sYczmksRH3qAZfRDdq_8uj5nOTMq3zPjntYS_hE5pasTlKB4eFjsWWTDS-lXsGhT9ZAKfZHGxPQpSIfPOdd42PPrrwUFj3sc3bbYawByRjHgw7AnzbdLSeOSGeeNK9Jb3jBjjo',
  },
  {
    id: 'cold-drinks',
    name: 'نوشیدنی سرد',
    count: 11,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBg3BmQdqNq6GNb_9zpB6_OKGuCYbwGpFoftNGDl57EAXo3KvZYVtYi4wPvKZn2QcHdD6dvfAtMhz0_bgJZPNGIs7YK3GuBY14ND4Mio6hYcLvVV1DmmwY-5oigHCCF_lapn3RzGLbvezE2OXZfTmjvGJDZoFiOuG5pkRO1H4QU1-bhGlsI2ZY6hPOp9zsul-Bb3AvFJWiwj9JWmAALqRwLjTpFRxmTLkt51Bv9rDZ4UXnS0fzzxxq',
  },
  {
    id: 'cakes-desserts',
    name: 'کیک و دسر',
    count: 8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv7-uHvbcoidONDE2Yf9wB8BezOGEUGfLBLJFLjp9I5RtAexRYUJGAFfyzW9BTMUbiFo01vg15-WCoBXRHiSyE0FoWQSRu_ZgnQwZVkVLQwF_q74mTvnp8ngZLpB2B9QsRoKOfewIyqajgyRoP--8iBpAJBoj9k2qJ6ySoq6SgAEyrGtlXJcGw_oqlUJ_aBKvee6rkQ9i-ZFWGouEEbPvQmCD6pc2wBV4JLQVFo9oPAsy2y6dqi0MG',
  },
  {
    id: 'herbal-tea',
    name: 'دمنوش و چای',
    count: 7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzZhYPsY88eeZsCmsnnL3RyQh_Qtc81EqdTO4IC3oTEi_u_4ri2tzzR93S1_Ftf_v26e0BYk5TJwwiuDPYmnZdLQY8QgdkD6AkbrVIWBhuNwaofAy3mBT91BOupRD4-Czn_kUd1hv3Z2p0rAf1z5z4_dja6G5arq44EzbRPQC4F-vIAxfy4wqk0JFmxEF40JuQ6SoZek_Z1KjTZydU3-GYHXYt5BWrgH36cYb6CKY9_fKKCYkZkKqr',
  },
  {
    id: 'breakfast-snacks',
    name: 'صبحانه و اسنک',
    count: 9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEVmodm9CtH2kAkmze9WPEOzO6zyT-ffy8MJuNUvTzhYjDcULnk8rSftaDJSYJZ6CWZZnHoppLKv3nT_6T_1yR1edSGDU1yqLBRTnHzY_7wRlHBDNwszey_1VH0vT86RNcxNyH4ZfvZ_WuPK8Ua7kzJOFopjTe8BY4AgZqPiNdpczSSIS0Ba8BcsxEJAxIc85Ox5vstg6HIUM8ASxToOuGzRKz01hXKYjy5P00bD4hwsv22YdZLo7c',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'espresso-double',
    name: 'اسپرسو دوبل تخصصی',
    category: 'hot-coffee',
    price: 75000,
    description: 'سینگل اوریجین ۱۰۰٪ عربیکا کلمبیا با اسیدیته زنده، آرومای میوه‌ای و کرمای فندقی ضخیم',
    subDescription: 'سینگل اوریجین ۱۰۰٪ عربیکا کلمبیا',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsimcCmW1Nib9ZO8CJ0i4LkRNRUYRvsazkOdI81YJj97W7vVgcuFIXh-xv86fc-nnbD8_Lam56Sck6WSzElaWhBt4soFGcMrb3e-qYwMHz-20_LsYuVohrn8BeTvX_60Hqb5O9EcvjLB1qHMY1rGEFz9HgfOWFk9CE1zvRvyDtoaYbYn5HhUEeP3TRvXBF27YOcbsCNRLZa1F2PXHwITNd0vxbBmHx0_8jeSH45GhT082WwYcVx5fE',
    badge: 'ویژه باریستا',
    badgeColor: 'bg-secondary text-on-secondary',
    prepTime: '۵ دقیقه',
    calories: 5,
    isSpecial: true,
    tags: ['اسپرسو', 'قهوه تخصصی', 'کلمبیا'],
    options: { shot: true, sugar: true },
  },
  {
    id: 'lotus-cheesecake',
    name: 'چیزکیک لوتوس و کارامل',
    category: 'cakes-desserts',
    price: 120000,
    description: 'کیک پنیری لوتوس با کراست بیسکویت کره بلژیکی، لایه‌ای از پنیر ماسکارپونه و سس کارامل شور دست‌ساز',
    subDescription: 'پای کراست بیسکویت و پنیر خامه‌ای',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9yZgEcSYXmIepb54S2o3wQKe49btvgAFz9buHMdN2FyW_i4r4jpwQvVct0gNi4ypSw_S7j5Zubai5LPZIxe7Yf5K25toyjgAie6juwHB0drnZtQtmCzxaxalNkg_8rKHkjb3kh6sVri_LEGqcepNTtTwKI8yR9IBbjdP_NGQQj1MmcNOv84FtUgChuTN_7-tl8HJPpV37w3hvCG9ind9XEAGbU9wCApqaKOXKJVy4D8JY5EcmCQMH',
    prepTime: 'آماده سرو',
    calories: 380,
    isVegetarian: true,
    tags: ['چیزکیک', 'لوتوس', 'دسر تازه'],
  },
  {
    id: 'iced-matcha-latte',
    name: 'ماچا لاته سرد ویژه',
    category: 'cold-drinks',
    price: 95000,
    description: 'پودر ماچای تشریفاتی گرید Uji کیوتو، همزده با وسک سنتی بامبو، همراه با شیر بادام تازه و یخ کریستالی',
    subDescription: 'ماچا تشریفاتی اصل کیوتو و شیر بادام',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo4b1lfnrmnNLtsOKOXma3uiQ260zAAwX8n8TeA7JZJrHVisHtQfku41QUeKVpAgIjEJoFTjUjPcoG08s7Syjfqhgc_o3LjvdYE2lSyNlp5s5QXJaouwqwDPqh2CyoksqWNsVoJ8p7ayaFvoMnixjD9RI9Yl5IKqrVsSyuDBMxGvGfdExsEqYZDi8A-Hj4YGQ8M1YXKlD0nQDCsajHW1fIqd3_x-ajnZuWH7Ojqm4jtS1GzeGoWhQ-',
    badge: 'پرفروش',
    badgeColor: 'bg-primary text-on-primary',
    prepTime: '۶ دقیقه',
    calories: 140,
    isVegetarian: true,
    isBestSeller: true,
    tags: ['ماچا', 'نوشیدنی سرد', 'آنتی‌اکسیدان', 'گیاهی'],
    options: { milk: true, sugar: true, ice: true },
  },
  {
    id: 'pepino-bacon-egg',
    name: 'پپینو بیکن و تخم‌مرغ',
    category: 'breakfast-snacks',
    price: 110000,
    description: 'نان بریوش دست‌پخت روز، بیکن گوشت دودی گوساله، اسکرمبل تخم‌مرغ نرم خامه‌ای و سس دیپ چدار مخصوص کافه کاما',
    subDescription: 'نان بریوش برشته، دیپ چدار و تخم‌مرغ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTm01BAz_GT0wHJbEpJtbD8q3bB4xrE2fReL4T6WPMtP0PWZ0zNqXYcFXhbH1qbELD1bOHFTH3ExslmEyCbBzD_9vk4gtBlleMoz9j-bHsP5zaWap8lnWqznU8rmQXJd5g9jQqelmMxaaIQlEPxDi7OpAwRwCvcRZrkRpDKhg5nQotj5K0_OlAsXxMKhqrEaFbrthbkBgAwvDpXLHHB5LJNEePlCVVUY7BQV27vUf9nv7Ou_poVV3C',
    prepTime: '۱۲ دقیقه',
    calories: 490,
    tags: ['صبحانه', 'اسنک گرم', 'بیکن'],
  },
  {
    id: 'flat-white-colombia',
    name: 'فلت وایت کاما',
    category: 'hot-coffee',
    price: 85000,
    description: 'ریسترتو دوبل غلیظ با شیر بخاردیده و لایه ابریشمی میکروفوم مخملی بدون حباب',
    subDescription: 'ریسترتو دوبل با بافت مخملی شیر',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_nnuDeHfiedMatqh_hvYbPkiJslET-oCkZo5L50r4atbWvFES-OuLjiZpYov3CL0yfb706D8vYM6gXwDyrw6J5Xlk8L2x5CQaig3NvBaDodMCXSncu7U4qa3i6YVBocE_PH-8kF4mYIIGLBuoPMQGdHM0OblvnmPQKa1q51Euqbi9ggyauHN0M15TSuJ7Zm_-auDlc1OsRd54U3lNx2tW8uqRbFat1xMQ5EbxuZEke2O8_Anv9vMm',
    badge: 'پیشنهاد روز',
    badgeColor: 'bg-[#5D4335] text-white',
    prepTime: '۵ دقیقه',
    calories: 120,
    isSpecial: true,
    tags: ['قهوه دمی', 'فلت وایت', 'شیر'],
    options: { milk: true, shot: true, sugar: true },
  },
  {
    id: 'v60-ethiopia',
    name: 'قهوه دمی V60 اتیوپی',
    category: 'hot-coffee',
    price: 92000,
    description: 'قهوه دمی فیلتری با دانه‌های زیرو ایرگاچف، اسیدیته شفاف لیمویی، عطر یاس و پایان کاراملی',
    subDescription: 'دمی تخصصی با نت‌های میوه‌ای و گلی',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKxeQR_VZH0IFfOJVMP0Wm8GKuL9icfmpr9o6jb3WKcoxy9bJ3JT0FeqN_pdVWqGhGBqSDdELStp1vhSj2GZT4mrFlRL9510CdzQ5RpYHFndt76sYczmksRH3qAZfRDdq_8uj5nOTMq3zPjntYS_hE5pasTlKB4eFjsWWTDS-lXsGhT9ZAKfZHGxPQpSIfPOdd42PPrrwUFj3sc3bbYawByRjHgw7AnzbdLSeOSGeeNK9Jb3jBjjo',
    prepTime: '۸ دقیقه',
    calories: 2,
    tags: ['دمی تخصصی', 'V60', 'عربیکا'],
  },
  {
    id: 'iced-passion-fruit',
    name: 'موکتل پشن‌فروت و لیمو',
    category: 'cold-drinks',
    price: 88000,
    description: 'پوره خالص پشن‌فروت استوایی، نعناع ارگانیک، آب لیموترش تازه و سودای گازدار خنک',
    subDescription: 'میوه‌های استوایی و نعناع با سودا',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBg3BmQdqNq6GNb_9zpB6_OKGuCYbwGpFoftNGDl57EAXo3KvZYVtYi4wPvKZn2QcHdD6dvfAtMhz0_bgJZPNGIs7YK3GuBY14ND4Mio6hYcLvVV1DmmwY-5oigHCCF_lapn3RzGLbvezE2OXZfTmjvGJDZoFiOuG5pkRO1H4QU1-bhGlsI2ZY6hPOp9zsul-Bb3AvFJWiwj9JWmAALqRwLjTpFRxmTLkt51Bv9rDZ4UXnS0fzzxxq',
    badge: 'خنک و باطراوت',
    badgeColor: 'bg-secondary text-on-secondary',
    prepTime: '۵ دقیقه',
    calories: 95,
    isVegetarian: true,
    tags: ['سرد', 'موکتل', 'بدون شکر افزوده'],
    options: { ice: true, sugar: true },
  },
  {
    id: 'saffron-herbal-tea',
    name: 'دمنوش آرامش زعفرانی',
    category: 'herbal-tea',
    price: 68000,
    description: 'ترکیب اعلای زعفران سرگل قائنات، گل‌گاوزبان، سنبل‌الطیب، به‌لیمو و لیمو امانی در قوری شیشه‌ای',
    subDescription: 'زعفران سرگل، به‌لیمو و گل‌گاوزبان',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzZhYPsY88eeZsCmsnnL3RyQh_Qtc81EqdTO4IC3oTEi_u_4ri2tzzR93S1_Ftf_v26e0BYk5TJwwiuDPYmnZdLQY8QgdkD6AkbrVIWBhuNwaofAy3mBT91BOupRD4-Czn_kUd1hv3Z2p0rAf1z5z4_dja6G5arq44EzbRPQC4F-vIAxfy4wqk0JFmxEF40JuQ6SoZek_Z1KjTZydU3-GYHXYt5BWrgH36cYb6CKY9_fKKCYkZkKqr',
    prepTime: '۷ دقیقه',
    calories: 10,
    isVegetarian: true,
    tags: ['دمنوش', 'سنتی', 'آرامش‌بخش'],
  },
  {
    id: 'almond-croissant',
    name: 'کروسان بادام فرانسوی',
    category: 'cakes-desserts',
    price: 85000,
    description: 'خمیر هزارلای کره‌ای فرانسوی پر شده با کرم فرانجی‌پان بادام، تزیین شده با خلال بادام تست‌شده',
    subDescription: 'خمیر کره‌ای ترد با مغز کرم بادام',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv7-uHvbcoidONDE2Yf9wB8BezOGEUGfLBLJFLjp9I5RtAexRYUJGAFfyzW9BTMUbiFo01vg15-WCoBXRHiSyE0FoWQSRu_ZgnQwZVkVLQwF_q74mTvnp8ngZLpB2B9QsRoKOfewIyqajgyRoP--8iBpAJBoj9k2qJ6ySoq6SgAEyrGtlXJcGw_oqlUJ_aBKvee6rkQ9i-ZFWGouEEbPvQmCD6pc2wBV4JLQVFo9oPAsy2y6dqi0MG',
    badge: 'پخت تازه',
    badgeColor: 'bg-primary text-on-primary',
    prepTime: 'آماده سرو',
    calories: 340,
    isVegetarian: true,
    tags: ['شیرینی', 'کروسان', 'بادام'],
  },
  {
    id: 'avocado-sour-toast',
    name: 'تست آووکادو و تخم‌مرغ پوچد',
    category: 'breakfast-snacks',
    price: 135000,
    description: 'نان ترش سنتی سنگین، پوره آووکادوی تازه هاس با روغن زیتون فرابکر، دانه چیا، فلفل پرک و تخم‌مرغ پوچد آبدار',
    subDescription: 'نان ساوردو، آووکادو و تخم‌مرغ عسلی',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEVmodm9CtH2kAkmze9WPEOzO6zyT-ffy8MJuNUvTzhYjDcULnk8rSftaDJSYJZ6CWZZnHoppLKv3nT_6T_1yR1edSGDU1yqLBRTnHzY_7wRlHBDNwszey_1VH0vT86RNcxNyH4ZfvZ_WuPK8Ua7kzJOFopjTe8BY4AgZqPiNdpczSSIS0Ba8BcsxEJAxIc85Ox5vstg6HIUM8ASxToOuGzRKz01hXKYjy5P00bD4hwsv22YdZLo7c',
    prepTime: '۱۰ دقیقه',
    calories: 410,
    isVegetarian: true,
    tags: ['صبحانه سالم', 'آووکادو', 'ساوردو'],
  },
];

export interface CartItem {
  id: string;
  item: MenuItem;
  quantity: number;
  options?: {
    milk?: string;
    sugar?: string;
    extraShot?: boolean;
    notes?: string;
  };
}

export interface BannerSlide {
  id: number;
  tag: string;
  title1: string;
  title2: string;
  description: string;
  ctaText: string;
  image: string;
}

export const HERO_SLIDES: BannerSlide[] = [
  {
    id: 1,
    tag: 'پیشنهاد باریستای کاما',
    title1: 'اصالت طعم قهوه،',
    title2: 'لحظه‌ای آرامش',
    description: 'دانه‌های دست‌چین عربیکا با روستی دقیق، همراه با کروسان داغ فرانسوی',
    ctaText: 'مشاهده پیشنهادات کاما',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_nnuDeHfiedMatqh_hvYbPkiJslET-oCkZo5L50r4atbWvFES-OuLjiZpYov3CL0yfb706D8vYM6gXwDyrw6J5Xlk8L2x5CQaig3NvBaDodMCXSncu7U4qa3i6YVBocE_PH-8kF4mYIIGLBuoPMQGdHM0OblvnmPQKa1q51Euqbi9ggyauHN0M15TSuJ7Zm_-auDlc1OsRd54U3lNx2tW8uqRbFat1xMQ5EbxuZEke2O8_Anv9vMm',
  },
  {
    id: 2,
    tag: 'کمبوی ویژه صبحگاهی',
    title1: 'صبح پرانرژی با',
    title2: 'لاته و کروسان داغ',
    description: 'ترکیب شیر ابریشمی با اسپرسو تازه برشته‌شده به همراه کروسان تازه از فر درآمده',
    ctaText: 'سفارش صبحانه ویژه',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv7-uHvbcoidONDE2Yf9wB8BezOGEUGfLBLJFLjp9I5RtAexRYUJGAFfyzW9BTMUbiFo01vg15-WCoBXRHiSyE0FoWQSRu_ZgnQwZVkVLQwF_q74mTvnp8ngZLpB2B9QsRoKOfewIyqajgyRoP--8iBpAJBoj9k2qJ6ySoq6SgAEyrGtlXJcGw_oqlUJ_aBKvee6rkQ9i-ZFWGouEEbPvQmCD6pc2wBV4JLQVFo9oPAsy2y6dqi0MG',
  },
  {
    id: 3,
    tag: 'طعم خنک بهار و تابستان',
    title1: 'موکتل‌های بار سرد،',
    title2: 'انرژی خالص و طراوت',
    description: 'عصاره خالص میوه‌های استوایی به همراه نعناع تازه و تکه‌های یخ بلوری',
    ctaText: 'مشاهده منوی سرد',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBg3BmQdqNq6GNb_9zpB6_OKGuCYbwGpFoftNGDl57EAXo3KvZYVtYi4wPvKZn2QcHdD6dvfAtMhz0_bgJZPNGIs7YK3GuBY14ND4Mio6hYcLvVV1DmmwY-5oigHCCF_lapn3RzGLbvezE2OXZfTmjvGJDZoFiOuG5pkRO1H4QU1-bhGlsI2ZY6hPOp9zsul-Bb3AvFJWiwj9JWmAALqRwLjTpFRxmTLkt51Bv9rDZ4UXnS0fzzxxq',
  },
];

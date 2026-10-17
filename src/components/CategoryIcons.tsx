import React from 'react';

interface IconProps {
  className?: string;
  isActive?: boolean;
}

// ۱. نوشیدنی‌های گرم: فنجان قهوه با بخار
export const SteamingCoffeeCupIcon: React.FC<IconProps> = ({
  className = 'w-7 h-7',
  isActive = false,
}) => {
  const strokeColor = isActive ? '#00543B' : '#5D4335';
  const fillColor = isActive ? '#0B6E4F' : '#5D4335';
  const steamColor = isActive ? '#056C4D' : '#974724';

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Steaming waves */}
      <path
        d="M10 6C9.5 4.5 10.5 3.5 10 2"
        stroke={steamColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M14.5 6.5C14 4.8 15.2 3.8 14.5 2"
        stroke={steamColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19 6C18.5 4.5 19.5 3.5 19 2"
        stroke={steamColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Coffee Cup Body */}
      <path
        d="M6 10H23C23 10 23 19 14.5 19C6 19 6 10 6 10Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? 'rgba(11, 110, 79, 0.12)' : 'none'}
      />

      {/* Coffee level inside */}
      <path
        d="M7.5 12H21.5"
        stroke={fillColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />

      {/* Cup Handle */}
      <path
        d="M23 11.5C25.5 11.5 27 13 27 15C27 17.5 25 18 22.5 18"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Saucer / Plate */}
      <path
        d="M4 23H25"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ۲. نوشیدنی‌های سرد: لیوان با تکه‌های یخ مربعی داخلش
export const IcedDrinkWithCubesIcon: React.FC<IconProps> = ({
  className = 'w-7 h-7',
  isActive = false,
}) => {
  const strokeColor = isActive ? '#00543B' : '#5D4335';
  const iceColor = isActive ? '#056C4D' : '#974724';

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Straw */}
      <path
        d="M19 3L23 2M19 3L14 16"
        stroke={isActive ? '#974724' : '#974724'}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Glass Body */}
      <path
        d="M8 8L10 26C10.2 27.2 11.2 28 12.5 28H19.5C20.8 28 21.8 27.2 22 26L24 8H8Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? 'rgba(11, 110, 79, 0.12)' : 'none'}
      />

      {/* Glass Rim Top */}
      <ellipse
        cx="16"
        cy="8"
        rx="8"
        ry="2"
        stroke={strokeColor}
        strokeWidth="1.8"
      />

      {/* Ice Cube 1 (Square / Isometric box) */}
      <rect
        x="11"
        y="12"
        width="4.5"
        height="4.5"
        rx="1"
        transform="rotate(-8 11 12)"
        stroke={iceColor}
        strokeWidth="1.5"
        fill={isActive ? 'rgba(159, 244, 204, 0.4)' : 'rgba(255, 181, 152, 0.3)'}
      />

      {/* Ice Cube 2 (Square box below) */}
      <rect
        x="16"
        y="16.5"
        width="4.5"
        height="4.5"
        rx="1"
        transform="rotate(12 16 16.5)"
        stroke={iceColor}
        strokeWidth="1.5"
        fill={isActive ? 'rgba(159, 244, 204, 0.4)' : 'rgba(255, 181, 152, 0.3)'}
      />

      {/* Liquid Wave Line */}
      <path
        d="M9.5 19C11.5 18 13.5 20 16 19C18.5 18 20.5 19.5 22.5 19"
        stroke={strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 1.5"
      />
    </svg>
  );
};

// ۳. کیک و دسر: یه اسلایس مثلثی کیک
export const TriangleCakeSliceIcon: React.FC<IconProps> = ({
  className = 'w-7 h-7',
  isActive = false,
}) => {
  const strokeColor = isActive ? '#00543B' : '#5D4335';
  const creamColor = isActive ? '#056C4D' : '#974724';

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Berry on top */}
      <circle
        cx="11"
        cy="8.5"
        r="2"
        fill={isActive ? '#0B6E4F' : '#974724'}
      />

      {/* Cake Top Triangle Surface */}
      <path
        d="M6 13L24 9L27 16L9 20L6 13Z"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={isActive ? 'rgba(11, 110, 79, 0.15)' : 'none'}
      />

      {/* Cake Side Front Facet */}
      <path
        d="M9 20L27 16V22L9 26V20Z"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={isActive ? 'rgba(11, 110, 79, 0.08)' : 'none'}
      />

      {/* Cake Back Cut Side Facet */}
      <path
        d="M6 13V19L9 26V20L6 13Z"
        stroke={strokeColor}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Middle Filling/Cream Layer */}
      <path
        d="M7.5 16.5L9 23L27 19"
        stroke={creamColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

// ۴. دمنوش و چای: برگ گیاه
export const PlantLeafTeaIcon: React.FC<IconProps> = ({
  className = 'w-7 h-7',
  isActive = false,
}) => {
  const strokeColor = isActive ? '#00543B' : '#5D4335';
  const veinColor = isActive ? '#0B6E4F' : '#6F7A73';

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main Botanical Leaf Body */}
      <path
        d="M7 26C7 26 8 16 16 10C24 4 27 5 27 5C27 5 26 13 20 20C14 27 7 26 7 26Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isActive ? 'rgba(11, 110, 79, 0.16)' : 'none'}
      />

      {/* Central Leaf Vein */}
      <path
        d="M7 26C11 22 17 17 25 7"
        stroke={veinColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Side Secondary Veins */}
      <path
        d="M13 18C15 16 18 16.5 20 18"
        stroke={veinColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M17 13.5C19 12 21 12.5 23 13"
        stroke={veinColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M10 22C11 20 13 21 14 22"
        stroke={veinColor}
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* Small drop / dew on leaf */}
      <circle
        cx="19"
        cy="9"
        r="1"
        fill={isActive ? '#00543B' : '#974724'}
      />
    </svg>
  );
};

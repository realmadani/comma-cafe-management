import React, { useState, useEffect } from 'react';

export const LiveDateTime: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [dateStr, setDateStr] = useState<string>('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      try {
        const timeFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          timeZone: 'Asia/Tehran',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTimeStr(timeFormatter.format(now));

        const dateFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
          timeZone: 'Asia/Tehran',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const parts = dateFormatter.formatToParts(now);
        const year = parts.find((p) => p.type === 'year')?.value.trim() || '';
        const month = parts.find((p) => p.type === 'month')?.value.trim() || '';
        const day = parts.find((p) => p.type === 'day')?.value.trim() || '';
        
        setDateStr(`${year}/${month}/${day}`);
      } catch {
        const tf = new Intl.DateTimeFormat('fa-IR', {
          timeZone: 'Asia/Tehran',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setTimeStr(tf.format(now));
        setDateStr('۱۴۰۵/مهر/۲۵');
      }
    };

    updateDateTime();
    const intervalId = window.setInterval(updateDateTime, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (!timeStr && !dateStr) return null;

  return (
    <div className="flex items-center justify-between px-2 pt-0.5 text-[#5D4335] text-[12px] sm:text-[13px] font-medium select-none">
      {/* Shamsi Date */}
      <div className="flex items-center gap-1.5">
        <span className="material-symbols-outlined text-[#0B6E4F] text-[16px] shrink-0">
          calendar_today
        </span>
        <span className="text-[#3E342B] font-semibold">{dateStr}</span>
      </div>

      {/* Live Clock */}
      <div className="flex items-center gap-1.5 font-mono text-[12.5px] sm:text-[13.5px]">
        <span className="material-symbols-outlined text-[#974724] text-[16px] shrink-0">
          schedule
        </span>
        <span className="text-[#1E1B16] font-bold tracking-wider">{timeStr}</span>
      </div>
    </div>
  );
};

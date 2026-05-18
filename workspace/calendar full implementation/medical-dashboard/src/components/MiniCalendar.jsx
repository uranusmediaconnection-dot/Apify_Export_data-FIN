import React, { useMemo } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay 
} from 'date-fns';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const MiniCalendar = () => {
  const currentDate = new Date(); // Simplified for now
  
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between px-2 mb-3">
        <span className="text-sm font-medium text-[#3c4043] dark:text-[#e8eaed]">
          {format(currentDate, 'MMMM yyyy')}
        </span>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <CaretLeft size={14} weight="bold" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <CaretRight size={14} weight="bold" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 text-center mb-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <span key={i} className="text-[10px] font-medium text-gray-500">{d}</span>
        ))}
      </div>
      
      <div className="grid grid-cols-7 text-center gap-y-1">
        {days.map((day, i) => {
          const isToday = isSameDay(day, new Date());
          const isCurrMonth = isSameMonth(day, currentDate);
          
          return (
            <div 
              key={i}
              className={`text-[10px] w-6 h-6 flex items-center justify-center rounded-full mx-auto cursor-pointer transition-colors ${
                isToday ? 'bg-accent-blue text-white' : 
                isCurrMonth ? 'text-[#3c4043] dark:text-[#e8eaed] hover:bg-gray-100 dark:hover:bg-white/5' : 'text-gray-300'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;

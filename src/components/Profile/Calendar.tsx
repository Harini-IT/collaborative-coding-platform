import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
type Props ={importantDates:any}
const Calendar:React.FC<Props> = ({ importantDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const daysInMonth = (year:number, month:number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (year:number, month:number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const days = Array.from({ length: daysInMonth(currentYear, currentMonth) }, (_, index) => index + 1);

  const renderCalendar = () => {
    const firstDay = firstDayOfMonth(currentYear, currentMonth);
    const blankDays = Array.from({ length: firstDay }, (_, index) => index);

    return (
      <div className="grid grid-cols-7 gap-1 rounded-lg p-4 bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <motion.div
          key={day}
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }} 
          className="text-center text-xs text-gray-500 font-medium"
      >
          {day}
      </motion.div>
        ))}
        {blankDays.map(() => (
          <div key={Math.random()} />
        ))}
        {days.map(day => {
          const currentDateStr = formatDate(new Date(currentYear, currentMonth, day));
          const isImportant = importantDates.includes(currentDateStr);
          const isCurrentDate = day === currentDate.getDate() && currentMonth === currentDate.getMonth();

          return (
            <div
              key={day}
              className={`text-center text-sm font-medium py-1 ${
                isImportant ? 'bg-yellow-300 text-gray-800' : isCurrentDate ? 'bg-blue-500 text-white' : ''
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-lg pt-3">
      <h1 className='font-bold text-2xl py-3 text-white'>Your Calendar</h1>
      <h2 className="font-semibold mb-4">
        {monthNames[currentMonth]} {currentYear}
      </h2>
      {renderCalendar()}
    </div>
  );
};

export default Calendar;

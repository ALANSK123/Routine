import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          {getGreeting()}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {format(time, 'EEEE, MMMM do, yyyy')}
        </p>
      </div>
      <div className="mt-4 md:mt-0 text-center md:text-right">
        <div className="text-4xl font-light tabular-nums tracking-tight">
          {format(time, 'hh:mm:ss a')}
        </div>
      </div>
    </div>
  );
};

export default Clock;

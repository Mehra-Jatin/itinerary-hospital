import React from 'react';

const NotificationCount = ({ count }) => {
  if (count === 0) return null;

  const displayCount = count > 99 ? '99+' : count;
  const isSmall = count === 1;

  return (
    <div className={`
      flex items-center justify-center
      ${isSmall ? 'w-2 h-2' : 'w-5 h-5'}
      rounded-full bg-red-500 text-white text-xs font-bold
    `}>
      {!isSmall && displayCount}
    </div>
  );
};

export default NotificationCount;


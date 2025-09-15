import React from 'react';

const Loading = ({ size = 'medium', fullScreen = false, text = '加载中...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-3',
    large: 'w-12 h-12 border-4'
  };

  const textSizeClasses = {
    small: 'text-xs mt-1',
    medium: 'text-sm mt-2',
    large: 'text-base mt-3'
  };

  const spinner = (
    <div className={`${sizeClasses[size]} rounded-full border-pink-200 border-t-pink-500 animate-spin`}></div>
  );

  const loadingContent = (
    <div className="flex flex-col items-center">
      {spinner}
      {text && <p className={`${textSizeClasses[size]} text-gray-500 animate-pulse`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        {loadingContent}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4">
      {loadingContent}
    </div>
  );
};

export default Loading;
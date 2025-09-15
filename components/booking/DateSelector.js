import { useState } from 'react'

export default function DateSelector({ onDateSelect, selectedDate }) {
  // 生成接下来7天的日期
  const generateDates = () => {
    const dates = []
    const today = new Date()
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    
    return dates
  }

  const dates = generateDates()
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const formatDate = (date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${month}月${day}日`
  }

  const isSelected = (date) => {
    if (!selectedDate) return false
    return date.toDateString() === selectedDate.toDateString()
  }

  const handleDateClick = (date) => {
    onDateSelect(date)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">选择日期</h3>
      <div className="grid grid-cols-7 gap-3">
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={`
              p-3 rounded-lg text-center transition-colors duration-200 border
              ${isSelected(date)
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }
            `}
          >
            <div className="text-xs text-gray-500 mb-1">
              {weekDays[date.getDay()]}
            </div>
            <div className="text-sm font-medium">
              {formatDate(date)}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
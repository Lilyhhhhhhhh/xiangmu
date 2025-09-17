import { useState } from 'react'

export default function DateSelector({ onDateSelect, selectedDate }) {
  // 生成接下来7天的日期（一周）
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

  const [availableDates] = useState(generateDates())

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getWeekdayName = (date) => {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekdays[date.getDay()]
  }

  const isSelected = (date) => {
    return selectedDate && formatDate(date) === formatDate(selectedDate)
  }

  const handleDateClick = (date) => {
    onDateSelect(date)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">选择日期</h3>
      
      {/* 日期选择网格 - 一周7天 */}
      <div className="grid grid-cols-7 gap-3 mb-6">
        {availableDates.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={`
              p-4 rounded-xl text-center transition-all duration-200 border-2
              ${isSelected(date)
                ? 'bg-primary-500 text-white border-primary-500 shadow-lg'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }
            `}
          >
            <div className="text-sm font-medium mb-1">
              {getWeekdayName(date)}
            </div>
            <div className="text-lg font-bold">
              {date.getMonth() + 1}月{date.getDate()}日
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
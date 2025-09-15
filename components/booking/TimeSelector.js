import { useState } from 'react'

export default function TimeSelector({ onTimeSelect, selectedTime }) {
  // 生成时间段（9:00-18:00，每小时一个时间段）
  const generateTimeSlots = () => {
    const slots = []
    
    for (let hour = 9; hour <= 18; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`
      slots.push(timeString)
    }
    
    return slots
  }

  const timeSlots = generateTimeSlots()

  const isSelected = (time) => {
    return selectedTime === time
  }

  const handleTimeClick = (time) => {
    onTimeSelect(time)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">选择时间</h3>
      <div className="grid grid-cols-6 gap-3">
        {timeSlots.map((time, index) => (
          <button
            key={index}
            onClick={() => handleTimeClick(time)}
            className={`
              p-3 rounded-lg text-center transition-colors duration-200 border text-sm font-medium
              ${isSelected(time)
                ? 'bg-primary-500 text-white border-primary-500'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
              }
            `}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}
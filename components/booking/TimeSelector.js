import { useState, useEffect } from 'react'

export default function TimeSelector({ onTimeSelect, selectedTime, selectedDate, onConfirmTime }) {
  const [availableTimes, setAvailableTimes] = useState([])

  // 生成可用时间段 - 上下各5个时间段
  const generateTimeSlots = () => {
    const morningSlots = ['09:00', '10:00', '11:00', '12:00', '13:00']
    const afternoonSlots = ['14:00', '15:00', '16:00', '17:00', '18:00']
    
    return { morningSlots, afternoonSlots }
  }

  useEffect(() => {
    if (selectedDate) {
      const { morningSlots, afternoonSlots } = generateTimeSlots()
      const allSlots = [...morningSlots, ...afternoonSlots]
      
      const slots = allSlots.map(time => ({
        time: time,
        isBooked: false, // 移除冲突检测，所有时间都可用
        isAvailable: true
      }))
      
      // 如果选择的是今天，过滤掉已过去的时间
      const now = new Date()
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate.getTime() === today.getTime()) {
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()
        
        const filteredSlots = slots.filter(slot => {
          const [hour] = slot.time.split(':').map(Number)
          return hour > currentHour || (hour === currentHour && currentMinute < 30)
        })
        
        setAvailableTimes(filteredSlots)
      } else {
        setAvailableTimes(slots)
      }
    }
  }, [selectedDate])

  const handleTimeClick = (timeSlot) => {
    if (timeSlot.isAvailable) {
      onTimeSelect(timeSlot.time)
    }
  }

  const isSelected = (time) => {
    return selectedTime === time
  }

  if (!selectedDate) {
    return null
  }

  // 分离上午和下午的时间段
  const morningTimes = availableTimes.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0])
    return hour <= 13 // 上午时段：09:00-13:00
  })
  
  const afternoonTimes = availableTimes.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0])
    return hour >= 14 // 下午时段：14:00-18:00
  })

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">选择时间</h3>
      
      {/* 上午时间段 - 5个时间段 */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {morningTimes.map((timeSlot, index) => (
          <button
            key={index}
            onClick={() => handleTimeClick(timeSlot)}
            disabled={!timeSlot.isAvailable}
            className={`
              py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 border-2
              ${isSelected(timeSlot.time)
                ? 'bg-primary-500 text-white border-primary-500 shadow-lg'
                : timeSlot.isAvailable
                ? 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }
            `}
          >
            {timeSlot.time}
          </button>
        ))}
      </div>
      
      {/* 下午时间段 - 5个时间段 */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {afternoonTimes.map((timeSlot, index) => (
          <button
            key={index}
            onClick={() => handleTimeClick(timeSlot)}
            disabled={!timeSlot.isAvailable}
            className={`
              py-3 px-2 rounded-xl text-sm font-medium transition-all duration-200 border-2
              ${isSelected(timeSlot.time)
                ? 'bg-primary-500 text-white border-primary-500 shadow-lg'
                : timeSlot.isAvailable
                ? 'bg-white text-gray-700 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              }
            `}
          >
            {timeSlot.time}
          </button>
        ))}
      </div>

      {/* 确认时间按钮 */}
      {selectedTime && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (onConfirmTime) {
                onConfirmTime()
              }
            }}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-8 rounded-xl transition-colors duration-200"
          >
            确认时间
          </button>
        </div>
      )}
      
      {availableTimes.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-sm">当天暂无可用时间段</div>
        </div>
      )}
    </div>
  )
}
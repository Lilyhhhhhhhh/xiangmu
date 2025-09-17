// 日期工具函数

/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
export const formatDate = (date) => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * 格式化日期为中文显示格式
 */
export const formatDateChinese = (date) => {
  if (!date) return ''
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const weekday = weekdays[date.getDay()]
  
  return `${year}年${month}月${day}日 ${weekday}`
}

/**
 * 获取相对日期显示（今天、明天等）
 */
export const getRelativeDateDisplay = (date) => {
  if (!date) return ''
  
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  
  const targetDateStr = formatDate(date)
  const todayStr = formatDate(today)
  const tomorrowStr = formatDate(tomorrow)
  
  if (targetDateStr === todayStr) {
    return '今天'
  } else if (targetDateStr === tomorrowStr) {
    return '明天'
  } else {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${date.getMonth() + 1}月${date.getDate()}日 ${weekdays[date.getDay()]}`
  }
}

/**
 * 检查日期是否为今天
 */
export const isToday = (date) => {
  if (!date) return false
  const today = new Date()
  return formatDate(date) === formatDate(today)
}

/**
 * 检查日期是否为明天
 */
export const isTomorrow = (date) => {
  if (!date) return false
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return formatDate(date) === formatDate(tomorrow)
}

/**
 * 生成未来N天的日期数组
 */
export const generateFutureDates = (days = 30) => {
  const dates = []
  const today = new Date()
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(date)
  }
  
  return dates
}

/**
 * 检查时间是否已过去（仅对今天有效）
 */
export const isTimePassed = (date, timeString) => {
  if (!isToday(date)) return false
  
  const now = new Date()
  const [hour, minute] = timeString.split(':').map(Number)
  
  return hour < now.getHours() || (hour === now.getHours() && minute <= now.getMinutes())
}
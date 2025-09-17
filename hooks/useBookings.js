import { useState, useEffect } from 'react'
import { bookingsAPI } from '../utils/database'
import { useAuth } from './useAuth'

/**
 * 预约管理 Hook
 */
export function useBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 创建预约
  const createBooking = async (bookingData) => {
    if (!user) {
      throw new Error('请先登录')
    }

    try {
      setLoading(true)
      setError(null)
      
      const booking = await bookingsAPI.create({
        ...bookingData,
        userId: user.id
      })
      
      // 更新本地预约列表
      await fetchUserBookings()
      
      return booking
    } catch (err) {
      setError(err.message)
      console.error('创建预约失败:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 获取用户预约
  const fetchUserBookings = async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)
      const data = await bookingsAPI.getUserBookings(user.id)
      setBookings(data)
    } catch (err) {
      setError(err.message)
      console.error('获取预约列表失败:', err)
    } finally {
      setLoading(false)
    }
  }

  // 检查时间冲突
  const checkTimeConflict = async (date, time, serviceId) => {
    try {
      return await bookingsAPI.checkTimeConflict(date, time, serviceId)
    } catch (err) {
      console.error('检查时间冲突失败:', err)
      return false
    }
  }

  // 取消预约
  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true)
      setError(null)
      
      await bookingsAPI.cancel(bookingId)
      
      // 更新本地预约列表
      await fetchUserBookings()
    } catch (err) {
      setError(err.message)
      console.error('取消预约失败:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 当用户状态改变时重新获取预约
  useEffect(() => {
    if (user) {
      fetchUserBookings()
    } else {
      setBookings([])
    }
  }, [user])

  return {
    bookings,
    loading,
    error,
    createBooking,
    fetchUserBookings,
    checkTimeConflict,
    cancelBooking
  }
}
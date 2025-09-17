import { supabase } from '../lib/supabase'

// 服务相关操作
export const servicesAPI = {
  // 获取所有服务
  async getAll() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })
    
    if (error) throw error
    return data
  },

  // 根据ID获取服务
  async getById(id) {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  }
}

// 预约相关操作
export const bookingsAPI = {
  // 创建预约
  async create(bookingData) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        user_id: bookingData.userId,
        service_id: bookingData.serviceId,
        booking_date: bookingData.date,
        booking_time: bookingData.time,
        status: 'pending',
        notes: bookingData.notes || ''
      }])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // 获取用户的预约
  async getUserBookings(userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        services (
          name,
          duration_minutes,
          price,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('booking_date', { ascending: true })
    
    if (error) throw error
    return data
  },

  // 检查时间冲突
  async checkTimeConflict(date, time, serviceId) {
    const { data, error } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', date)
      .eq('booking_time', time)
      .eq('service_id', serviceId)
      .neq('status', 'cancelled')
    
    if (error) throw error
    return data.length > 0
  },

  // 取消预约
  async cancel(bookingId) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// 用户相关操作
export const usersAPI = {
  // 获取用户信息
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // 更新用户信息
  async updateProfile(userId, updates) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}
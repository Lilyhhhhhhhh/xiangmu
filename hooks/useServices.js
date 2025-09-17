import { useState, useEffect } from 'react'
import { servicesAPI } from '../utils/database'

/**
 * 服务管理 Hook
 */
export function useServices() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 获取所有服务
  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await servicesAPI.getAll()
      setServices(data)
    } catch (err) {
      setError(err.message)
      console.error('获取服务列表失败:', err)
    } finally {
      setLoading(false)
    }
  }

  // 根据ID获取服务
  const getServiceById = async (id) => {
    try {
      const service = await servicesAPI.getById(id)
      return service
    } catch (err) {
      console.error('获取服务详情失败:', err)
      throw err
    }
  }

  // 初始化时获取服务列表
  useEffect(() => {
    fetchServices()
  }, [])

  return {
    services,
    loading,
    error,
    fetchServices,
    getServiceById
  }
}
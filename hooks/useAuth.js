import { useState, useEffect, createContext, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'

// 创建认证上下文
const AuthContext = createContext()

// 模拟用户数据
const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123', // 实际应用中不应存储明文密码
    name: '张三',
    avatar: null
  }
]

/**
 * 认证 Hook
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * 认证提供者组件
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage('user', null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  // 确保只在客户端挂载后才显示认证相关内容
  useEffect(() => {
    setMounted(true)
  }, [])

  // 登录函数
  const login = async (credentials) => {
    setLoading(true)
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 纯前端登录 - 简化验证，只要有邮箱和密码就登录成功
      if (!credentials.email || !credentials.password) {
        throw new Error('请输入邮箱和密码')
      }
      
      // 创建用户信息
      const user = {
        id: Date.now().toString(),
        email: credentials.email,
        name: credentials.email.split('@')[0], // 使用邮箱前缀作为用户名
        avatar: null
      }
      
      setUser(user)
      
      return { success: true, user: user }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // 注册函数
  const register = async (userData) => {
    setLoading(true)
    
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 纯前端注册 - 不检查用户是否存在，直接成功
      // 注册成功但不自动登录，需要用户手动登录
      return { success: true, message: '注册成功，请登录' }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // 登出函数
  const logout = () => {
    setUser(null)
  }

  // 更新用户信息
  const updateUser = async (updates) => {
    if (!user) return { success: false, error: '用户未登录' }
    
    setLoading(true)
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      
      return { success: true, user: updatedUser }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // 检查是否已登录 - 只有在客户端挂载后才返回真实状态
  const isAuthenticated = mounted && !!user

  const value = {
    user,
    loading,
    isAuthenticated,
    mounted,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
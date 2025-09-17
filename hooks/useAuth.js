import { useState, useEffect, createContext, useContext } from 'react'
import { supabase } from '../lib/supabase'

// 创建认证上下文
const AuthContext = createContext()

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
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // 初始化认证状态
  useEffect(() => {
    // 获取当前用户会话
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
      setMounted(true)
    }

    getInitialSession()

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // 登录函数
  const login = async (credentials) => {
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) throw error

      return { success: true, user: data.user }
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
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name || userData.email.split('@')[0]
          }
        }
      })

      if (error) throw error

      // 如果需要邮箱验证，返回相应消息
      if (data.user && !data.session) {
        return { 
          success: true, 
          message: '注册成功！请检查您的邮箱并点击验证链接。',
          needsVerification: true 
        }
      }

      return { success: true, message: '注册成功，请登录' }
    } catch (error) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // 登出函数
  const logout = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('登出失败:', error.message)
    } finally {
      setLoading(false)
    }
  }

  // 更新用户信息
  const updateUser = async (updates) => {
    if (!user) return { success: false, error: '用户未登录' }
    
    setLoading(true)
    
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      })

      if (error) throw error

      return { success: true, user: data.user }
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
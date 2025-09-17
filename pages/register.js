import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { validateEmail, validatePassword } from '../utils/validation'
import Toast from '../components/common/Toast'

export default function Register() {
  const router = useRouter()
  const { register, isAuthenticated, loading: authLoading } = useAuth()
  const { success, error } = useToast()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)

  // 注册页面不需要检查登录状态，允许已登录用户注册新账号

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) {
      newErrors.name = '请输入姓名'
    } else if (formData.name.length < 2) {
      newErrors.name = '姓名至少2个字符'
    }

    if (!formData.email) {
      newErrors.email = '请输入邮箱地址'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = '请输入正确的邮箱格式'
    }

    if (!formData.password) {
      newErrors.password = '请输入密码'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少6位'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGoToLogin = () => {
    setShowSuccessToast(false)
    router.push('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      const result = await register(formData)
      
      if (result.success) {
        // 注册成功，显示成功提示
        setShowSuccessToast(true)
      } else {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      console.error('注册失败:', error)
      setErrors({ submit: '注册失败，请重试' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>用户注册 - 美容预约系统</title>
        <meta name="description" content="注册您的美容预约账户" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            {/* Logo和标题 */}
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white font-bold text-2xl">美</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                创建账户
              </h2>
              <p className="text-gray-600">
                注册开始您的美容之旅
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 姓名输入 */}
                <Input
                  label="姓名"
                  name="name"
                  type="text"
                  placeholder="请输入您的姓名"
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  required
                />

                {/* 邮箱输入 */}
                <Input
                  label="邮箱地址"
                  name="email"
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email}
                  required
                />

                {/* 密码输入 */}
                <Input
                  label="密码"
                  name="password"
                  type="password"
                  placeholder="至少6位字符"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  required
                />

                {/* 确认密码输入 */}
                <Input
                  label="确认密码"
                  name="confirmPassword"
                  type="password"
                  placeholder="请再次输入密码"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  error={errors.confirmPassword}
                  required
                />

                {/* 提交错误信息 */}
                {errors.submit && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    {errors.submit}
                  </div>
                )}

                {/* 注册按钮 */}
                <Button
                  type="submit"
                  loading={loading || authLoading}
                  className="w-full"
                  size="large"
                >
                  {loading || authLoading ? '注册中...' : '立即注册'}
                </Button>

                {/* 登录链接 */}
                <div className="text-center">
                  <span className="text-gray-600">已有账户？</span>
                  <Link href="/login" className="ml-1 text-primary-600 hover:text-primary-500 font-medium">
                    立即登录
                  </Link>
                </div>
              </form>
            </Card>
          </div>
        </div>

        {/* 注册成功提示 */}
        {showSuccessToast && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-sm mx-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">注册成功！</h3>
              <p className="text-gray-600 mb-6">您的账户已创建成功，请登录以继续使用服务。</p>
              <button
                onClick={handleGoToLogin}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
              >
                去登录
              </button>
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { useAuth } from '../hooks/useAuth'
import { validateEmail } from '../utils/validation'

export default function Login() {
  const router = useRouter()
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  // 如果已登录，重定向到服务页面
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/services')
    }
  }, [isAuthenticated, router])

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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    
    try {
      const result = await login(formData)
      
      if (result.success) {
        // 登录成功，跳转到服务页面
        router.push('/services')
      } else {
        setErrors({ submit: result.error })
      }
    } catch (error) {
      console.error('登录失败:', error)
      setErrors({ submit: '登录失败，请重试' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>用户登录 - 美容预约系统</title>
        <meta name="description" content="登录您的美容预约账户" />
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
                欢迎回来
              </h2>
              <p className="text-gray-600">
                登录您的美容预约账户
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="请输入密码"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password}
                  required
                />

                {/* 提交错误信息 */}
                {errors.submit && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    {errors.submit}
                  </div>
                )}

                {/* 登录提示 */}
                <div className="text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="font-medium mb-1">提示：</div>
                  <div>输入任意邮箱和密码即可登录</div>
                </div>

                {/* 登录按钮 */}
                <Button
                  type="submit"
                  loading={loading || authLoading}
                  className="w-full"
                  size="large"
                >
                  {loading || authLoading ? '登录中...' : '登录'}
                </Button>

                {/* 注册链接 */}
                <div className="text-center">
                  <span className="text-gray-600">还没有账户？</span>
                  <Link href="/register" className="ml-1 text-primary-600 hover:text-primary-500 font-medium">
                    立即注册
                  </Link>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  )
}
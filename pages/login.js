import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  }

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

    if (!formData.phone) {
      newErrors.phone = '请输入手机号码'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = '请输入正确的手机号码格式'
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
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟登录成功
      console.log('登录数据:', formData)
      alert('登录成功！')
      
      // 跳转到首页或预约页面
      router.push('/')
      
    } catch (error) {
      console.error('登录失败:', error)
      setErrors({ submit: '登录失败，请检查手机号和密码' })
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
                {/* 手机号输入 */}
                <Input
                  label="手机号码"
                  name="phone"
                  type="tel"
                  placeholder="请输入手机号码"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone}
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

                {/* 登录按钮 */}
                <Button
                  type="submit"
                  loading={loading}
                  className="w-full"
                  size="large"
                >
                  {loading ? '登录中...' : '登录'}
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
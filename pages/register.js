import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validatePhone = (phone) => {
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  const validatePassword = (password) => {
    // 至少8位，包含大小写字母、数字和特殊字符
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
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
    } else if (!validatePassword(formData.password)) {
      newErrors.password = '密码至少8位，包含大小写字母、数字和特殊字符'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
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
      // 模拟注册API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 模拟注册成功
      console.log('注册数据:', formData)
      alert('注册成功！即将跳转到登录页面')
      
      // 跳转到登录页面
      router.push('/login')
      
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
                  placeholder="至少8位，包含大小写字母、数字和特殊字符"
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
                  loading={loading}
                  className="w-full"
                  size="large"
                >
                  {loading ? '注册中...' : '立即注册'}
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
      </Layout>
    </>
  )
}
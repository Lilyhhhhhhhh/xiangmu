import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import StepIndicator from '../../components/booking/StepIndicator'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import ProtectedRoute from '../../components/auth/ProtectedRoute'
import { useAuth } from '../../hooks/useAuth'
import { formatDateChinese } from '../../utils/dateUtils'

// 模拟服务数据
const mockServices = [
  {
    id: 1,
    name: '基础面部护理',
    description: '深层清洁、去角质、补水保湿、适合所有肌肤类型',
    price: 298,
    duration: 60,
    category: '面部护理'
  },
  {
    id: 2,
    name: '抗衰老面部护理',
    description: '采用先进抗衰技术、美容肌肽、减少细纹、恢复年轻光彩',
    price: 498,
    duration: 90,
    category: '面部护理'
  },
]

export default function BookingConfirm() {
  const router = useRouter()
  const { user } = useAuth()
  const { serviceId, date, time } = router.query
  const [loading, setLoading] = useState(false)
  const [bookingData, setBookingData] = useState(null)

  // 从路由参数构建预约数据
  useEffect(() => {
    if (serviceId && date && time) {
      const service = mockServices.find(s => s.id === parseInt(serviceId))
      if (service) {
        const selectedDate = new Date(date)
        setBookingData({
          service,
          selectedDate: formatDateChinese(selectedDate),
          selectedTime: time,
          rawDate: selectedDate
        })
      } else {
        router.push('/services')
      }
    } else {
      router.push('/services')
    }
  }, [serviceId, date, time, router])

  const handleBackToModify = () => {
    router.back()
  }

  const handleConfirmBooking = async () => {
    if (!bookingData || !user) return
    
    setLoading(true)
    
    try {
      // 模拟提交预约API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 构建预约记录
      const newBooking = {
        id: Date.now().toString(),
        userId: user.id,
        serviceId: bookingData.service.id,
        serviceName: bookingData.service.name,
        serviceDescription: bookingData.service.description,
        servicePrice: bookingData.service.price,
        serviceDuration: bookingData.service.duration,
        serviceCategory: bookingData.service.category,
        bookingDate: bookingData.selectedDate,
        bookingTime: bookingData.selectedTime,
        status: '待确认',
        createdAt: new Date().toISOString()
      }
      
      // 保存到本地存储（模拟数据库）
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]')
      existingBookings.push(newBooking)
      localStorage.setItem('userBookings', JSON.stringify(existingBookings))
      
      // 预约成功，跳转到我的预约页面
      alert('预约成功！我们会尽快联系您确认预约。')
      router.push('/my-bookings')
      
    } catch (error) {
      console.error('预约失败:', error)
      alert('预约失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 如果还没有加载预约数据，显示加载状态
  if (!bookingData) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">加载预约信息...</p>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>确认预约 - 美容预约系统</title>
        <meta name="description" content="确认您的预约信息" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 步骤指示器 */}
            <StepIndicator currentStep={3} />

            {/* 主要内容区域 */}
            <div className="mt-8">
              <Card className="max-w-2xl mx-auto">
                {/* 页面标题和返回按钮 */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBackToModify}
                    className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">确认预约</h1>
                </div>

                {/* 服务信息 */}
                <div className="mb-8">
                  <div className="flex items-start space-x-4">
                    {/* 服务图标 */}
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>

                    {/* 服务详情 */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {bookingData.service.name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {bookingData.service.description}
                      </p>
                      
                      {/* 服务详细信息 */}
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-red-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          ¥{bookingData.service.price}
                        </span>
                        <span className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {bookingData.service.duration}分钟
                        </span>
                        <span className="flex items-center text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {bookingData.service.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 预约时间 */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    预约时间
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">日期</p>
                        <p className="font-medium text-gray-900">{bookingData.selectedDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">时间</p>
                        <p className="font-medium text-gray-900">{bookingData.selectedTime}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 预约须知 */}
                <div className="mb-8">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <h4 className="font-medium text-yellow-800">预约须知</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-yellow-700">
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        请提前15分钟到店，避免影响服务质量
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        如需取消或改时间，请于24小时前联系我们
                      </li>
                      <li className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        首次到店需提供身份证等有效证件
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 总计 */}
                <div className="flex items-center justify-between py-4 border-t border-gray-200 mb-6">
                  <span className="text-lg font-semibold text-gray-900">总计</span>
                  <span className="text-2xl font-bold text-primary-600">¥{bookingData.service.price}</span>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    onClick={handleBackToModify}
                    className="flex-1"
                  >
                    返回修改
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    loading={loading}
                    className="flex-1"
                    size="large"
                  >
                    {loading ? '预约中...' : '确认预约'}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  )
}
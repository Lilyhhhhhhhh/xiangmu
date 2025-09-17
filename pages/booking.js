import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import StepIndicator from '../components/booking/StepIndicator'
import DateSelector from '../components/booking/DateSelector'
import TimeSelector from '../components/booking/TimeSelector'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import { useAuth } from '../hooks/useAuth'
import { useServices } from '../hooks/useServices'

export default function Booking() {
  const router = useRouter()
  const { isAuthenticated, mounted } = useAuth()
  const { getServiceById } = useServices()
  const { serviceId } = router.query
  
  const [currentStep, setCurrentStep] = useState(2) // 从第2步开始（选择时间）
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [loading, setLoading] = useState(true)

  // 检查用户是否已登录 - 只有在客户端挂载后才检查
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
      return
    }
  }, [isAuthenticated, mounted, router])

  // 根据serviceId获取服务信息
  useEffect(() => {
    const fetchService = async () => {
      if (serviceId) {
        try {
          setLoading(true)
          const service = await getServiceById(serviceId)
          setSelectedService(service)
        } catch (error) {
          console.error('获取服务信息失败:', error)
          router.push('/services')
        } finally {
          setLoading(false)
        }
      } else {
        // 如果没有serviceId，返回服务选择页面
        router.push('/services')
      }
    }

    if (mounted && isAuthenticated) {
      fetchService()
    }
  }, [serviceId, router, getServiceById, mounted, isAuthenticated])

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setSelectedTime(null) // 重置时间选择
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time)
  }

  const handleConfirmTime = () => {
    if (selectedDate && selectedTime) {
      // 跳转到确认页面
      router.push({
        pathname: '/booking/confirm',
        query: {
          serviceId: selectedService.id,
          date: selectedDate.toISOString(),
          time: selectedTime
        }
      })
    }
  }

  const handleBackToServices = () => {
    router.push('/services')
  }

  // 如果还没有加载服务信息，显示加载状态
  if (loading || !selectedService) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">加载服务信息...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>选择预约时间 - 美容预约系统</title>
        <meta name="description" content="选择您的预约日期和时间" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 步骤指示器 */}
            <StepIndicator currentStep={currentStep} />

            {/* 主要内容区域 */}
            <div className="mt-8">
              <Card className="max-w-3xl mx-auto">
                {/* 页面标题和返回按钮 */}
                <div className="flex items-center mb-6">
                  <button
                    onClick={handleBackToServices}
                    className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                  >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">选择预约时间</h1>
                    <p className="text-gray-600 mt-1">
                      已选择：{selectedService.name}
                    </p>
                  </div>
                </div>

                {/* 日期选择 */}
                <div className="mb-8">
                  <DateSelector
                    onDateSelect={handleDateSelect}
                    selectedDate={selectedDate}
                  />
                </div>

                {/* 时间选择 */}
                {selectedDate && (
                  <div className="mb-8">
                    <TimeSelector
                      onTimeSelect={handleTimeSelect}
                      selectedTime={selectedTime}
                      selectedDate={selectedDate}
                      onConfirmTime={handleConfirmTime}
                    />
                  </div>
                )}

                {/* 选择提示 */}
                {!selectedDate && (
                  <div className="text-center text-gray-500">
                    请先选择日期
                  </div>
                )}
                
                {selectedDate && !selectedTime && (
                  <div className="text-center text-gray-500">
                    请选择预约时间
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
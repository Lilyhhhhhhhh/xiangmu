import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import StepIndicator from '../components/booking/StepIndicator'
import DateSelector from '../components/booking/DateSelector'
import TimeSelector from '../components/booking/TimeSelector'
import Button from '../components/common/Button'
import Card from '../components/common/Card'

export default function Booking() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(2) // 从第2步开始（选择时间）
  const [selectedService, setSelectedService] = useState({
    id: 1,
    name: '抗衰老面部护理',
    description: '深层清洁、补水保湿、舒缓肌肤',
    price: 298,
    duration: 60
  })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

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
    router.push('/')
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
                    />
                  </div>
                )}

                {/* 确认按钮 */}
                {selectedDate && selectedTime && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleConfirmTime}
                      size="large"
                      className="px-12"
                    >
                      确认时间
                    </Button>
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
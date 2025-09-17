import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import StepIndicator from '../components/booking/StepIndicator'
import Button from '../components/common/Button'
import { useServices } from '../hooks/useServices'

export default function Services() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState(null)
  const { services, loading, error } = useServices()

  const handleServiceSelect = (service) => {
    // 跳转到预约时间选择页面，传递服务信息
    router.push({
      pathname: '/booking',
      query: { serviceId: service.id }
    })
  }

  // 加载状态
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StepIndicator currentStep={1} />
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">选择服务</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // 错误状态
  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <StepIndicator currentStep={1} />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">选择服务</h1>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-red-600">加载服务失败: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-2 text-red-600 underline"
                >
                  重新加载
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>选择服务 - 美容预约系统</title>
        <meta name="description" content="选择您需要的美容服务" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 步骤指示器 */}
            <StepIndicator currentStep={1} />

            {/* 页面标题 */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">选择服务</h1>
            </div>

            {/* 服务网格 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* 服务图片 */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                    {service.image_url ? (
                      <img 
                        src={service.image_url} 
                        alt={service.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-primary-600 text-center">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 服务信息 */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>
                    
                    {/* 价格和时长 */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {service.duration_minutes}分钟
                        </span>
                      </div>
                      <div className="text-primary-600 font-bold text-xl">
                        ¥{service.price}
                      </div>
                    </div>

                    {/* 立即预约按钮 */}
                    <Button 
                      onClick={() => handleServiceSelect(service)}
                      className="w-full"
                    >
                      立即预约
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
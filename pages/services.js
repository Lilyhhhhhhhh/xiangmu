import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from '../components/layout/Layout'
import StepIndicator from '../components/booking/StepIndicator'
import Button from '../components/common/Button'

// 模拟完整的服务数据
const mockServices = [
  {
    id: 1,
    name: '基础面部护理',
    description: '深层清洁、去角质、补水保湿、适合所有肌肤类型',
    price: 298,
    duration: 60,
    category: '面部护理',
    image: '/images/facial-basic.jpg'
  },
  {
    id: 2,
    name: '抗衰老面部护理',
    description: '采用先进抗衰技术、美容肌肽、减少细纹、恢复年轻光彩',
    price: 498,
    duration: 90,
    category: '面部护理',
    image: '/images/facial-anti-aging.jpg'
  },
  {
    id: 3,
    name: '祛痘调理护理',
    description: '针对痘痘肌肤专业调理、控油消炎、改善肌肤问题',
    price: 368,
    duration: 75,
    category: '面部护理',
    image: '/images/acne-treatment.jpg'
  },
  {
    id: 4,
    name: '美白淡斑护理',
    description: '专业美白淡斑、改善暗沉、提亮肤色',
    price: 428,
    duration: 80,
    category: '面部护理',
    image: '/images/whitening.jpg'
  },
  {
    id: 5,
    name: '经典修眉造型',
    description: '专业修眉师为您设计最适合的眉型、精细修整',
    price: 88,
    duration: 30,
    category: '美容护理',
    image: '/images/eyebrow.jpg'
  },
  {
    id: 6,
    name: '半永久纹眉',
    description: '半持久半永久文眉、自然质感、持久美丽',
    price: 1288,
    duration: 120,
    category: '美容护理',
    image: '/images/permanent-eyebrow.jpg'
  },
  {
    id: 7,
    name: '睫毛嫁接',
    description: '专业睫毛嫁接、打造浓密纤长睫毛、自然立体感',
    price: 198,
    duration: 90,
    category: '美睫护理',
    image: '/images/eyelash.jpg'
  },
  {
    id: 8,
    name: '睫毛烫卷',
    description: '专业睫毛烫卷、让您睫毛更自然弯曲、持久立体',
    price: 128,
    duration: 45,
    category: '美睫护理',
    image: '/images/eyelash-perm.jpg'
  },
  {
    id: 9,
    name: '指甲基础护理',
    description: '修整指甲护理、去除死皮、让您指甲更健康',
    price: 68,
    duration: 40,
    category: '美甲护理',
    image: '/images/nail-basic.jpg'
  },
  {
    id: 10,
    name: '经典款美甲',
    description: '经典款色选择、精美美甲设计、持久美丽',
    price: 158,
    duration: 60,
    category: '美甲护理',
    image: '/images/nail-classic.jpg'
  },
  {
    id: 11,
    name: '日式光疗美甲',
    description: '日式独特光疗工艺、光泽度高、不易脱落',
    price: 228,
    duration: 90,
    category: '美甲护理',
    image: '/images/nail-japanese.jpg'
  },
  {
    id: 12,
    name: '3D立体美甲',
    description: '立体美甲设计、独特创意、高端个性定制',
    price: 298,
    duration: 120,
    category: '美甲护理',
    image: '/images/nail-3d.jpg'
  }
]

export default function Services() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState(null)

  const handleServiceSelect = (service) => {
    // 跳转到预约时间选择页面，传递服务信息
    router.push({
      pathname: '/booking',
      query: { serviceId: service.id }
    })
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
              {mockServices.map(service => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  {/* 服务图片 */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                    {/* 服务类别标签 */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                        {service.category}
                      </span>
                    </div>
                    
                    {/* 图片占位符 */}
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-primary-600 text-center">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
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
                          {service.duration}分钟
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
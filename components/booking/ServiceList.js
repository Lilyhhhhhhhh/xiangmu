import { useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'

// 模拟服务数据
const mockServices = [
  {
    id: 1,
    name: '基础面部护理',
    description: '深层清洁、补水保湿、舒缓肌肤，适合所有肌肤类型',
    price: 198,
    duration: 60,
    category: '面部护理',
    image: '/images/facial-basic.jpg'
  },
  {
    id: 2,
    name: '深层补水护理',
    description: '专业补水面膜、精华导入，改善肌肤干燥问题',
    price: 298,
    duration: 90,
    category: '面部护理',
    image: '/images/facial-hydrating.jpg'
  },
  {
    id: 3,
    name: '抗衰老护理',
    description: '紧致提拉、淡化细纹，延缓肌肤衰老',
    price: 498,
    duration: 120,
    category: '面部护理',
    image: '/images/facial-anti-aging.jpg'
  },
  {
    id: 4,
    name: '眼部护理',
    description: '专业眼部按摩、去黑眼圈、淡化眼袋',
    price: 158,
    duration: 45,
    category: '眼部护理',
    image: '/images/eye-care.jpg'
  },
  {
    id: 5,
    name: '身体SPA',
    description: '全身放松按摩、精油护理，缓解疲劳',
    price: 398,
    duration: 90,
    category: '身体护理',
    image: '/images/body-spa.jpg'
  },
  {
    id: 6,
    name: '美甲服务',
    description: '专业美甲、彩绘设计，让指尖更美丽',
    price: 88,
    duration: 60,
    category: '美甲服务',
    image: '/images/nail-art.jpg'
  }
]

export default function ServiceList({ showBookingButton = true }) {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  
  const categories = ['全部', '面部护理', '眼部护理', '身体护理', '美甲服务']
  
  const filteredServices = selectedCategory === '全部' 
    ? mockServices 
    : mockServices.filter(service => service.category === selectedCategory)

  const handleBookService = (service) => {
    // 跳转到预约时间选择页面
    console.log('预约服务:', service)
    window.location.href = `/booking?serviceId=${service.id}`
  }

  return (
    <div>
      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 服务列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map(service => (
          <Card key={service.id} hover className="h-full flex flex-col">
            {/* 服务图片占位 */}
            <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-primary-600 text-center">
                <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-sm font-medium">{service.category}</p>
              </div>
            </div>

            {/* 服务信息 */}
            <div className="flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* 价格和时长 */}
              <div className="flex items-center justify-between mb-4 text-sm">
                <div className="flex items-center text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration}分钟
                </div>
                <div className="text-primary-600 font-semibold text-lg">
                  ¥{service.price}
                </div>
              </div>

              {/* 预约按钮 */}
              {showBookingButton && (
                <Button 
                  onClick={() => handleBookService(service)}
                  className="w-full mt-auto"
                >
                  立即预约
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 20.4a7.962 7.962 0 01-5-1.709M15 3H9v2.171A7.962 7.962 0 0112 3.6c1.102 0 2.14.254 3 .571V3z" />
          </svg>
          <p className="text-gray-500">暂无相关服务</p>
        </div>
      )}
    </div>
  )
}
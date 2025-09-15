import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'

// 模拟预约数据
const mockBookings = [
  {
    id: 1,
    serviceName: '基础面部护理',
    description: '深层清洁、去角质、补水保湿、适合所有肌肤类型',
    category: '面部护理',
    duration: 60,
    price: 298,
    bookingDate: '2025年9月13日星期六',
    bookingTime: '10:00',
    createdDate: '2025/9/14',
    status: '待确认',
    statusColor: 'yellow'
  },
  {
    id: 2,
    serviceName: '深层补水护理',
    description: '专业补水面膜、精华导入，改善肌肤干燥问题',
    category: '面部护理',
    duration: 90,
    price: 398,
    bookingDate: '2025年9月15日星期一',
    bookingTime: '14:00',
    createdDate: '2025/9/12',
    status: '已确认',
    statusColor: 'green'
  }
]

export default function MyBookings() {
  const [selectedStatus, setSelectedStatus] = useState('全部')
  
  const statusTabs = [
    { name: '全部', count: 4 },
    { name: '待确认', count: 3 },
    { name: '已确认', count: 0 },
    { name: '已完成', count: 0 }
  ]

  const getStatusStyles = (status) => {
    const styles = {
      '待确认': 'bg-yellow-100 text-yellow-800',
      '已确认': 'bg-green-100 text-green-800',
      '已完成': 'bg-gray-100 text-gray-800',
      '已取消': 'bg-red-100 text-red-800'
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  const filteredBookings = selectedStatus === '全部' 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === selectedStatus)

  return (
    <>
      <Head>
        <title>我的预约 - 美容预约系统</title>
        <meta name="description" content="查看和管理您的预约记录" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 页面标题 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">我的预约</h1>
              <p className="text-gray-600">管理您的所有预约记录</p>
            </div>

            {/* 状态筛选标签 */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {statusTabs.map(tab => (
                  <button
                    key={tab.name}
                    onClick={() => setSelectedStatus(tab.name)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                      ${selectedStatus === tab.name
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }
                    `}
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </div>
            </div>

            {/* 预约列表 */}
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <Card key={booking.id} className="hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    {/* 服务图标 */}
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>

                    {/* 预约信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {booking.serviceName}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {booking.description}
                          </p>
                          
                          {/* 服务详情 */}
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                              </svg>
                              {booking.category}
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {booking.duration}分钟
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              ¥{booking.price}
                            </span>
                          </div>
                        </div>

                        {/* 状态标签 */}
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${getStatusStyles(booking.status)}
                        `}>
                          {booking.status}
                        </span>
                      </div>

                      {/* 预约时间信息 */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">预约日期</span>
                            <span className="ml-2">{booking.bookingDate}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">预约时间</span>
                            <span className="ml-2">{booking.bookingTime}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">预约时间</span>
                            <span className="ml-2">{booking.createdDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* 温馨提示 */}
                      {booking.status === '待确认' && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center text-yellow-800 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            您的预约正在等待确认，我们会尽快联系您
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}

              {/* 空状态 */}
              {filteredBookings.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无预约记录</h3>
                  <p className="text-gray-500 mb-6">您还没有任何预约，快去预约您心仪的服务吧！</p>
                  <Link href="/services">
                    <Button size="large" className="px-8">
                      立即预约
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import { useAuth } from '../hooks/useAuth'
import { useBookings } from '../hooks/useBookings'

export default function MyBookings() {
  const { user } = useAuth()
  const { bookings, loading, error, cancelBooking } = useBookings()

  const handleCancelBooking = async (bookingId) => {
    if (confirm('确定要取消这个预约吗？')) {
      try {
        await cancelBooking(bookingId)
        alert('预约已取消')
      } catch (error) {
        alert('取消预约失败: ' + error.message)
      }
    }
  }
  
  const getStatusStyles = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return '待确认'
      case 'confirmed':
        return '已确认'
      case 'completed':
        return '已完成'
      case 'cancelled':
        return '已取消'
      default:
        return status
    }
  }

  return (
    <ProtectedRoute>
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
              <p className="text-gray-600">查看您的所有预约记录，所有预约均为待确认状态</p>
              {bookings.length > 0 && (
                <div className="mt-3 flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  共 {bookings.length} 条预约记录
                </div>
              )}
            </div>

            {/* 加载状态 */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-gray-600">加载预约记录...</p>
              </div>
            )}

            {/* 预约列表 */}
            {!loading && (
              <div className="space-y-4">
                {bookings.map(booking => (
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
                            {booking.services?.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3">
                            {booking.services?.description}
                          </p>
                          
                          {/* 服务详情 */}
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {booking.services?.duration_minutes}分钟
                            </span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              ¥{booking.services?.price}
                            </span>
                          </div>
                        </div>

                        {/* 状态标签和操作按钮 */}
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${getStatusStyles(booking.status)}
                          `}>
                            {getStatusText(booking.status)}
                          </span>
                          
                          {/* 取消预约按钮 */}
                          {booking.status === 'pending' && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              取消预约
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 预约时间信息 */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="font-medium">预约日期</span>
                            <span className="ml-2">{new Date(booking.booking_date).toLocaleDateString('zh-CN')}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">预约时间</span>
                            <span className="ml-2">{booking.booking_time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="font-medium">创建时间</span>
                            <span className="ml-2">{new Date(booking.created_at).toLocaleDateString('zh-CN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* 温馨提示 */}
                      {booking.status === 'pending' && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center text-yellow-800 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                            您的预约正在等待确认，我们会尽快联系您
                          </div>
                        </div>
                      )}

                      {/* 备注信息 */}
                      {booking.notes && (
                        <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                          <div className="flex items-start text-gray-700 text-sm">
                            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <div>
                              <span className="font-medium">备注：</span>
                              <span className="ml-1">{booking.notes}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
                ))}
              </div>
            )}

            {/* 空状态 */}
            {!loading && bookings.length === 0 && (
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
      </Layout>
    </ProtectedRoute>
  )
}
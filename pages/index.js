import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import Button from '../components/common/Button'
import { useAuth } from '../hooks/useAuth'

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, mounted } = useAuth()

  // 如果用户已登录，重定向到服务页面
  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.replace('/services')
    }
  }, [mounted, isAuthenticated, router])

  // 如果还在检查认证状态或已登录，显示加载状态
  if (!mounted || isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>美容预约系统 - 专业美容服务预约平台</title>
        <meta name="description" content="专业的美容服务预约平台，提供面部护理、美甲、美睫等多种服务" />
      </Head>

      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100">
          {/* 主要内容区域 */}
          <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
              
              {/* Logo 和品牌 */}
              <div className="mb-8">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                  <span className="text-white font-bold text-3xl">美</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                  美容预约系统
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  专业美容服务预约平台
                </p>
                <p className="text-sm text-gray-500">
                  让美丽触手可及，享受专业贴心服务
                </p>
              </div>

              {/* 服务特色 */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">在线预约</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">专业服务</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">品质保证</p>
                </div>
              </div>

              {/* 登录注册按钮 */}
              <div className="space-y-4">
                <Link href="/register">
                  <Button 
                    size="large" 
                    className="w-full text-lg py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    立即注册
                  </Button>
                </Link>
                
                <Link href="/login">
                  <Button 
                    variant="secondary" 
                    size="large" 
                    className="w-full text-lg py-4 border-2 hover:bg-gray-50 transition-all duration-200"
                  >
                    已有账户，立即登录
                  </Button>
                </Link>
              </div>

              {/* 服务介绍 */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">我们的服务</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    面部护理
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    美甲服务
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    眉毛修整
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    睫毛嫁接
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    头发护理
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
                    身体按摩
                  </div>
                </div>
              </div>

              {/* 底部信息 */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  专业团队 · 优质服务 · 舒适环境
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
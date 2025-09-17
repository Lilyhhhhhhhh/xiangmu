import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout, mounted } = useAuth()
  const router = useRouter()

  // 检查当前路由是否激活
  const isActive = (path) => router.pathname === path

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">美</span>
              </div>
              <span className="text-xl font-bold text-gray-900">美容预约</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className={`font-medium transition-colors duration-200 ${
              isActive('/services') 
                ? 'text-primary-600' 
                : 'text-gray-700 hover:text-primary-600'
            }`}>
              预约服务
            </Link>
            <Link href="/my-bookings" className={`font-medium transition-colors duration-200 ${
              isActive('/my-bookings') 
                ? 'text-primary-600' 
                : 'text-gray-700 hover:text-primary-600'
            }`}>
              我的预约
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!mounted ? (
              // 服务端渲染时显示加载状态或默认按钮
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  登录
                </Link>
                <Link href="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  注册
                </Link>
              </>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">欢迎，{user?.name || '用户'}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  退出登录
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  登录
                </Link>
                <Link href="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  注册
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/services" className={`font-medium transition-colors duration-200 ${
                isActive('/services') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}>
                预约服务
              </Link>
              <Link href="/my-bookings" className={`font-medium transition-colors duration-200 ${
                isActive('/my-bookings') 
                  ? 'text-primary-600' 
                  : 'text-gray-700 hover:text-primary-600'
              }`}>
                我的预约
              </Link>
              <div className="pt-4 border-t border-gray-100">
                {!mounted ? (
                  // 服务端渲染时显示默认状态
                  <div className="flex flex-col space-y-2">
                    <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                      登录
                    </Link>
                    <Link href="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200">
                      注册
                    </Link>
                  </div>
                ) : isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-gray-700">欢迎，{user?.name || '用户'}</span>
                    <button 
                      onClick={handleLogout}
                      className="text-left text-gray-500 hover:text-gray-700"
                    >
                      退出
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                      登录
                    </Link>
                    <Link href="/register" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200">
                      注册
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
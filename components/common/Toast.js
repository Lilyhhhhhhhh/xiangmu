import { useState, useEffect } from 'react'

// Toast 消息类型
const TOAST_TYPES = {
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    bgColor: 'bg-green-500',
    textColor: 'text-white'
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    bgColor: 'bg-red-500',
    textColor: 'text-white'
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    bgColor: 'bg-yellow-500',
    textColor: 'text-white'
  },
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-blue-500',
    textColor: 'text-white'
  }
}

export default function Toast({ 
  message, 
  type = 'info', 
  isVisible = false, 
  onClose,
  duration = 3000,
  position = 'top-right'
}) {
  const [show, setShow] = useState(isVisible)

  useEffect(() => {
    setShow(isVisible)
  }, [isVisible])

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false)
        if (onClose) {
          setTimeout(onClose, 300) // 等待动画完成
        }
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, duration, onClose])

  const handleClose = () => {
    setShow(false)
    if (onClose) {
      setTimeout(onClose, 300)
    }
  }

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  }

  const toastConfig = TOAST_TYPES[type] || TOAST_TYPES.info

  if (!show) return null

  return (
    <div className={`
      fixed z-50 ${positionClasses[position]}
      transform transition-all duration-300 ease-in-out
      ${show ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
    `}>
      <div className={`
        ${toastConfig.bgColor} ${toastConfig.textColor}
        rounded-lg shadow-lg p-4 max-w-sm w-full
        flex items-center space-x-3
      `}>
        <div className="flex-shrink-0">
          {toastConfig.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">
            {message}
          </p>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Toast 容器组件
export function ToastContainer({ toasts = [], onRemove }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => onRemove && onRemove(toast.id || index)}
          duration={toast.duration}
          position={toast.position}
        />
      ))}
    </div>
  )
}
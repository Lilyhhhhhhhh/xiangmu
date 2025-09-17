import { useState, useCallback } from 'react'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', options = {}) => {
    const id = ++toastId
    const toast = {
      id,
      message,
      type,
      duration: options.duration || 3000,
      position: options.position || 'top-right',
      ...options
    }

    setToasts(prev => [...prev, toast])

    // 自动移除
    if (toast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, toast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  // 便捷方法
  const success = useCallback((message, options) => {
    return addToast(message, 'success', options)
  }, [addToast])

  const error = useCallback((message, options) => {
    return addToast(message, 'error', options)
  }, [addToast])

  const warning = useCallback((message, options) => {
    return addToast(message, 'warning', options)
  }, [addToast])

  const info = useCallback((message, options) => {
    return addToast(message, 'info', options)
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  }
}
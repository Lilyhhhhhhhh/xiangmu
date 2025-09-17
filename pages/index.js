import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // 重定向到服务页面
    router.replace('/services')
  }, [router])

  return null
}
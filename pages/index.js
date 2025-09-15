import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import ServiceList from '../components/booking/ServiceList'

export default function Home() {
  return (
    <>
      <Head>
        <title>美容店在线预约系统</title>
        <meta name="description" content="专业美容服务在线预约平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Layout>
        <div className="min-h-screen">
          <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                专业美容服务
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                享受专业的美容护理服务，随时随地在线预约，让美丽触手可及
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services">
                  <button className="btn-primary text-lg px-8 py-4">
                    立即预约
                  </button>
                </Link>
                <button className="btn-secondary text-lg px-8 py-4">
                  了解服务
                </button>
              </div>
            </div>
          </section>
          
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  我们的服务
                </h2>
                <p className="text-lg text-gray-600">
                  提供多样化的专业美容服务，满足您的不同需求
                </p>
              </div>
              <ServiceList />
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}
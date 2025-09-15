export default function StepIndicator({ currentStep = 1, totalSteps = 3, steps = [] }) {
  const defaultSteps = [
    { number: 1, title: '选择服务' },
    { number: 2, title: '选择时间' },
    { number: 3, title: '确认预约' }
  ]
  
  const stepList = steps.length > 0 ? steps : defaultSteps

  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center space-x-4">
        {stepList.map((step, index) => (
          <div key={step.number} className="flex items-center">
            {/* 步骤圆圈 */}
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200
                ${currentStep >= step.number
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-200 text-gray-500'
                }
              `}
            >
              {step.number}
            </div>
            
            {/* 步骤连接线 */}
            {index < stepList.length - 1 && (
              <div
                className={`
                  w-16 h-1 mx-2 transition-colors duration-200
                  ${currentStep > step.number
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
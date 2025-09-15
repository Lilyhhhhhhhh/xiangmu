export default function Card({ 
  children, 
  className = '', 
  padding = 'normal',
  shadow = 'normal',
  hover = false,
  ...props 
}) {
  const paddings = {
    none: '',
    small: 'p-4',
    normal: 'p-6',
    large: 'p-8'
  }
  
  const shadows = {
    none: '',
    small: 'shadow-sm',
    normal: 'shadow-sm',
    large: 'shadow-lg'
  }
  
  const baseClasses = 'bg-white rounded-xl border border-gray-100'
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : ''
  
  const classes = `${baseClasses} ${shadows[shadow]} ${paddings[padding]} ${hoverClasses} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
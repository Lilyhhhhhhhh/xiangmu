export default function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = true,
  ...props 
}) {
  const baseClasses = 'bg-white rounded-xl shadow-sm border border-gray-100'
  const hoverClasses = hover ? 'hover:shadow-md transition-shadow duration-200' : ''
  const paddingClasses = padding ? 'p-6' : ''
  
  const classes = `${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
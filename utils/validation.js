// 表单验证工具函数

/**
 * 验证手机号格式
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证邮箱格式
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证密码强度
 * 至少8位，包含大小写字母、数字
 */
export const validatePassword = (password) => {
  if (password.length < 8) return false
  
  const hasLowerCase = /[a-z]/.test(password)
  const hasUpperCase = /[A-Z]/.test(password)
  const hasNumbers = /\d/.test(password)
  
  return hasLowerCase && hasUpperCase && hasNumbers
}

/**
 * 验证密码强度（更严格版本，包含特殊字符）
 */
export const validateStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

/**
 * 验证必填字段
 */
export const validateRequired = (value) => {
  return value !== null && value !== undefined && String(value).trim() !== ''
}

/**
 * 验证字符串长度
 */
export const validateLength = (value, min = 0, max = Infinity) => {
  if (!value) return min === 0
  const length = String(value).length
  return length >= min && length <= max
}

/**
 * 验证数字范围
 */
export const validateNumberRange = (value, min = -Infinity, max = Infinity) => {
  const num = Number(value)
  return !isNaN(num) && num >= min && num <= max
}

/**
 * 获取密码强度描述
 */
export const getPasswordStrength = (password) => {
  if (!password) return { level: 0, text: '请输入密码' }
  
  let score = 0
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[@$!%*?&]/.test(password)
  }
  
  Object.values(checks).forEach(check => {
    if (check) score++
  })
  
  if (score < 2) return { level: 1, text: '弱', color: 'red' }
  if (score < 4) return { level: 2, text: '中等', color: 'yellow' }
  return { level: 3, text: '强', color: 'green' }
}

/**
 * 表单验证器类
 */
export class FormValidator {
  constructor() {
    this.rules = {}
    this.errors = {}
  }
  
  // 添加验证规则
  addRule(field, rule) {
    if (!this.rules[field]) {
      this.rules[field] = []
    }
    this.rules[field].push(rule)
    return this
  }
  
  // 验证单个字段
  validateField(field, value) {
    const fieldRules = this.rules[field] || []
    
    for (const rule of fieldRules) {
      const result = rule.validator(value)
      if (!result) {
        this.errors[field] = rule.message
        return false
      }
    }
    
    delete this.errors[field]
    return true
  }
  
  // 验证所有字段
  validate(data) {
    this.errors = {}
    let isValid = true
    
    Object.keys(this.rules).forEach(field => {
      const fieldValid = this.validateField(field, data[field])
      if (!fieldValid) {
        isValid = false
      }
    })
    
    return isValid
  }
  
  // 获取错误信息
  getErrors() {
    return { ...this.errors }
  }
  
  // 获取单个字段错误
  getError(field) {
    return this.errors[field]
  }
  
  // 清除错误
  clearErrors() {
    this.errors = {}
  }
  
  // 清除单个字段错误
  clearError(field) {
    delete this.errors[field]
  }
}
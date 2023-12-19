export const useRegexRule = (regex, message, trigger = ['blur', 'change']) => {
  return {
    validator: (rule, value, callback) => {
      if (!value) {
        callback()
      }
      if (!regex.test(value)) {
        callback(new Error(message))
      } else {
        callback()
      }
    },
    trigger: trigger
  }
}
  
/**
 * 只能输入字母或数字
 */
export const alphaNumericRegex = /^[a-zA-Z0-9]+$/

/**
 * 11位或13位数字
 */
export const $11_13NumericRegex = /^(\d{11}|\d{13})$/

/**
 * 15位数字
 */
export const $15NumericRegex = /^\d{15}$/

/**
 * 以XX开头加四位数字进行组合 XX_xxxx
 */
 export const XX_4NumericRegex = /^XX\d{4}\b$/
 
/**
 * 7-15 位数字
 */
 export const $7To15NumericRegex = /^\d{7,15}$/

/**
 * 支持数字、字母、中文、下划线、短横线、-号
 */
export const nameRegex = /^[\u4e00-\u9fa5_a-zA-Z0-9.()（）-]+$/

/**
 * 支持数字、字母、中文、下划线、短横线、-+号
 */
export const nameRegexWithPlus = /^[\u4e00-\u9fa5_a-zA-Z0-9.()（）-]+$/

/**
 * 支持数字、字母、下划线、短横线、-号
 */
export const codeRegex = /^[A-Za-z0-9-_]+$/

/**
 * 限制输入内容为数字、字母、中文、下划线、短横线、-+号
 */
export const limitEnterDefault = '[^0-9a-zA-Z\u4e00-\u9fa5_\\-+]'

/**
 * 限制输入数字、字母、下划线、短横线、-号
 */
export const limitEnterCode = '[^a-zA-Z0-9_-]'

/**
 * 限制输入内容只能为数字和
 * [^-0-9.]  支持负数
 */
export const limitEnterNumeric = '[^0-9.]'

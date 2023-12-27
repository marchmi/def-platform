/**
 * Created By: Marchmi
 * CreateTime: 2023-11-26 17:57
 * LastEditTime: 2023-11-26 17:57
 */
import { onMounted, markRaw } from "vue"
import useEnumStore from '@/store/modules/useEnumStore'
const enunStore = useEnumStore()
const useTableDef = (module = {}) => {
  let { options: cofOptions = {}, fields, table, form, filter } = module

  /**
   * 获取表格视图字段配置
   * @returns Array
   */
  function getTableFields () {
    const result = markRaw([])
    if(table) {
      table.forEach(fieldName => {
        const { props, ...fieldAttrs } = fields[fieldName]
        result.push({
          key: fieldName,
          ...fieldAttrs
        })
      })
    }
    return result
  }

  /**
   * 获取搜索框视图字段配置
   * @returns Array
   */
  function getFilterFields () {
    const result = markRaw([])
    if(filter) {
      filter.forEach(fieldName => {
        const { require, format, props, ...fieldAttrs } = fields[fieldName]
        // 向字段信息中加入选项数据
        setFieldOptions(fieldAttrs, cofOptions[fieldName], fieldName)
        result.push({
          key: fieldName,
          ...fieldAttrs
        })
      })
    }
    return result
  }

  /**
   * 获取表单视图字段配置
   * @returns Array
   */
  function getFormFields () {
    const formFields = markRaw([])
    const rules = markRaw({})
    if(form) {
      form.forEach(fieldName => {
        const { require, format, ...fieldAttrs } = fields[fieldName]
        if(require) {
          rules[fieldName] = [
            { required: true, message: `缺少${fieldAttrs.label}`, trigger: 'blur' },
          ]
        }
        // 向字段信息中加入选项数据
        setFieldOptions(fieldAttrs, cofOptions[fieldName], fieldName)
        formFields.push({
          key: fieldName,
          ...fieldAttrs
        })
      })
    }
    return {
      formFields,
      rules
    }
  }

  /**
   * 获取深层元素的引用
   * @param {*} items 
   */
  function getItemRefer (items) {
    const rtn = {}
    items.forEach( item => {
      rtn[item.key] = item
    })
    return rtn
  }

  /**
   * 设置选项数据
   * @param {*} origin 
   * @param {*} value 
   */
  function setFieldOptions (origin, value,fieldName) {
    !origin.props && (origin.props = {})
    if(enunStore[fieldName]) {
      origin.props.options = enunStore[fieldName]
      return
    }
    if(!value) {
      return
    }
    origin.props.options = serializeOption(value)
  }

  /**
   * 序列化配置数据中的选项数据
   * @param {*} _arr 
   * @returns 
   */
  function serializeOption (_arr) {
    return _arr.map(option => {
      const sli = option.split('&')
      return { key: sli[0], value: sli[1] }
    })
  }

  onMounted(() => {
    fields = null
    table = null
    form = null
    filter = null
  })
  return {
    getTableFields,
    getFilterFields,
    getFormFields,
    getItemRefer
  }
}
export default useTableDef
 
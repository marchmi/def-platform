import { limitEnterDefault } from '@/plugins/useRegexRule'

/**
 * 获取光标位置
 * @param elObject: getElementsByTagName('INPUT')
 * @returns {number}: 光标位置
 */
function getCursorPos (elObject) {
  let CaretPos = 0
  // IE Support
  if (document.selection) {
    elObject.focus() // 获取光标位置函数
    const Sel = document.selection.createRange()
    Sel.moveStart('character', -elObject.value.length)
    CaretPos = Sel.text.length
  } else if (elObject.selectionStart || elObject.selectionStart === 0) { // Firefox/Safari/Chrome/Opera support
    CaretPos = elObject.selectionEnd
  }
  return (CaretPos)
}
  
/**
 * 设置光标位置
 * @param elObject: getElementsByTagName('INPUT')
 * @param pos: 光标位置
 */
function setCursorPos (elObject, pos) {
  // Firefox/Safari/Chrome/Opera
  if (elObject.setSelectionRange) {
    elObject.setSelectionRange(pos, pos)
  } else if (elObject.createTextRange) { // IE
    const range = elObject.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}
  
const addListener = (el, type, fn) => {
  el.addEventListener(type, fn, false)
}
  
/**
 * 不允许输入空格
 * @param el
 */
const noSpace = (el) => {
  addListener(el, 'keyup', () => {
    const pos = getCursorPos(el) - 1
    const oldValue = el.value
    el.value = el.value.replace(/[\s]/g, '')
    if(oldValue!==el.value){
      setCursorPos(el, pos)
    }
    el.dispatchEvent(new Event('input'))
  })
}
  
/**
 * 去首位空格
 * @param el
 */
const trim = (el) => {
  addListener(el, 'blur', () => {
    el.value = el.value.trim()
    el.dispatchEvent(new Event('input'))
  })
}

/**
 * 根据正则替换内容
 * @param el
 * @param regex
 */
 const formatValue = (el, regex) => {
  addListener(el, 'keyup', (e) => {
    console.log(e, el.value)
    const pos = getCursorPos(el) - 1
    const oldValue = el.value
    el.value = el.value.replace(regex, '')
    if(oldValue!==el.value){
      setCursorPos(el, pos)
    }
    el.dispatchEvent(new Event('input'))
  })
}

/**
 * example: v-input:noSpace="'trim'"
 * binding: {
 *   arg: 'noSpace',
 *   value: 'trim' 
 * }
 */
const input = {
  mounted (el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    switch (binding.arg) {
      case 'noSpace':
        noSpace(el)
        break
      case 'trim':
        trim(el)
        break
      default:
        noSpace(el)
    }
    // 限制用户只能输入数字、字母、中文、下划线、短横线、-+号
    let regex = new RegExp(limitEnterDefault, 'g')
    if (binding.value) {
      regex = new RegExp(binding.value, 'g')
    }
    formatValue(el, regex)
  }
}

export default input


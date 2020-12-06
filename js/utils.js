
function formatDate(date, fmt) {
  // 1. 获取年份
  if (/(y+)/.test(fmt)) {
  // RegExp.$1 是一个全局对象表示放回/(y+)/.text(fmt)中匹配到的正则表达式
  // 比如fmt = 'yyyy-MM-dd' RegExp.$1 表示 yyyy
  fmt = fmt.replace(RegExp.$1, (date.getFullyear()+' ').substr(4 - RegExp.$1.length))
  }
  //2. 获取
  let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
  }

  for (let item in o) {
      if (new RegExp(`(${item})`).test(fmt)) {
          let str = o[item] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

function addEvent(el, type, fn ,useCapture) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, useCapture)
    return true
  } else if (el.attachEvent) {
    let res = el.attachEvent('on'+ type, fn)
  }else {
    el['on' + type] = fn
  }
}
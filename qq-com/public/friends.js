window['{{xxx}}']({{ data }})
// 这里的 window['{{xxx}}']({{ data }}) 没有什么作用，只是占一个位置，防止和其它代码有重复，所以叫占位符；如果只有一行代码，那么，写不写都无所谓。
// 赋值写法：window.xxx = {{ data }}，window.xxx 在浏览器中已被声明，但 xxx 要用随机数，防止被占用
// 函数写法：window.xxx({{ data }})，即 window['{{xxx}}']({{ data }})


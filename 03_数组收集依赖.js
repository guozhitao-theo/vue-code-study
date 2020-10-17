const { Observer } = require("./02_array拦截器变化侦测")

// 
defindeReactive(data, key, val) {
  let childOb = observer(val) // 修改
  // if (typeof val === 'object') new Observer(val)
  let dep = new dep()
  Object.defineProperty(data, key, {
    enumerable: true, // 是否可枚举
    configurable: true, // 属性是否可可被修改删除
    get: function () { // 属性被使用的时候触发
      dep.depend(); // 获取数组依赖
      if (childOb) {
        childOb.dep.depend()
      }
      return val
    },
    set: function (newVal) { // 修改属性的时候触发
      if (val === newVal) {
        return 
      }
      dep.notify() // 触发 属性 更新
      val = newVal // 将属性值设置为新的 值
    }
  })
}

// 依赖列表存在哪
//  数组的 依赖存放在 Observer 中，因为在getter 中可以访问到Observer 实例， 同时在 Array 拦截器 中也可以访问到Observer 实例
export class Observer {
  constructor (value) {
    this.value = value;
    this.dep = new dep() // 新增dep
    if (Array.isArray(value)) {
      const augment = hasProto
      ? protoAugment
      : copyAugmnent
    augment(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }
}

/**
 * 尝试为 value 创建一个 Observer 实例
 * 如果创建成功，直接返回新创建的 Observer 实例。
 * 如果 value 已经存在一个Observer 实例，则直接返回他
 */

 export function observer (value, asRootData) {
   if (!isObject(value)) { // 
     return 
   }
   let ob;
   if(hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
     ob = value.__ob__;
   } else {
     ob = new Observer(value)
   }
   return ob
 }

 // 在拦截器中获取Obsever 实例

 // 工具函数 向value 中新增一个不可枚举的属性
 function def (obj, keym, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable, // 保证传入的 值是Boolean
    writable: true, // 属性的值 是否能改变
    configurable: true, // 属性的 描述符是否可以 更改
  })
 }
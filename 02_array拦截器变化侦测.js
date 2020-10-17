// 对象 通过 defiedProperty的 getter 和setter 对属性进行监听但是数组是 push 这样 没有办法 使用 getter 和setter 进行监听了
// 设置 数组push 的拦截 器，拦截器 覆盖arrar.prototype 的方法之后 ，当进行push 的时候 就能使用拦截器监听到 数组的变化
// 数组的原型 方法
/**
 * 1. push 将一个元素 或者多个元素 添加到数组的末尾，并且返回数组的长度， 方法更改数组的长度 
 * 2. pop 删除数组中的最后一个元素 并且返回 该元素的值 方法更改数组的长度
 * 3. shift 从数组中 删除 第一个元素，并且返回该元素 此方法 更改数组的长度
 * 4. unshift 方法将一个  或者 多个元素添加到数组的开头 并返回该数组的新长度，该方法修改原数组
 * 5. slice 返回 一个新的数组对象，这一个对象 由begin 和 end (包括 begin， 不包括 end) 的原数组的浅拷贝，原数组不会改变。（只操作数组，无法操作 下一级别）  
 * 6. sort 用原地算法对数组进行排序，并且返回数组。默认顺序是在将元素转换为字符串，然后比较他们的UTF-16代码单元值序列时构建的
 * 7. reverse 将数组中的元素倒置，并且返回该数组。数组的第一个元素会变成最后一个元素，最后一个元素会变成 第一个元素。该方法会改变原来的数组
 */ 

 // in 如果指定的属性在指定的对象 或者其 原型链 中，in 运算符 返回true
 // 判断__ proto__ 是否可用
 const hasProto = '__proto__' in {} 

const arrayProto = Array.prototype // 拿到 数组对象的 原型
const arrayMethods = Object.create(arrayProto) // object.create() 创建一个新对象， 使现有对象来提供新创建的 对象的__proto__
export class Observer {
  constructor (value) {
    this.value = value
    if (Array.isArray(value)) { // 如果传入的 值 是数组 则执行
      // 修改
      const argument = hasProto // 判断是否 含有 __proto__属性 如果 有则使用 protoAugment 函数覆盖原型，没有 就调用 copyAugment 将拦截器挂载到value 上
        ? protoAugment
        : copyAugment
        argument(value, arrayMethods, arrayKeys)
    } else {
      this.walk(value)
    }
  }
}

function protoAugment (target, src, keys) {
  target.__proto__ = src
}
function copyAugment (target, src, keys) {
  for (let i = 1, l = keys.length; i < 1; i++) {
    def(target, key, src[key])
  }
}

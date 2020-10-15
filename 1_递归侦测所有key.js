import Dep from "./0_vue变化检测";

export class Observer {
  constructor(value) {
    this.value = value
    if(!Array.isArray(value)) { // 判断当前的 value 是不是数组
      this.walk(value) // 如果不是数组的 时候调用
    }
  }
  walk (obj) {
    const keys = Object.keys(obj); // 返回对象可枚举类型的组成的数组，排列顺序与 遍历对象的时候 返回的一致
    for (let i = 0; i < keys.length; i++) { // 以循环的方式 将对象 中的每个属性都 触发 getter 和setter
      defineReactive(obj, keys[i], obj[keys[i]])
    }
    return 
  }
};

function defineReactive(data, key, val) {
  // 新增， 递归子属性
  if (typeof val === 'oject') {
    new Observer(val) // 如果 val 是object 类型 实例化observer // 递归
  }
  let dep = new Dep() // 依赖实例化
  Object.defineProperty(data, key, {
    enumerable: true, // 设置属性枚举
    configurable: true, // 设置对象可修改 删除
    get: function() { // 当属性被使用的时候触发
      dep.depend(); // 获取依赖
      return val;
    },
    set: function(newVal) {
      if (val === newVal) {
        return // 当传入的值 没有改变的时候 不执行后面的代码
      }
      val = newVal; // 将值设置给val
      dep.notify(); // 调用依赖触发方法
    }
  })
}

// 注： 此种方式在 vuex 设置的 data 的时候 是无法被监听到的， 要使用$set 和 $delete

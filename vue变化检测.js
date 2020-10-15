// var object = {
// 	name:'liwudi',
// 	 age:34
// }
// function changeIt(object) {

// 	 function descripterFun(value) {
// 			 return {
// 					 enumerable: true,
// 					 get: function () {
// 							 console.log('get it');
// 							 return value;
// 					 },
// 					 set: function (newvalue) {
// 							 console.log('set it');
// 							 value = newvalue;
// 					 }
// 			 }
// 	 }
// 	 for(var i in object){
// 			 Object.defineProperty(object, i, descripterFun(object[i]))
// 	 }
// }
// changeIt(object);
// console.log(object.name);
// object.name = '我是中国人';
// console.log(object);



// 使用 Object.defineProperty 侦测 对象的变化
function defineReactive (data, key, val) {
	let dep = new Dep() // 依赖 类 实例化
	Object.defineProperty(data, key, {
		enumerable: true, // 当该属性为 true 的时候属性才会出现在 对象的枚举类型中
		configurable: true, // 该属性 为true 时 该属性的描述符才能改变，同时属性也能从对应的对象上被删除
		get: function (val) { // 给属性设置值的时候 会触发, 在getter(被使用)的时候 收集依赖（收集 哪些地方使用了该属性）
			dep.depend() // 收集依赖
			return val;
		},
		set: function (newVal) {
			if (val === newVal) { // 当 属性无变化的时候 不往后执行， 在setter(属性改变)的时候 触发依赖（在使用该属性的地方，进行更新）
				return;
			}
			val = newVal
			dep.notify() // 触发依赖
		}
	})
}
// 依赖管理
export default class Dep {
	constructor () {{
		this.subs = []; // 依赖数组
	}}

	addSub (sub) { // 添加依赖
		this.sub.push(sub);
	}

	removeSub (sub) { // 删除依赖
		remove(this.subs, sub) // 该方法需要单独封装
	}

	depend () { // 获取依赖的方法
		if (window.target) { // window.target为 依赖
			this.addSub(window.target)
		}
	}

	notify () { // 触发依赖
		const subs = this.subs.slice() // 深拷贝 操作不会影响原数据
		for (let i = 0, l = subs.length; i < l; i++) {  // 循环触发 依赖更新
			subs[i].update() // update 方法触发依赖更新
		} 
	}
}

// 封装 移除 数组中的元素
function remove (arr, item) {
	if (arr.length) { // 如果数组 不为空
		const index = arr.indexOf(item) // 拿到元素下标
		if (index > -1) { // 传入元素 是否在数组中存在
			return arr.splice(index, 1) // 改变原数组
		}
	}

}


// watcher  监听属性变化的 类
export default class Watcher {
	constructor(vm, exOrFn, cb) { // vue 实例， 表达式或者函数， cb 表示回调函数
		this.vm = vm

	}
	get() { // 获取旧的属性
		window.target = this; // 将 watcher 自己赋值给 依赖
		let value = this.getter.call(this.vm, this.vm); // 将 this.vm 通过call() 作为参数 传给自己调用 getter() 以触发收集依赖逻辑
		window.target = undefined;
		return value

	}
}
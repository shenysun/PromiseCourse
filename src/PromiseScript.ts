/**Promise 的简单概念 */
class PromiseScript {
	public constructor() {
		this.init();
	}
	private init() {
		// this.easyPromise(); //resolve的用法
		// this.orderGo(); //顺序执行操作
		
		this.rejectPromise().then( //reject的用法
			(data)=> {
				console.log(data);
			},
			(data)=> {
				console.log(data);
			}
		)
	}
	/**一个简单的Promise, resolve的用法 */
	private easyPromise() {
		let any_1 = new Promise((resolve, reject)=> {
			setTimeout(()=> {
				console.log("1s后执行");
				resolve("Promise执行完毕")
			}, 1000);
		})
		
		any_1.then((data)=> {
			console.log(data);
		})
	}
	/**顺序执行Promise */
	private orderGo() {
		// // -------------链式------------------
		// this.firPromise().then((data)=> {
		// 	console.log(data);
		// 	return this.secPromise();
		// })
		// .then((data)=> {
		// 	console.log(data);
		// 	return this.thirdPromise();
		// })
		// .then((data)=> {
		// 	console.log(data);
		// 	console.log("三个Promise全部执行完毕");
		// })
		// // --------------链式-----------------

		// // -------------all用法---------------
		// Promise.all([this.firPromise(), this.secPromise(), this.thirdPromise()])
		// .then((datas)=> {
		// 	console.log(datas);
		// })
		// // -------------all用法---------------
		
	}

	private firPromise(): Promise<any> {
		let result = new Promise((resolve, reject)=> {
			setTimeout(function() {
				console.log("执行第一个Promise, 500ms");
				resolve("第一个执行完毕");
			}, 500);
		})
		return result;
	}

	private secPromise(): Promise<any> {
		let result = new Promise((resolve, reject)=> {
			setTimeout(function() {
				console.log("执行第二个Promise, 300ms");
				resolve("第二个执行完毕")
			}, 300);
		})
		return result;
	}

	private thirdPromise(): Promise<any> {
		let result = new Promise((resolve, reject)=> {
			setTimeout(function() {
				console.log("执行第三个Promise, 200ms");
				resolve("第三个执行完毕")
			}, 200);
		})
		return result;
	}
	/**错误回调 */
	private rejectPromise(): Promise<any> {
		let result = new Promise((resolve, reject)=> {
			let math: number = Math.floor(Math.random() * 10);
			if(math >= 5) {
				resolve("随机数大于5: " + math);
			} else {
				reject("随机数小于5");
			}
		})
		return result;
	}
	

}
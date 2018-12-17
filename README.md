# 【菜鸟教程】Promise的用法讲解

Promise是一个构造函数，其自身有`resolve`  `reject`  `all` 等方法，原型上有`then`   `catch` 等方法。

本文会着重讲解以下内容：

- resolve和reject的用法

- all的用法

- 重点讲解then的使用


本教程所用引擎版本：5.2.13

本教程源码链接：

#### 最简单的Promise

```typescript
        let any_1 = new Promise((resolve, reject)=> {
			setTimeout(()=> {
				console.log("经过1s，开始执行");
				resolve("Promise执行完毕")
			}, 1000);
		}) 
```

```typescript
 /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
    
```

Promise的构造函数接收一个函数的参数，此函数有两个参数：`resolve` ,  `reject`，分别表示一步操作执行成功和异步执行失败的后的回调函数。

运行上面代码显而易见，一秒后会执行“经过1s，开始执行”，并调用resolve方法。
![](https://ws1.sinaimg.cn/large/7283f971ly1fy9ph13lbfj20p000xq2q.jpg)

到了这里会有很多人开始疑问，这个`resolve`是什么，也并没有用，并没有执行。

#### resolve的使用
上文提到`resolve` ,  `reject`，分别表示一步操作执行成功和异步执行失败的后的回调函数。
那么Promise函数完毕之后如何让这两个函数执行呢？

执行下面代码：

```typescript
	    let any_1 = new Promise((resolve, reject)=> {
			setTimeout(()=> {
				console.log("1s后执行");
				resolve("Promise执行完毕")
			}, 1000);
		})
		
		any_1.then((data)=> {
			console.log(data);
		})
```

控制台LOG：

![](https://ws1.sinaimg.cn/large/7283f971ly1fy9pr4512hj20p001s746.jpg)

Promise对象调用`then`方法，`then`接收一个函数参数，并且会拿到Promise执行成功回调`resolve`函数的参数。这即是Promise的作用了。简单来讲，就是能把原来的回调写法分离出来，在异步操作执行完后，用链式调用的方式执行回调函数。

#### 链式操作的用法

Promise相对于普通的回调函数（callback）来说从从表面上来说可以简化层层回调的写法，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。

下面看一段代码：

```typescript
	/**顺序执行Promise */
	private orderGo() {
		this.firPromise().then((data)=> {
			console.log(data);
			return this.secPromise();
		})
		.then((data)=> {
			console.log(data);
			return this.thirdPromise();
		})
		.then((data)=> {
			console.log(data);
			console.log("三个执行完毕");
		})
	}
```

按照顺序，每隔一段时间执行一个异步回调，在`firPromise`方法中传给`resolve`的数据，可以再接下来的`then`方法中拿到，下面运行结果：

![](https://ws1.sinaimg.cn/large/7283f971ly1fy9qihy619j20p005naaf.jpg)

`firPromise`   `secPromise`   `thirdPromise` 三个方法的定义如下：

```typescript
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

```

#### reject的用法

到这里大家应该对Promise有了大概的认知，前面笔者只介绍了`resolve`的用法，还没有介绍`reject`的用法，下面通过一个简单的例子来捕捉失败的回调：

```typescript
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
```

调用 `rejectPromise`方法

```typescript
this.rejectPromise().then( //reject的用法
	(data)=> {
		console.log(data);
	},
	(data)=> {
		console.log(data);
	}
)
```

上面这段代码，随机数如果大于5代表成功了，反而代表失败了执行`reject`方法，运行结果有两种：

![](https://ws1.sinaimg.cn/large/7283f971ly1fy9rnt8cmvj20p000t3yb.jpg)

![1545031176585](C:\Users\shenysun\AppData\Roaming\Typora\typora-user-images\1545031176585.png)



#### all的用法

Promise的 `all` 提供并行执行异步操作的能力，并且在所有异步操作执行完毕之后才执行回调。依旧使用上面第一的三个方法，`all`用法如下：

```typescript
		// -------------all用法---------------
		Promise.all([this.firPromise(), this.secPromise(), this.thirdPromise()])
		.then((datas)=> {
			console.log(datas);
		})
		// -------------all用法---------------
```

运行结果：

![](https://ws1.sinaimg.cn/large/7283f971ly1fy9r4f7crmj20p0067aah.jpg)

`all`方法并行执行三个Promise对象，并把所有异步执行的结果放进一个数组中传递给`then`，就是上面的`datas`。

#### 在实际开发中的用法

先看一个在Egret上常用的方法`getResByUrl`的使用：

```typescript
RES.getResByUrl("resource/assets/egret_icon.png", (data)=> {
	let icon: egret.Bitmap = new egret.Bitmap(<egret.Texture>data);
	this.addChild(icon);
}, this, RES.ResourceItem.TYPE_IMAGE);	 
```

API中：

```javascript
function getResByUrl(url: string, compFunc?: Function, thisObject?: any, type?: string): Promise<any>;
```

可以看到`getResByUrl` 加载一个路径的图片资源，加载完成后执行`comFunc`回调函数，通过回调函数加载此图片资源，显示出来。我们可以拆分一下这个步骤，如下：

```typescript
	private urlGetImg() {
		let result: Promise<any> = RES.getResByUrl("resource/assets/egret_icon.png");
		result.then((data)=> {
			let icon: egret.Bitmap = new egret.Bitmap(<egret.Texture>data);
            icon.x = egret.MainContext.instance.stage.stageWidth - icon.width;
			this.addChild(icon);
		})
	}
```

二者结果相同，都可以通过路径把图片加载出来。

![](https://ws1.sinaimg.cn/large/7283f971ly1fy9t93l2jdj20cd06hdfw.jpg)

下面另外一个例子，参考Nasus

创建5 * 5个对象，异步依次执行一系列操作，效果如下图。

![](https://ws1.sinaimg.cn/large/7283f971ly1fy9uxngec9g212p0p4dy8.jpg)

本次所有行为执行完毕之后，才可以进入下一次操作。使用到`tween`第三方库，源码如下：

```typescript
private orderTW() {
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				let map: egret.Bitmap = new egret.Bitmap(RES.getRes("egret_icon_png"));
				map.anchorOffsetX = map.width / 2;
				map.anchorOffsetY = map.height / 2;
				map.x = map.width * j;
				map.y = map.height * i;
				this._layer.addChild(map);
				this._layer.x = egret.MainContext.instance.stage.stageWidth / 2 - this._layer.width / 2;
				this._layer.y = egret.MainContext.instance.stage.stageHeight / 2 - this._layer.height / 2;
			}
		}
		//当前下标
		let index: number = 0;
		//执行动作的Promise
		let twPromise = () => {
			console.log(`执行${index}次`);
			return new Promise((resolve1, reject) => {
				egret.Tween.get(this._layer.getChildAt(index)).to({
					rotation: 30
				}, 400).to({
					rotation: -30
				}, 400).to({
					alpha: 0
				}, 200).call(() => { 
					resolve1(index++);
				})
			})
		}
		//切换对象的Promise
		let orderPromise = () => {
			return new Promise((resolve2, reject) => {
				twPromise().then(() => {
					if (index < this._layer.numChildren) resolve2(orderPromise())
					else resolve2("执行完毕")
				})
			})
		}
		orderPromise();
	}
```

定义两个`Promise`方法，分别为`tween`动画的`twPromise`和执行`twPromise`方法的`orderPromise`方法，`orderPromise`在初始的时候执行，执行此方法会调用`twPromise`方法和`twPromise`的`then`方法，其中`then`方法会调用`index++`，也就是一个对象执行一系列`tween`动画后，切换下一个对象，然后通过`resolve2(orderPromise())`使整个过程走完。



#### 小结

本教程通过初入`Promise`到完成一个简单的Demo，由浅入深学习了`Promise`的用法，如果有兴趣也可以学习下`catch` `race`的用法。通过本教程，您可以学到以下知识点：

- `Promise`是什么
- `Promise`的常用两个函数`resolve` `reject`的使用
- 链式操作和`all`的用法
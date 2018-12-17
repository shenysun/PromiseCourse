var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**Promise 的简单概念 */
var PromiseScript = (function () {
    function PromiseScript() {
        this.init();
    }
    PromiseScript.prototype.init = function () {
        // this.easyPromise(); //resolve的用法
        // this.orderGo(); //顺序执行操作
        this.rejectPromise().then(//reject的用法
        function (data) {
            console.log(data);
        }, function (data) {
            console.log(data);
        });
    };
    /**一个简单的Promise, resolve的用法 */
    PromiseScript.prototype.easyPromise = function () {
        var any_1 = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("1s后执行");
                resolve("Promise执行完毕");
            }, 1000);
        });
        any_1.then(function (data) {
            console.log(data);
        });
    };
    /**顺序执行Promise */
    PromiseScript.prototype.orderGo = function () {
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
    };
    PromiseScript.prototype.firPromise = function () {
        var result = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("执行第一个Promise, 500ms");
                resolve("第一个执行完毕");
            }, 500);
        });
        return result;
    };
    PromiseScript.prototype.secPromise = function () {
        var result = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("执行第二个Promise, 300ms");
                resolve("第二个执行完毕");
            }, 300);
        });
        return result;
    };
    PromiseScript.prototype.thirdPromise = function () {
        var result = new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log("执行第三个Promise, 200ms");
                resolve("第三个执行完毕");
            }, 200);
        });
        return result;
    };
    /**错误回调 */
    PromiseScript.prototype.rejectPromise = function () {
        var result = new Promise(function (resolve, reject) {
            var math = Math.floor(Math.random() * 10);
            if (math >= 5) {
                resolve("随机数大于5: " + math);
            }
            else {
                reject("随机数小于5");
            }
        });
        return result;
    };
    return PromiseScript;
}());
__reflect(PromiseScript.prototype, "PromiseScript");

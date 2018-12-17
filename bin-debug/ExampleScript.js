var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**举个栗子 */
var ExampleScript = (function (_super) {
    __extends(ExampleScript, _super);
    function ExampleScript() {
        var _this = _super.call(this) || this;
        _this._layer = new egret.Sprite();
        _this.addChild(_this._layer);
        _this.init();
        return _this;
    }
    ExampleScript.prototype.init = function () {
        // this.urlGetImg();
        this.orderTW();
    };
    /**通过url加载img */
    ExampleScript.prototype.urlGetImg = function () {
        var _this = this;
        /**传统 */
        RES.getResByUrl("resource/assets/egret_icon.png", function (data) {
            var icon = new egret.Bitmap(data);
            _this.addChild(icon);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        /**拆分 */
        var result = RES.getResByUrl("resource/assets/egret_icon.png");
        result.then(function (data) {
            var icon = new egret.Bitmap(data);
            icon.x = egret.MainContext.instance.stage.stageWidth - icon.width;
            _this.addChild(icon);
        });
    };
    ExampleScript.prototype.orderTW = function () {
        var _this = this;
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                var map = new egret.Bitmap(RES.getRes("egret_icon_png"));
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
        var index = 0;
        //执行动作的Promise
        var twPromise = function () {
            console.log("\u6267\u884C" + index + "\u6B21");
            return new Promise(function (resolve1, reject) {
                egret.Tween.get(_this._layer.getChildAt(index)).to({
                    rotation: 30
                }, 400).to({
                    rotation: -30
                }, 400).to({
                    alpha: 0
                }, 200).call(function () {
                    resolve1(index++);
                });
            });
        };
        //切换对象的Promise
        var orderPromise = function () {
            return new Promise(function (resolve2, reject) {
                twPromise().then(function () {
                    if (index < _this._layer.numChildren)
                        resolve2(orderPromise());
                    else
                        resolve2("执行完毕");
                });
            });
        };
        orderPromise();
    };
    return ExampleScript;
}(egret.Sprite));
__reflect(ExampleScript.prototype, "ExampleScript");

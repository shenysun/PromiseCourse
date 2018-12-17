/**举个栗子 */
class ExampleScript extends egret.Sprite {
	private _layer: egret.Sprite = new egret.Sprite();
	public constructor() {
		super();
		this.addChild(this._layer);
		this.init();
	}
	private init() {
		// this.urlGetImg();
		this.orderTW();

	}
	/**通过url加载img */
	private urlGetImg() {
		/**传统 */
		RES.getResByUrl("resource/assets/egret_icon.png", (data) => {
			let icon: egret.Bitmap = new egret.Bitmap(<egret.Texture>data);
			this.addChild(icon);
		}, this, RES.ResourceItem.TYPE_IMAGE);
		/**拆分 */
		let result: Promise<any> = RES.getResByUrl("resource/assets/egret_icon.png");
		result.then((data) => {
			let icon: egret.Bitmap = new egret.Bitmap(<egret.Texture>data);
			icon.x = egret.MainContext.instance.stage.stageWidth - icon.width;
			this.addChild(icon);
		})
	}

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

}
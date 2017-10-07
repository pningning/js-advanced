
//绑定事件的函数封装
function bind(obj,evType,evFn) {
	if(obj.addEventListener) {
		obj.addEventListener(evType,evFn,false);
	}else if(obj.attachEvent) {
		obj.attachEvent("on"+evType,evFn);
	}else {
		obj["on"+evType] = evFn;
	}
}

(function(window) {
			//创建一个构造函数
			function Game(map) {
				//把食物对象实例化，作为game的属性
				this.food = new Food();
				//把蛇对象实例化，作为game的属性
				this.snake = new Snake();
				
				///把地图对象挂载到当前的this上
				this.map = map;
			}
			//给游戏构造函数的原型添加一个开始游戏方法，
			Game.prototype.start = function() {
				this.food.render(this.map);//食物渲染调用
				this.snake.render(this.map);//蛇渲染调用
				runSnake(this);//运动函数调用\
				bindKey(this);//键盘函数调用
			}
			
			//创建一个私有运动函数
			function runSnake(that) {
				//开启定时器
				var timer = setInterval(function() {
					that.snake.move(that.food,that.map);//调用蛇移动方法
					
					//自动运动的时候判断是否撞墙
					//获取到蛇头的坐标
					var headX = that.snake.body[0].x*that.snake.width;
					var headY = that.snake.body[0].y*that.snake.height;
					//获取到地图x y的最大值坐标
					var maxX = that.map.offsetWidth;
					var maxY = that.map.offsetHeight;
					
					//拿蛇头的坐标跟地图的坐标判断，是否撞墙
					if(headX < 0 || headX >= maxX) {
						//如果进来那么撞墙了
						//清除定时器
						clearInterval(timer);
						alert('Game Over');
						return;//如果撞墙了，下面的代码不执行
					}
					
					if(headY < 0 || headY >= maxY) {
						clearInterval(timer);
						alert("Game Over");
						return;
					}
					
					//移动一次之后在页面上渲染一次
					that.snake.render(that.map);
				},200);
			}
			
			//创建键盘控制函数
			function bindKey(that) {
				bind(document,"keydown",function(ev) {
					ev = ev || event;
					//根据键盘的编码确定蛇头的方向
					switch(ev.keyCode) {
						case 37:
						that.snake.direction = "left";
						break;
						case 39:
						that.snake.direction = "right";
						break;
						case 38:
						that.snake.direction = "up";
						break;
						case 40:
						that.snake.direction = "down";
						break;
					}									
				})
			}
			
			window.Game = Game;
		})(window);
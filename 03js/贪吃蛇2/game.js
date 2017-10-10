//事件绑定函数封装
function bind(obj,evType,evFn) {
	if(obj.addEventLister) {
		obj.addEventLister(evType,evFn,false);
	}else if(obj.attachEvent) {
		obj.attachEvent("on"+evType,evFn);
	}else {
		obj["on" + evType] = evFn;
	}
}

(function(window) {
			
			//游戏对象
			function Game(map) {
				this.food = new Food();//把食物的实例对象作为游戏对象的属性
				this.snake = new Snake();//把蛇的实例对象作为游戏对象的属性
				this.map = map;//把地图作为游戏对象的属性
			}
			
			//给游戏对象的原型添加一个一键开始方法
			Game.prototype.start = function() {
				this.food.render(this.map);//食物渲染
				this.snake.render(this.map);///蛇渲染
				runSnake(this);//调用运动函数并传参
				bindKey(this);///调用键盘控制函数
			}
			
			//让蛇自动动起来 创建一个运动函数
			function runSnake(that) {
				//开启定时器
				var timer = setInterval(function() {
					//让蛇移动起来 调用蛇移动方法
					that.snake.move(that.food,that.map);
					
					//运动的时候判断是否在地图范围内
					//获取到地图的x y 最大值
					var maxX = that.map.offsetWidth;
					var maxY = that.map.offsetHeight;
					
					//获取到蛇头的坐标
					var snakeX = that.snake.body[0].x*that.snake.width;
					var snakeY = that.snake.body[0].y*that.snake.height;
					
					//判断蛇头的位置
					if(snakeX < 0 || snakeX >= maxX) {
						//如果进来说明撞上了
						//清除定时器
						clearInterval(timer);
						alert('Game Over');
						return;//返回，后面的代码不执行
					}
					if(snakeY < 0 || snakeY >= maxY) {
						clearInterval(timer);
						alert("Game Over");
						return;
					}
					
					//再让蛇在页面上渲染一次
					that.snake.render(that.map);
					
				},200)
			}
			
			//创建键盘控制函数
			function bindKey(that) {
				bind(document,"keydown",function(e) {
					e = e || event;
					///根据键盘的编码确定蛇头的方向
					switch(e.keyCode) {
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
					}
				});
			}
			
			window.Game = Game;
		})(window)
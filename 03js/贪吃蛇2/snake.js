//蛇的立即执行函数
		(function(window) {
			
			//创建一个数组，存储添加的元素
			var snakeEles = [];
			//蛇对象
			function Snake(width,height,direction) {
				this.width = width || 20;
				this.height = height || 20;
				this.body = [
					{x:3,y:2,color: "orange"},
					{x:2,y:2,color: "pink"},
					{x:1,y:2,color: "pink"}
				];
				this.direction = direction || "right";
			}
			
			//给蛇对象的原型添加一个渲染方法
			Snake.prototype.render = function(map) {
				
				//渲染之前先删除旧蛇
				remove();//删除函数调用
				
				//循环循环body.创建div
				for(var i = 0; i < this.body.length; i++) {
					var oDiv = document.createElement('div');
					oDiv.style.width = this.width + "px";
					oDiv.style.height = this.height + "px";
					oDiv.style.position = "absolute";
					oDiv.style.left = this.body[i].x*this.width + "px";
					oDiv.style.top = this.body[i].y*this.height + "px";
					oDiv.style.backgroundColor = this.body[i].color;;
					//把创建的div添加到页面上
					map.appendChild(oDiv);
					snakeEles.push(oDiv);//把添加的元素存储到数组中
				}
			}
			
			//给蛇添加一个移动的方法
			Snake.prototype.move = function(food,map) {
				//把蛇身的前一个位置赋给后一个位置  倒叙循环
				for(var i = this.body.length-1; i > 0 ; i--) {
					this.body[i].x = this.body[i-1].x;
					this.body[i].y = this.body[i-1].y;
				}
				
				//蛇头的移动  取决于方向 进行判断
				switch(this.direction) {
					case "right":
					this.body[0].x += 1;
					break;
					case "left":
					this.body[0].x -= 1;
					break;
					case "up":
					this.body[0].y -= 1;
					break;
					case "down":
					this.body[0].y += 1;
					break;
				}
				
				//判断运动过程中蛇头的坐标是否跟食物的坐标相等，来确定是否吃到了食物
				//获取到蛇头的坐标
				var headX = this.body[0].x*this.width;
				var headY = this.body[0].y*this.height;
				//获取食物的坐标  用到食物，要传进来
				var foodX = food.x;
				var foodY = food.y;
				
				//进行判断
				if(headX == foodX && headY == foodY) {
					//如果相等那么吃到了
					//把蛇的最后一节存起来，并放到蛇的最后
					var last = this.body[this.body.length-1];
					var newJie = {
						x: last.x,
						y: last.y,
						color: last.color
					};
					//把这个对象添加到body里面
					this.body.push(newJie);
					//吃掉之后需要重新渲染一下
					food.render(map);
					//吃到食物以后地图颜色随机改变
					map.style.backgroundColor =  "rgb("+Math.round(Math.random()*200)+","+Math.round(Math.random()*200)+","+Math.round(Math.random()*200)+")";
				}
			}
			
			
			//删除旧蛇的函数
			function remove() {
				//创建的蛇数组循环数组
				for(var i = 0; i < snakeEles.length; i++) {
					//找到父节点，删除子节点
					snakeEles[i].parentNode.removeChild(snakeEles[i]);
				}
				//清空数组
				snakeEles = [];
			}
			
			window.Snake = Snake;
		})(window)
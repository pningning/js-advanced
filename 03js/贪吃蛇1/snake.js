(function(window) {
			
			///创建一个蛇的数组变量，用来存往页面上添加的div
			var snakeEles = [];
			
			//构造蛇的构造函数
			function Snake(width,height,direction) {
				this.width = width || 20;
				this.height = height || 20;
				this.body = [
				 {x:3,y:2,color:"red"},
				  {x:2,y:2,color:"orange"},
				  {x:1,y:2,color:"orange"}
				];
				this.direction = direction || "right";
			}
			//让蛇生成，放置在页面上 render
			Snake.prototype.render = function(map) {
				
				//渲染添加之前，先删除一下
				remove();
				//在页面上循环添加div
				for(var i = 0; i < this.body.length; i++) {
					var oDiv = document.createElement("div");
					oDiv.style.width = this.width + "px";
					oDiv.style.height = this.width + "px";
					
					//创建好的额div的偏移值
					oDiv.style.left = this.body[i].x*this.width + "px";
					oDiv.style.top = this.body[i].y*this.height + "px";
					//设置定位
					oDiv.style.position = "absolute";
					oDiv.style.backgroundColor = this.body[i].color;
					//把创建的div添加到页面上
					map.appendChild(oDiv);
					
					//把添加的div在蛇数组里面存储一下
					snakeEles.push(oDiv);
				}
			}
			
			//给蛇添加一个移动方法
			Snake.prototype.move = function(food,map) {
				//想要让蛇前挪动，倒叙循环  把前面的x y 值赋给后面的 这是蛇身移动
				for(var i = this.body.length-1; i > 0; i--) {
					this.body[i].x = this.body[i-1].x;
					this.body[i].y = this.body[i-1].y;
				}
				
				//蛇头的移动。取决于方向
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
				
				//在蛇运动的过程中判断蛇是否吃到了食物，（判断蛇头的坐标是否跟食物的坐标一致）
				//获取蛇头的坐标
				var headX = this.body[0].x*this.width;//这是蛇头的x坐标，因为x是1 2 3 这样的数字，所以要乘以自身的宽度才能统一进行判断
				var headY = this.body[0].y*this.height;//这是蛇头的y坐标
				
				//获取食物的坐标  x.y  
				//要用到食物对象 ，所以要把食物对象传进来
				var foodX = food.x;//食物的x坐标
				var foodY = food.y;//食物的y 坐标
				
				//进行判断
				if(headX == foodX && headY == foodY) {
					//如果坐标相同那么确定吃到了   如果迟到了。把蛇的最后一节添加到最后
					var last = this.body[this.body.length-1];
					var newJie = {
						x: last.x,
						y: last.y,
						color: last.color
					}
					//把这个对象添加到body里面
					this.body.push(newJie);
					//需要重新渲染新的事物
					food.render(map);//渲染之前要先删除旧的事物
					map.style.backgroundColor = "rgb("+Math.round(Math.random()*200)+","+Math.round(Math.random()*200)+","+Math.round(Math.random()*200)+")";
				}				
			}
			
			//创建一个删除原来页面上的旧蛇 的函数
			function remove() {
				//根据蛇数组存的蛇节数，进行循环
				for(var i = 0; i < snakeEles.length; i++) {
					snakeEles[i].parentNode.removeChild(snakeEles[i]);//让map删除蛇头和蛇身
				}
				snakeEles = [];
			}
			
			
			window.Snake = Snake;
		})(window);
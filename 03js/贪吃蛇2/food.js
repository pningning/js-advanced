//		食物立即执行函数
		(function(window) {
			
			//创建一个数组存储添加的食物
			var oldFood = [];
			//食物构造函数对象
			function Food(width,height,x,y,color) {
				this.width = width || 20;//食物的宽
				this.height = height || 20;//食物的高
				this.x = x || 0;//食物的x轴位置
				this.y = y || 0;//食物的y 轴位置
				this.color = color || "green";//食物的颜色
			}
			
			//给食物对象的原型上添加一个渲染方法
			Food.prototype.render = function(map) {
				
				//判断是否有旧食物
				if(oldFood[0]) {
					remove();//如果有，就移除
				}
				//在内存中创建一个div
				var oDiv = document.createElement('div');
				oDiv.style.width = this.width + "px";
				oDiv.style.height = this.height + "px";
				//设置定位
				oDiv.style.position = "absolute";
				//获取到食物的随机坐标
				this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
				this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
				oDiv.style.left = this.x + "px";
				oDiv.style.top = this.y + "px";
				//颜色随机
				this.color = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")";
				oDiv.style.backgroundColor = this.color;
				
				//把div添加到地图上
				map.appendChild(oDiv);
				oldFood.push(oDiv);//把食物存储到数组中
			}			
			
			//创建一个移除旧食物的私有函数
			function remove() {
				oldFood[0].parentNode.removeChild(oldFood[0]);
				oldFood = [];//清空数组
			}
			
			window.Food = Food;//把食物对象挂载到window属性上
		})(window);
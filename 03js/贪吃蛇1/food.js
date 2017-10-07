//食物对象
		
		(function(window) {
			
			//创建一个数组，存储旧的的食物
			var oldFood = [];
			
			function Food(width,height,x,y,color) {
				this.width = width || 20;
				this.height = height || 20;
				this.x = x || 0;
				this.y = y || 0;
				this.color = color || "green";
			}
			Food.prototype.render = function(map) {
				//渲染食物之前，先删除旧的食物
				//判断是否有食物存在
				if(oldFood[0]) {
					remove();//如果存在，调用删除函数
				}
				
				//食物的随机位置
				this.x = parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
				this.y = parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
				//在页面上添加食物
				var oDiv = document.createElement('div');
				//设置食物的样式
				oDiv.style.left = this.x + "px";
				oDiv.style.top = this.y + "px";
				oDiv.style.width = this.width+"px";
				oDiv.style.height = this.height + "px";
				oDiv.style.position = "absolute";
				
				//随机产生颜色
				this.color = "rgb("+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+","+Math.round(Math.random()*255)+")"
				oDiv.style.backgroundColor = this.color;
				//把食物添加到页面上
				map.appendChild(oDiv);
				oldFood.push(oDiv);//把食物存入这个数组
			}
			
			//创建一个删除的私有函数
			function remove() {
				//找到旧食物的负节点（地图），删除旧食物
				oldFood[0].parentNode.removeChild(oldFood[0]);
				oldFood.splice(0,1);//清空数组
			}
			
			//把函数挂载到window对象上
			window.Food = Food;
		})(window);
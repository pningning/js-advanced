(function(window) {
			//构造函数
		function Tab(id) {
			//把元素作为属性放在构造函数里面
			this.parent = document.getElementById(id);
			this.aInp = this.parent.getElementsByTagName('input');
			this.aDiv = this.parent.getElementsByTagName('div');
			this.timer = null;//定时器为空 
			this.num = 0;
			this.isPlay = false;//假设不自动播放
			//执行一个初始化方法
			this.init();
		}
		
		//给构造函数的原型添加一个初始化方法 （将其他所需要调用的方法一同执行）
		Tab.prototype.init = function() {
			var that = this;//存储当前的this
			//给所有的按钮添加单击事件
			for(var i = 0; i < this.aInp.length; i++) {
				this.aInp[i].index = i;//建立索引
				this.aInp[i].onclick = function() {
					that.fnTab(this.index);//切换方法调用并传参
				};
			}
		}
		
		//往构造函数原型上添加一个切换方法
		Tab.prototype.fnTab = function(idx) {
			//这里的this指向的是构造函数内部的隐式对象
			for(var j = 0; j < this.aInp.length; j++) {
				this.aInp[j].className = "";
				this.aDiv[j].style.display = "none";
			}
			//让当前单击的那个按钮加上类
			this.aInp[idx].className = 'active';
			//让对应的那个div显示出来
			this.aDiv[idx].style.display = "block";
		}
		
		//给构造函数的原型上添加一个自动播放的方法
		Tab.prototype.autoPlay = function() {
			clearInterval(this.timer);
			//当自动播放的时候定时器为真
			this.isPlay = true;
			var that = this;//存储当前的this
			this.timer = setInterval(function() {//定时器中的this指向window
				that.num++;
				if(that.num > that.aInp.length-1) {
					that.num = 0;
				}
				that.fnTab(that.num);//切换方法调用
			},1000)
		}
		//添加停止方法
		Tab.prototype.stop = function() {
			this.isPlay = false;
			clearInterval(this.timer);
		}
			window.Tab = Tab;
		})(window)
var LocalCache = (function() {
	if(!window.localStorage) {
		var localStorageClass = {
			options: {
				expires: 60 * 24 * 3600
			},
			// 初始化。添加过期时间
			init: function() {
				var date = new Date();
				date.setTime(date.getTime() + 60 * 24 * 3600);
				this.setItem('expires', date.toGMTString());
			},
			// 内部函数 参数说明(key) 检查key是否存在
			findItem: function(key) {
				var bool = document.cookie.indexOf(key);
				if(bool < 0) {
					return true;
				} else {
					return false;
				}
			},
			// 得到元素值 获取元素值 若不存在则返回 null
			getItem: function(key) {
				var i = this.findItem(key);
				if(!i) {
					var array = document.cookie.split(';');
					for(var j = 0; j < array.length; j++) {
						var arraySplit = array[j];
						if(arraySplit.indexOf(key) > -1) {
							var getValue = array[j].split('=');
							// 将 getValue[0] trim删除两端空格
							getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
							if(getValue[0] == key) {
								return getValue[1];
							}
						}
					}
				}
				return null;
			},
			// 重新设置元素
			setItem: function(key, value) {
				var i = this.findItem(key)
				document.cookie = key + '=' + value;
			},
			// 清除cookie 参数一个或多一
			clear: function() {
				var arguments = document.cookie.split(';');
				for(var cl = 0; cl < arguments.length; cl++) {
					var date = new Date();
					date.setTime(date.getTime() - 100);
					document.cookie = arguments[cl] + "=a; expires=" + date.toGMTString();
				}
			},
			// 删除cookie 单个删除
			removeItem:function (name)
				{
				    var exp = new Date();
				    exp.setTime(exp.getTime() - 1);
				    var cval=this.getItem(name);
				    if(cval!=null){
				        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
				    }
				}
		}
		localStorageClass.init();
		return localStorageClass;

	} else {
		if (typeof localStorage === 'object') {
		    try {
		        localStorage.setItem('localStorage', 1);
		        localStorage.removeItem('localStorage');
		    } catch (e) {
		        Storage.prototype._setItem = Storage.prototype.setItem;
		        Storage.prototype.setItem = function() {};
		    }
		}
		return window.localStorage;
	}

})();

(function ($global) { "use strict";
Math.__name__ = true;
class Std {
	static string(s) {
		return js_Boot.__string_rec(s,"");
	}
}
Std.__name__ = true;
class Test {
	static buildPage() {
		let container = window.document.createElement("div");
		container.id = "container";
		container.style.margin = "0px auto";
		container.style.width = "500px";
		container.style.height = "375px";
		container.style.border = "10px #333 solid";
		window.document.body.appendChild(container);
		Test.videoElement = window.document.createElement("video");
		Test.videoElement.autoplay = true;
		Test.videoElement.id = "videoElement";
		Test.videoElement.style.width = "500px";
		Test.videoElement.style.height = "375px";
		Test.videoElement.style.backgroundColor = "#666";
		container.appendChild(Test.videoElement);
	}
	static main() {
		Test.buildPage();
		if($global.navigator.mediaDevices.getUserMedia != null) {
			$global.navigator.mediaDevices.getUserMedia({ video : true}).then(function(stream) {
				Test.videoElement.srcObject = stream;
			}).catch(function(err) {
				haxe_Log.trace("Something went wrong!",{ fileName : "Test.hx", lineNumber : 32, className : "Test", methodName : "main", customParams : [err]});
			});
		}
	}
}
Test.__name__ = true;
class haxe_Log {
	static formatOutput(v,infos) {
		let str = Std.string(v);
		if(infos == null) {
			return str;
		}
		let pstr = infos.fileName + ":" + infos.lineNumber;
		if(infos.customParams != null) {
			let _g = 0;
			let _g1 = infos.customParams;
			while(_g < _g1.length) str += ", " + Std.string(_g1[_g++]);
		}
		return pstr + ": " + str;
	}
	static trace(v,infos) {
		let str = haxe_Log.formatOutput(v,infos);
		if(typeof(console) != "undefined" && console.log != null) {
			console.log(str);
		}
	}
}
haxe_Log.__name__ = true;
class haxe_iterators_ArrayIterator {
	constructor(array) {
		this.current = 0;
		this.array = array;
	}
	hasNext() {
		return this.current < this.array.length;
	}
	next() {
		return this.array[this.current++];
	}
}
haxe_iterators_ArrayIterator.__name__ = true;
class js_Boot {
	static __string_rec(o,s) {
		if(o == null) {
			return "null";
		}
		if(s.length >= 5) {
			return "<...>";
		}
		let t = typeof(o);
		if(t == "function" && (o.__name__ || o.__ename__)) {
			t = "object";
		}
		switch(t) {
		case "function":
			return "<function>";
		case "object":
			if(((o) instanceof Array)) {
				let str = "[";
				s += "\t";
				let _g = 0;
				let _g1 = o.length;
				while(_g < _g1) {
					let i = _g++;
					str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
				}
				str += "]";
				return str;
			}
			let tostr;
			try {
				tostr = o.toString;
			} catch( _g ) {
				return "???";
			}
			if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
				let s2 = o.toString();
				if(s2 != "[object Object]") {
					return s2;
				}
			}
			let str = "{\n";
			s += "\t";
			let hasp = o.hasOwnProperty != null;
			let k = null;
			for( k in o ) {
			if(hasp && !o.hasOwnProperty(k)) {
				continue;
			}
			if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
				continue;
			}
			if(str.length != 2) {
				str += ", \n";
			}
			str += s + k + " : " + js_Boot.__string_rec(o[k],s);
			}
			s = s.substring(1);
			str += "\n" + s + "}";
			return str;
		case "string":
			return o;
		default:
			return String(o);
		}
	}
}
js_Boot.__name__ = true;
{
	String.__name__ = true;
	Array.__name__ = true;
}
js_Boot.__toStr = ({ }).toString;
Test.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
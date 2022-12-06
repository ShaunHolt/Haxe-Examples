(function ($global) { "use strict";
var Test = function() {
	this.tail = 5;
	this.yv = 0;
	this.xv = 0;
	this.ay = 15;
	this.ax = 15;
	this.tc = 20;
	this.gs = 20;
	this.py = 10;
	this.px = 10;
	var document = window.document;
	this.canvas = document.createElement("canvas");
	this.ctx = this.canvas.getContext("2d",null);
	var dom = this.canvas;
	var style = dom.style;
	style.paddingLeft = "0px";
	style.paddingTop = "0px";
	style.left = "0px";
	style.top = "0px";
	style.position = "absolute";
	this.canvas.width = 400;
	this.canvas.height = 400;
	document.body.appendChild(this.canvas);
	document.addEventListener("keydown",$bind(this,this.keyPush));
	var timer = new haxe_Timer(100);
	this.trail = [];
	timer.run = $bind(this,this.game);
};
Test.main = function() {
	new Test();
};
Test.prototype = {
	keyPush: function(evt) {
		switch(evt.keyCode) {
		case 37:
			this.xv = -1;
			this.yv = 0;
			break;
		case 38:
			this.xv = 0;
			this.yv = -1;
			break;
		case 39:
			this.xv = 1;
			this.yv = 0;
			break;
		case 40:
			this.xv = 0;
			this.yv = 1;
			break;
		}
	}
	,game: function() {
		this.px += this.xv;
		this.py += this.yv;
		if(this.px < 0) {
			this.px = this.tc - 1;
		}
		if(this.px > this.tc - 1) {
			this.px = 0;
		}
		if(this.py < 0) {
			this.py = this.tc - 1;
		}
		if(this.py > this.tc - 1) {
			this.py = 0;
		}
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
		this.ctx.fillStyle = "lime";
		var _g = 0;
		var _g1 = this.trail.length;
		while(_g < _g1) {
			var i = _g++;
			this.ctx.fillRect(this.trail[i].x * this.gs,this.trail[i].y * this.gs,this.gs - 2,this.gs - 2);
			if(this.trail[i].x == this.px && this.trail[i].y == this.py) {
				this.tail = 5;
			}
		}
		this.trail.push({ x : this.px, y : this.py});
		while(this.trail.length > this.tail) this.trail.shift();
		if(this.ax == this.px && this.ay == this.py) {
			this.tail++;
			this.ax = Math.floor(Math.random() * this.tc);
			this.ay = Math.floor(Math.random() * this.tc);
		}
		this.ctx.fillStyle = "red";
		this.ctx.fillRect(this.ax * this.gs,this.ay * this.gs,this.gs - 2,this.gs - 2);
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.prototype = {
	run: function() {
	}
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.prototype = {
	hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
};
var $_;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
Test.main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);

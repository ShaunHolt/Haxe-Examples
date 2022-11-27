(function ($global) { "use strict";
var Main = function() {
	console.log("Main.hx:9:","DOM example");
	window.document.addEventListener("DOMContentLoaded",function(event) {
		console.log("Main.hx:14:","DOM ready");
		var p = window.document.createElement("p");
		p.className = "glow_text";
		p.align = "center";
		p.style.fontSize = "2vw";
		p.style.position = "relative";
		window.document.querySelector(".glow_box").appendChild(p);
		var span = window.document.createElement("span");
		span.className = "inner";
		span.innerText = "What Will You Achieve Today?";
		span.style.position = "relative";
		window.document.querySelector(".glow_text").appendChild(span);
	});
};
Main.main = function() {
	new Main();
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
Main.main();
})({});

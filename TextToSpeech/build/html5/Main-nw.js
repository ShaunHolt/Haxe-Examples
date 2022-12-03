(function ($global) { "use strict";
var IntIterator = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIterator.prototype = {
	hasNext: function() {
		return this.min < this.max;
	}
	,next: function() {
		return this.min++;
	}
};
var Main = function() {
	console.log("Main.hx:8:","DOM Digital Clock");
	window.document.addEventListener("DOMContentLoaded",function(event) {
		console.log("Main.hx:11:","DOM ready");
		var wrapper = window.document.createElement("div");
		wrapper.className = "wrapper";
		window.document.body.appendChild(wrapper);
		var header = window.document.createElement("label");
		header.className = "header";
		header.innerText = "Text to Speech";
		wrapper.appendChild(header);
		var form = window.document.createElement("form");
		form.action = "#";
		wrapper.appendChild(form);
		var row = window.document.createElement("div");
		row.className = "row";
		form.appendChild(row);
		var entertext = window.document.createElement("label");
		entertext.innerText = "Enter Text";
		row.appendChild(entertext);
		var textarea = window.document.createElement("textarea");
		textarea.className = "textarea";
		row.appendChild(textarea);
		var row2 = window.document.createElement("div");
		row2.className = "row2";
		form.appendChild(row2);
		var selectvoice = window.document.createElement("label");
		selectvoice.innerText = "Select Voice";
		row2.appendChild(selectvoice);
		var outer = window.document.createElement("div");
		outer.className = "outer";
		row2.appendChild(outer);
		var select = window.document.createElement("select");
		select.className = "select";
		outer.appendChild(select);
		var button = window.document.createElement("button");
		button.className = "button";
		button.innerText = "Convert To Speech";
		form.appendChild(button);
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

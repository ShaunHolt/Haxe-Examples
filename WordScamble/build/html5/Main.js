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
	console.log("Main.hx:8:","Word Scramble Game");
	window.document.addEventListener("DOMContentLoaded",function(event) {
		console.log("Main.hx:11:","DOM ready");
		var container = window.document.createElement("div");
		container.className = "container";
		window.document.body.appendChild(container);
		var h2 = window.document.createElement("label");
		h2.className = "h2";
		h2.innerText = "Word Scramble";
		container.appendChild(h2);
		var content = window.document.createElement("div");
		content.className = "content";
		container.appendChild(content);
		var word = window.document.createElement("p");
		word.className = "word";
		content.appendChild(word);
		var details = window.document.createElement("div");
		details.className = "details";
		content.appendChild(details);
		var hint = window.document.createElement("p");
		hint.className = "hint";
		hint.innerText = "Hint:";
		details.appendChild(hint);
		var time = window.document.createElement("p");
		time.className = "time";
		time.innerText = "Time Left:";
		details.appendChild(time);
		var answer = window.document.createElement("input");
		answer.type = "text";
		answer.className = "answer";
		answer.spellcheck = false;
		answer.placeholder = "Enter a valid word";
		content.appendChild(answer);
		var buttons = window.document.createElement("div");
		buttons.className = "buttons";
		content.appendChild(buttons);
		var refreshword = window.document.createElement("button");
		refreshword.className = "refreshword";
		refreshword.innerText = "Refresh Word";
		buttons.appendChild(refreshword);
		var checkword = window.document.createElement("button");
		checkword.className = "checkword";
		checkword.innerText = "Check Word";
		buttons.appendChild(checkword);
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

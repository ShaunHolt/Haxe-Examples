import js.Browser.*;
import js.html.*;

class Main {
	static function main() new Main();

      function new() {
      trace("DOM Digital Clock");

      document.addEventListener("DOMContentLoaded", function(event) {
        trace("DOM ready");
            var time = DateTools.format(Date.now(), "%r");

            
		var clock = document.createDivElement();
		clock.className = "clock";
		document.body.appendChild(clock);

		var display = document.createSpanElement();
		display.className = "display";
		display.innerText = time;
            clock.appendChild(display);
        });
  
    }
	
}

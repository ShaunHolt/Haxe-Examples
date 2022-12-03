// Original source javascript from: https://www.codingnepalweb.com/word-scramble-game-html-javascript/

import js.Browser.*;
import js.html.*;

class Main {
	static function main() new Main();

      function new() {
      trace("Word Scramble Game");

      document.addEventListener("DOMContentLoaded", function(event) {
        trace("DOM ready");

            
		var container = document.createDivElement();
		container.className = "container";
		document.body.appendChild(container);

            var h2 = document.createLabelElement();
            h2.className = "h2";
            h2.innerText = "Word Scramble";
            container.appendChild(h2);

            var content = document.createDivElement();
            content.className = "content";
            container.appendChild(content);

            var word = document.createParagraphElement();
            word.className = "word";
            content.appendChild(word);

            var details = document.createDivElement();
            details.className = "details";
            content.appendChild(details);

            var hint = document.createParagraphElement();
            hint.className = "hint";
            hint.innerText = "Hint:";
            details.appendChild(hint);

            var time = document.createParagraphElement();
            time.className = "time";
            time.innerText = "Time Left:";
            details.appendChild(time);

            var answer = document.createInputElement();
            answer.type = "text";
            answer.className = "answer";
            answer.spellcheck = false;
            answer.placeholder = "Enter a valid word";
            content.appendChild(answer);
           
            var buttons = document.createDivElement();
            buttons.className = "buttons";
            content.appendChild(buttons);

            var refreshword = document.createButtonElement();
            refreshword.className = "refreshword";
            refreshword.innerText = "Refresh Word";
            buttons.appendChild(refreshword);

            var checkword = document.createButtonElement();
            checkword.className = "checkword";
            checkword.innerText = "Check Word";
            buttons.appendChild(checkword);



        });
  
    }
	
}

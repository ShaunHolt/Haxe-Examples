import js.Browser.document;

class Main {
  // static entrypoint
  static function main() new Main();

  // constructor
  function new() {
    trace("DOM example");



    document.addEventListener("DOMContentLoaded", function(event) {
      trace("DOM ready");

      // Shorthand for document.createElement("p");
      var p = document.createParagraphElement(); 
      p.className = "glow_text";
      p.align = "center";
      p.style.fontSize = "2vw";
      p.style.position = "relative";

      document.querySelector(".glow_box").appendChild(p);

      var span = document.createSpanElement(); 
      span.className = "inner";
      span.innerText = "What Will You Achieve Today?";
      span.style.position = "relative";

      document.querySelector(".glow_text").appendChild(span);

    });
  }
}
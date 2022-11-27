import js.Browser.*;
import js.html.*;

class Test {
  private static var videoElement:VideoElement;
  var canvas:CanvasElement;
  
  static function buildPage() {
     var canvas = document.createCanvasElement();
     canvas.style.width = "480px";
     canvas.style.height = "360px";
     canvas.style.border = "2px #333 solid";
     document.body.appendChild(canvas);
  }
  
  static function main() {
     buildPage();
  }
}
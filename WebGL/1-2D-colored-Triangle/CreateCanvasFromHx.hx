import js.Browser.*;
import js.html.*;

class Test {
  private static var canvasElement:CanvasElement;
  var canvas:CanvasElement;
  
  static function buildPage() {
     var canvas = document.createCanvasElement();
     canvas.id = "your_canvas";
     canvas.style.width = "window.innerWidth";
     canvas.style.height = "window.innerHeight";
     canvas.style.backgroundColor = "red";
     document.body.appendChild(canvas);
  }
  
  static function main() {

     buildPage();
  }
}
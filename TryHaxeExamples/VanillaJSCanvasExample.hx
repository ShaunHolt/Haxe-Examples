import js.Browser.*;
import js.html.*;

using PlainJSTV.CSSTools;

class PlainJSTV {
    static function main() {
        setup_modal();
    }
    
    static function setup_modal()
    {
        // Modal
        var modal = document.createElement('div');
        modal.style.apply({
            'position':'fixed', 'top':0,'left':0,'right':0,'bottom':0,
            'background-color':'rgba(0,0,0,0.75)', 'z-index':9999999
        });
        
        // Canvas
        var canvas:CanvasElement = cast document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 80;
        var scale = Std.int(Math.min((window.top.innerWidth*0.8)/canvas.width,
                            		 (window.top.innerHeight*0.8)/canvas.height));
        canvas.style.apply({
            'position':'absolute',
            'top':'50%',
            'margin-top':'-${canvas.height/2}px',
            'left':'50%',
            'margin-left':'-${canvas.width/2}px',
            'transform':'scale($scale)',
            '-webkit-transform':'scale($scale)',
			'image-rendering': 'pixelated'

        });
        var stop_drawing = draw_on_canvas(canvas);
        modal.appendChild(canvas);
        window.top.document.body.appendChild(modal);
        
        // Click to remove
        function remove() {
            stop_drawing();
            modal.parentNode.removeChild(modal);
            modal.removeEventListener('click', remove);
        }
        modal.addEventListener('click', remove);
    }
    
    static function draw_on_canvas(canvas:CanvasElement)
    {
        // Not a performant way to draw pixels, but whatever
	    var ctx = canvas.getContext2d();
        function draw() {
          for (y in 0...canvas.height) {
	        for (x in 0...canvas.width) {
              var v = Std.int(Math.random()*200)+56;
              ctx.fillStyle = "rgb("+v+","+v+","+v+")";
			  ctx.fillRect( x, y, 1, 1 );
            }
          }
        }
    	var i = window.setInterval(draw, 30);

        // Return function to stop the interval
        return function() { window.clearInterval(i); };
    }
}

// Static extension
class CSSTools
{
    public static function apply(style:CSSStyleDeclaration, props:{})
    {
        for (key in Reflect.fields(props)) {
            style.setProperty(key, Reflect.field(props, key));
        }
    }
}
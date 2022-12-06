import js.html.KeyboardEvent;
import js.Browser;
import js.html.HTMLDocument;
import js.html.CanvasRenderingContext2D;
import js.html.CanvasElement;
import js.html.Node;
typedef Point = { x: Int, y: Int };
class Test {
    static function main() { new Test(); }
	var px = 10;
    var py = 10;
	var gs = 20;
    var tc = 20;
	var ax = 15;
    var ay = 15;
	var xv = 0;
    var yv = 0;
	var trail: Array<Point>;
	var tail = 5;
    var ctx: CanvasRenderingContext2D;
    var canvas: CanvasElement; 
    public function new(){
        var document = Browser.document;
        canvas = document.createCanvasElement();
        ctx = canvas.getContext2d();
        var dom = canvas;
        var style = dom.style;
        style.paddingLeft = "0px";
        style.paddingTop = "0px";
        style.left = '0px';
        style.top = '0px';
        style.position = "absolute";
        canvas.width = 400;
        canvas.height = 400;
        document.body.appendChild( canvas );
        document.addEventListener("keydown", keyPush );
        var timer = new haxe.Timer(100); // 100ms delay
        trail = new Array<Point>();
		timer.run = game;
    }
    function keyPush(evt) {
    	switch(evt.keyCode) {  
            case KeyboardEvent.DOM_VK_LEFT:
            	xv = -1;
                yv = 0;
        	case KeyboardEvent.DOM_VK_UP:
            	xv = 0;
                yv = -1;
        	case KeyboardEvent.DOM_VK_RIGHT:
            	xv = 1;
                yv = 0;
        	case KeyboardEvent.DOM_VK_DOWN:
            	xv = 0;
                yv = 1;
    	}
	}
	function game() {
    	px += xv;
    	py += yv;
    	if( px < 0 ){
        	px = tc - 1;
    	}
    	if( px > tc-1 ){
        	px = 0;
    	}
    	if( py < 0 ){
        	py = tc - 1;
        }
        if( py > tc - 1 ){
        	py = 0;
    	}
    	ctx.fillStyle = "black";
    	ctx.fillRect( 0, 0, canvas.width, canvas.height );
 		ctx.fillStyle = "lime";
    	for( i in 0...trail.length ){
        	ctx.fillRect( trail[i].x*gs,trail[i].y*gs, gs - 2, gs - 2 );
        	if( trail[ i ].x == px && trail[ i ].y == py ) {
            	tail = 5;
        	}
    	}
    	trail.push( { x: px,y: py } );
    	while( trail.length > tail ){
    		trail.shift();
    	}
 		if( ax == px && ay == py ){
        	tail++;
        	ax = Math.floor( Math.random()*tc );
        	ay = Math.floor( Math.random()*tc );
    	}
    	ctx.fillStyle = "red";
    	ctx.fillRect( ax*gs, ay*gs, gs - 2, gs - 2 );
	}
}
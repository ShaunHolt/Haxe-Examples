package custom;

import haxe.ui.backend.html5.HtmlUtils;
import haxe.ui.containers.Box;
import js.Browser;
import js.html.SourceElement;
import js.html.VideoElement;

class Video extends Box {
    private var _video:VideoElement = null;
    private var _source:SourceElement = null;
    
    private override function onReady() {
        super.onReady();
        _video = Browser.document.createVideoElement();
        _video.style.objectFit = "fill";
        element.appendChild(_video);
        invalidateComponentLayout();
        if (_file != null && _source == null) {
            changeSource(_file);
        }
    }
    
    public function play() {
        if (_video != null) {
            _video.play();
        }
    }
    
    public function pause() {
        if (_video != null) {
            _video.pause();
        }
    }
    
    private var _file:String;
    public var file(get, set):String;
    private function get_file() {
        return _file;
    }
    private function set_file(value:String):String {
        _file = value;
        if (_video != null) {
            changeSource(_file);
        }
        return value;
    }
    
    private function changeSource(src:String) {
        if (_source != null) {
            HtmlUtils.removeElement(_source);
        }
        _source = Browser.document.createSourceElement();
        _source.setAttribute("src", src);
        _video.appendChild(_source);
    }
    
    private override function validateComponentLayout():Bool {
        var b = super.validateComponentLayout();
        
        if (_video != null && width > 0 && height > 0) {
            _video.style.width = HtmlUtils.px(width);
            _video.style.height = HtmlUtils.px(height);
        }
        
        return b;
    }
}

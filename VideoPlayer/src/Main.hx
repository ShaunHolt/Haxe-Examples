package ;

import haxe.ui.HaxeUIApp;
import haxe.ui.core.Component;
import haxe.ui.ComponentBuilder;

class Main {
    public static function main() {
        var app = new HaxeUIApp();
        app.ready(function() {

		var video = new custom.Video();
        var main:Component = ComponentBuilder.fromFile("assets/main.xml");



			app.addComponent(video);
            app.addComponent(main);
            app.start();
        });
    }
}


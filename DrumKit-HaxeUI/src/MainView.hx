package ;
import haxe.ui.core.Screen;
import haxe.ui.events.KeyboardEvent;
import haxe.ui.containers.VBox;
import js.html.Audio;

@:build(haxe.ui.ComponentBuilder.build("assets/main-view.xml"))
class MainView extends VBox {
    public function new() {
        super();

            Screen.instance.registerEvent(KeyboardEvent.KEY_DOWN, onKeyDown);

    }
 var crash = new Audio("assets/snd/crash.ogg");
 var kickbass = new Audio("assets/snd/kick-bass.mp3");
 var snare = new Audio("assets/snd/snare.mp3");
 var tom1 = new Audio("assets/snd/tom-1.mp3");
 var tom2 = new Audio("assets/snd/tom-2.mp3");
 var tom3 = new Audio("assets/snd/tom-3.mp3");
 var tom4 = new Audio("assets/snd/tom-4.mp3");       

    public function onKeyDown(e:KeyboardEvent) {
      if (e.keyCode == 75)
        crash.play();
        else 
        if (e.keyCode == 65)
        tom2.play();
        else
        if (e.keyCode == 83)
        tom3.play();
        else
        if (e.keyCode == 68)
        tom4.play();
        else
        if (e.keyCode == 87)
        tom1.play();
        else
        if (e.keyCode == 76)
        kickbass.play();
        else
        if (e.keyCode == 74)
        snare.play();
        else
        null;

        
        
}
}
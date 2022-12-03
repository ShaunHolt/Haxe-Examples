import js.Browser.*;
import js.html.*;

class Main {
  static function main() {

    var msg = new SpeechSynthesisUtterance();    

    msg.text = "this is a test";    

    window.speechSynthesis.speak(msg);
  }
}
  

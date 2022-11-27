import js.Browser.*;
import js.html.*;

class Main {
	private static var audioElement:AudioElement;

	static function buildPage() {
		var container = document.createDivElement();
		container.id = "container";
		container.style.margin = "0px auto";
		container.style.width = "500px";
		container.style.height = "375px";
		container.style.border = "10px #333 solid";
		document.body.appendChild(container);

		audioElement = document.createAudioElement();
		audioElement.autoplay = true;
		audioElement.id = "videoElement";
		audioElement.style.width = "500px";
		audioElement.style.height = "375px";
		audioElement.style.backgroundColor = "#666";
		container.appendChild(audioElement);
	}

	static function main() {
		buildPage();

		if (navigator.mediaDevices.getUserMedia != null) {
			navigator.mediaDevices.getUserMedia({audio: true}).then(function(stream) {
				audioElement.srcObject = stream;
			}).catchError(function(err) {
				trace("Something went wrong!", err);
			});
		}
	}
}

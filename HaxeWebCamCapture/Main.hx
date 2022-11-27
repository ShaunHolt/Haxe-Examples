import js.Browser.*;
import js.html.*;

class Test {
	private static var videoElement:VideoElement;

	static function buildPage() {
		var container = document.createDivElement();
		container.id = "container";
		container.style.margin = "0px auto";
		container.style.width = "500px";
		container.style.height = "375px";
		container.style.border = "10px #333 solid";
		document.body.appendChild(container);

		videoElement = document.createVideoElement();
		videoElement.autoplay = true;
		videoElement.id = "videoElement";
		videoElement.style.width = "500px";
		videoElement.style.height = "375px";
		videoElement.style.backgroundColor = "#666";
		container.appendChild(videoElement);
	}

	static function main() {
		buildPage();

		if (navigator.mediaDevices.getUserMedia != null) {
			navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
				videoElement.srcObject = stream;
			}).catchError(function(err) {
				trace("Something went wrong!", err);
			});
		}
	}
}

import js.Browser.*;
import js.html.*;

class Main {
	static function main() new Main();

      function new() {
      trace("DOM Text to Speech");

      document.addEventListener("DOMContentLoaded", function(event) {
        trace("DOM ready");



            var wrapper = document.createDivElement();
		wrapper.className = "wrapper";
		document.body.appendChild(wrapper);

		var header = document.createLabelElement();
		header.className = "header";
		header.innerText = "Text to Speech";
            wrapper.appendChild(header);

            var form = document.createFormElement();
            form.action = "#";
            wrapper.appendChild(form);

            var row = document.createDivElement();
            row.className = "row";
            form.appendChild(row);

            var entertext = document.createLabelElement();
            entertext.innerText = "Enter Text";
            row.appendChild(entertext);

            var textarea = document.createTextAreaElement();
            textarea.className = "textarea";
            row.appendChild(textarea);

            var row2 = document.createDivElement();
            row2.className = "row2";
            form.appendChild(row2);

            var selectvoice = document.createLabelElement();
            selectvoice.innerText = "Select Voice";
            row2.appendChild(selectvoice);

            var outer = document.createDivElement();
            outer.className = "outer";
            row2.appendChild(outer);

            var select = document.createSelectElement();
            select.className = "select";
            outer.appendChild(select);

            var button = document.createButtonElement();
            button.className = "button";
            button.innerText = "Convert To Speech";
            form.appendChild(button);


var textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

var synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
  for(var voice of synth.getVoices()){
  var selected = voice.name === "Google US English" ? "selected" : "";
  var option = '<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>';
  voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
  var utterance = new SpeechSynthesisUtterance(text);
  for(var voice of synth.getVoices()){
    if(voice.name === voiceList.value){
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
  e.preventDefault();
  if(textarea.value !== ""){
    if(!synth.speaking){
      textToSpeech(textarea.value);
    }
    if(textarea.value.length >80){
      setInterval(()=>{
        if(!synth.speaking && !isSpeaking){
          isSpeaking = true;
          speechBtn.innerText = "Convert To Speech";
        }else{
        }
      }, 500);
      if(isSpeaking){
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      }else{
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }
    }else{
      speechBtn.innerText = "Convert To Speech";
    }
  }
});

        });
  
    }
	
}
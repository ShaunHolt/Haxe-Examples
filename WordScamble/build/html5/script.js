var wordText = document.querySelector(".word"),
var hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refreshword"),
checkBtn = document.querySelector(".checkword");

var correctWord, timer;

function initTimer = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if(maxTime > 0) {
      maxTime--;
      return timeText.innerText = maxTime;
    }
    alert('Time off! ${correctWord.toUpperCase()} was the correct word');
    initGame();
  }, 1000);
}

function initGame = () => {
  initTimer(30);
  var randomObj = words[Math.floor(Math.random() * words.length)];
  var wordArray = randomObj.word.split("");
  for (var i = wordArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();;
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
}

initGame();

function checkWord = () => {
  var userWord = inputField.value.toLowerCase();
  if(!userWord) return alert("Please enter the word to check!");
  if(userWord !== correctWord) return alert('Oops! ${userWord} is not a correct word');
  alert('Congrats! ${correctWord.toUpperCase()} is the correct word');
  initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
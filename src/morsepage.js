
import MorseKey from "./morsekey";
import MorseReader from "./morsereader";
import BeepTiming from "./beeptiming";
import PauseTiming from "./pausetiming";

let pressed = false;
let button;
let message;
let beeptimer;
let pausetimer;
let typingAlphabetLabel;

const reader = new MorseReader();
const key = new MorseKey(reader);
reader.setOnChangeModeCallback(changeMode);

function startBeep(e) {
  e.preventDefault();
  if (pressed) {
      return;
  }
  pressed = true;
  button.classList.add("key-button--clicked");
  key.pressKey();
  beeptimer.startTimer();
  pausetimer.stopTimer();
}

function stopBeep(e) {
  e.preventDefault();
  if (!pressed){
      return;
  }
  pressed = false;
  button.classList.remove("key-button--clicked");
  key.releaseKey();
  message.innerText = reader.getBuffer();
  pausetimer.startTimer();
  beeptimer.stopTimer();
}

function updateState(reader) {
  message.innerText = reader.getBuffer();
}

function changeMode(newMode) {
  typingAlphabetLabel.innerText = newMode;
}

const onDocumentLoad = () => {
    button = document.getElementById("button");
    message = document.getElementById("message");
    typingAlphabetLabel = document.querySelector("#button .js-key-button--aplphabet");

    beeptimer = new BeepTiming(
      '#beeptimer',
      key.getDotLength(),
      key.getDashLength(),
      key.getDeleteLength(),
      key.getSwitchAlphabetLength()
    );
    
    pausetimer = new PauseTiming(
      '#pausetimer',
      key.getCharacterSpacingLength(),
      key.getPauseLength()
    );
    
    button.addEventListener("mousedown", startBeep);
    button.addEventListener("mouseup", stopBeep);
    button.addEventListener("touchstart", startBeep);
    button.addEventListener("touchend", stopBeep);
    button.addEventListener("click", stopBeep);
}

export default onDocumentLoad;


import MorseKey from "./morsekey";
import MorseReader from "./morsereader";
import BeepTiming from "./beeptiming";
import PauseTiming from "./pausetiming";

let pressed = false;
let button;
let message;
let beeptimer;
let pausetimer;

const reader = new MorseReader();
const key = new MorseKey(reader);

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



const onDocumentLoad = () => {
    button = document.getElementById("button");
    message = document.getElementById("message");
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
    button.addEventListener("click", stopBeep);
}

export default onDocumentLoad;

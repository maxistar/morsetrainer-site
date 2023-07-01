//;
var logger = document.getElementById("logger");
var log = function(msg) {
  //return;
  var el = document.createElement('div')
  el.innerText = msg;
  logger.appendChild(el)
}
//var getOscillator = function() {
var context
var o

var newOscillator = function () {
  if (!context) {
    context = new AudioContext()
  }
  o = context.createOscillator()
  o.type = "sine"
  //o.frequency.setValueAtTime(440, context.currentTime); // value in hertz
  o.connect(context.destination)
}

window.onload = function(e) {
  log("init")
}

var started = false;
var firstStart = true;

var started2 = false;
var firstStart2 = true;

var startBeep = function (e) {
  e.stopPropagation();
  log("startBeep")
  //alert("test");
  if (started) {
    return;
  }
  started = true

  if (firstStart) {
    new newOscillator()
    //o.start(0)
    firstStart = false;
    log("firstStart")
  }
  o.start(0)
  //o.frequency.setValueAtTime(440, context.currentTime); // value in hertz
  log("started")
  //o.detune.setValueAtTime(100, context.currentTime);
};

var stopBeep = function (e) {
  e.stopPropagation();
  log("stopBeep")
  //alert("test");
  if (!started) {
    return;
  }
  started = false
  o.stop(0)
  //o.detune.setValueAtTime(0, context.currentTime);
  //o.frequency.setValueAtTime(0, context.currentTime); // value in hertz
  newOscillator()
};

var startBeep2 = function (e) {
  e.stopPropagation();
  log("startBeep")
  //alert("test");
  if (started2) {
    return;
  }
  started2 = true

  if (firstStart2) {
    new newOscillator()
    o.start(0)
    firstStart2 = false;
    log("firstStart")
  }
  //o.start(0)
  o.frequency.setValueAtTime(440, context.currentTime); // value in hertz
  log("started")
  //o.detune.setValueAtTime(100, context.currentTime);
};

var stopBeep2 = function (e) {
  e.stopPropagation();
  log("stopBeep")
  //alert("test");
  if (!started2) {
    return;
  }
  started2 = false
  //o.stop(0)
  //o.detune.setValueAtTime(0, context.currentTime);
  o.frequency.setValueAtTime(0, context.currentTime); // value in hertz
  //newOscillator()
};

var button = document.getElementById("button");
button.addEventListener("mousedown", startBeep);
button.addEventListener("mouseup", stopBeep);
button.addEventListener("touchstart", startBeep);
button.addEventListener("touchend", stopBeep);
button.addEventListener("click", stopBeep);
button.addEventListener("click", stopBeep);


var button2 = document.getElementById("button2");
button2.addEventListener("mousedown", startBeep2);
button2.addEventListener("mouseup", stopBeep2);
button2.addEventListener("touchstart", startBeep2);
button2.addEventListener("touchend", stopBeep2);
button2.addEventListener("click", stopBeep2);
button2.addEventListener("click", stopBeep2);

var stage = document.getElementById("stage");
var me = document.getElementById("me");
var foe = document.getElementById("foe");
var bubble = document.getElementById("bubble");
var flash = document.getElementById("flash");
var replay = document.getElementById("replay");

// the conversation: who speaks, what they say, and an optional effect
var lines = [
  { who: "foe", text: "Sit down. Look at you. One leg. You will never reach the top." },
  { who: "me",  text: "The mountain never asked how many legs I brought." },
  { who: "foe", text: "You will fall. And nobody will come back for you." },
  { who: "me",  text: "Then I will fall forward.", fx: "flash" },
  { who: "foe", text: "Why? Why do you keep going?" },
  { who: "me",  text: "Because strength was never in the legs.", fx: "shake" },
  { who: "foe", text: "...", fx: "bow" },
  { who: "me",  text: "Watch me.", fx: "walk" }
];
var i = 0;
var pos = 100;   // where "me" stands (left, in pixels)

// make the rain
for (var r = 0; r < 70; r++) {
  var drop = document.createElement("div");
  drop.className = "drop";
  drop.style.left = Math.random() * 700 + "px";
  drop.style.animationDuration = (0.6 + Math.random() * 0.6) + "s";
  drop.style.animationDelay = (-Math.random()) + "s";
  stage.appendChild(drop);
}

// hop forward on the crutch
function moveTo(x, seconds) {
  pos = x;
  me.style.transition = "left " + seconds + "s linear";
  me.style.left = x + "px";
  me.classList.add("hop");
  setTimeout(function () { me.classList.remove("hop"); }, seconds * 1000);
}

function effect(fx) {
  if (fx == "flash") { flash.classList.remove("on"); void flash.offsetWidth; flash.classList.add("on"); }
  if (fx == "shake") { stage.classList.remove("shake"); void stage.offsetWidth; stage.classList.add("shake"); }
  if (fx == "bow") { foe.classList.add("bow"); }
}

function showLine() {
  if (i >= lines.length) {
    setTimeout(function () { replay.style.display = "inline-block"; }, 3000);
    return;
  }
  var line = lines[i];
  bubble.className = line.who;
  bubble.textContent = "";
  effect(line.fx);

  // every time "me" speaks he hops a little closer; at the end he walks right up
  if (line.who == "me") {
    if (line.fx == "walk") moveTo(380, 3);
    else moveTo(pos + 40, 1.2);
    bubble.style.left = Math.max(10, Math.min(pos - 90, 410)) + "px";
  } else {
    bubble.style.left = "";
  }

  var speaker = line.who == "me" ? me : foe;
  speaker.classList.add("talk");
  var n = 0;
  var timer = setInterval(function () {
    n++;
    bubble.textContent = line.text.slice(0, n);   // one letter at a time
    if (n >= line.text.length) {
      clearInterval(timer);
      speaker.classList.remove("talk");
      setTimeout(function () { i++; showLine(); }, 1800);
    }
  }, 45);
}

replay.onclick = function () {
  replay.style.display = "none";
  i = 0;
  pos = 100;
  me.style.transition = "none";
  me.style.left = "100px";
  foe.classList.remove("bow");
  showLine();
};

showLine();

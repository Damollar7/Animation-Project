var mouse = document.getElementById("mouse");
var head = document.getElementById("head");
var pupils = document.querySelectorAll(".pupil");

var angle = 0;          // where the mouse is on its path
var cx = 300, cy = 300; // centre of the path
var rx = 230, ry = 120; // size of the path

function move() {
  angle += 0.02;

  // position of the mouse on the oval
  var x = cx + rx * Math.cos(angle);
  var y = cy + ry * Math.sin(angle);

  // turn the mouse to face the way it is running
  var turn = Math.atan2(ry * Math.cos(angle), -rx * Math.sin(angle));
  mouse.style.left = (x - 20) + "px";
  mouse.style.top = (y - 11) + "px";
  mouse.style.transform = "rotate(" + turn + "rad)";

  // mouse goes behind the cat when it is at the back
  mouse.style.zIndex = y < cy ? 1 : 10;

  // cat looks at the mouse
  var dx = x - 300, dy = y - 195;
  var d = Math.sqrt(dx * dx + dy * dy);
  var px = dx / d, py = dy / d;
  head.style.transform = "translate(" + px * 10 + "px," + py * 5 + "px)";
  for (var i = 0; i < pupils.length; i++) {
    pupils[i].style.transform = "translate(" + px * 5 + "px," + py * 6 + "px)";
  }

  requestAnimationFrame(move);
}
move();

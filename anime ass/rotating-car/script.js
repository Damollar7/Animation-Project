var car = document.getElementById("car");
var slider = document.getElementById("speed");
var deg = document.getElementById("deg");
var button = document.getElementById("mode");

var angle = 0;          // how far the car has turned
var cx = 300, cy = 225; // the centre point (axis)
var radius = 160;       // distance from the centre
var orbit = true;       // true = go round the axis, false = spin in one place

button.onclick = function () {
  orbit = !orbit;
  button.textContent = orbit ? "Spin in one place" : "Go round the axis";
};

function turn() {
  angle += Number(slider.value) * 0.01;

  if (orbit) {
    // move the car round the centre point and turn it to face the way it goes
    var x = cx + radius * Math.cos(angle);
    var y = cy + radius * Math.sin(angle);
    car.style.transform = "translate(" + (x - 24) + "px," + (y - 24) + "px) rotate(" + (angle - Math.PI / 2) + "rad)";
  } else {
    // keep the car in the middle and just spin it
    car.style.transform = "translate(" + (cx - 24) + "px," + (cy - 24) + "px) rotate(" + angle + "rad)";
  }

  deg.textContent = Math.round((angle * 180 / Math.PI) % 360) + "°";
  requestAnimationFrame(turn);
}
turn();

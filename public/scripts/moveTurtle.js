/************ MOVE THAT TURLTE *************/
function moveTurtle(w, divname, framerate) {
var elem = document.getElementById(divname);   
var pos = 0;
var reverse = false;
var id = setInterval(frame, framerate);
function frame() {
  if (reverse) {
    pos--;
    if (pos <= 0) { reverse = false; }
    elem.style.left = pos + 'px';
    elem.style.transform = 'scaleX(-1)';
  } else {
    pos++;
    if (pos >= w) { reverse = true; }
    elem.style.left = pos + 'px';
    elem.style.transform = 'scaleX(1)';
  }
}
}
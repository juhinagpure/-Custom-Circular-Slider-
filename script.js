let knob = document.querySelector(".knob");
let circle = document.getElementById("circle2");
let pointer = document.querySelector(".pointer");
let text = document.querySelector(".text");

let isRotating = false;

// Function to handle the start of rotation
function startRotation(e) {
  // Prevent the default behavior to avoid issues on touch devices
  e.preventDefault();
  if (e.target.closest(".knob")) {
    isRotating = true;
  }
}

// Updated rotateKnob function to handle touch events
const rotateKnob = (e) => {
  if (isRotating) {
    let clientX = e.clientX || e.touches[0].clientX;
    let clientY = e.clientY || e.touches[0].clientY;

    let knobX = knob.getBoundingClientRect().left + knob.clientWidth / 2;
    let knobY = knob.getBoundingClientRect().top + knob.clientHeight / 2;

    let deltaX = clientX - knobX;
    let deltaY = clientY - knobY;

    let angleRad = Math.atan2(deltaY, deltaX);
    let angleDeg = (angleRad * 180) / Math.PI;

    let rotationAngle = (angleDeg - 135 + 360) % 360;

    if (rotationAngle <= 270) {
      pointer.style.transform = `rotate(${rotationAngle - 45}deg)`;

      let progressPercent = rotationAngle / 270;

      circle.style.strokeDashoffset = `${880 - 660 * progressPercent}`;

      text.innerHTML = `${Math.round(progressPercent * 100)}`;
    }
  }
};

// Function to handle the end of rotation
function endRotation() {
  isRotating = false;
}

// Attach event listeners for both mouse and touch events
document.addEventListener("mousedown", startRotation);
document.addEventListener("touchstart", startRotation);

document.addEventListener("mousemove", rotateKnob);
document.addEventListener("touchmove", rotateKnob, { passive: false });

document.addEventListener("mouseup", endRotation);
document.addEventListener("touchend", endRotation);

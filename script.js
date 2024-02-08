// let knob = document.querySelector(".knob");
// let circle = document.getElementById("circle2");
// let pointer = document.querySelector(".pointer");
// let text = document.querySelector(".text");

// let isRotating = false;

// document.addEventListener("mousedown", (e) => {
//   if (e.target.closest(".knob")) {
//     isRotating = true;
//   }
// });

// const rotateKnob = (e) => {
//   if (isRotating) {
//     let knobX = knob.getBoundingClientRect().left + knob.clientWidth / 2;
//     let knobY = knob.getBoundingClientRect().top + knob.clientHeight / 2;

//     let deltaX = e.clientX - knobX;
//     let deltaY = e.clientY - knobY;

//     let angleRad = Math.atan2(deltaY, deltaX);
//     let angleDeg = (angleRad * 180) / Math.PI;

//     let rotationAngle = (angleDeg - 135 + 360) % 360;

//     if (rotationAngle <= 270) {
//       pointer.style.transform = `rotate(${rotationAngle - 45}deg)`;

//       let progressPercent = rotationAngle / 270;

//       circle.style.strokeDashoffset = `${880 - 660 * progressPercent}`;

//       text.innerHTML = `${Math.round(progressPercent * 100)}`;
//     }
//   }
// };

// document.addEventListener("mousemove", rotateKnob);

// document.addEventListener("mouseup", () => {
//   isRotating = false;
// });
let knob = document.querySelector(".knob");
let circle = document.getElementById("circle2");
let pointer = document.querySelector(".pointer");
let text = document.querySelector(".text");

let isRotating = false;

// Function to start rotation
function handleStart(e) {
  e.preventDefault(); // Prevent default touch actions
  isRotating = true;
}

// Function to rotate the knob
const rotateKnob = (e) => {
  if (!isRotating) return;

  let clientX, clientY;

  if (e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }

  let knobRect = knob.getBoundingClientRect();
  let knobX = knobRect.left + knobRect.width / 2;
  let knobY = knobRect.top + knobRect.height / 2;

  let deltaX = clientX - knobX;
  let deltaY = clientY - knobY;

  let angleRad = Math.atan2(deltaY, deltaX);
  let angleDeg = (angleRad * 180) / Math.PI;

  let rotationAngle = (angleDeg - 135 + 360) % 360;

  if (rotationAngle <= 270) {
    pointer.style.transform = `rotate(${rotationAngle - 45}deg)`;

    let progressPercent = rotationAngle / 270;

    // Assuming circle has stroke-dasharray set for progress visualization
    circle.style.strokeDashoffset = `${880 - 660 * progressPercent}`;

    text.innerHTML = `${Math.round(progressPercent * 100)}%`;
  }
};

// Function to end rotation
function handleEnd() {
  isRotating = false;
}

// Adding both mouse and touch event listeners
knob.addEventListener("mousedown", handleStart);
document.addEventListener("mousemove", rotateKnob);
document.addEventListener("mouseup", handleEnd);

knob.addEventListener("touchstart", handleStart);
document.addEventListener("touchmove", rotateKnob, { passive: false });
document.addEventListener("touchend", handleEnd);

// let knob = document.querySelector(".knob");
// let circle = document.getElementById("circle2");
// let pointer = document.querySelector(".pointer");
// let text = document.querySelector(".text");

// let isRotating = false;

// // Function to start rotation
// function handleStart(e) {
//   e.preventDefault(); // Prevent default touch actions
//   isRotating = true;
// }

// // Function to rotate the knob
// const rotateKnob = (e) => {
//   if (!isRotating) return;

//   let clientX, clientY;

//   if (e.touches) {
//     clientX = e.touches[0].clientX;
//     clientY = e.touches[0].clientY;
//   } else {
//     clientX = e.clientX;
//     clientY = e.clientY;
//   }

//   let knobRect = knob.getBoundingClientRect();
//   let knobX = knobRect.left + knobRect.width / 2;
//   let knobY = knobRect.top + knobRect.height / 2;

//   let deltaX = clientX - knobX;
//   let deltaY = clientY - knobY;

//   let angleRad = Math.atan2(deltaY, deltaX);
//   let angleDeg = (angleRad * 180) / Math.PI;

//   let rotationAngle = (angleDeg - 135 + 360) % 360;

//   if (rotationAngle <= 270) {
//     pointer.style.transform = `rotate(${rotationAngle - 45}deg)`;

//     let progressPercent = rotationAngle / 270;

//     // Assuming circle has stroke-dasharray set for progress visualization
//     circle.style.strokeDashoffset = `${880 - 660 * progressPercent}`;

//     text.innerHTML = `${Math.round(progressPercent * 100)}%`;
//   }
// };

// // Function to end rotation
// function handleEnd() {
//   isRotating = false;
// }

// // Adding both mouse and touch event listeners
// knob.addEventListener("mousedown", handleStart);
// document.addEventListener("mousemove", rotateKnob);
// document.addEventListener("mouseup", handleEnd);

// knob.addEventListener("touchstart", handleStart);
// document.addEventListener("touchmove", rotateKnob, { passive: false });
// document.addEventListener("touchend", handleEnd);

document.addEventListener("DOMContentLoaded", () => {
  let knob = document.querySelector(".knob");
  let circle = document.getElementById("circle2");
  let pointer = document.querySelector(".pointer");
  let text = document.querySelector(".text");
  let isRotating = false;
  let lastPercent = 0; // To track changes in percentage

  // Prepare audio context for sound feedback
  let audioContext = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator, gainNode;

  // Assuming the rest of your code remains the same, modify the playSound function like this:

  function playSound() {
    // Check if the audio context is in a suspended state. This might be the case on mobile devices.
    if (audioContext.state === "suspended") {
      // Try to resume the audio context in response to the user interaction
      audioContext.resume().then(() => {
        console.log("Audio Context resumed!");
        triggerSound();
      });
    } else {
      // If the audio context is already running, just play the sound
      triggerSound();
    }
  }

  function triggerSound() {
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = "sine"; // Experiment with 'square', 'sawtooth', 'triangle'
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime); // Volume

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Play sound for 100ms
  }

  // The rest of the setup for handling start, move, and end events remains unchanged.

  function vibrate() {
    if (navigator.vibrate) {
      // Check if the Vibration API is supported
      navigator.vibrate(50); // Vibrate for 50 milliseconds
    }
  }

  function handleStart(e) {
    e.preventDefault(); // Prevent default touch actions
    isRotating = true;
  }

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
      let currentPercent = Math.round(progressPercent * 100);

      if (currentPercent !== lastPercent) {
        playSound();
        vibrate();
        lastPercent = currentPercent;
      }

      circle.style.strokeDashoffset = `${880 - 660 * progressPercent}`;
      text.innerHTML = `${currentPercent}%`;
    }
  };

  function handleEnd() {
    isRotating = false;
  }

  knob.addEventListener("mousedown", handleStart);
  document.addEventListener("mousemove", rotateKnob);
  document.addEventListener("mouseup", handleEnd);

  knob.addEventListener("touchstart", handleStart);
  document.addEventListener("touchmove", rotateKnob, { passive: false });
  document.addEventListener("touchend", handleEnd);
});

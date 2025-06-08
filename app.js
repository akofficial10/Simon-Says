let gameSeq = [];
let userSeq = [];
let btns = ["green", "red", "yellow", "blue"];
let started = false;
let level = 0;

const levelDisplay = document.querySelector(".level-number");
const startBtn = document.querySelector(".start-btn");
const message = document.querySelector(".message");
const quadrants = document.querySelectorAll(".quadrant");

// Event listeners
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    startBtn.textContent = "PLAYING";
    levelUp();
  }
});

startBtn.addEventListener("click", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    startBtn.textContent = "PLAYING";
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  levelDisplay.textContent = level;
  message.textContent = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); // Changed to 4 to include all colors
  let randColor = btns[randIdx];
  let randbtn = document.getElementById(randColor);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      message.textContent = "Correct! Next level...";
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function btnPress() {
  if (!started) return;

  let btn = this;
  userFlash(btn);

  let userColor = btn.id;
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

quadrants.forEach((btn) => {
  btn.addEventListener("click", btnPress);
});

function gameOver() {
  message.innerHTML = `Game Over! Your score was <strong>${level}</strong><br>Press any key to restart`;
  document.body.classList.add("game-over");
  setTimeout(function () {
    document.body.classList.remove("game-over");
  }, 150);
  reset();
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  levelDisplay.textContent = "0";
  startBtn.textContent = "START";
}

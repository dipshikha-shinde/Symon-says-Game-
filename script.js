let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

// Start game on keypress
document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

async function playSequence() {
    for (let color of gameSeq) {
        let btn = document.querySelector(`.${color}`);
        gameFlash(btn);
        await new Promise((resolve) => setTimeout(resolve, 600));
    }
}

async function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndex = Math.floor(Math.random() * 4);
    let randColor = btns[randIndex];
    gameSeq.push(randColor);

    await playSequence();
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        if (level - 1 > highScore) {
            highScore = level - 1;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);

        h2.innerHTML = `
            <b>Game Over!</b><br>
            Your score: <b>${level - 1}</b><br>
            Highest score: <b>${highScore}</b><br>
            Press Any Key to Restart
        `;

        reset();  // only resets variables, not h2 text
    }
}

function btnPress() {
    if (!started) return;

    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    // h2.innerText will stay showing the game over message
}

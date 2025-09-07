const colorButtons = document.querySelectorAll('.color-button');
const startButton = document.getElementById('startButton');
const statusText = document.getElementById('status');

const colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let level = 0;
let playing = false;

startButton.addEventListener('click', startGame);

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    statusText.textContent = "Watch the sequence!";
    playing = true;
    nextRound();
}

function nextRound() {
    level++;
    playerSequence = [];
    statusText.textContent = `Level ${level}`;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);

    let i = 0;
    const interval = setInterval(() => {
        highlightButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 800);
}

function highlightButton(color) {
    const button = document.querySelector(`.color-button.${color}`);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, 400);
}

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!playing) return;

        const clickedColor = button.dataset.color;
        playerSequence.push(clickedColor);
        highlightButton(clickedColor);

        const currentStep = playerSequence.length - 1;

        if (playerSequence[currentStep] !== sequence[currentStep]) {
            statusText.textContent = "Game Over! Press Start to play again.";
            playing = false;
            return;
        }

        if (playerSequence.length === sequence.length) {
            setTimeout(nextRound, 1000);
        }
    });
});

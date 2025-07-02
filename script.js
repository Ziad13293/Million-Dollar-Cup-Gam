const cups = document.querySelectorAll('.cup');
const shuffleBtn = document.getElementById('shuffle');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const winScreen = document.getElementById('win-screen');
const playAgain = document.getElementById('play-again');

let ballPosition = 1;
let score = 0;
let isShuffled = false;

setBall(ballPosition);

shuffleBtn.addEventListener('click', shuffleCups);
playAgainBtn.addEventListener('click', resetGame);

cups.forEach(cup => {
    cup.addEventListener('click', () => {
        if (!isShuffled) return;

        const chosenCup = parseInt(cup.dataset.cup);
        if (chosenCup === ballPosition) {
            message.textContent = "Correct!";
            score++;
            scoreDisplay.textContent = score;

            if (score >= 3) {
                winScreen.classList.remove('hidden');
                winScreen.classList.add('visible');
            }
        } else {
            message.textContent = "Wrong cup! Try again.";
        }

        setBall(ballPosition);
        isShuffled = false;
    });
});

function shuffleCups() {
    message.textContent = "Cups are shuffling...";
    isShuffles = true;


    
}

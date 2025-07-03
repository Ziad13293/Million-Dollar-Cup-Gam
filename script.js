const cups = document.querySelectorAll('.cup');
const shuffleBtn = document.getElementById('shuffle');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const winScreen = document.getElementById('win-screen');
const playAgainBtn = document.getElementById('play-again');

let ballPosition = 1;
let score = 0;
let isShuffling = false;

// Initialize game
resetGame();

// Event listeners
shuffleBtn.addEventListener('click', shuffleCups);
playAgainBtn.addEventListener('click', resetGame);

cups.forEach(cup => {
    cup.addEventListener('click', () => {
        if (isShuffling) return;
        
        checkGuess(cup);
    });
});

function shuffleCups() {
    if (isShuffling) return;
    
    isShuffling = true;
    shuffleBtn.disabled = true;
    message.textContent = "Shuffling...";
    
    // Hide all cups
    cups.forEach(cup => {
        cup.textContent = '🥤';
        cup.style.pointerEvents = 'none';
    });
    
    // Animate shuffles
    let swaps = 0;
    const shuffleInterval = setInterval(() => {
        // Pick two random cups to swap
        const cup1 = Math.floor(Math.random() * 3);
        const cup2 = (cup1 + 1 + Math.floor(Math.random() * 2)) % 3;
        
        // Animate swap
        cups[cup1].style.transform = 'translateX(30px)';
        cups[cup2].style.transform = 'translateX(-30px)';
        
        setTimeout(() => {
            // Complete swap
            cups[cup1].style.transform = '';
            cups[cup2].style.transform = '';
            
            // Update ball position if swapped
            if (cup1 + 1 === ballPosition) {
                ballPosition = cup2 + 1;
            } else if (cup2 + 1 === ballPosition) {
                ballPosition = cup1 + 1;
            }
            
            swaps++;
            if (swaps >= 3) {
                clearInterval(shuffleInterval);
                isShuffling = false;
                message.textContent = "Which cup hides the ball?";
                cups.forEach(cup => cup.style.pointerEvents = 'auto');
            }
        }, 300);
    }, 600);
}

function checkGuess(clickedCup) {
    const chosenPosition = parseInt(clickedCup.dataset.cup);
    
    // Reveal only the clicked cup
    clickedCup.textContent = chosenPosition === ballPosition ? '⚽' : '🥤';
    
    // Disable further clicks
    cups.forEach(cup => cup.style.pointerEvents = 'none');
    
    if (chosenPosition === ballPosition) {
        score++;
        scoreDisplay.textContent = score;
        message.textContent = "Correct! 🎉";
        
        if (score >= 3) {
            winScreen.style.display = 'flex';
        } else {
            shuffleBtn.disabled = false;
        }
    } else {
        message.textContent = "Wrong! Try again.";
        shuffleBtn.disabled = false;
    }
}

function resetGame() {
    score = 0;
    scoreDisplay.textContent = '0';
    winScreen.style.display = 'none';
    message.textContent = "Click shuffle to start!";
    ballPosition = Math.floor(Math.random() * 3) + 1;
    
    cups.forEach(cup => {
        cup.textContent = '🥤';
        cup.style.pointerEvents = 'auto';
        cup.style.transform = '';
    });
    
    shuffleBtn.disabled = false;
}
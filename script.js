const cupsContainer = document.querySelector('.cups');
const shuffleBtn = document.getElementById('shuffle');
const message = document.getElementById('message');
const scoreDisplay = document.getElementById('score');
const winScreen = document.getElementById('win-screen');

let ballPosition = 1;
let score = 0;
let cupCount = 3; // Start with 3 cups

// Create initial cups
createCups();

shuffleBtn.addEventListener('click', shuffleCups);

function createCups() {
    cupsContainer.innerHTML = '';
    for (let i = 1; i <= cupCount; i++) {
        const cup = document.createElement('div');
        cup.className = 'cup';
        cup.dataset.cup = i;
        cup.textContent = i === ballPosition ? '⚽' : '🥤';
        cup.addEventListener('click', checkGuess);
        cupsContainer.appendChild(cup);
    }
}

function shuffleCups() {
    // Reset display
    document.querySelectorAll('.cup').forEach(cup => {
        cup.textContent = '🥤';
    });

    // Animate shuffles (3 moves)
    let moves = 0;
    const shuffleInterval = setInterval(() => {
        // Move ball to random adjacent cup
        const newPos = Math.max(1, Math.min(cupCount, 
            ballPosition + (Math.random() > 0.5 ? 1 : -1)));
        
        // Animate swap
        const cups = document.querySelectorAll('.cup');
        cups[ballPosition-1].textContent = '🥤';
        cups[newPos-1].textContent = '⚽';
        
        // Flash animation
        cups[newPos-1].style.transform = 'translateY(-20px)';
        setTimeout(() => {
            cups[newPos-1].style.transform = '';
        }, 200);
        
        ballPosition = newPos;
        moves++;
        
        if (moves >= 3) {
            clearInterval(shuffleInterval);
            message.textContent = "Where's the ball?";
        }
    }, 500);
}

function checkGuess(e) {
    const chosenCup = parseInt(e.target.dataset.cup);
    if (chosenCup === ballPosition) {
        score++;
        scoreDisplay.textContent = score;
        
        if (score >= 3) {
            winScreen.classList.remove('hidden');
        } else {
            // Add new cup after correct guess
            cupCount = Math.min(5, cupCount + 1); // Max 5 cups
            createCups();
            message.textContent = `Good job! Now with ${cupCount} cups!`;
        }
    } else {
        message.textContent = "Wrong! Try again.";
    }
}
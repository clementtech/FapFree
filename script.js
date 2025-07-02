const scoreElement = document.getElementById('score');
const checkInButton = document.getElementById('checkInButton');
const resetButton = document.getElementById('resetButton');
const cheerSound = new Audio('cheering.mp3');
const disappointedSound = new Audio('haiya.mp3');

let streak = localStorage.getItem('streak') || 0;

function playCheerSound() {
    cheerSound.play();
}

function playDisappointedSound() {
    disappointedSound.play();
}

function updateStreakDisplay() {
    scoreElement.textContent = streak;
}

checkInButton.addEventListener('click', () => {
    streak++;
    localStorage.setItem('streak', streak);
    updateStreakDisplay();
    playCheerSound();
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

resetButton.addEventListener('click', () => {
    streak = 0;
    localStorage.setItem('streak', streak);
    updateStreakDisplay();
    playDisappointedSound();
});

// Initial streak update on page load
updateStreakDisplay();

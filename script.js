const scoreElement = document.getElementById('score');
const checkInButton = document.getElementById('checkInButton');
const resetButton = document.getElementById('resetButton');
const cheerSound = new Audio('cheering.mp3');
const disappointedSound = new Audio('haiya.mp3');

let streak = localStorage.getItem('streak') || 0;
let lastCheckInDate = localStorage.getItem('lastCheckInDate');

function canCheckIn() {
    if (!lastCheckInDate) {
        return true;
    }
    const today = new Date().toDateString();
    return today !== lastCheckInDate;
}

function updateCheckInButtonState() {
    if (!canCheckIn()) {
        checkInButton.disabled = true;
    }
}

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
    if (canCheckIn()) {
        streak++;
        localStorage.setItem('streak', streak);
        lastCheckInDate = new Date().toDateString();
        localStorage.setItem('lastCheckInDate', lastCheckInDate);
        updateStreakDisplay();
        playCheerSound();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        checkInButton.disabled = true;
    }
});

resetButton.addEventListener('click', () => {
    streak = 0;
    localStorage.setItem('streak', streak);
    updateStreakDisplay();
    playDisappointedSound();
});

// Initial streak update on page load
updateStreakDisplay();
updateCheckInButtonState();

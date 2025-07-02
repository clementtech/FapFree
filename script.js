const scoreElement = document.getElementById('score');
const checkInButton = document.getElementById('checkInButton');
const resetButton = document.getElementById('resetButton');
const countdownElement = document.getElementById('countdown');
const cheerSound = new Audio('cheering.mp3');
const disappointedSound = new Audio('haiya.mp3');

let streak = localStorage.getItem('streak') || 0;
let lastCheckInDate = localStorage.getItem('lastCheckInDate');
let countdownInterval;

function canCheckIn() {
    if (!lastCheckInDate) {
        return true;
    }
    const today = new Date().toDateString();
    return today !== lastCheckInDate;
}

function startCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = tomorrow - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = '';
            checkInButton.disabled = false;
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `Next check-in in: ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

function updateCheckInButtonState() {
    if (!canCheckIn()) {
        checkInButton.disabled = true;
        startCountdown();
    } else {
        checkInButton.disabled = false;
        countdownElement.textContent = '';
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
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
        startCountdown();
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

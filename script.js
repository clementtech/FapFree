const scoreElement = document.getElementById('score');
const checkInButton = document.getElementById('checkInButton');
const resetButton = document.getElementById('resetButton');

let streak = localStorage.getItem('streak') || 0;

function updateStreakDisplay() {
    scoreElement.textContent = streak;
}

checkInButton.addEventListener('click', () => {
    streak++;
    localStorage.setItem('streak', streak);
    updateStreakDisplay();
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
});

// Initial streak update on page load
updateStreakDisplay();

// Gate & Music Logic
document.getElementById('enter-btn').addEventListener('click', function() {
    const leftGate = document.querySelector('.gate-left');
    const rightGate = document.querySelector('.gate-right');
    const gateContainer = document.getElementById('gate-container');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    // Start background music
    bgMusic.play().catch(error => console.log("Audio play failed:", error));

    // Animate gates
    leftGate.classList.add('gate-open-left');
    rightGate.classList.add('gate-open-right');
    document.querySelector('.gate-content').style.opacity = '0';

    // Remove gate container and show main content after animation
    setTimeout(() => {
        gateContainer.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 2000);
});

// Countdown Logic
const weddingDate = new Date("Dec 11, 2026 15:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h3>The Big Day is Here!</h3>";
    }
}, 1000);
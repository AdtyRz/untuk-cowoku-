const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const content = document.getElementById('content');
const audioPlayer = document.getElementById('audioPlayer');
const audioVisualizer = document.getElementById('audioVisualizer');
const flowerParticlesContainer = document.querySelector('.flower-particles');
const flowerRainContainer = document.getElementById('flowerRainContainer');

noBtn.style.position = 'relative';

let scale = 1;
const maxScale = 20;
const scaleStep = 0.5;

noBtn.addEventListener('click', () => {
    if (scale < maxScale) {
        scale += scaleStep;
        yesBtn.style.transform = `scale(${scale})`;
        yesBtn.style.zIndex = 1000;
    }
});

function fadeOutElements(elements, callback) {
    let count = 0;
    elements.forEach(el => {
        el.classList.add('fade-out');
        el.addEventListener('animationend', () => {
            el.style.display = 'none';
            count++;
            if (count === elements.length) {
                callback();
            }
        }, { once: true });
    });
}

yesBtn.addEventListener('click', () => {
    const h1 = document.querySelector('h1');
    const buttons = document.querySelector('.buttons');
    fadeOutElements([h1, buttons], () => {
        content.style.display = 'block';
        content.classList.add('fade-in');
        audioPlayer.play();
        audioVisualizer.style.display = 'block';
        flowerParticlesContainer.style.display = 'block';
        flowerRainContainer.style.display = 'block';
        startVisualizer();
        startFlowerParticles();
        startFlowerRain();
    });
});

function startVisualizer() {
    let hue = 0;
    audioVisualizer.style.background = `hsl(${hue}, 100%, 70%)`;
    audioVisualizer.style.animation = 'none';
    const interval = setInterval(() => {
        hue = (hue + 5) % 360;
        audioVisualizer.style.background = `hsl(${hue}, 100%, 70%)`;
    }, 100);

    function stopVisualizer() {
        clearInterval(interval);
        audioVisualizer.style.background = 'none';
        audioVisualizer.style.display = 'none';
    }

    audioPlayer.addEventListener('pause', stopVisualizer, { once: true });
    audioPlayer.addEventListener('ended', stopVisualizer, { once: true });
}

function startFlowerParticles() {
    flowerParticlesContainer.innerHTML = '';
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const span = document.createElement('span');
        span.style.left = Math.random() * 100 + '%';
        span.style.animationDelay = (Math.random() * 6) + 's';
        span.style.animationDuration = (4 + Math.random() * 4) + 's';
        flowerParticlesContainer.appendChild(span);
    }
}

function startFlowerRain() {
    flowerRainContainer.innerHTML = '';
    const rainCount = 30;
    for (let i = 0; i < rainCount; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower-rain');
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.animationDuration = (5 + Math.random() * 5) + 's';
        flower.style.animationDelay = (Math.random() * 10) + 's';
        flowerRainContainer.appendChild(flower);
    }
}

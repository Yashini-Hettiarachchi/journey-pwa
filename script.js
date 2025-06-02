document.addEventListener('DOMContentLoaded', function() {
    // Cursor trail effect
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${e.clientX}px`;
        trail.style.top = `${e.clientY}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 1200);
    });

    // Particle burst with varied shapes
    function createParticleBurst(x, y, container) {
        const shapes = ['circle', 'star', 'heart'];
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            particle.className = `particle ${shape}`;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 1500);
        }
    }

    // Glow orb interaction
    document.querySelectorAll('.glow-orb, .balloon, .sparkle, .heart').forEach(element => {
        element.addEventListener('click', (e) => {
            const message = element.dataset.message;
            if (message) {
                const popup = document.createElement('div');
                popup.className = 'message-popup';
                popup.textContent = message;
                popup.style.left = `${e.clientX}px`;
                popup.style.top = `${e.clientY}px`;
                document.body.appendChild(popup);
                setTimeout(() => popup.remove(), 2000);
            }
            createParticleBurst(e.clientX, e.clientY, document.body);
            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            audio.volume = 0.1;
            audio.play().catch(() => {});
        });
    });

    // Parallax and proximity effect
    const parallaxElements = document.querySelectorAll('.parallax, .balloon, .sparkle, .heart');
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 30;
        const y = (clientY / innerHeight - 0.5) * 30;

        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const distance = Math.sqrt(
                Math.pow(clientX - (rect.left + rect.width / 2), 2) +
                Math.pow(clientY - (rect.top + rect.height / 2), 2)
            );
            if (distance < 150) {
                el.style.transform = `translateZ(20px) translate(${x / 2}px, ${y / 2}px) scale(1.3)`;
            } else {
                el.style.transform = `translateZ(10px) translate(${x / 4}px, ${y / 4}px) scale(1)`;
            }
        });
    });

    // Password lock functionality
    const correctPassword = "CodeMyWay";
    let isUnlocked = false;
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPasswordButton = document.getElementById('submitPassword');
    const errorMessage = document.getElementById('errorMessage');

    function showPasswordModal() {
        passwordModal.style.display = 'flex';
        passwordInput.focus();
    }

    function hidePasswordModal() {
        passwordModal.style.display = 'none';
        passwordInput.value = '';
        errorMessage.style.display = 'none';
    }

    submitPasswordButton.addEventListener('click', () => {
        if (passwordInput.value === correctPassword) {
            isUnlocked = true;
            hidePasswordModal();
        } else {
            errorMessage.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });

    passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitPasswordButton.click();
        }
    });

    // Door animation logic
    const doorsContainer = document.querySelector('.doors-container');
    if (doorsContainer) {
        const leftDoor = document.querySelector('.left-door');
        const rightDoor = document.querySelector('.right-door');
        const openButton = document.getElementById('openDoors');
        let doorsOpened = false;

        [leftDoor, rightDoor].forEach(door => {
            door.addEventListener('mouseenter', () => {
                if (!doorsOpened && isUnlocked) {
                    door.style.transform = door.classList.contains('left-door') 
                        ? 'rotateY(-15deg) translateZ(20px)' 
                        : 'rotateY(15deg) translateZ(20px)';
                }
            });

            door.addEventListener('mouseleave', () => {
                if (!doorsOpened && isUnlocked) {
                    door.style.transform = 'rotateY(0deg) translateZ(0)';
                }
            });
        });

        openButton.addEventListener('mousemove', (e) => {
            const rect = openButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            openButton.style.setProperty('--x', `${x}px`);
            openButton.style.setProperty('--y', `${y}px`);
        });

        function openDoorsAndNavigate() {
            if (!isUnlocked) {
                showPasswordModal();
                return;
            }
            if (doorsOpened) return;
            doorsOpened = true;

            const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
            audio.volume = 0.2;
            audio.play().catch(() => {});

            createParticleBurst(window.innerWidth / 2, window.innerHeight / 2, document.body);

            leftDoor.classList.add('open-left');
            rightDoor.classList.add('open-right');
            openButton.style.animation = 'buttonShine 1s ease-in-out';

            setTimeout(() => {
                document.body.style.transition = 'opacity 1s ease';
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = 'tribute.html';
                }, 1000);
            }, 2000);
        }

        leftDoor.addEventListener('click', openDoorsAndNavigate);
        rightDoor.addEventListener('click', openDoorsAndNavigate);
        openButton.addEventListener('click', openDoorsAndNavigate);
    }

    // Tribute page animations
    const tributePage = document.querySelector('.tribute-page');
    if (tributePage) {
        const contentWrapper = document.querySelector('.content-wrapper');
        contentWrapper.style.animation = 'float 7s ease-in-out infinite';

        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateZ(0) translateY(0); }
                50% { transform: translateZ(10px) translateY(-15px); }
            }
        `;
        document.head.appendChild(style);

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.5}s`;
        });

        const sections = document.querySelectorAll('.message-section, .poem-section');
        sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                section.style.transform = 'rotateY(5deg) translateZ(20px)';
                createParticleBurst(section.getBoundingClientRect().left + section.offsetWidth / 2, section.getBoundingClientRect().top + section.offsetHeight / 2, document.body);
                const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
                audio.volume = 0.1;
                audio.play().catch(() => {});
            });
            section.addEventListener('mouseleave', () => {
                section.style.transform = 'rotateY(0deg) translateZ(0)';
            });
        });

        // Fade-in effect on page load
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Countdown functionality
    function updateCountdown() {
        const now = new Date();
        const sriLankaTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        const startTime = new Date('2025-06-02T22:29:00+05:30');
        const rememberingDay = new Date('2025-06-02T22:29:00+05:30');

        const diff = rememberingDay - sriLankaTime;
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.textContent = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.textContent = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.textContent = String(minutes).padStart(2, '0');
            if (secondsElement) secondsElement.textContent = String(seconds).padStart(2, '0');

            const daysPositive = Math.floor((sriLankaTime - startTime) / (1000 * 60 * 60 * 24)) + 1;
            const positivityMessageElement = document.getElementById('positivity-message');
            if (positivityMessageElement) {
                positivityMessageElement.textContent = `Congratulations! You’ve stayed positive for ${daysPositive} day${daysPositive === 1 ? '' : 's'}! Keep shining!`;
                positivityMessageElement.style.display = 'block';
            }
        } else {
            const countdownElement = document.getElementById('countdown');
            const birthdayMessageElement = document.getElementById('birthday-message');
            if (countdownElement) countdownElement.style.display = 'none';
            if (birthdayMessageElement) {
                const daysSinceStart = Math.floor((sriLankaTime - startTime) / (1000 * 60 * 60 * 24)) + 1;
                birthdayMessageElement.style.display = 'block';
                birthdayMessageElement.querySelector('h2').textContent = 'Celebrate Your Journey! 🌟';
                birthdayMessageElement.querySelector('p').textContent = `You’ve reached day ${daysSinceStart} of your Remembering Day! Be proud of your positivity!`;
            }
        }
    }

    if (document.querySelector('.container')) {
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // Add positivity message
    const container = document.querySelector('.container');
    if (container && !document.getElementById('positivity-message')) {
        const positivityMessage = document.createElement('div');
        positivityMessage.id = 'positivity-message';
        positivityMessage.style.cssText = 'text-align: center; color: #FF69B4; font-size: 1.4em; margin-top: 15px; display: none; font-family: "Cinzel Decorative", cursive;';
        container.appendChild(positivityMessage);
    }

    // Motivational messages
    const motivationalMessages = [
        "You are a radiant star! Shine bright!",
        "Your strength is a beacon of hope!",
        "Every moment you shine is a victory!",
        "Your journey is a masterpiece!",
        "Embrace your magic, you are unstoppable!",
        "Your heart glows with endless light!",
        "You are never alone in your brilliance!",
        "Your courage paints the world with color!",
        "Your dreams are your superpower!",
        "You are a gift to the universe!"
    ];

    function sendNotification(title, body) {
        if ('serviceWorker' in navigator && Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification(title, {
                    body: body,
                    icon: 'favicon.ico',
                    badge: 'favicon.ico',
                    tag: 'motivation-notification-' + Date.now(),
                    vibrate: [200, 100, 200]
                });
            });
        }
    }

    function scheduleDailyNotification() {
        const now = new Date();
        const sriLankaTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        const nextMidnight = new Date(sriLankaTime);
        nextMidnight.setHours(0, 0, 0, 0);
        if (sriLankaTime.getHours() >= 0) {
            nextMidnight.setDate(nextMidnight.getDate() + 1);
        }
        const timeToMidnight = nextMidnight - sriLankaTime;

        setTimeout(() => {
            const daysPositive = Math.floor((new Date() - new Date('2025-06-02T22:29:00+05:30')) / (1000 * 60 * 60 * 24)) + 1;
            if (daysPositive >= 0) {
                sendNotification(
                    "Your Journey of Pride",
                    `Congratulations! You’ve been positive for ${daysPositive} day${daysPositive === 1 ? '' : 's'}! Keep shining!`
                );
            }
            setInterval(() => {
                const daysPositive = Math.floor((new Date() - new Date('2025-06-02T22:29:00+05:30')) / (1000 * 60 * 60 * 24)) + 1;
                if (daysPositive >= 0) {
                    sendNotification(
                        "Your Journey of Pride",
                        `Congratulations! You’ve been positive for ${daysPositive} day${daysPositive === 1 ? '' : 's'}! Keep shining!`
                    );
                }
            }, 24 * 60 * 60 * 1000);
        }, timeToMidnight);
    }

    function scheduleRandomNotifications() {
        const now = new Date();
        const sriLankaTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
        const today8AM = new Date(sriLankaTime);
        today8AM.setHours(8, 0, 0, 0);
        const today8PM = new Date(sriLankaTime);
        today8PM.setHours(20, 0, 0, 0);

        const sendRandomNotification = () => {
            const currentTime = new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000));
            if (currentTime >= today8AM && currentTime <= today8PM) {
                const daysPositive = Math.floor((currentTime - new Date('2025-06-02T22:29:00+05:30')) / (1000 * 60 * 60 * 24)) + 1;
                const message = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
                sendNotification("Keep Shining!", `${message} You’ve been positive for ${daysPositive} day${daysPositive === 1 ? '' : 's'}!`);
            }
        };

        const notificationsPerDay = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < notificationsPerDay; i++) {
            const randomTime = today8AM.getTime() + Math.random() * (today8PM.getTime() - today8AM.getTime());
            const delay = randomTime - sriLankaTime.getTime();
            if (delay > 0) {
                setTimeout(sendRandomNotification, delay);
            }
        }

        setTimeout(() => {
            setInterval(() => {
                const notificationsPerDay = Math.floor(Math.random() * 3) + 2;
                const nextDay8AM = new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000));
                nextDay8AM.setHours(8, 0, 0, 0);
                nextDay8AM.setDate(nextDay8AM.getDate() + 1);
                const nextDay8PM = new Date(nextDay8AM);
                nextDay8PM.setHours(20, 0, 0, 0);
                for (let i = 0; i < notificationsPerDay; i++) {
                    const randomTime = nextDay8AM.getTime() + Math.random() * (nextDay8PM.getTime() - nextDay8AM.getTime());
                    const delay = randomTime - (new Date().getTime() + (5.5 * 60 * 60 * 1000));
                    if (delay > 0) {
                        setTimeout(sendRandomNotification, delay);
                    }
                }
            }, 24 * 60 * 60 * 1000);
        }, today8PM.getTime() - sriLankaTime.getTime());
    }

    if (Notification.permission === 'granted') {
        scheduleDailyNotification();
        scheduleRandomNotifications();
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                scheduleDailyNotification();
                scheduleRandomNotifications();
            }
        });
    }
});
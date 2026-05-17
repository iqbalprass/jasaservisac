// Force scroll to top on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Custom Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Smooth outline movement
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Cursor hover effect
const links = document.querySelectorAll('a, button, .service-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.borderColor = 'rgba(0, 242, 255, 0.8)';
    });
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.borderColor = 'rgba(0, 242, 255, 0.5)';
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typing Effect
const textElement = document.getElementById('typing-text');
const text = "Solusi pendingin udara terbaik dengan teknologi modern, harga transparan, dan teknisi bersertifikat. Kami hadir untuk kenyamanan Anda.";
let index = 0;

function typeEffect() {
    if (index < text.length) {
        textElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeEffect, 30);
    }
}

// Start typing after preloader
setTimeout(typeEffect, 2000);

// GSAP Animations
gsap.from(".hero-content h1", {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "power4.out",
    delay: 1.8
});

gsap.from(".hero-btns", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power4.out",
    delay: 2.2
});

// Particles.js Config
particlesJS("particles-js", {
    "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00f2ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5, "random": false },
        "size": { "value": 3, "random": true },
        "line_linked": { "enable": true, "distance": 150, "color": "#00f2ff", "opacity": 0.4, "width": 1 },
        "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
    },
    "interactivity": {
        "detect_on": "window",
        "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
        "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
    },
    "retina_detect": true
});

// AOS Initialization
AOS.init({
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out',
    once: false,
    mirror: true
});

// Swiper.js Config
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        }
    }
});

var gallerySwiper = new Swiper(".gallerySwiper", {
    slidesPerView: 1,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".gallery-pagination",
        clickable: true,
    }
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
    const suffix = counter.parentElement.innerText.includes('%') ? '%' :
        (counter.parentElement.innerText.includes('+') ? '+' : '');

    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target;
        }
    };

    // Trigger when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const val = parseInt(counter.innerText);
            counter.setAttribute('data-target', val);
            counter.innerText = '0';

            // Re-apply suffix after animation if needed, or handle it in updateCount
            // Let's modify updateCount to be cleaner
            const updateWithSuffix = () => {
                const target = +counter.getAttribute('data-target');
                const count = parseInt(counter.innerText);
                const inc = target / speed;

                if (count < target) {
                    const nextCount = Math.ceil(count + inc);
                    counter.innerText = nextCount;
                    setTimeout(updateWithSuffix, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateWithSuffix();
            observer.unobserve(counter);
        }
    });
    observer.observe(counter);
});

// Form Submission to Email (using Formspree)
const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button');
    const originalText = btn.innerText;

    // Formspree Endpoint (Ganti 'YOUR_ID' dengan ID dari Formspree)
    const endpoint = "https://formspree.io/f/xrejwjrv";

    const formData = new FormData(form);

    btn.innerText = "Mengirim...";
    btn.disabled = true;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            showSuccess();
            form.reset();
        } else {
            alert("Oops! Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
        }
    } catch (error) {
        alert("Gagal terhubung ke server.");
    } finally {
        btn.innerText = originalText;
        btn.disabled = false;
    }
});

function showSuccess() {
    const overlay = document.getElementById('success-overlay');
    overlay.style.display = 'flex';
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);
}

function closeSuccess() {
    const overlay = document.getElementById('success-overlay');
    overlay.classList.remove('active');
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 400);
}

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

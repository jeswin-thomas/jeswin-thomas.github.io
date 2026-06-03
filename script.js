// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

if (cursor && follower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smoother follower animation
    const animateFollower = () => {
        posX += (mouseX - posX) / 8;
        posY += (mouseY - posY) / 8;
        
        follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;
        requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Cursor hover effects
    const links = document.querySelectorAll('a, button, .skill-card, .cert-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform += ' scale(2.5)';
            follower.style.background = 'rgba(59, 130, 246, 0.1)';
            follower.style.border = 'none';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = cursor.style.transform.replace(' scale(2.5)', '');
            follower.style.background = 'none';
            follower.style.border = '1px solid var(--accent)';
        });
    });
}

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth Scroll (Native + Fixed Header Offset)
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            e.preventDefault();
            const headerHeight = header.offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Simple Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for reaching out, Jeswin will get back to you soon!');
            contactForm.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
}

console.log('Jeswin Thomas Portfolio Engine Initialized.');

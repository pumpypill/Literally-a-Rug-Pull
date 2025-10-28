// LARP - Literally A Rug Pull - Interactive JavaScript
// Modern web interactions with Apple/OpenAI inspired UX

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive components
    initializeNavigation();
    initializeAnimations();
    initializeScrollEffects();
    initializeParticles();
    initializeTypewriter();
    initializeCounters();
    initializeCursorEffects();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navigation background on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            nav.style.background = 'rgba(0, 0, 0, 0.95)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.8)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
        
        // Hide/show nav on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// Intersection Observer for scroll animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .timeline-item, .tokenomics-stat');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
    `;
    document.head.appendChild(style);
}

// Parallax and scroll effects
function initializeScrollEffects() {
    const hero = document.querySelector('.hero');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Floating orbs movement
        orbs.forEach((orb, index) => {
            const speed = 0.2 + (index * 0.1);
            orb.style.transform = `translate(${Math.sin(scrolled * 0.01) * 20}px, ${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Particle system for background
function initializeParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particleContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: linear-gradient(45deg, #007AFF, #5856D6);
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle ${Math.random() * 20 + 10}s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        container.appendChild(particle);
        
        // Add floating animation
        const keyframes = `
            @keyframes float-particle {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        
        if (!document.querySelector('#particle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'particle-keyframes';
            style.textContent = keyframes;
            document.head.appendChild(style);
        }
    }
}

// Typewriter effect for hero subtitle
function initializeTypewriter() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid #007AFF';
    
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            subtitle.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 30);
        } else {
            // Blinking cursor effect
            setInterval(() => {
                subtitle.style.borderRight = subtitle.style.borderRight === 'none' ? '2px solid #007AFF' : 'none';
            }, 500);
        }
    }
    
    // Start typewriter effect after a delay
    setTimeout(typeWriter, 1000);
}

// Animated counters for stats
function initializeCounters() {
    const stats = document.querySelectorAll('.stat-value');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
    
    function animateCounter(element) {
        const target = element.textContent;
        if (target === '∞') return; // Skip infinity symbol
        
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        let current = 0;
        const increment = numericTarget / 100;
        const duration = 2000;
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }
}

// Custom cursor effects
function initializeCursorEffects() {
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #007AFF 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Scale cursor on hover
    const interactiveElements = document.querySelectorAll('button, a, .feature-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Button interaction effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
});

// Feature card hover effects
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.2)';
            
            // Animate icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Smooth page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (for responsive design)
function initializeMobileMenu() {
    const nav = document.querySelector('.nav-container');
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    // Show on mobile
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    function handleMobileMenu(e) {
        if (e.matches) {
            menuButton.style.display = 'block';
            nav.appendChild(menuButton);
        } else {
            menuButton.style.display = 'none';
        }
    }
    
    mediaQuery.addListener(handleMobileMenu);
    handleMobileMenu(mediaQuery);
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    // Add rainbow animation to logo
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.style.animation = 'rainbow 2s linear infinite';
        
        const rainbowKeyframes = `
            @keyframes rainbow {
                0% { background: linear-gradient(45deg, #ff0000, #ff7f00); }
                16% { background: linear-gradient(45deg, #ff7f00, #ffff00); }
                33% { background: linear-gradient(45deg, #ffff00, #00ff00); }
                50% { background: linear-gradient(45deg, #00ff00, #0000ff); }
                66% { background: linear-gradient(45deg, #0000ff, #4b0082); }
                83% { background: linear-gradient(45deg, #4b0082, #9400d3); }
                100% { background: linear-gradient(45deg, #9400d3, #ff0000); }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = rainbowKeyframes;
        document.head.appendChild(style);
        
        // Show message
        const message = document.createElement('div');
        message.textContent = '🎉 You found the easter egg! Welcome to the matrix of rugpulls! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #007AFF, #5856D6);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: bold;
            text-align: center;
            max-width: 300px;
            animation: bounceIn 0.5s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
            logo.style.animation = '';
        }, 5000);
    }
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll handlers
const debouncedScrollHandler = debounce(function() {
    // Scroll-dependent animations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);
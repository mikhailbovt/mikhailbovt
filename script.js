// Portfolio Website JavaScript
// Mikhail Bovt - Data Scientist Portfolio

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavigation();
    setupScrollAnimations();
    setupSkillBars();
    setupAudioPlayer();
    setupGlitchEffects();
    setupVHSEffects();
    setupFloatingIcons();
    setupWorldMap();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for internal links (starting with #)
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // External links (like stats.html) will work normally
        });
    });
    
    // Active navigation highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .story-card, .skill-category').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bars animation
function setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = `${level}%`;
                skillBar.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Audio player functionality
function setupAudioPlayer() {
    const audioPlayer = document.getElementById('audioPlayer');
    
    // Автоматически запускаем радио при загрузке страницы
    audioPlayer.play().catch(e => console.log('Автовоспроизведение заблокировано браузером'));
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 5px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: var(--primary-color);' : 'background: var(--secondary-color);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Glitch effects
function setupGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.textShadow = `
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px var(--vhs-color),
                ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px var(--retro-cyan)
            `;
            
            setTimeout(() => {
                element.style.textShadow = '0 0 20px var(--glow-color)';
            }, 100);
        }, 3000);
    });
}

// VHS effects
function setupVHSEffects() {
    const vhsOverlay = document.querySelector('.vhs-overlay');
    
    // Random VHS glitches
    setInterval(() => {
        if (Math.random() > 0.7) {
            addVHSGlitch();
        }
    }, 2000);
    
    // Add scanline variations
    setInterval(() => {
        vhsOverlay.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        setTimeout(() => {
            vhsOverlay.style.filter = 'none';
        }, 100);
    }, 5000);
}

// Add VHS glitch effect
function addVHSGlitch() {
    const vhsOverlay = document.querySelector('.vhs-overlay');
    
    vhsOverlay.style.animation = 'none';
    vhsOverlay.style.transform = `translateY(${Math.random() * 10 - 5}px) skew(${Math.random() * 10 - 5}deg)`;
    vhsOverlay.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${1 + Math.random() * 0.5})`;
    
    setTimeout(() => {
        vhsOverlay.style.animation = 'vhs-scan 0.1s linear infinite';
        vhsOverlay.style.transform = 'none';
        vhsOverlay.style.filter = 'none';
    }, 200);
}

// Floating icons animation
function setupFloatingIcons() {
    const icons = document.querySelectorAll('.floating-icons .icon');
    
    icons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + index * 500);
    });
}

// World map interactions
function setupWorldMap() {
    const locations = document.querySelectorAll('.location');
    
    locations.forEach(location => {
        location.addEventListener('click', function() {
            const tooltip = this.getAttribute('data-tooltip');
            showLocationTooltip(tooltip, this);
        });
        
        location.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.zIndex = '10';
        });
        
        location.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '1';
        });
    });
}

// Show location tooltip
function showLocationTooltip(message, element) {
    const tooltip = document.createElement('div');
    tooltip.className = 'location-tooltip';
    tooltip.textContent = message;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.9);
        color: var(--retro-pink);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 1px solid var(--retro-pink);
        font-size: 0.9rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
        transform: translateY(-100%);
        margin-top: -10px;
    `;
    
    element.appendChild(tooltip);
    
    setTimeout(() => {
        if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
        }
    }, 2000);
}

// Parallax effect for background
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.animated-bg');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add some random glitch effects to text
function addRandomGlitches() {
    const textElements = document.querySelectorAll('h1, h2, h3, p');
    
    setInterval(() => {
        if (Math.random() > 0.95) {
            const randomElement = textElements[Math.floor(Math.random() * textElements.length)];
            randomElement.style.textShadow = `
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px var(--vhs-color),
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px var(--retro-cyan)
            `;
            
            setTimeout(() => {
                randomElement.style.textShadow = '';
            }, 200);
        }
    }, 1000);
}

// Initialize parallax and random glitches
document.addEventListener('DOMContentLoaded', () => {
    setupParallax();
    addRandomGlitches();
});

// Add some Easter eggs
document.addEventListener('keydown', (e) => {
    // Press 'G' for glitch mode
    if (e.key.toLowerCase() === 'g') {
        document.body.classList.toggle('glitch-mode');
        if (document.body.classList.contains('glitch-mode')) {
            showNotification('Glitch mode activated!', 'success');
        } else {
            showNotification('Glitch mode deactivated!', 'success');
        }
    }
    
    // Press 'V' for VHS mode
    if (e.key.toLowerCase() === 'v') {
        document.body.classList.toggle('vhs-mode');
        if (document.body.classList.contains('vhs-mode')) {
            showNotification('VHS mode activated!', 'success');
            addVHSGlitch();
        } else {
            showNotification('VHS mode deactivated!', 'success');
        }
    }
});

// Add CSS for glitch and VHS modes
const style = document.createElement('style');
style.textContent = `
    .glitch-mode * {
        animation: glitch-1 0.1s infinite !important;
    }
    
    .vhs-mode .vhs-overlay {
        opacity: 0.8 !important;
        filter: contrast(1.5) saturate(1.5) !important;
    }
    
    .location-tooltip {
        animation: fadeInOut 2s ease-in-out;
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(-100%) scale(0.8); }
        50% { opacity: 1; transform: translateY(-100%) scale(1); }
    }
`;
document.head.appendChild(style);

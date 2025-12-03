// DOM Elements
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
const closeSidebar = document.getElementById('closeSidebar');
const backToTop = document.getElementById('backToTop');
const mainContent = document.getElementById('mainContent');
const navLinks = document.querySelectorAll('.nav-links a');

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    sidebar.classList.toggle('active');
}

// Close Sidebar
function closeSidebarFn() {
    sidebar.classList.remove('active');
}

// Menu Button Click
if (menuBtn) {
    menuBtn.addEventListener('click', toggleSidebar);
}

// Close Button Click
if (closeSidebar) {
    closeSidebar.addEventListener('click', closeSidebarFn);
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
            closeSidebarFn();
        }
    }
});

// Close sidebar when clicking on a nav link (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeSidebarFn();
        }
    });
});

// Highlight active section in navigation
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        background-color: var(--bg-light);
        border-left-color: var(--primary-color);
        color: var(--primary-color);
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Back to Top Button
function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}

// Scroll to Top
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    toggleBackToTop();
    highlightActiveSection();
});

// Initial calls
toggleBackToTop();
highlightActiveSection();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 20;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close sidebar if window is resized to desktop size
        if (window.innerWidth > 768) {
            closeSidebarFn();
        }
    }, 250);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Close sidebar on ESC key
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebarFn();
    }
});

// Add animation to sections on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    sectionObserver.observe(section);
});

// Log page load
console.log('SpringBoot SSR PRO Documentation loaded successfully!');
console.log('Navigate through sections using the sidebar or scroll naturally.');

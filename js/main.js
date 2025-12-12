// Main JavaScript for Go Down Herbs Homepage

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initLoadingScreen();
    initHeroSlider();
    initMobileMenu();
    initWhatsAppWidget();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    initNewsletterForm();
    initFeaturedProducts();
    initHomeAddToCart(); // Initialize Add-to-Cart functionality
});

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
}

// Enhanced Hero Slider with Multiple Images
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slide-prev');
    const nextBtn = document.querySelector('.slide-next');
    
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    if (dots.length > 0) {
        dots.forEach(dot => dot.classList.remove('active'));
    }
    
    // Add active class to current slide and dot
    slides[index].classList.add('active');
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    currentSlide = index;
}

    // Function to go to next slide
    function nextSlide() {
        let next = currentSlide + 1;
        if (next >= slides.length) next = 0;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        let prev = currentSlide - 1;
        if (prev < 0) prev = slides.length - 1;
        showSlide(prev);
    }

    // Event listeners for controls
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Event listeners for dots
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval();
            });
        });
    }

    // Auto slide every 5 seconds
    function startInterval() {
        slideInterval = setInterval(nextSlide, 3000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Start the slider
    if (slides.length > 0 && dots.length > 0) {
        startInterval();
        
        // Pause on hover
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                startInterval();
            });
        }
    }

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const heroSlideshow = document.querySelector('.hero-slideshow');
    if (heroSlideshow) {
        heroSlideshow.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSlideshow.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            nextSlide();
            resetInterval();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            prevSlide();
            resetInterval();
        }
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && mobileMenuBtn) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

function initWhatsAppWidget() {
    const waBtn = document.querySelector('.wa-btn-popup');
    const waPopup = document.querySelector('.wa-popup-chat');
    const waClose = document.querySelector('.wa-close-popup');
    const whatsappWidget = document.querySelector('.whatsapp-widget');

    let scrollTimeout;

    function showWidget() {
        if (whatsappWidget) {
            whatsappWidget.style.opacity = '1';
            whatsappWidget.style.pointerEvents = 'auto';
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                hideWidget();
            }, 2000);
        }
    }
    function hideWidget() {
        if (whatsappWidget) {
            whatsappWidget.style.opacity = '0';
            whatsappWidget.style.pointerEvents = 'none';
            if (waPopup) {
                waPopup.classList.remove('active');
            }
        }
    }

    // Hide initially
    hideWidget();

    window.addEventListener('scroll', () => {
        showWidget();
    });

    if (waBtn && waPopup) {
        waBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            waPopup.classList.toggle('active');
        });

        // Close popup when clicking close button
        if (waClose) {
            waClose.addEventListener('click', () => {
                waPopup.classList.remove('active');
            });
        }

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (waPopup && !waBtn.contains(e.target) && !waPopup.contains(e.target)) {
                waPopup.classList.remove('active');
            }
        });

        // Prevent closing when clicking inside popup
        waPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animateElements = document.querySelectorAll('.feature, .category-card, .testimonial-card, .store-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animation classes
    const style = document.createElement('style');
    style.textContent = `
        .feature, .category-card, .testimonial-card, .store-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature.animate-in, 
        .category-card.animate-in, 
        .testimonial-card.animate-in, 
        .store-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature:nth-child(1) { transition-delay: 0.1s; }
        .feature:nth-child(2) { transition-delay: 0.2s; }
        .feature:nth-child(3) { transition-delay: 0.3s; }
        
        .category-card:nth-child(1) { transition-delay: 0.1s; }
        .category-card:nth-child(2) { transition-delay: 0.2s; }
        .category-card:nth-child(3) { transition-delay: 0.3s; }
        .category-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate form submission
            showNotification('Thank you for subscribing to our wellness community!', 'success');
            this.reset();
        });
    }
}

// Featured Products Slider
function initFeaturedProducts() {
    const sliderTrack = document.getElementById('sliderTrack');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (!sliderTrack) return;
    
    // Sample product data
    const products = [
        {
            name: "Go Down Herb",
            description: "Traditional cleansing herb mixture for natural body purification and wellness.",
            price: "R150",
            image: "images/product/godown.jpg"
        },
        {
            name: "Silent Herb",
            description: "Special herbal formula with powerful natural properties for health benefits.",
            price: "R250",
            image: "images/product/silentHerb.jpg"
        },
        {
            name: "Natural Cleaner",
            description: "Natural energy enhancer with revitalizing herbal ingredients.",
            price: "R120",
            image: "images/product/cleaner.png"
        },
        {
            name: "Shirts",
            description: "Soothing herbal tea for stress relief and mental clarity.",
            price: "R180",
            image: "images/merch/green-shirt.png"
        },
        {
            name: "Mpesu",
            description: "Powerful herbal blend to strengthen your immune system.",
            price: "R200",
            image: "images/product/mpesu.jpg"
        }
    ];
    
    // Generate product slides
    function generateProductSlides() {
        return products.map(product => `
            <div class="product-slide">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-price">${product.price}</div>
                    <a href="shop.html" class="btn btn-primary">
                        <i class="fas fa-shopping-basket"></i>
                        Add to Cart
                    </a>
                </div>
            </div>
        `).join('');
    }
    
    // Initialize slider
    sliderTrack.innerHTML = generateProductSlides();
    
    let currentPosition = 0;
    const slideWidth = 350; // width + gap
    const visibleSlides = Math.floor(sliderTrack.parentElement.offsetWidth / slideWidth);
    const maxPosition = -(products.length - visibleSlides) * slideWidth;
    
    // Update slider position
    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(${currentPosition}px)`;
    }
    
    // Next slide
    function next() {
        if (currentPosition > maxPosition) {
            currentPosition -= slideWidth;
            updateSliderPosition();
        }
    }
    
    // Previous slide
    function prev() {
        if (currentPosition < 0) {
            currentPosition += slideWidth;
            updateSliderPosition();
        }
    }
    
    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prev);
        nextBtn.addEventListener('click', next);
    }
    
    // Touch swipe for mobile
    let sliderStartX = 0;
    let sliderEndX = 0;
    
    sliderTrack.addEventListener('touchstart', e => {
        sliderStartX = e.changedTouches[0].screenX;
    });
    
    sliderTrack.addEventListener('touchend', e => {
        sliderEndX = e.changedTouches[0].screenX;
        handleSliderSwipe();
    });
    
    function handleSliderSwipe() {
        const swipeThreshold = 50;
        
        if (sliderEndX < sliderStartX - swipeThreshold) {
            next();
        }
        
        if (sliderEndX > sliderStartX + swipeThreshold) {
            prev();
        }
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 4000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#10b981',
        'error': '#ef4444',
        'warning': '#f59e0b',
        'info': '#3b82f6'
    };
    return colors[type] || '#3b82f6';
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Add hover effects for interactive elements
function initHoverEffects() {
    // Category cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Product cards
    const productCards = document.querySelectorAll('.product-slide');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects
initHoverEffects();

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();



/* ===== MOBILE JAVASCRIPT FIXES ===== */
/* Add this JavaScript for better mobile experience */

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const backToTop = document.getElementById('backToTop');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });
    
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hero slider for mobile touch
const heroSlider = document.querySelector('.hero-slider');
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

let currentSlide = 0;

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
}

// Touch swipe for mobile slider
if (heroSlider) {
    let startX = 0;
    let endX = 0;
    
    heroSlider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    heroSlider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                showSlide(currentSlide + 1);
            } else {
                // Swipe right - previous slide
                showSlide(currentSlide - 1);
            }
        }
    }
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Auto-advance slides (pause on mobile touch)
let slideInterval;

function startSlider() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

// Pause slider on hover/touch
heroSlider.addEventListener('mouseenter', stopSlider);
heroSlider.addEventListener('mouseleave', startSlider);
heroSlider.addEventListener('touchstart', stopSlider);
heroSlider.addEventListener('touchend', () => {
    setTimeout(startSlider, 3000); // Resume after 3 seconds
});

// Start slider
startSlider();

// Loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Prevent pinch zoom on mobile (optional)
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

// Add viewport meta tag for proper mobile rendering
// Make sure this is in your HTML head:
// <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

// Simple Image Popup Manager
// Dual Popup Functionality
// Discount Popups Manager
document.addEventListener('DOMContentLoaded', function() {
    // Check if popup elements exist
    const popup1 = document.getElementById('discountPopup1');
    const popup2 = document.getElementById('discountPopup2');
    
    if (!popup1 || !popup2) {
        console.error('Popup elements not found!');
        return;
    }
    
    // Get all elements
    const smallIcon1 = document.getElementById('smallIcon1');
    const smallIcon2 = document.getElementById('smallIcon2');
    const closePopup1 = document.getElementById('closePopup1');
    const closePopup2 = document.getElementById('closePopup2');
    const laterBtn1 = document.getElementById('laterBtn1');
    const laterBtn2 = document.getElementById('laterBtn2');
    const claimBtns = document.querySelectorAll('.popup-buttons-container .btn-primary');
    
    let iconTimer1, iconTimer2;
    let hasShownPopup1 = false;
    let hasShownPopup2 = false;
    
    // Initialize popups
    function initPopups() {
        // Hide all popups initially
        hideAllPopups();
        
        // Hide small icons initially
        if (smallIcon1) smallIcon1.classList.remove('active');
        if (smallIcon2) smallIcon2.classList.remove('active');
        
        // Show first popup after 1.5 seconds
        setTimeout(() => {
            showPopup1();
        }, 1500);
    }
    
    // Show first popup
    function showPopup1() {
        if (hasShownPopup1) return; // Don't show if already shown
        
        hideAllPopups();
        popup1.classList.add('active');
        document.body.classList.add('popup-open');
        hasShownPopup1 = true;
        
        // Hide icons while popup is open
        if (smallIcon1) smallIcon1.classList.remove('active');
        if (smallIcon2) smallIcon2.classList.remove('active');
    }
    
    // Show second popup
    function showPopup2() {
        if (hasShownPopup2) return; // Don't show if already shown
        
        hideAllPopups();
        popup2.classList.add('active');
        document.body.classList.add('popup-open');
        hasShownPopup2 = true;
        
        // Hide icons while popup is open
        if (smallIcon1) smallIcon1.classList.remove('active');
        if (smallIcon2) smallIcon2.classList.remove('active');
    }
    
    // Hide all popups
    function hideAllPopups() {
        popup1.classList.remove('active');
        popup2.classList.remove('active');
        document.body.classList.remove('popup-open');
    }
    
    // Show small icon for popup 1
    function showSmallIcon1() {
        hideAllPopups();
        
        clearTimeout(iconTimer1);
        
        // Show icon after delay
        iconTimer1 = setTimeout(() => {
            if (smallIcon1 && !popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                smallIcon1.classList.add('active');
            }
        }, 6000);
    }
    
    // Show small icon for popup 2
    function showSmallIcon2() {
        hideAllPopups();
        
        clearTimeout(iconTimer2);
        
        // Show icon after delay
        iconTimer2 = setTimeout(() => {
            if (smallIcon2 && !popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                smallIcon2.classList.add('active');
            }
        }, 6000);
    }
    
    // Show both small icons
    function showBothIcons() {
        hideAllPopups();
        
        setTimeout(() => {
            if (smallIcon1) smallIcon1.classList.add('active');
            if (smallIcon2) smallIcon2.classList.add('active');
        }, 1000);
    }
    
    // Event Listeners for Popup 1
    if (closePopup1) {
        closePopup1.addEventListener('click', showSmallIcon1);
    }
    
    if (laterBtn1) {
        laterBtn1.addEventListener('click', showSmallIcon1);
    }
    
    // Event Listeners for Popup 2
    if (closePopup2) {
        closePopup2.addEventListener('click', showSmallIcon2);
    }
    
    if (laterBtn2) {
        laterBtn2.addEventListener('click', showSmallIcon2);
    }
    
    // Claim buttons for both popups
    if (claimBtns.length > 0) {
        claimBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                hideAllPopups();
                
                // Show both icons after 2 seconds
                setTimeout(showBothIcons, 2000);
                
                // Navigate to shop page
                window.location.href = btn.href || 'shop.html';
            });
        });
    }
    
    // Close when clicking outside popup content
    [popup1, popup2].forEach(popup => {
        if (popup) {
            popup.addEventListener('click', function(e) {
                if (e.target === popup) {
                    if (popup === popup1) {
                        showSmallIcon1();
                    } else {
                        showSmallIcon2();
                    }
                }
            });
        }
    });
    
    // Small icon clicks
    if (smallIcon1) {
        smallIcon1.addEventListener('click', showPopup1);
    }
    
    if (smallIcon2) {
        smallIcon2.addEventListener('click', showPopup2);
    }
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (popup1.classList.contains('active')) {
                showSmallIcon1();
            } else if (popup2.classList.contains('active')) {
                showSmallIcon2();
            }
        }
    });
    
    // Hide small icons when scrolling (optional)
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (smallIcon1) smallIcon1.classList.remove('active');
        if (smallIcon2) smallIcon2.classList.remove('active');
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            if (!popup1.classList.contains('active') && !popup2.classList.contains('active')) {
                if (smallIcon1) smallIcon1.classList.add('active');
                if (smallIcon2) smallIcon2.classList.add('active');
            }
        }, 2000);
    }, { passive: true });
    
    // Initialize popups
    initPopups();
    
    // Debug info
    console.log('Popups initialized successfully');
    console.log('Popup 1:', popup1 ? 'Found' : 'Not found');
    console.log('Popup 2:', popup2 ? 'Found' : 'Not found');
});

/* ===== HOME PAGE: Add-to-Cart Handler ===== */
function initHomeAddToCart() {
  // buttons inside product cards (.product-actions .btn-primary) and product slides (#sliderTrack .btn-primary)
  const selectors = [
    '.product-card .product-actions .btn-primary',
    '.product-slide .btn-primary',
    '.product-info .btn-primary'
  ];
  const buttons = document.querySelectorAll(selectors.join(','));
  if (!buttons || buttons.length === 0) return;

  buttons.forEach(btn => {
    // Skip anchor tags to allow normal link behavior
    if (btn.tagName.toLowerCase() === 'a') return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // find containing product element
      const card = btn.closest('.product-card') || btn.closest('.product-slide') || btn.closest('.product-info');
      if (!card) return;

      // extract product info from DOM
      const nameEl = card.querySelector('.product-name') || card.querySelector('h3') || card.querySelector('h2');
      const priceEl = card.querySelector('.current-price') || card.querySelector('.product-price') || card.querySelector('.product-price .current-price') || card.querySelector('.product-price');
      const imageEl = card.querySelector('img');

      const name = nameEl ? nameEl.textContent.trim() : 'Product';
      let priceText = priceEl ? priceEl.textContent.trim() : '';
      // normalize price to number or keep string
      const numeric = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));
      const price = isNaN(numeric) ? priceText : numeric;

      const image = imageEl ? (imageEl.dataset && imageEl.dataset.src ? imageEl.dataset.src : imageEl.src) : '';

      // Create an id from name (best-effort) + random suffix to reduce collisions
      const safeIdBase = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
      const id = `${safeIdBase}-${Date.now().toString().slice(-5)}${Math.floor(Math.random() * 90 + 10)}`;

      // Read existing cart (prefer 'herbalCart', fallback to older key)
      const raw = localStorage.getItem('herbalCart') || localStorage.getItem('goDownHerbsCart');
      const cart = raw ? JSON.parse(raw) : [];

      // Try to find same product by name first (if product from shop has exact name it will merge)
      let existing = cart.find(item => {
        if (!item) return false;
        return (item.id === id) || (item.name && item.name.trim().toLowerCase() === name.trim().toLowerCase());
      });

      if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
      } else {
        cart.push({
          id,
          name,
          price,
          image,
          quantity: 1
        });
      }

      // Save under both keys for compatibility
      localStorage.setItem('herbalCart', JSON.stringify(cart));
      localStorage.setItem('goDownHerbsCart', JSON.stringify(cart));

      // Update header cart badges (various selectors used across pages)
      updateHeaderCartCount();

      // Show feedback using existing site notification if available
      if (typeof showNotification === 'function') {
        showNotification(`${name} added to cart`, 'success');
      } else {
        alert(`${name} added to cart`);
      }
    });
  });
}

function updateHeaderCartCount() {
  const raw = localStorage.getItem('herbalCart') || localStorage.getItem('goDownHerbsCart');
  const cart = raw ? JSON.parse(raw) : [];
  const total = cart.reduce((s, it) => s + (it.quantity || 0), 0);

  // common header badge patterns in this project
  const iconBadge = document.querySelector('.icon-badge');
  const cartCountClass = document.querySelector('.cart-count');
  const cartCountId = document.getElementById('cartCount');

  if (iconBadge) {
    iconBadge.textContent = total;
    iconBadge.style.display = total > 0 ? 'inline-flex' : 'none';
  }
  if (cartCountClass) {
    cartCountClass.textContent = total;
    cartCountClass.style.display = total > 0 ? 'inline-flex' : 'none';
  }
  if (cartCountId) {
    cartCountId.textContent = total;
    cartCountId.style.display = total > 0 ? 'inline-flex' : 'none';
  }
}

// ensure header count is correct on load
document.addEventListener('DOMContentLoaded', () => {
  updateHeaderCartCount();
});
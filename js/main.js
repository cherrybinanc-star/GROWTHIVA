/* ===== GROWTHIVA — Main JavaScript ===== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Preloader --- */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 600);
        });
    }

    /* --- Navbar Scroll --- */
    const navbar = document.getElementById('navbar');
    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    /* --- Mobile Menu --- */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            });
        });
        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }

    /* --- Dropdown (mobile) --- */
    document.querySelectorAll('.dropdown > a').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = trigger.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    /* --- IntersectionObserver for Fade-Up --- */
    const fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        fadeEls.forEach(el => observer.observe(el));
    } else {
        fadeEls.forEach(el => el.classList.add('visible'));
    }

    /* --- Counter Animation --- */
    const counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(c => counterObserver.observe(c));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();
        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        };
        requestAnimationFrame(tick);
    }

    /* --- Stat Counters (homepage hero stats) --- */
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length && 'IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    if (target) {
                        animateStatCounter(el, target);
                    }
                    statObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });
        statNumbers.forEach(s => statObserver.observe(s));
    }

    function animateStatCounter(el, target) {
        const duration = 2200;
        const start = performance.now();
        const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target;
        };
        requestAnimationFrame(tick);
    }

    /* --- Portfolio Filter Tabs --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (tabBtns.length && portfolioItems.length) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = '';
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        requestAnimationFrame(() => {
                            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        });
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => { item.style.display = 'none'; }, 400);
                    }
                });
            });
        });
    }

    /* --- Contact Form Handler --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const origText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;
            // Simulate send
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                btn.style.background = '#69C291';
                btn.style.color = '#0C0C0C';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = origText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    /* --- Newsletter Form --- */
    document.querySelectorAll('.newsletter-form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const btn = form.querySelector('button');
            if (input && btn) {
                btn.innerHTML = '<i class="fas fa-check"></i>';
                input.value = '';
                input.placeholder = 'Subscribed!';
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    input.placeholder = 'Enter your email';
                }, 3000);
            }
        });
    });

    /* --- Smooth Scroll for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = navbar ? navbar.offsetHeight + 20 : 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* --- Tilt Effect on Service Cards --- */
    document.querySelectorAll('.service-card, .feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* --- Parallax Hero Badge --- */
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY;
            heroBadge.style.transform = `translateY(${y * 0.15}px)`;
        });
    }



    /* --- Custom Cursor --- */
    const cursor = document.querySelector('.custom-cursor');
    if (cursor && window.innerWidth > 992) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        document.querySelectorAll('a, button, .service-card, .feature-card, .tab-btn, .portfolio-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    /* --- Pricing Toggle (Service Pages) --- */
    const pricingToggle = document.getElementById('pricingToggle');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', () => {
            const monthly = document.querySelectorAll('.price-monthly');
            const yearly = document.querySelectorAll('.price-yearly');
            if (pricingToggle.checked) {
                monthly.forEach(el => el.style.display = 'none');
                yearly.forEach(el => el.style.display = 'block');
            } else {
                monthly.forEach(el => el.style.display = 'block');
                yearly.forEach(el => el.style.display = 'none');
            }
        });
    }

    /* --- Testimonial Slider --- */
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
        const slides = slider.querySelectorAll('.testimonial-card');
        const dotsContainer = slider.querySelector('.testimonial-dots');
        let current = 0;
        if (slides.length > 1 && dotsContainer) {
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
            const dots = dotsContainer.querySelectorAll('.dot');
            function goToSlide(n) {
                slides[current].classList.remove('active');
                dots[current].classList.remove('active');
                current = n;
                slides[current].classList.add('active');
                dots[current].classList.add('active');
            }
            setInterval(() => goToSlide((current + 1) % slides.length), 5000);
        }
    }

    /* --- FAQ Accordion --- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all
                faqItems.forEach(i => i.classList.remove('active'));
                // Open clicked (toggle)
                if (!isActive) item.classList.add('active');
            });
        }
    });

});

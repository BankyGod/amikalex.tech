       // Enhanced cyber animations and effects
        function createMatrixRain() {
            const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const cyberBg = document.querySelector('.cyber-bg');
            
            for (let i = 0; i < 30; i++) {
                const rain = document.createElement('div');
                rain.className = 'matrix-rain';
                rain.textContent = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                rain.style.left = Math.random() * 100 + '%';
                rain.style.animationDelay = Math.random() * 4 + 's';
                rain.style.animationDuration = (Math.random() * 3 + 3) + 's';
                cyberBg.appendChild(rain);
            }
        }
        
        function createFloatingParticles() {
            const cyberBg = document.querySelector('.cyber-bg');
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particles';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
                cyberBg.appendChild(particle);
            }
        }
        
        function createDataStreams() {
            const cyberBg = document.querySelector('.cyber-bg');
            
            for (let i = 0; i < 10; i++) {
                const stream = document.createElement('div');
                stream.className = 'data-stream';
                stream.style.top = Math.random() * 100 + '%';
                stream.style.animationDelay = Math.random() * 6 + 's';
                stream.style.animationDuration = (Math.random() * 3 + 4) + 's';
                cyberBg.appendChild(stream);
            }
        }
        
        // Initialize cyber effects
        createMatrixRain();
        createFloatingParticles();
        createDataStreams();
        
        // Recreate effects periodically for continuous animation
        setInterval(() => {
            const oldRain = document.querySelectorAll('.matrix-rain');
            oldRain.forEach(el => el.remove());
            createMatrixRain();
        }, 15000);
        
        // Contact form handling with enhanced animation
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const button = this.querySelector('.btn-submit');
            const originalText = button.textContent;
            
            // Add loading animation
            button.textContent = 'Sending...';
            button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate sending (in a real application, you would send this to a server)
            setTimeout(() => {
                console.log('Form submitted:', data);
                
                // Show success animation
                button.textContent = 'Message Sent! ✓';
                button.style.background = 'linear-gradient(45deg, #28a745, #20c997)';
                
                // Reset form and button after delay
                setTimeout(() => {
                    this.reset();
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(45deg, #333333, #000000)';
                }, 2000);
            }, 1000);
        });

        // Enhanced smooth scrolling with easing
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced scroll animations with intersection observer
        function createScrollObserver() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Add staggered animation for multiple elements
                        const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                        siblings.forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, index * 100);
                        });
                    }
                });
            }, observerOptions);
            
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el);
            });
        }
        
        // Initialize scroll observer
        createScrollObserver();

        // Enhanced navigation highlighting
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            const header = document.querySelector('header');
            
            // Add/remove header background based on scroll
            if (window.scrollY > 50) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.95))';
                header.style.backdropFilter = 'blur(15px)';
            }
            
            let current = '';
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
        
        // Add cursor trail effect
        let mouseTrail = [];
        document.addEventListener('mousemove', function(e) {
            mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
            
            // Limit trail length
            if (mouseTrail.length > 10) {
                mouseTrail.shift();
            }
            
            // Remove old trail points
            mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
        });
        
        // Add keyboard navigation enhancement
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });
        
        document.addEventListener('mousedown', function() {
            document.body.classList.remove('keyboard-nav');
        });
        
        // Performance optimization: Pause animations when not visible
        document.addEventListener('visibilitychange', function() {
            const animatedElements = document.querySelectorAll('.matrix-rain, .floating-particles, .data-stream');
            
            if (document.hidden) {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            } else {
                animatedElements.forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            }
        });

        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger');
        const nav = document.getElementById('primary-navigation');

        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
            hamburger.setAttribute('aria-expanded', !expanded);
            nav.classList.toggle('active');
        });

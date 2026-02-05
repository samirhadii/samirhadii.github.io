// Menu Logic
        let currentIndex = 0;
        const items = document.querySelectorAll('.menu-item');
        const totalItems = items.length;
        let isAnimating = false;
        
        // Clock
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('clock').textContent = `${hours}:${minutes}`;
        }
        setInterval(updateClock, 1000);
        updateClock();
        
        // Update Menu State
        function updateMenu() {
            items.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentIndex) {
                    item.classList.add('active');
                }
            });
            
            // Update indicators
            document.getElementById('leftIndicator').classList.toggle('visible', currentIndex > 0);
            document.getElementById('rightIndicator').classList.toggle('visible', currentIndex < totalItems - 1);
        }
        
        // Navigation
        function navigate(direction) {
            if (isAnimating) return;
            
            if (direction === 'next' && currentIndex < totalItems - 1) {
                currentIndex++;
                updateMenu();
            } else if (direction === 'prev' && currentIndex > 0) {
                currentIndex--;
                updateMenu();
            }
        }
        
        // Selection
        function selectCurrent() {
            const currentItem = items[currentIndex];
            const url = currentItem.getAttribute('data-url');
            
            // Visual feedback
            const overlay = document.getElementById('launchOverlay');
            overlay.classList.add('active');
            
            setTimeout(() => {
                window.open(url, '_blank');
                overlay.classList.remove('active');
            }, 300);
        }
        
        // Keyboard Controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowRight':
                case 'Right':
                    e.preventDefault();
                    navigate('next');
                    break;
                case 'ArrowLeft':
                case 'Left':
                    e.preventDefault();
                    navigate('prev');
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    selectCurrent();
                    break;
            }
        });
        
        // Scroll Controls
        let scrollTimeout;
        let lastScrollTime = 0;
        
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const now = Date.now();
            if (now - lastScrollTime < 200) return;
            lastScrollTime = now;
            
            if (e.deltaY > 0 || e.deltaX > 0) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }, { passive: false });
        
        // Touch/Swipe Controls
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    navigate('next');
                } else {
                    navigate('prev');
                }
            }
        }
        
        // Click on items
        items.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                updateMenu();
                setTimeout(selectCurrent, 200);
            });
        });
        
        // Particle Background Animation
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        let width, height;
        let particles = [];
        
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resize);
        resize();
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.life = Math.random() * 100 + 100;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life--;
              
                if (this.life <= 0 || this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 98, 0, ${this.opacity})`;
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw connecting lines
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                  
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 98, 0, ${0.1 * (1 - distance / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Initial update
        updateMenu();
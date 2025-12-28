import React, { useEffect, useRef } from 'react';

const HeroInteractive = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        let particles = [];
        const mouse = { x: null, y: null };

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 2 + 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                // Get accent color from computed style or fallback
                const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#00ff9d';
                ctx.fillStyle = accent;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = 100;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 10;
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 10;
                    }
                }
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < 500; i++) {
                let x = Math.random() * width;
                let y = Math.random() * height;
                particles.push(new Particle(x, y));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].draw();
                particles[i].update();
            }
            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="hero-interactive" id="home">
            <canvas ref={canvasRef} className="interactive-canvas"></canvas>
            <div className="content-layer">
                <h1>Interactive<br />Experience</h1>
                <p>Move your cursor to interact with the particle field.</p>
            </div>

            <style>{`
                .hero-interactive {
                    min-height: 100vh;
                    position: relative;
                    background: #111;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .interactive-canvas {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                }

                .content-layer {
                    position: relative;
                    z-index: 10;
                    pointer-events: none;
                    text-align: center;
                }

                .content-layer h1 {
                    font-size: 5rem;
                    margin-bottom: 1rem;
                    color: white;
                }

                .content-layer p {
                    color: var(--accent-primary);
                    font-family: var(--font-mono);
                }
            `}</style>
        </section>
    );
};

export default HeroInteractive;

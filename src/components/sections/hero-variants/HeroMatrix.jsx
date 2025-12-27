import React, { useEffect, useRef } from 'react';

const HeroMatrix = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const columns = Math.floor(width / 20);
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(Math.floor(Math.random() * 96 + 32)); // Random char
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className="hero-matrix" id="home">
            <canvas ref={canvasRef} className="matrix-canvas"></canvas>
            <div className="matrix-content">
                <h1>SURESH.EXE</h1>
                <p>&lt;System.Architect /&gt;</p>
                <div className="matrix-actions">
                    <a href="#projects" className="matrix-btn">INITIATE_SEQUENCE</a>
                </div>
            </div>

            <style>{`
                .hero-matrix {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: black;
                }

                .matrix-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    opacity: 0.8;
                }

                .matrix-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.7);
                    padding: 3rem;
                    border: 1px solid #0F0;
                    box-shadow: 0 0 20px #0F0;
                }

                .matrix-content h1 {
                    font-family: 'Courier New', monospace;
                    font-size: 4rem;
                    color: #0F0;
                    text-shadow: 0 0 10px #0F0;
                    margin-bottom: 0.5rem;
                }

                .matrix-content p {
                    font-family: 'Courier New', monospace;
                    font-size: 1.5rem;
                    color: #fff;
                    margin-bottom: 2rem;
                }

                .matrix-btn {
                    display: inline-block;
                    padding: 1rem 2rem;
                    coler: black;
                    background: #0F0;
                    color: black;
                    font-family: 'Courier New', monospace;
                    font-weight: bold;
                    text-decoration: none;
                    transition: all 0.3s;
                }

                .matrix-btn:hover {
                    box-shadow: 0 0 30px #0F0;
                    color: white;
                    background: black;
                    border: 1px solid #0F0;
                }
            `}</style>
        </section>
    );
};

export default HeroMatrix;
